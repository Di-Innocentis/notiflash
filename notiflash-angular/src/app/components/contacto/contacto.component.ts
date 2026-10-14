import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
  datos = {
    nombre: '',
    correo: '',
    asunto: '',
    mensaje: '',
    aceptaTerminos: false
  };

  mensajeEnviado: boolean = false;
  formularioIntentado: boolean = false;

  validarCorreo(correo: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(correo.trim());
  }

  formularioValido(): boolean {
    return (
      this.datos.nombre.trim().length >= 3 &&
      this.validarCorreo(this.datos.correo) &&
      this.datos.asunto.trim().length >= 3 &&
      this.datos.mensaje.trim().length >= 10 &&
      this.datos.aceptaTerminos
    );
  }

  enviar(): void {
    this.formularioIntentado = true;
    if (this.formularioValido()) {
      this.mensajeEnviado = true;
      this.limpiar();
      this.formularioIntentado = false;
    }
  }

  limpiar(): void {
    this.datos = {
      nombre: '',
      correo: '',
      asunto: '',
      mensaje: '',
      aceptaTerminos: false
    };
  }

  cerrarExito(): void {
    this.mensajeEnviado = false;
  }
}
