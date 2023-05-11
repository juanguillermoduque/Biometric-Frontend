import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuariosService } from '../services/usuarios/usuarios.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit { 

  form!: FormGroup; // primero declaramos la variable form como tipo FormGroup y la inicializamos con un valor undefined

  userId!: string; // lo segundo que la variable userId como tipo string lo inicializamos con un valor undefined

  constructor(
    private formBuilder: FormBuilder, //  reutilizacion de este formbuilder
    private usuarioService: UsuariosService, //  reutilizacion del los servicios del componente usuario
  ) { }

  ngOnInit(): void {
  this.form = this.formBuilder.group({ // llamar el formbuilder para poder accdeder a las validaciones del los formularios
    num_id: new FormControl('', Validators.required),// la confirmacion del numero id le agregariamos el formcontroll
    contrasena: new FormControl('', Validators.required), // la confirmacion de la contraseña
    confirmarContrasena: new FormControl('', Validators.required) // la confirmacion contraseña le agregariamos el form controll
  }, {
    validator: this.checkPasswords
  });
}

  checkPasswords(group: FormGroup) { //Esta funcion de lo que se trata es validar si las contraseñas coinciden o no
    const contrasena = group.get('contrasena')?.value; // Obtenemos el valor de la contraseña del FormGroup
    const confirmarContrasena = group.get('confirmarContrasena')?.value; // Obtenemos el valor de la confirmación de la contraseña del FormGroup

    return contrasena === confirmarContrasena ? null : { noCoincide: true }; // Devolvemos null si las contraseñas coinciden, de lo contrario devolvemos un objeto con la propiedad noCoincide en true
  }
  updatePassword() {
    // Obtenemos el valor del campo num_id del formulario y lo guardamos en una constante llamada 'id'
    const id = this.form.get('num_id')?.value;

    // lo mismo
    const contrasena = this.form.get('contrasena')?.value;

    // Llamamos al método 'updatePassword' del servicio 'UsuariosService' y le pasamos como parámetros el 'id' y 'contrasena'
    this.usuarioService.updatePassword(id, contrasena).subscribe(
      // Si la solicitud councide, que me imprima el resultado por consola
      resultado => {
        console.log(resultado);

      },
      // Si ocurre un error al realizar la solicitud me aparecera error en la consola
      error => {
        console.log(error);
      }
    );
  }

}
