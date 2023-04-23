
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

/*
Este es un componente en Angular que define un formulario de ingreso de información para agregar una "ficha". Se utiliza un
servicio llamado "FichasService" que se encarga de guardar los datos ingresados en una base de datos.

La variable "fichaForm" es una instancia de la clase FormGroup que define los campos del formulario y sus validaciones.

El método "guardarFicha" se encarga de tomar los datos del formulario y enviarlos al servidor para ser guardados en la base de
datos.

La variable "subscription" es una instancia de la clase Subscription que se utiliza para mantener una suscripción activa al
servicio que guarda los datos.

El método "ngOnDestroy" se encarga de cerrar la suscripción al servicio cuando el componente se destruye.
*/
