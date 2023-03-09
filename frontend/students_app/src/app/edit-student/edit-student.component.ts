import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../student.service';
import { Student } from '../student.model';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
  id!: number;
  student!: Student;
  studentForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.studentForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
    this.id = this.route.snapshot.params['id'];
    this.studentService.getStudent(this.id).subscribe(student => {
      this.student = student;
      this.studentForm.patchValue(student);
    });
  }

  onSubmit(): void {
    const student: Student = this.studentForm.value;
    this.studentService.updateStudent(this.id, student).subscribe(() => {
      this.router.navigate(['/students']);
    });
  }
}