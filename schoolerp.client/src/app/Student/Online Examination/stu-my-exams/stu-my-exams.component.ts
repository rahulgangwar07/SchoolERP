import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../Services/student.service';
import { SubjectsService } from '../../../Services/subjects.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stu-my-exams',
  templateUrl: './stu-my-exams.component.html',
  styleUrl: './stu-my-exams.component.css'
})
export class StuMyExamsComponent implements OnInit {

  examList: any;
  studentExam: any;
  subjectList: any;
  constructor(private _studentService: StudentService, private _subjectService: SubjectsService, private router: Router) {

  }

  ngOnInit() {
    this.bindOnlineExam();
    this.bindSubjectList();
    this.bindStudentAllExam(); 
  }

  bindOnlineExam() {
    this._studentService.getOnlineExams().subscribe(
      (exams) => {
        this.examList = exams; 
      },
      (error) => {
        console.log("Error in getOnline Exam: ", error);
      }
    );
  }

  bindSubjectList() {
    this._subjectService.getSubjects().subscribe(
      (subjects) => {
        this.subjectList = subjects; 
      },
      (error) => {
        console.log("Error in Subejct Fetching: ", error);
      } 
    );
  }

  bindStudentAllExam() {
    this._studentService.getStudentAllExam().subscribe(
      (response) => {
        this.studentExam = response; 
      },
      (error) => {
        console.log("Error in student exams: ", error);
      }
    );
  }

  subjectName(subj_id: number) { 
    return this.subjectList.find((s: { subject_id: number; }) => s.subject_id == subj_id).subject_name ?? "";
  }

  onlineExam(exam_id: number) {
    const exam = this.studentExam.find((exam: { exam_id: number; }) => exam.exam_id == exam_id);
    if (exam.status == "Pending") {
      this.router.navigate(['s/instructions/onlineexam', exam_id]);
    } else {
      this.router.navigate(['s/saveanswer', exam_id, 'onlineexam', exam.student_exam_id]);
    } 
  }
  examStatus(exam_id: number) {
    const exam = this.studentExam.find((exam: { exam_id: number; }) => exam.exam_id == exam_id);
    return exam.status;
  }

}
