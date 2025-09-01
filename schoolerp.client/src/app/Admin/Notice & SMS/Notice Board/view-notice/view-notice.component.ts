import { Component, OnInit } from '@angular/core';
import { NoticesService } from '../../../../Services/Messages/notices.service';
import { ImageServiceService } from '../../../../Services/image-service.service';
import { notices } from '../../../../models/notice';
import { AuthServiceService } from '../../../../Services/AuthServiceService';

@Component({
  selector: 'app-view-notice',
  templateUrl: './view-notice.component.html',
  styleUrl: './view-notice.component.css'
})
export class ViewNoticeComponent implements OnInit {

  noticeList: notices[] = [];
  userRole: string = "Admin";

  constructor(private _noticeService: NoticesService, private _imageService: ImageServiceService, private _authService: AuthServiceService) { }

  ngOnInit() {
    this.userRole = this._authService.getUserRole();
    this.loadNotices();
  }

  loadNotices() {
    this._noticeService.getNotices().subscribe(
      (notices) => {
        console.log("Notices: ", notices); this.noticeList = notices;
        this.noticeList.forEach(n => {
          n.file_path = this._imageService.getImageUrlNotices(n.file_path) ?? "";
          return n;
        }); 
      },
      (error) => { console.log("Error in notice: ",error); }
    );
  }
   
  notifyNotice(notice_id: number) {
    console.log("Notice notify at Index ", notice_id);
  }

  deleteNotice(notice_id: number,index:number) {
    this._noticeService.deleteNotices(notice_id).subscribe(
      (notice) => {
        this.noticeList.splice(index, 1);
        console.log("Notice Deleted: ",notice);
      },
      (error) => { console.log("Error in notice deletion : ", error); }
    );
    console.log("Notice deleted at Index ", notice_id);
  }

}
