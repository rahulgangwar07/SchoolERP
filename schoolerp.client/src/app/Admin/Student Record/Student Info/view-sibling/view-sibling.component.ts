import { Component, OnInit } from '@angular/core'; 
import { StudentService } from '../../../../Services/student.service';

@Component({
    selector: 'app-view-sibling',
    templateUrl: './view-sibling.component.html',
    styleUrl: './view-sibling.component.css',
    standalone: false
})
export class ViewSiblingComponent implements OnInit {

  siblingStudent: any[] = [];
  filteredsiblingStudent: any[] = [];
  allfilter: string = "";

  constructor(private _studentService:StudentService ) { }

  ngOnInit() {
    this._studentService.siblingReport().subscribe(
      (success) => {
        this.siblingStudent = success;
        this.filteredsiblingStudent = this.siblingStudent; 
      },
      (error) => {
        console.log("Error found: ", error);
      }
    );
  }


  //filtration through name/father name and registration no
  filterChange() {
    //alert(this.allfilter);
    if (this.allfilter == "") {
      this.filteredsiblingStudent = this.siblingStudent;
    }
    else {
      //logic
      this.filteredsiblingStudent = this.siblingStudent.filter(record => {
        return record.father_name.toLowerCase().includes(this.allfilter.toLowerCase()) ||
          record.students.some((stu: { stu_name: string; }) => stu.stu_name.toLowerCase().includes(this.allfilter.toLowerCase())) ||
          record.students.some((stu: { reg_no: string; }) => stu.reg_no.toLowerCase().includes(this.allfilter.toLowerCase()))
               
      });
    }

  }



  printReport() {
    const print = window.open();
    print?.document.write("<html><head><style>");
    print?.document.write(`
    .table-container {
  margin-top: 20px;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

  table th, table td {
    padding: 15px;
    text-align: left;
    border: 1px solid #ddd;
  }

  table th {
    background-color: #616561;
    color: white;
    font-weight: bold;
  }

  table tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  table tr:hover {
    background-color: #f1f1f1;
  }

  table td {
    font-size: 14px;
    color: #333;
  }

/* Styling for the nested table inside each cell */
.nested-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  background-color: #f9f9f9;
}

  .nested-table td {
    padding: 10px;
    font-size: 12px;
    color: #333;
    border: 1px solid #ddd;
  }

  .nested-table tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  .nested-table tr:hover {
    background-color: #f1f1f1;
  }

    `); 
     
    print?.document.write("</style></head><body><div class='table-container'>");
    const printContent = document.getElementById("alsoPrint");
    if (printContent) {
      print?.document.write(printContent.innerHTML);
    }
    else {
      print?.document.write("No Content avaiable..");
    }

    print?.document.write("</div></body></html>");
    print?.document.close(); 
    print?.print();
    print?.close();
    //window.print();
  }

}
