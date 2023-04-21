
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FichasService } from 'src/app/services/fichas/fichas.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-agregar-fichas',
  templateUrl: './agregar-fichas.component.html',
  styleUrls: ['./agregar-fichas.component.css']
})
export class AgregarFichasComponent implements OnInit {

  fichaForm: FormGroup;
  subscription: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private fichasService: FichasService,
  ) {
    this.fichaForm = this.formBuilder.group({
      code_ficha: ['', Validators.required],
      name_ficha: ['', Validators.required],
      trimester: ['', Validators.required],
      num_Students: ['', Validators.required],
      jornada: ['', Validators.required],
      date_start: ['', Validators.required],
      date_end: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  guardarFicha(): void {
    const ficha = this.fichaForm.value;
    this.subscription = this.fichasService.saveFicha(ficha).subscribe(
      res => {
        console.log(res);
        this.fichaForm.reset();
        alert("ficha creada")
      },
      err => console.error(err)
    );
}

  ngOnDestroy() {
    if (this.subscription) {
      console.log("cerrar sesión")
      this.subscription.unsubscribe();
    }
  }
}
