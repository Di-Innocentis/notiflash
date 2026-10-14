import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Noticia } from '../../models/noticia.model';
import { NoticiasService } from '../../services/noticias.service';

@Component({
  selector: 'app-gestionar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './gestionar.component.html',
  styleUrls: ['./gestionar.component.css']
})
export class GestionarComponent implements OnInit, OnDestroy {
  noticias: Noticia[] = [];
  modoEdicion: boolean = false;
  idEnEdicion: number | null = null;
  mensajeExito: string = '';

  categorias: string[] = ['Educación', 'Tecnología', 'Turismo', 'Comercial'];
  imagenesDisponibles: string[] = [
    'img/noticia1.svg',
    'img/noticia2.svg',
    'img/noticia3.svg',
    'img/noticia4.svg',
    'img/noticia5.svg',
    'img/noticia6.svg'
  ];

  formulario: {
    titulo: string;
    categoria: string;
    autor: string;
    fecha: string;
    resumen: string;
    contenido: string;
    imagen: string;
    destacada: boolean;
  } = this.obtenerFormularioVacio();

  private sub?: Subscription;

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit(): void {
    this.sub = this.noticiasService.getNoticias().subscribe(lista => {
      this.noticias = lista;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  obtenerFormularioVacio() {
    return {
      titulo: '',
      categoria: 'Educación',
      autor: 'Redacción NotiFlash',
      fecha: new Date().toISOString().split('T')[0],
      resumen: '',
      contenido: '',
      imagen: 'img/noticia1.svg',
      destacada: false
    };
  }

  esValido(): boolean {
    return (
      this.formulario.titulo.trim().length >= 5 &&
      this.formulario.categoria.trim().length > 0 &&
      this.formulario.autor.trim().length > 0 &&
      this.formulario.resumen.trim().length >= 10 &&
      this.formulario.contenido.trim().length >= 20
    );
  }

  guardar(): void {
    if (!this.esValido()) {
      return;
    }

    if (this.modoEdicion && this.idEnEdicion !== null) {
      const noticiaActualizada: Noticia = {
        id: this.idEnEdicion,
        ...this.formulario
      };
      this.noticiasService.actualizarNoticia(noticiaActualizada);
      this.mensajeExito = 'Noticia actualizada con éxito.';
    } else {
      this.noticiasService.agregarNoticia({ ...this.formulario });
      this.mensajeExito = 'Noticia creada con éxito.';
    }

    this.cancelarEdicion();
    setTimeout(() => {
      this.mensajeExito = '';
    }, 4000);
  }

  iniciarEdicion(noticia: Noticia): void {
    this.modoEdicion = true;
    this.idEnEdicion = noticia.id;
    this.formulario = {
      titulo: noticia.titulo,
      categoria: noticia.categoria,
      autor: noticia.autor,
      fecha: noticia.fecha,
      resumen: noticia.resumen,
      contenido: noticia.contenido,
      imagen: noticia.imagen,
      destacada: noticia.destacada
    };
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelarEdicion(): void {
    this.modoEdicion = false;
    this.idEnEdicion = null;
    this.formulario = this.obtenerFormularioVacio();
  }

  eliminar(id: number): void {
    const confirmacion = window.confirm('¿Seguro que deseas eliminar esta noticia?');
    if (confirmacion) {
      this.noticiasService.eliminarNoticia(id);
      if (this.modoEdicion && this.idEnEdicion === id) {
        this.cancelarEdicion();
      }
      this.mensajeExito = 'Noticia eliminada correctamente.';
      setTimeout(() => {
        this.mensajeExito = '';
      }, 4000);
    }
  }
}
