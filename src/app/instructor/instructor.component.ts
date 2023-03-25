import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css']
})
export class InstructorComponent {

  constructor(private router: Router) {}

  regresar() {
    this.router.navigateByUrl('/auth');
  }

}




