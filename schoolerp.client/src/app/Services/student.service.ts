import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthServiceService } from './AuthServiceService';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiurl = environment.apiUrl + '/Student';
  private studentProfile = environment.apiUrl + '/StudentProfile';
  private apistaticsReport = environment.apiUrl + '/StaticsReport';
  private apimonthlyReport = environment.apiUrl + '/MonthlyReport';
  private apiattendance = environment.apiUrl + '/StudentAttendance'; 
  private apiacademics = environment.apiUrl + '/SAcademic'; 
  private apionlineExam = environment.apiUrl + '/OnlineExamination'; 
  private apistudentExam = environment.apiUrl + '/StudentExam'; 
  //private apiurl = 'https://localhost:7030/api/Student';
  //private studentProfile = 'https://localhost:7030/api/StudentProfile';
  //private apistaticsReport = 'https://localhost:7030/api/StaticsReport';
  //private apimonthlyReport = 'https://localhost:7030/api/MonthlyReport';
  //private apiattendance = 'https://localhost:7030/api/StudentAttendance'; 

  constructor(private http: HttpClient, private _authService: AuthServiceService) { }

  getStudentProfile() {
    const school_id = this._authService.getSchoolID();
    const uid = this._authService.getUserID(); 
    return this.http.get<any>(`${this.studentProfile}/stu-profile?school_id=${school_id}&uid=${uid}`); 
  }

  changeStuPassword(password:string) {
    const school_id = this._authService.getSchoolID();
    const uid = this._authService.getUserID();
    const values = {
      school_id,uid,password
    }
    return this.http.put<any>(`${this.studentProfile}/student-password`,values);
  }
   

  siblingReport() {
    const school_id = this._authService.getSchoolID();
    const isAdmin = this._authService.getUserRole() == "Faculty";
    if (isAdmin) {
      const faculty_id = this._authService.getUserID();
      return this.http.get<any>(`${this.apiurl}/siblingReportforFaculty?school_id=${school_id}&teacherId=${faculty_id}`);
    }
    else {
      return this.http.get<any>(`${this.apiurl}/siblingReport?school_id=${school_id}`)
    }
    
  }

  staticsReport() {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apistaticsReport}/getStaticsReport?school_id=${school_id}`)
  }

  stuMonthlyAttReport(cls_id: number, sec_id: number, startDate: string, endDate: string) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apimonthlyReport}/monthlyReport?school_id=${school_id}&class_id=${cls_id}&sec_id=${sec_id}&sDate=${startDate}&eDate=${endDate}`);
  }

  getStudentList(session: string, clsId: number) {
    const schoolid = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiurl}/get-student-list?schoolId=${schoolid}&session=${session}&classId=${clsId}&secId=0`,);
  }

  getStudentAttendance(class_id: number, sec_id: number, date: string) {
    const school_id = this._authService.getSchoolID(); 
    const dateObj = new Date(date);
     
    // Get the local timezone offset in minutes and adjust the date accordingly
    const localOffset = dateObj.getTimezoneOffset() * 60000;  
    const localDate = new Date(dateObj.getTime() - localOffset); // Adjust the time to local timezone
     
    const formattedDate = localDate.toISOString().split('T')[0]; 

    return this.http.get<any>(`${this.apiattendance}/getAttendanceReport?school_id=${school_id}&class_id=${class_id}&sec_id=${sec_id}&date=${formattedDate}`);
  }



  attendanceGrid(clsId: number, secId: number, date: string) {
    const school_id = this._authService.getSchoolID();
    return this.http.get<any>(`${this.apiattendance}/getStudentAttendance/${clsId}?school_id=${school_id}&sec_id=${secId}&date=${date}`);
  }

  postAttendance(students: any, date: string) {
    const school_id = this._authService.getSchoolID();
    //const requestPayload = {
    //  dTOs: students
    //};
    const val = {
      dTOs: students
    } 
    return this.http.post<any>(`${this.apiattendance}/submitAttendanceData?school_id=${school_id}&date=${date}`, val);
  }

  deleteAttendance(class_id: number, date: string) {
    const school_id = this._authService.getSchoolID();
    const localDate = new Date(date);
    const formattedDate = localDate.getFullYear() + '-'
      + (localDate.getMonth() + 1).toString().padStart(2, '0') + '-'
      + localDate.getDate().toString().padStart(2, '0');

    const httpOptions = {
      school_id: school_id,
      date: formattedDate,
      class_id: class_id.toString(),
    };
    return this.http.delete<any>(`${this.apiattendance}/deleteStudentAttendance`, { body: httpOptions });
  }

  //class Routine
  classRoutine() {
    const school_id = this._authService.getSchoolID();
    const session = this._authService.getSessionID(); 
    const uid = this._authService.getUserID();
    return this.http.get<any>(`${this.apiurl}/classRoutine?school_id=${school_id}&session=${session}&uid=${uid}`)
  }

  //student attendance
  student_Attendance(month: number, year: number) {
    const school_id = this._authService.getSchoolID();
    const session = this._authService.getSessionID();
    const uid = this._authService.getUserID();

    const query = `school_id=${school_id}&session=${session}&uid=${uid}&month=${month}&year=${year}`;

    return this.http.get<any>(`${this.apiurl}/stuAttendanceData?${query}`);

  }
  //student attendance
  getSyllabus(class_id:string,subject_id:string) {
    const school_id = this._authService.getSchoolID(); 

    return this.http.get<any>(`${this.apiacademics}/get-syllabus?school_id=${school_id}&class_id=${class_id}&subject_id=${subject_id}`);

  }
  getOnlineExams() { 
    const params = {
      exam_id: 0,
      class_id: Number(this._authService.getClassId()),
      uid: Number(this._authService.getUserID()),
      school_id: this._authService.getSchoolID(),
      session: this._authService.getSessionID()
    } 
    return this.http.get<any>(`${this.apionlineExam}/get-exams`, { params });
  }
  getOnlineExamInstruction(exam_id:number) { 
    const params = {
      exam_id: exam_id,
      class_id: Number(this._authService.getClassId()),
      uid: Number(this._authService.getUserID()),
      school_id: this._authService.getSchoolID(),
      session: this._authService.getSessionID()
    }
    return this.http.get<any>(`${this.apionlineExam}/get-exam-instruction`, { params });
  }

  
getStudentAllExam(){ 
  const school_id = this._authService.getSchoolID();
  const session = this._authService.getSessionID();
  const uid = this._authService.getUserID();
  return this.http.get<any>(`${this.apistudentExam}/get-all-student-exam?school_id=${school_id}&session=${session}&uid=${uid}`);
}
  
getStudentResult(exam_id:number,stu_exam_id:number,uid:number){ 
  const school_id = this._authService.getSchoolID();
  const session = this._authService.getSessionID();
  return this.http.get<any>(`${this.apistudentExam}/get-student-result?school_id=${school_id}&session=${session}&exam_id=${exam_id}&stu_exam_id=${stu_exam_id}&uid=${uid}`);
}


} 
