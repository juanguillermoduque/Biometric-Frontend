
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FichasService } from '../../services/fichas/fichas.service';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-agregar-fichas',
  templateUrl: './agregar-fichas.component.html',
  styleUrls: ['./agregar-fichas.component.css']
})
export class AgregarFichasComponent implements OnInit, OnDestroy {
  fichaForm: FormGroup;
  subscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private fichasService: FichasService
  ) {
    this.fichaForm = this.fb.group({
      code_ficha: ['', Validators.required],
      name_ficha: ['', Validators.required],
      trimester: ['', Validators.required],
      jornada: ['', Validators.required],
      date_start: ['', Validators.required],
      date_end: ['', Validators.required],
      num_Students: ['', Validators.required],
    });
    this.subscription = new Subscription(); // asignación de valor inicial
  }

  ngOnInit(): void {
  }

  guardarFicha() {
    if (this.fichaForm) {
      const ficha = this.fichaForm.value;
      delete ficha.created_at;
      delete ficha.updated_at;
      delete ficha.idficha;

      this.subscription = this.fichasService.saveFicha(ficha)
      .pipe(
        tap(() => {
          alert('Ficha guardada exitosamente');
          location.reload();
        })
      )
        .subscribe(
          res => {
            console.log(res);
          },
          err => console.error(err)
        );
    } else {
      console.error('Error: fichaForm no está definido');
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      console.log("cerra sesion")
      this.subscription.unsubscribe();
    }
  }
}
