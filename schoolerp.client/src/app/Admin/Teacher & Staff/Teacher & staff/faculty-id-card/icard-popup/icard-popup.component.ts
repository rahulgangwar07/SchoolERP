import { Component, Input, OnInit } from '@angular/core';
import { ImageServiceService } from '../../../../../Services/image-service.service';

@Component({
  selector: 'app-icard-popup',
  templateUrl: './icard-popup.component.html',
  styleUrl: './icard-popup.component.css'
})
export class IcardPopupComponent implements OnInit {

  @Input() faculties: any[] = [];
  constructor(private _imageService: ImageServiceService) {

  }
  ngOnInit() {

  }

  printWindow():void {
    const printWindow = window.open('', '', 'height=500,width=800');
    printWindow?.document.write('<html><body><div style="display: flex; flex-wrap: wrap; gap: 20px;">');
    //    const selectedFaculties = document.querySelectorAll('.teacher-card:not(.hide-card)');
    const selectedFaculties = document.querySelectorAll('.printableArea');
    let content = '';
    selectedFaculties.forEach((card) => {
      content += card.outerHTML;  // Add each visible card's outer HTML
    });
    if (content) {
      printWindow?.document.write(content);
    } else {
      printWindow?.document.write('No content to print');
    }
    printWindow?.document.write('</div></body></html>');
    printWindow?.document.close();
    printWindow?.print();
  }

}


 
//  printWindow(): void {
//    // Create a new print window
//    const printWindow = window.open('', '', 'height=500,width=800');
//    printWindow?.document.write('<html><head><title>Faculty Cards</title></head><body>');

//    // Select the content you want to print (cards that are selected)
//    const selectedFaculties = document.querySelectorAll('.teacher-card:not(.hide-card)');

//    // Collect the HTML of all visible cards
//    let content = '';
//    selectedFaculties.forEach((card) => {
//      content += card.outerHTML;  // Add each visible card's outer HTML
//    });

//    // If there is content to print, add it to the print window
//    if (content) {
//      printWindow?.document.write(content);
//    } else {
//      printWindow?.document.write('No content to print');
//    }

//    printWindow?.document.write('</body></html>');
//    printWindow?.document.close();
//    printWindow?.print();
//  }
//}
