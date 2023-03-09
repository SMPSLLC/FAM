import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../student.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-delete-student',
  templateUrl: './delete-student.component.html',
  styleUrls: ['./delete-student.component.css']
})
export class DeleteStudentComponent implements OnInit {
  id!: number;
  student!: Student;

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.studentService.getStudent(this.id).subscribe(student => {
      this.student = student;
    });
  }

  onDelete(): void {
    this.studentService.deleteStudent(this.id).subscribe(() => {
      this.router.navigate(['/students']);
    });
  }
}