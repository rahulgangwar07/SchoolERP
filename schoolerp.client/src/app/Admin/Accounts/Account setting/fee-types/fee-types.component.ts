import { Component, HostListener, OnInit } from '@angular/core';
import { fee_type_master } from '../../../../models/account';
import { FeeHeaderService } from '../../../../Services/fee-header.service';

@Component({
  selector: 'app-fee-types',
  templateUrl: './fee-types.component.html',
  styleUrl: './fee-types.component.css'
})
export class FeeTypesComponent implements OnInit {

  fee_types: fee_type_master[] = [];

  fee_type: fee_type_master = {
    fee_type_id: 0,
    fee_type_name: '',
    month: 0,
    description: '',
    IsDeleted: false,
    cDate: new Date(),
    mDate: new Date(),
    school_id: ''
  }

  toggleIndex: number | null = null;

  constructor(private _feeHeaderService: FeeHeaderService) { }

  ngOnInit() {
    this.loadFeeTypes();
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

  submitFeeType() {
    this._feeHeaderService.postFeeType(this.fee_type).subscribe(
      (response) => {
        this.loadFeeTypes();
        console.log("Fee Type data: ", response);
        this.clear();
      },
      error => {
        console.error('Error inserting fee types:', error);
      }
    );

  }

  editFeeType(fee: fee_type_master) {
    this.fee_type = fee;
  }

  deleteFeeType(fee_type_id: number, index: number) {
    this._feeHeaderService.deleteFeeType(fee_type_id).subscribe(
      (res) => {
        console.log("Response: ", res);
        this.fee_types.splice(index, 1);
        this.clear();
      },
      error => {
        console.error('Error deleting  fee types:', error);
      }
    );
  }

  toggleBtn(index: number) {
    this.toggleIndex = this.toggleIndex == index ? null : index;
  }

  clear() {
    this.fee_type.fee_type_id = 0;
    this.fee_type.fee_type_name = '';
    this.fee_type.description = '';
    this.fee_type.IsDeleted = false;
    this.fee_type.cDate = new Date();
    this.fee_type.mDate = new Date();
    this.fee_type.school_id = '';
  }


  @HostListener('document:click', ['$event'])
  onClick(mouseEvent: MouseEvent) {
    const element = mouseEvent.target as HTMLElement;
    if (!element.closest('.btn-action') && !element.closest('.action-list')) {
      this.toggleIndex = null;
    }
    console.log(element);
  }

}
