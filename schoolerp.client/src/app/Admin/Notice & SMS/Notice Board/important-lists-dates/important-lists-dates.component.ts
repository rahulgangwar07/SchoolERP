import { Component, HostListener, OnInit } from '@angular/core';
import { NoticesService } from '../../../../Services/Messages/notices.service';
import { ImageServiceService } from '../../../../Services/image-service.service';
import { AuthServiceService } from '../../../../Services/AuthServiceService';

@Component({
  selector: 'app-important-lists-dates',
  templateUrl: './important-lists-dates.component.html',
  styleUrl: './important-lists-dates.component.css'
})
export class ImportantListsDatesComponent implements OnInit {

  programList: any[] = [];
  toggleIndex: number | null = null;
  userRole: string = "Admin";

  constructor(private _programService: NoticesService, private _imageService: ImageServiceService, private _authService: AuthServiceService) { }

  ngOnInit() {
    this.userRole = this._authService.getUserRole();
    this.loadPrograms();
  }

  loadPrograms() {
    this._programService.getPrograms().subscribe(
      (next) => {
        this.programList = next; console.log("Programs1: ", this.programList);
        this.programList.forEach(p => p.filePath = this._imageService.getImageUrlPrograms(p.filePath));
        console.log("Programs2: ", this.programList);
      },
      (error) => { console.log("Error in programs: ",error); }
    );
  }

  toggleBtn(index: number) {
    this.toggleIndex = this.toggleIndex == index ? null : index;
  }
   
  deleteProgram(program_id:number) {
    console.log("Program: ", program_id);
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const selectedELement = event.target as HTMLElement; 
    if (!selectedELement.closest('.btn-action') && !selectedELement.closest('.action-list')) { 
      this.toggleIndex = null;
    }
  }

}
