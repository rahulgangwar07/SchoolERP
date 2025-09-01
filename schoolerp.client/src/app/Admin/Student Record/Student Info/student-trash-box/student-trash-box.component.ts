import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RegistrationService } from '../../../../Services/registration.service';
import { ImageServiceService } from '../../../../Services/image-service.service';

@Component({
    selector: 'app-student-trash-box',
    templateUrl: './student-trash-box.component.html',
    styleUrls: ['./student-trash-box.component.css'],
    standalone: false
})
export class StudentTrashBoxComponent implements OnInit {

  trashBoxData: any[] = [];  // To store the data from the API

  showSuccessPopup = false;
  messages: { type: string, content: string }[] = [];
  @ViewChild('successMessagePopup') successMessagePopup: ElementRef | undefined;


  constructor(private _registrationService: RegistrationService, private _imageService: ImageServiceService) { }

  ngOnInit(): void {
    this.dataBind();
  }

  dataBind() {
    this._registrationService.trashboxData().subscribe(
      (response) => { 
        this.trashBoxData = response;
        this.trashBoxData.forEach(st =>
          st.studentMaster.stuImage = this._imageService.getImageUrlStudent(st.studentMaster.stuImage) // Assign image URL to each student
        );
      },
      (error) => {
        console.log("Error is: ", error);
      }
    );
  } 

  restoreStudent(uid: number, stu_id: number) {
    this._registrationService.restoreStudent(uid,stu_id).subscribe(
      (response) => { 
        this.dataBind(); 
        this.addMessage('restore', 'Student has been Restored.');
      },
      (error) => {
        console.log("Error found!. ", error);
        this.addMessage('error', 'Failed to student restored. Please try again.');
      }
    );
  }


  addMessage(type: string, content: string) {
    const messageExists = this.messages.some(msg => msg.content === content);
    if (messageExists) {
      this.messages = this.messages.filter(msg => msg.content !== content);
    }

    this.messages.push({ type, content });
    this.showSuccessPopup = true;
  }

  closeMessagePopup(index: number) {
    this.messages.splice(index, 1);

    if (this.messages.length === 0) {
      this.showSuccessPopup = false;
    }
  }

  printWindow() {

    const restoreButtons = Array.from(document.querySelectorAll('.action-btns')) as HTMLElement[];
    restoreButtons.forEach((btn: HTMLElement) => {
      btn.style.display = 'none'; // Hide the "Restore" buttons
    });

    const content = window.open();
    content?.document.write('<html><head><style>');
    content?.document.write(`
    
select, input[type="date"], input[type="text"] {
  padding: 8px 12px;
  font-size: 14px;
  margin-top: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.profile-image{
    margin: auto;
    max-height: 100px;
    max-width: 100px;
}

.table-container {
  width: 100%;
  overflow-x: auto;
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ddd;
}

th, td {
  padding: 12px 15px;
  text-align: center;
  border: 1px solid #ddd;
}

th {
  background-color: #f4f4f4;
  font-weight: bold;
}

td {
  background-color: #fff;
}

.action-btn {
  background-color: #4CAF50;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

  .action-btn:hover {
    background-color: #45a049;
  }

@media print {
  body {
    font-size: 12px;
    line-height: 1.5;
    margin: 10px;
  }

  .print-btn {
    display: none;
  }

  .table-container, .filters, .layout-header, .action-button {
    display: none; /* Hide unnecessary UI elements while printing */
  }

  #printableArea {
    padding: 20px;
    border: 1px solid #000;
  }
}


.print-btn {
 /* background-color: #2196F3;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;*/
  font-size: 12px;
  background-color: #e0aede;
}

  .print-btn:hover {
    background-color: #0b7dda;
  }



/* Styling the action button */
.action-btn {
  background-color: #007bff; 
  color: white;  
  border: none;  
  padding: 8px 12px; 
  font-size: 14px;  
  cursor: pointer;  
  border-radius: 5px; 
  transition: background-color 0.3s ease;  
}

  .action-btn:hover {
    background-color: #0056b3;  
  }

/* Styling for the options dropdown */
.action-button {
  list-style-type: none;  
  padding: 0;            
  margin: 5px 0 0 0;  
  position: absolute; 
  background-color: #ffffff;  
  border: 1px solid #ddd;     
  border-radius: 5px;  
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);  
  width: 120px;  
}

  .action-button li {
    padding: 4px 6px; 
    font-size: 14px;  
    cursor: pointer;  
    transition: background-color 0.3s ease; /* Smooth transition */
  }

    .action-button li:hover {
      background-color: #f1f1f1; /* Light gray background on hover */
    }

    .action-button li i {
      margin-right: 5px; /* Space between icon and text */
    }

  `);
    content?.document.write('</style></head><body><div>');

    const contentToPrint = document.getElementById('trashBoxDiv')?.innerHTML;

    if (contentToPrint) {
      content?.document.write(contentToPrint);
    } else {
      content?.document.write('No content to print');
    }

    content?.document.write('</div></body></html>');
    content?.document.close();
    content?.print();

    // After printing, restore the "Restore" buttons back to visible
    restoreButtons.forEach((btn: HTMLElement) => {
      btn.style.display = 'block'; // Make the "Restore" buttons visible again
    });
  }



}
