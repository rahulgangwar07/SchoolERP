import { Component, HostListener, OnInit } from '@angular/core';
import { VisitorService } from '../../../Services/visitor.service';
import { visitor } from '../../../models/visitor';
import { ImageServiceService } from '../../../Services/image-service.service';
import { elementClosest } from '@fullcalendar/core/internal';
import { SuccessMessagePopupService } from '../../../Services/success-message-popup.service';

@Component({
  selector: 'app-view-visitor',
  templateUrl: './view-visitor.component.html',
  styleUrl: './view-visitor.component.css'
})
export class ViewVisitorComponent implements OnInit {

  visitorList: visitor[] = [];
  filteredvisitorList: visitor[] = [];

  toggleIndex: number | null = null;

  showSuccessPopup = false;
  messages: { type: string, content: string }[] = [];


  constructor(private _visitorService: VisitorService, private _imageService: ImageServiceService, private _messageService: SuccessMessagePopupService) { }

  ngOnInit() {
    this.bindVisitors();
  }

  bindVisitors() {
    this._visitorService.getVisitors().subscribe(
      (visitor: visitor[]) => {
        this.visitorList = visitor;
        if (this.visitorList.length == 0) {
          this._messageService.addMessage("warning", "Visitors not avaiable Please add vistors first.");
        } 
        this.visitorList.map(v => {
          return v.visitor_image = this._imageService.getImageUrlVisitors(v.visitor_image) ?? "";
        });
        this.filteredvisitorList = this.visitorList;
      },
      (error) => {
        console.log("Visitors not bind properly ", error);
      });
  }

  filterVisitors(name: any) { 
    const val = (Number)(name) ? 1 : 0;
    if (val == 1) {
      this.filteredvisitorList = this.visitorList.filter(fn => {
        return fn.visitor_contact.includes(name);
      })
    }
    else {
      this.filteredvisitorList = this.visitorList.filter(fn => {
        return fn.visitor_name.toLowerCase().includes(name.toLowerCase());
      })
    }
    
    console.log("Name: ",name);
  }

  deleteVisitor(visitor_id: number) {
    this._visitorService.deleteVisitor(visitor_id).subscribe(
      (deleted) => {
        this.bindVisitors();
        this.toggleIndex = null;
        console.log("Visitor record deleted successfully. Visitor ID:", deleted.id);
        this._messageService.addMessage("success", "The visitor record has been successfully deleted.");

      },
      (error) => {
        console.error("An error occurred while deleting the visitor record. Error details:", error);
        this._messageService.addMessage("error", "An error occurred during visitor deletion. Please try again later.");
      }

    );
  }

  toggleBtn(index: number) {
    this.toggleIndex = this.toggleIndex == index ? null:index;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const clickedEvent = event.target as HTMLElement;
    if (!clickedEvent.closest('.btn-action') && !clickedEvent.closest('.action-list')) {
      this.toggleIndex = null;
    }
  }
   
  closeMessagePopup(index: number) {
    this._messageService.closeMessage(index);
  }
   
}
