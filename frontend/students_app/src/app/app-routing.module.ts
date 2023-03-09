import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentComponent } from './add-student/add-student.component';
import { DeleteStudentComponent } from './delete-student/delete-student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { StudentListComponent } from './list-students/list-students.component';

const routes: Routes = [
  { path: 'students', component: StudentListComponent },
  { path: 'students/add', component: AddStudentComponent },
  { path: 'students/:id/edit', component: EditStudentComponent },
  { path: 'students/:id/delete', component: DeleteStudentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}