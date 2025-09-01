import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageServiceService } from '../../../../Services/image-service.service';

@Component({
  selector: 'app-view-document',
  templateUrl: './view-document.component.html',
  styleUrls: ['./view-document.component.css']
})
export class ViewDocumentComponent implements OnInit {
  documentUrls: string[] | any[] = [];

  constructor(private route: ActivatedRoute, private _imageService: ImageServiceService) { }

  ngOnInit() { 
    const urls = this.route.snapshot.queryParamMap.getAll('urls');

    if (urls.length > 0) { 
      this.documentUrls = urls.map(url => {
        return this._imageService.getImageUrlAcademics(url); 
      });
       
    }
  }
}
