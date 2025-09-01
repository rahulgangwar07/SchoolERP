import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { GroupedExamSetDto, exam_set_DTOs } from '../../../models/examination';
import { ExamSettingsService } from '../../../Services/Examination/exam-settings.service';

@Component({
  selector: 'app-define-max-min',
  templateUrl: './define-max-min.component.html',
  styleUrl: './define-max-min.component.css'
})
export class DefineMaxMinComponent implements OnInit {

  groupedSets: GroupedExamSetDto[] = [];
  selectedGroup: GroupedExamSetDto | null = null;

  form: FormGroup;
  loading: boolean = false;

  constructor(private examService: ExamSettingsService, private fb: FormBuilder) {
    this.form = this.fb.group({
      common_exam_set_id: ['', Validators.required],
      maxMins: this.fb.array([])
    });
  }


  ngOnInit() {
    this.loadGroupedExamSets();
  }

  loadGroupedExamSets() {
    this.loading = true;
    this.examService.GetExamSets().subscribe(
      res => {
        console.log("Grouped Response: ", res);
        this.groupedSets = res;
        this.loading = false;
      },
      err => {
        console.log("Errorr in selected Group: ", err); this.loading = false;
      }
    );
  }

  get maxMins(): FormArray{
    return this.form.get('maxMins') as FormArray;
  }

  onSelectGroup(common_exam_set: any) {
    const val = common_exam_set.value ?? 0;
    const group = this.groupedSets.find(gs => gs.common_exam_set_id == val); 
    if (group) {
      this.selectedGroup = group;
      this.form.patchValue({ common_exam_set });
      this.populateMaxMinForm(group.exam_sets);
    } else {
      this.selectedGroup = null;
      this.maxMins.clear();
    }

  }

  populateMaxMinForm(examSets: exam_set_DTOs[]) {
    this.maxMins.clear(); 
    examSets.forEach(set => {
      const group = this.fb.group({
        exam_set_id: [set.exam_set_id, Validators.required],
        exam_title: [set.exam_name?.exam_title || 'N/A'],
        max_marks: [null, [Validators.required, Validators.min(0)]],
        min_marks: [null, [Validators.required, Validators.min(0)]]
      });
      this.maxMins.push(group);
    });
  }

  saveMaxMins() {
    debugger;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    } 

      const payload = {
        common_exam_set_id: this.form.value.common_exam_set_id,
        maxMinList: this.form.value.maxMins.map((mm: any) => ({
          exam_set_id: mm.exam_set_id,
          max_marks: parseInt(mm.max_marks),
          min_marks: parseInt(mm.min_marks)
        }))
      }; 

    console.log("This payload: ", payload);

    this.loading = true;
    this.examService.SaveMaxMinMarks(payload).subscribe(
      res => {
        alert('✅ Max/Min Marks saved successfully');
        this.loading = false;
      },
      err => {
        console.log(err);
        alert('❌ Failed to save Max/Min Marks');
        this.loading = false;
      }
    );


  }
   

  //  this.loading = true;
  //  this.examService.SaveMaxMinMarks(payload).subscribe(
  //    res => {
  //      alert('✅ Max/Min Marks saved successfully');
  //      this.loading = false;
  //    },
  //    err => {
  //      console.error(err);
  //      alert('❌ Failed to save Max/Min Marks');
  //      this.loading = false;
  //    }
  //  );
  //}
}
