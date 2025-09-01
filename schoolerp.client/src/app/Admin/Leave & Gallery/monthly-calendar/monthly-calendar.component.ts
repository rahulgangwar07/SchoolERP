import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { HolidayService } from '../../../Services/holiday.service';
import { SuccessMessagePopupService } from '../../../Services/success-message-popup.service';
import { Permissions } from '../../../models/permissions';
import { Router } from '@angular/router';
import { PermissionsService } from '../../../Services/permissions.service';
import { GlobalSettingsService } from '../../../Services/global-settings.service';

// Update the Calendar interface to have id as a string
interface Calendar {
  id: string;   
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  user_type: string;
  event_type: string;
}

 
@Component({
  selector: 'app-monthly-calendar',
  templateUrl: './monthly-calendar.component.html',
  styleUrls: ['./monthly-calendar.component.css']
})
export class MonthlyCalendarComponent implements OnInit {
  @ViewChild(FullCalendarComponent) fullCalendarComponent: FullCalendarComponent | undefined;
   
  newEvents: any = [];
  calendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    events: this.newEvents,
    dateClick: this.handleDateClick.bind(this),
    eventDidMount: this.handleEventDidMount.bind(this)
  };

  popupCalendar: Calendar[] = [];
  tempPopupCalendar: any[] = []; 
  popupVisible: boolean = false;
  popupVisibleInsertion: boolean = false;

  newEvent: Calendar = {
    id: '0',  // Set default 'id' as string
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    user_type: 'All',
    event_type: 'Holiday'
  };

  showSuccessPopup = false;
  messages: { content: string; type: string; }[] = [];

  permission!: Permissions;

  themeSetting: any;


  constructor(private cdr: ChangeDetectorRef, private _holidayService: HolidayService, private _messageService: SuccessMessagePopupService,
    private router: Router, private _permissionService: PermissionsService, private _settingService: GlobalSettingsService) { }

  ngOnInit(): void {
    this._holidayService.getHolidays().subscribe(
      (success) => {
        // Map events to match the structure needed for FullCalendar
        this.newEvents = success.map((holiday: any) => ({
          id: holiday.id.toString(),
          title: holiday.title,
          description: holiday.description,
          start: holiday.start_date,  
          end: holiday.end_date,  
          extendedProps: {
            userType: holiday.user_type,
            eventType: holiday.event_type
          }
        }));

        this.popupCalendar = success;  
        this.calendarOptions.events = this.newEvents;   
      },
      (error) => {
        console.error("Error in fetching holidays: ", error);
      } 
    );

    this._messageService.messages$.subscribe(messages => {
      this.messages = messages,
        this.showSuccessPopup = messages.length > 0
    });
    console.log("Message List: ", this.messages);

    const route = this.router.url;
    this._permissionService.checkPermission(route).subscribe(
      (success) => {
        console.log("Permissions: ", success);
        this.permission = success;
      },
      (error) => {
        console.log("Error in fetching Permissions! ",error);
      }
    );

    this.themeSetting = this._settingService.getCurrentTheme();

  }


  handleEventDidMount(info: any) {
    const event = info.event;
    const titleElement = info.el.querySelector('.fc-event-title');
    const eventElement = info.el;  // This is the full event element (for background color)

    // Check event type and apply styles accordingly
    if (event.extendedProps.eventType === 'Holiday') {
      titleElement.style.color = '#177a6f'; 
      eventElement.style.backgroundColor = '#cadbde';  
    } else if (event.extendedProps.eventType === 'Meeting') {
      titleElement.style.color = 'blue';  
      eventElement.style.backgroundColor = '#b3d9ff';  
    } else if (event.extendedProps.eventType === 'Event') {
      titleElement.style.color = 'red';   
      eventElement.style.backgroundColor = '#ffcccc';   
    } else {
      titleElement.style.color = 'gray';  
      eventElement.style.backgroundColor = '#e0e0e0';  
    }
  }


  handleDateClick(arg: any) {
    this.newEvent.start_date = arg.dateStr;  
    this.tempPopupCalendar = this.filterEventsByDate(arg.dateStr);  
    this.togglePopup(true);  
  }

  filterEventsByDate(date: string) { 
     
    const selectedDate = new Date(date).toISOString().split('T')[0];   

    return this.popupCalendar.filter(event => {
      const eventDate = new Date(event.start_date).toISOString().split('T')[0];  
      return eventDate === selectedDate;   
    });
  }


  togglePopup(isVisible: boolean) {
    this.popupVisible = isVisible;
  }

  closePopup() {
    this.popupVisible = false;
  }

  addNewEvent() {
    this.popupVisibleInsertion = true;
  }

  saveEvent() { 
    if (this.newEvent.title && this.newEvent.start_date) {
      this.newEvent.start_date = this.newEvent.start_date;
      this.newEvent.end_date = this.newEvent.start_date;

      if (this.newEvent.id && this.newEvent.id!="0") {
        this._holidayService.insertHolidays(this.newEvent).subscribe(
          (response) => {
            this.updateEvent();
            this._messageService.addMessage("update","Event Update Successfully! ");
          },
          (error) => {
            console.error("Error during event insertion: ", error);
            this._messageService.addMessage("error", "Failed to update the event. Please try again. ");
          }
        );
        
      } else { 
        this._holidayService.insertHolidays(this.newEvent).subscribe(
          (response) => {
            this._messageService.addMessage("success", "Event Insert Successfully! ");
            this.popupCalendar.push({ ...this.newEvent });
            this.tempPopupCalendar.push({ ...this.newEvent });
            this.addEventToFullCalendar(this.newEvent);
            this.clearNewEventFields();
            this.togglePopup(false);
          },
          (error) => {
            console.error("Error during event insertion: ", error);
            this._messageService.addMessage("error", "Failed to insert the event. Please try again. ");
          }
        );
      }
    } else {
      alert('Please fill in all required fields.');
    }
  }

  updateEvent() {
    // Update the event in the calendar and FullCalendar component
    const index = this.popupCalendar.findIndex(event => event.id === this.newEvent.id);
    if (index !== -1) {
      this.popupCalendar[index] = { ...this.newEvent };
      this.tempPopupCalendar[index] = { ...this.newEvent };
    }

    const calendarApi = this.fullCalendarComponent?.getApi();
    if (calendarApi) {
      const eventToUpdate = calendarApi.getEventById(this.newEvent.id);
      if (eventToUpdate) {
        eventToUpdate.setProp('title', this.newEvent.title);
        //eventToUpdate.setDates(this.newEvent.start_date, this.newEvent.end_date);
      }
    }

    this.clearNewEventFields();
    this.togglePopup(false);
  }

  addEventToFullCalendar(event: Calendar) {
    const calendarApi = this.fullCalendarComponent?.getApi();
    if (calendarApi) {
      calendarApi.addEvent({
        title: event.title,
        description: event.description,
        start: event.start_date,
        end: event.end_date,
        extendedProps: {
          userType: event.user_type,
          eventType: event.event_type
        }
      });
    }
  }

  clearNewEventFields() {
    this.newEvent = {
      id: '0',  // Make sure 'id' is a string
      title: '',
      description: '',
      start_date: '',
      end_date: '',
      user_type: 'All',
      event_type: 'Holiday'
    };
  }

  showEvent() {
    this.popupVisibleInsertion = false;
  }

  editEvent(event: any) {
    this.newEvent = { ...event };   
    this.popupVisibleInsertion = true;
  }

  deleteEvent(event: any) {

    this._holidayService.deleteHoliday(event.id).subscribe(
      (success) => {
        this._messageService.addMessage("delete", "Event deleted Successfully! ");
        console.log("Holiday Successfully Deleted!",success);
      },
      (error) => {
        console.log("Error in holiday! ");
        this._messageService.addMessage("error", "Failed to delete the event. Please try again. ");
      }
    );

    const index = this.popupCalendar.indexOf(event);
    if (index !== -1) {
      this.popupCalendar.splice(index, 1);
    }

    const tempIndex = this.tempPopupCalendar.indexOf(event);
    if (tempIndex !== -1) {
      this.tempPopupCalendar.splice(tempIndex, 1);
    }

    const calendarApi = this.fullCalendarComponent?.getApi();
    if (calendarApi) {
      const eventToDelete = calendarApi.getEventById(event.id);
      if (eventToDelete) {
        eventToDelete.remove();
      }
    }
  }

  closeMessagePopup(index: number) {
    this._messageService.closeMessage(index);
  }

}
