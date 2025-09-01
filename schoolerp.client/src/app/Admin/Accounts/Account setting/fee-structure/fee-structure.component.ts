import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../../../Services/session.service';
import { ClassService } from '../../../../Services/class.service';
import { FeeHeaderService } from '../../../../Services/fee-header.service';
import { CalenderService } from '../../../../Services/calender.service';
import { LockService } from '../../../../Services/lock.service';

@Component({
  selector: 'app-fee-structure',
  templateUrl: './fee-structure.component.html',
  styleUrl: './fee-structure.component.css'
})
export class FeeStructureComponent implements OnInit {

  lockStatus: boolean = false;

  sessionList: any[] = [];
  academic_year: string = "";

  classList: any[] = [];
  class_id: number = 0;

  expandedIndex: number | null = null;

  feeHeaders: any[] = [];
  feeHeadersGroupedByClass: Map<number, any[]> = new Map();
  calenderMonth: { [key: number]: string } = {
    10: 'Jan', 11: 'Feb', 12: 'Mar', 1: 'Apr', 2: 'May', 3: 'June', 4: 'July',
    5: 'Aug', 6: 'Sep', 7: 'Oct', 8: 'Nov', 9: 'Dec'
  };

  constructor(private _sessionService: SessionService, private _classService: ClassService, private _feestrutureService: FeeHeaderService
    , private _calendarService: CalenderService, private _lockService: LockService) { }

  ngOnInit(): void {
    this.academic_year = this._sessionService.getActiveSession();

    this._lockService.checkStatus(1, this.academic_year).subscribe(
      res => {
        console.log("checkStatus: ", res);
        this.lockStatus = res.is_locked;
      },
      err => {
        console.log("Error: ",err);
      }
    );

    this.getSessionList();
    this.getClassList();
    this.getFeeHeader();
  }

  getSessionList() {
    this._sessionService.getSession().subscribe(
      (response) => {
        this.sessionList = response;
      },
      (error) => {
        console.error("Error in fetching Session", error);
      }
    );
  }

  getClassList() {
    this._classService.getActiveClass().subscribe(
      (response) => {
        this.classList = response;
      },
      (error) => {
        console.error("Error in fetching Class", error);
      }
    );
  }

  getFeeHeader() {
    if (this.class_id == 0) {
      this._feestrutureService.getFeeStruture(this.academic_year,this.class_id).subscribe(   
            (response) => {
              this.feeHeaders = response;
              this.groupFeeHeadersByClass();

            },
            (error) => {
              console.error("Error fetching fee headers", error);
            }
          );
    }
    else {
      this._feestrutureService.getFeeInstallment(this.academic_year, this.class_id).subscribe(
        (response) => {
          this.feeHeaders = response;
          this.groupFeeHeadersByClass();

        },
        (error) => {
          console.error("Error fetching fee headers", error);
        }
      );
    }
    
  }
        
  // Group feeHeaders by class_id 
  groupFeeHeadersByClass() {
    this.feeHeaders.forEach(header => {
      if (!this.feeHeadersGroupedByClass.has(header.class_id)) {
        this.feeHeadersGroupedByClass.set(header.class_id, []);
      }
      this.feeHeadersGroupedByClass.get(header.class_id)!.push(header);
    });
    console.log("this.feeHeaders : ", this.feeHeaders);
  }

  getTotalFee(): number {
    return this.feeHeaders?.reduce((sum: number, header) => sum + (header.total_amount || 0), 0);
  }

  className(): string {
    const classObj = this.classList.find(cls => cls.class_id === this.class_id);
    return classObj ? classObj.class_name : 'N/A';
  }

  bindMonths(index: number): void {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  changeClassId() {
    this.feeHeaders = [];
    this.feeHeadersGroupedByClass = new Map();
    this.getFeeHeader();
  }

  // Access the fee headers directly from the grouped Map
  filteredFeeHeader(cls_id: number): any[] {
    return this.feeHeadersGroupedByClass.get(cls_id) || [];
  }

  UpdateFeeStruture() {
    this._feestrutureService.postFeeInstallment(this.academic_year, this.class_id, this.feeHeaders).subscribe(
      res => {
        this.class_id = 0;
        this.changeClassId();
        console.log("Insert Successfullly! ",res);
      },
      err => {
        console.log("Error : ",err);
      }
    );
  }

  clearFeeStruture() {
    if (confirm("Are you sure to want delete installment for this class")) {
      this._feestrutureService.deleteFeeInstallment(this.academic_year, this.class_id).subscribe(
        res => {
          this.class_id = 0;
          this.changeClassId();
          console.log("Fee struture deleted successfully! ");
        },
        err => {
          console.log("Error is: ", err);
        }
      );
    }
  }

  lockInstallment() {
    if (confirm("If all installments are not created properly, don't press this button.")) {
      const lockData = {
        school_id: "",
        session: this.academic_year,
        locked_by: "",
        lock_type: 1, 
        remarks: 'Locking installment from UI'
      };

      this._lockService.lockInstallment(lockData).subscribe({
        next: (res) => alert(res.message),
        error: (err) => alert("Error while locking: " + err.message)
      });
      
    } 
  }

  installmentChange(event: any, installments: any) {

    if (event.target.checked) {
      const val = installments[0].amount;
      installments.map((m: { amount: any; }) => m.amount = val);
     }
 
  }

  createInstallments() {
    this._lockService.checkStatus(1, this.academic_year).subscribe(
      res => {
        if (res.is_locked) {
          //logic for create student ledger'
          this._feestrutureService.createStudentLedgers(this.academic_year).subscribe(
            succ => alert("Ledger Created successfully!"),
            err => {
              alert("Something went wrong!");
              console.log("Error : ",err);
            }
          );
          
        } else {
          alert("Please firstly create installments!");
        }
      },
      err => {
        console.log("Error: ",err);
      }
    );
  }

}
