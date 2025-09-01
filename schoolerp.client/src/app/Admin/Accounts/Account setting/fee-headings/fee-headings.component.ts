import { Component, HostListener, OnInit } from '@angular/core';
import { fee_head_master, fee_head_master_DTOs, fee_type_master } from '../../../../models/account';
import { FeeHeaderService } from '../../../../Services/fee-header.service';

@Component({
  selector: 'app-fee-headings',
  templateUrl: './fee-headings.component.html',
  styleUrl: './fee-headings.component.css'
})
export class FeeHeadingsComponent implements OnInit {

  fee_heads: fee_head_master_DTOs[] = [];

  fee_head: fee_head_master = {
    fee_head_id: 0, 
    fee_head_name: '',
    description: '',
    IsMandatory: false,
    school_id: '',
    IsDeleted: false,
    cDate: new Date(),
    mDate: new Date(),
  }

  fee_types: fee_type_master[] = [];

  toggleIndex: number | null = null;

  constructor(private _feeHeaderService: FeeHeaderService) { }

  ngOnInit() {
    this.loadFeeTypes();
    this.loadFeeHeads();
  }

  loadFeeHeads() {
    this._feeHeaderService.getFeeHead().subscribe(
      (data: fee_head_master_DTOs[]) => {
        this.fee_heads = data;
        console.log('Fee heads loaded:', this.fee_heads);
      },
      error => {
        console.error('Error fetching fee types:', error);
      }
    );
  }

  loadFeeTypes() {
    this._feeHeaderService.getFeeType().subscribe(
      (data: fee_type_master[]) => {
        this.fee_types = data;
        console.log('Fee types loaded:', this.fee_types);
      },
      error => {
        console.error('Error fetching fee types:', error);
      }
    );
  }



  submitFeeHead() {
    this._feeHeaderService.postFeeHead(this.fee_head).subscribe(
      (response) => {
        this.loadFeeHeads();
        console.log("Fee Head data: ", response);
        this.clear();
      },
      error => {
        console.error('Error inserting fee headers:', error);
      }
    );

  }

  editFeeHead(fee: fee_head_master) {
    this.fee_head = fee; 
  }

  deleteFeeHead(fee_head_id: number,index:number) {
    this._feeHeaderService.deleteFeeHead(fee_head_id).subscribe(
      (res) => {
        console.log("Response: ", res);
        this.fee_heads.splice(index,1);
        this.clear();
      },
      error => {
        console.error('Error deleting fee types:', error);
      }
    );
  }

  toggleBtn(index: number) {
    this.toggleIndex = this.toggleIndex == index ? null : index;
  }

  clear() {
    this.fee_head.fee_head_id = 0; 
    this.fee_head.fee_head_name = '';
    this.fee_head.description = '';
    this.fee_head.IsMandatory = false;
    this.fee_head.school_id = '';
    this.fee_head.IsDeleted = false;
    this.fee_head.cDate = new Date();
    this.fee_head.mDate = new Date();
  }


  @HostListener('document:click', ['$event'])
  onClick(mouseEvent: MouseEvent) {
    const element = mouseEvent.target as HTMLElement;
    if (!element.closest('.btn-action') && !element.closest('.action-list')) {
      this.toggleIndex = null;
    } 
  }

}
