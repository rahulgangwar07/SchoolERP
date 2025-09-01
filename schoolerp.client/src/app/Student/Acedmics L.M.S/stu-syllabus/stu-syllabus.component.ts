import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../Services/student.service';
import { AuthServiceService } from '../../../Services/AuthServiceService';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stu-syllabus',
  templateUrl: './stu-syllabus.component.html',
  styleUrls: ['./stu-syllabus.component.css']
})
export class StuSyllabusComponent implements OnInit {
  // Properties
  class_id: string = "0";
  subject_id: string = "0";
  subject_name: string = "0";
  syllabus: any = [];

  // Grouped syllabus by chapter
  groupedSyllabus: { [chapter_id: number]: { chapter_name: string; topics: any[] } } = {};

  constructor(
    private _studentService: StudentService,
    private route: ActivatedRoute,
    private _authService: AuthServiceService
  ) { }

  ngOnInit() {
    // Fetch class_id and subject_id from the route or service
    this.class_id = this._authService.getClassId();
    this.subject_id = this.route.snapshot.paramMap.get('subject_id') ?? "0";
    this.subject_name = this.route.snapshot.paramMap.get('subject_name') ?? "";

    // Fetch syllabus data from the service
    this._studentService.getSyllabus(this.class_id, this.subject_id).subscribe(
      (response) => {
        this.syllabus = response;

        // Group the syllabus by chapter_id
        this.groupedSyllabus = this.groupByChapter(this.syllabus);
        console.log("Grouped Syllabus: ", this.groupedSyllabus);
      },
      (error) => {
        console.log("Error: ", error);
      }
    );
  }

  groupByChapter(syllabus: any) {
    return syllabus.reduce((grouped: { [chapter_id: number]: { chapter_name: string; topics: any[] } }, item: any) => {
      const chapterId = item.chapter_id;
      if (!grouped[chapterId]) {
        grouped[chapterId] = {
          chapter_name: item.chapter_name,
          topics: [],
        };
      }

      // Add the topic to the chapter's topic list
      grouped[chapterId].topics.push({
        syllabus_id: item.syllabus_id,
        topic_name: item.topic_name,
        document: item.document,
        document_type: item.document_type,
      });

      return grouped;
    }, {});
  }
}
