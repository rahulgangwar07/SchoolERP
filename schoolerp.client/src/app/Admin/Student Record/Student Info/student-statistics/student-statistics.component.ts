import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../../Services/student.service';

 

export interface CategoryData {
  name: string[];
  quantity: number[];
}

export interface CategoryName {
  catName: string; // Name of the category (e.g., general, obc, etc.)
  data: CategoryData; // Category data (boys, girls, total)
}

export interface ClassReport {
  className: string; // Name of the class (e.g., "I", "II", etc.)
  categories: {
    data: CategoryName[]; // Array of CategoryName (one for each category like general, obc, etc.)
  };
  totalStudents: number; // Total students in the class
}

@Component({
    selector: 'app-student-statistics',
    templateUrl: './student-statistics.component.html',
    styleUrls: ['./student-statistics.component.css'],
    standalone: false
})
export class StudentStatisticsComponent implements OnInit {

  studentReportData: any;
  finalRow: any[] = [];
  finalTotal: number = 0;

  //studentReportData: ClassReport[] = [
  //  {
  //    className: "I",
  //    categories: {
  //      data: [
  //        {
  //          catName: 'general',
  //          data: {
  //            name: ['boys', 'girls', 'total'],
  //            quantity: [5, 11, 16]
  //          }
  //        },
  //        { catName: 'obc', data: { name: ['boys', 'girls', 'total'], quantity: [1, 0, 1] } },
  //        { catName: 'sc', data: { name: ['boys', 'girls', 'total'], quantity: [0, 0, 0] } },
  //        { catName: 'st', data: { name: ['boys', 'girls', 'total'], quantity: [0, 0, 0] } },
  //        { catName: 'ebc', data: { name: ['boys', 'girls', 'total'], quantity: [0, 0, 0] } }
  //      ]
  //    },
  //    totalStudents: 17,
  //  },
  //  {
  //    className: "II",
  //    categories: {
  //      data: [
  //        { catName: 'general', data: { name: ['boys', 'girls', 'total'], quantity: [11, 1, 12] } },
  //        { catName: 'obc', data: { name: ['boys', 'girls', 'total'], quantity: [0, 0, 0] } },
  //        { catName: 'sc', data: { name: ['boys', 'girls', 'total'], quantity: [0, 1, 1] } },
  //        { catName: 'st', data: { name: ['boys', 'girls', 'total'], quantity: [0, 0, 0] } },
  //        { catName: 'ebc', data: { name: ['boys', 'girls', 'total'], quantity: [0, 0, 0] } }
  //      ]
  //    },
  //    totalStudents: 13,
  //  },
 
  //];


  constructor(private _studentService: StudentService) { }

  ngOnInit() { 
    this._studentService.staticsReport().subscribe(
      (response) => {
        this.studentReportData = response; 
        let x = 0;
        for (let i = 0; i <= this.getCategories().length - 1; i++) {
          this.finalRow.push(this.getTotalBoys(this.getCategories()[i])); 
          this.finalRow.push(this.getTotalGirls(this.getCategories()[i]));
          const total = this.getTotalTotals(this.getCategories()[i]);
          this.finalRow.push(total);
          this.finalTotal += total;
        }
        console.log("Final Row : ", this.finalRow);
      },
      (error) => {
        console.log("Error is: ",error);
      }
    );

    this.getCategories()
    console.log("ca : ", this.getdata());  
  }
 
  getdata() {
    const val = this.studentReportData.map((res: { categories: { data: any[]; }; }) => res.categories.data.map((res: { data: { quantity: any; }; }) => res.data.quantity));
    const flattened = val.map((classData: any[]) => classData.flat());
    return flattened;
  }

  //getCategories() {
  //  return this.studentReportData[0].categories.data.map((res: { catName: any; }) => res.catName);
  //}

  getCategories() {
    return this.studentReportData[0].categories.data.map((res: { catName: string; }) => res.catName);
  }


  getCategoriesgender() {
    return this.studentReportData[0].categories.data.map((res: { data: { name: any; }; }) => res.data.name).flat();
  }
   
  getTotalBoys(category: any): number {
    let totalBoys = 0;
     
    this.studentReportData.forEach((classData: { categories: { data: any[]; }; }) => {
      const categoryData = classData.categories.data.find((cat: { catName: string; }) => cat.catName === category); 
      if (categoryData) {
        totalBoys += categoryData.data.quantity[0];  
      }
    });

    return totalBoys;
  }

  getTotalGirls(category: string): number {
    let totalGirls = 0;

    this.studentReportData.forEach((classData: { categories: { data: any[]; }; }) => {
      const categoryData = classData.categories.data.find((cat: { catName: string; }) => cat.catName === category);
      if (categoryData) {
        totalGirls += categoryData.data.quantity[1];
      }
    });

    return totalGirls;
  }

  getTotalTotals(category: string): number {
    let totalGirls = 0;

    this.studentReportData.forEach((classData: { categories: { data: any[]; }; }) => {
      const categoryData = classData.categories.data.find((cat: { catName: string; }) => cat.catName === category);
      if (categoryData) {
        totalGirls += categoryData.data.quantity[2];
      }
    });

    return totalGirls;
  }



  printReport() {
    const data = window.open();
    data?.document.write("<html><head><style>");
    data?.document.write(`
    h2 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 30px;
  color: #333;
}

    table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  border-radius: 8px;
  overflow: hidden;
}

th, td {
  padding: 12px;
  text-align: center;
  border: 1px solid #ddd;
  font-size: 13px;
  background-color: #fafafa;
}

th {
  background-color: #8c939b;
  color: white;
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #e0e0e0;
}

td {
  font-size: 14px;
}

.footer {
  text-align: center;
  padding: 20px;
  font-size: 16px;
  color: #777;
  margin-top: 40px;
  background-color: #f9f9f9;
  border-top: 1px solid #ddd;
}

.table-wrapper {
  max-height: 400px; /* Adjust the height as per your need */
  overflow-y: auto; /* Enables vertical scrolling */
  overflow-x: auto; /* Enables horizontal scrolling */
}
.total-row {
  color: #18181e;
  font-weight: 600;
}

    `);
    data?.document.write("</style></head><body><h2>");

    const printhead = document.getElementById("stuCount")?.innerHTML;
    if (printhead)
      data?.document.write(printhead);
    data?.document.write("</h2>");

    const printarea = document.getElementById("staticsReport")?.innerHTML;
    if (printarea) {
      data?.document.write(printarea);
    }
    else {
      data?.document.write("No data avaiable..");
    }

    //data?.document.write("</style></head></body>");
    //data?.document.write("</style></head></body>");
    data?.document.write("</body></html>");
    //const value = document.getElementById();
    data?.print();
    data?.document.close();
  }

}
