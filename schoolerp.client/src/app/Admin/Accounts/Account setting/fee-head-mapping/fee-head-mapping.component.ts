import { Component, OnInit } from '@angular/core';
import { FeeHeaderService } from '../../../../Services/fee-header.service';
import { ToastrService } from 'ngx-toastr'; // Ensure you have ngx-toastr installed and imported in app.module.ts
import { AuthServiceService } from '../../../../Services/AuthServiceService';
import { fee_head_mapping } from '../../../../models/account';
import { SessionService } from '../../../../Services/session.service';

@Component({
  selector: 'app-fee-head-mapping',
  templateUrl: './fee-head-mapping.component.html',
  styleUrls: ['./fee-head-mapping.component.css']
})
export class FeeHeadMappingComponent implements OnInit {

  feeTypes: any[] = [];
  feeHeads: any[] = [];
  sessions: any[] = [];


  selectedFeeType: number | null = null;
  selectedFeeHead: number | null = null;
  selectedSession: string = '';
  filteredSession: string = '';

  feeHeadMappings: any[] = [];

  feeHeadMapping: fee_head_mapping = {
    fee_head_mapping_id:0,
    fee_head_id:0,
    fee_type_id:0,
    session:'',
    school_id: '',
    IsDeleted: false,
    cDate: new Date(),
    mDate: new Date(),
  }

  constructor(
    private _feeHeaderService: FeeHeaderService,
    private _authService: AuthServiceService,
    private toastr: ToastrService,
    private _sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.selectedSession = this._sessionService.getActiveSession();
    this.filteredSession = this._sessionService.getActiveSession();
    this.loadSessions();
    this.loadFeeTypes();
    this.loadFeeHeads();
    this.loadMappings();
  }

  loadFeeTypes() {
    this._feeHeaderService.getFeeType().subscribe(data => {
      this.feeTypes = data;
    });
  }

  loadFeeHeads() {
    this._feeHeaderService.getFeeHead().subscribe(data => {
      this.feeHeads = data;
    });
  }

  loadMappings() {
    this._feeHeaderService.getFeeHeadMappings(this.filteredSession).subscribe(data => {
      this.feeHeadMappings = data;
      console.log("this.feeHeadMappings: ", this.feeHeadMappings);
    });
  }

  loadSessions() {
    this._sessionService.getSession().subscribe(
      res => {
        console.log("Sessions: ", res);
        this.sessions = res;
      },
      err => {
        console.log("Error: ",err);
      }
    );
  }

  fee_type_name(fee_type_id: string): string {
    const val = this.feeTypes.find(f => f.fee_type_id == fee_type_id);
    return val ? val.fee_type_name : '';
  }

  fee_head_name(fee_head_id: string): string {
    const val = this.feeHeads.find(f => f.fee_head_id == fee_head_id);
    return val ? val.fee_head_name : '';
  }


  filterSession() {
    this.loadMappings();
  }

  feeHeadChange() {
    this._feeHeaderService.getFeeTypefromfeeheadMapping(this.selectedSession, this.selectedFeeHead ?? 0).subscribe(
      res => {
        console.log("getFeeTypefromfeeheadMapping: ", res);
        this.selectedFeeType = res;
      },
      err => {
        console.log("Error: ",err);
      }
    );
  }
 

  mapFeeHead() {
    const schoolId = this._authService.getSchoolID();

    if (!this.selectedFeeType || !this.selectedFeeHead || !this.selectedSession) {
      this.toastr.warning('Please fill all fields');
      return;
    }

    this.feeHeadMapping.fee_head_id = this.selectedFeeHead;
    this.feeHeadMapping.fee_type_id = this.selectedFeeType;
    this.feeHeadMapping.session = this.selectedSession;
    this.feeHeadMapping.school_id = schoolId;

    this._feeHeaderService.postFeeHeadMapping(this.feeHeadMapping).subscribe({
      next: () => {
        this.toastr.success('Mapping saved');
        this.loadMappings();
        this.clear();
      },
      error: (err) => {
        if (err.status === 409) {
          this.toastr.error('Duplicate mapping detected');
        } else {
          this.toastr.error('Failed to save mapping');
        }
      }
    });
  }


  deleteMapping(id: number) {
    if (confirm('Are you sure you want to delete this mapping?')) {
      this._feeHeaderService.deleteFeeHeadMapping(id).subscribe({
        next: () => {
          this.toastr.success('Mapping deleted');
          this.loadMappings();
        },
        error: () => {
          this.toastr.error('Delete failed');
        }
      });
    }
  }

  editMapping(mapping: any) {
    this.selectedFeeType = mapping.fee_type_id;
    this.selectedFeeHead = mapping.fee_head_id;
    this.selectedSession = mapping.session;
    this.feeHeadMapping = mapping;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


  clear() {
    this.selectedFeeType = null;
    this.selectedFeeHead = null; 
    this.feeHeadMapping = {
      fee_head_mapping_id: 0,
      fee_head_id: 0,
      fee_type_id: 0,
      session: '',
      school_id: '',
      IsDeleted: false,
      cDate: new Date(),
      mDate: new Date(),
    };
  }



}
