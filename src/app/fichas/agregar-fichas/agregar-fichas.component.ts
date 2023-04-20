import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FichasService } from '../../services/fichas/fichas.service';
import { Subscription } from 'rxjs';

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
    this.subscription = this.fichasService.refresh$.subscribe(() => {
      window.location.reload();
    });
  }

  guardarFicha() {
    if (this.fichaForm) {
      const ficha = this.fichaForm.value;
      delete ficha.created_at;
      delete ficha.updated_at;
      delete ficha.idficha;

      this.fichasService.saveFicha(ficha).subscribe(
        res => {
          console.log(res);
          alert("La ficha fue creada correctamente")
          this.fichaForm.reset();
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
