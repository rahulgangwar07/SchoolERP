import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExamSettingsService } from '../../../Services/Examination/exam-settings.service';
import { GroupedExamSetDto, exam_set, exam_set_DTOs } from '../../../models/examination';

@Component({
  selector: 'app-define-weightage',
  templateUrl: './define-weightage.component.html',
  styleUrls: ['./define-weightage.component.css']
})
export class DefineWeightageComponent implements OnInit {
  existingWeightagesMap: { [exam_set_id: number]: number } = {};
  groupedSets: GroupedExamSetDto[] = [];
  selectedGroup: GroupedExamSetDto | null = null;

  form: FormGroup;
  loading = false;

  constructor(private examService: ExamSettingsService, private fb: FormBuilder) {
    this.form = this.fb.group({
      common_exam_set_id: [null, Validators.required],
      weightages: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadGroupedExamSets();
  }

  get weightages(): FormArray {
    return this.form.get('weightages') as FormArray;
  }

  loadGroupedExamSets() {
    this.loading = true;
    this.examService.GetExamSets().subscribe(
      res => {
        this.groupedSets = res;
        this.loading = false;
      },
      err => {
        console.error('Failed to fetch grouped exam sets', err);
        this.loading = false;
      }
    );
  }

  loadExistingWeightages(common_exam_set_id: number) {
    this.examService.GetWeightagesByCommonSetId(common_exam_set_id).subscribe(
      res => {
        this.existingWeightagesMap = {};
        res.forEach((w: any) => {
          this.existingWeightagesMap[w.exam_set_id] = w.weightage;
        });

        // Once weightage map ready, repopulate form
        if (this.selectedGroup) {
          this.populateWeightageForm(this.selectedGroup.exam_sets);
        }
      },
      err => {
        console.error('Failed to load existing weightages', err);
      }
    );
  }


  onSelectGroup(common_exam_set: any) {
    const common_exam_set_id = common_exam_set.value ?? 0;
    const group = this.groupedSets.find(g => g.common_exam_set_id == common_exam_set_id);
    if (group) {
      this.selectedGroup = group;
      this.form.patchValue({ common_exam_set_id });
      this.loadExistingWeightages(common_exam_set_id);
    } else {
      this.selectedGroup = null;
      this.weightages.clear();
    }
  }


  populateWeightageForm(examSets: exam_set_DTOs[]) {
    this.weightages.clear();

    examSets.forEach(set => {
      const prefilledWeight = this.existingWeightagesMap[set.exam_set_id] ?? null;

      const group = this.fb.group({
        exam_set_id: [set.exam_set_id, Validators.required],
        exam_title: [set.exam_name?.exam_title || 'N/A'],
        weightage: [prefilledWeight, [Validators.required, Validators.min(0), Validators.max(100)]]
      });

      this.weightages.push(group);
    });
  }


  setSameWeightToAll(val: number) {
    this.weightages.controls.forEach(ctrl => ctrl.get('weightage')?.setValue(val));
  }

  saveWeightages() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = {
      common_exam_set_id: this.form.value.common_exam_set_id,
      weightages: this.form.value.weightages.map((w: any) => ({
        exam_set_id: w.exam_set_id,
        weightage: parseFloat(w.weightage)
      }))
    };

    this.loading = true;
    this.examService.SaveExamWeightage(payload).subscribe(
      res => {
        alert('✅ Weightages saved successfully');
        this.loading = false;
      },
      err => {
        console.error(err);
        alert('❌ Failed to save weightages');
        this.loading = false;
      }
    );
  }
}
