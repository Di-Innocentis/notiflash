import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Noticia } from '../../models/noticia.model';
import { NoticiasService } from '../../services/noticias.service';

interface Slide {
  imagen: string;
  titulo: string;
  descripcion: string;
}

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit, OnDestroy {
  slides: Slide[] = [
    {
      imagen: 'img/slide1.svg',
      titulo: 'NotiFlash: Noticias al instante',
      descripcion: 'Infórmate con los hechos más relevantes del momento.'
    },
    {
      imagen: 'img/slide2.svg',
      titulo: 'Cobertura en múltiples secciones',
      descripcion: 'Educación, Tecnología, Turismo y Comercio en un solo lugar.'
    },
    {
      imagen: 'img/slide3.svg',
      titulo: 'Personaliza tus lecturas',
      descripcion: 'Guarda tus noticias favoritas para leerlas cuando quieras.'
    }
  ];

  slideActual: number = 0;
  slideTimer: any;

  noticias: Noticia[] = [];
  noticiasDestacadas: Noticia[] = [];
  noticiasRecientes: Noticia[] = [];
  favoritosIds: number[] = [];

  private subNoticias?: Subscription;
  private subFavoritos?: Subscription;

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit(): void {
    this.iniciarSliderAutomatico();

    this.subNoticias = this.noticiasService.getNoticias().subscribe(lista => {
      this.noticias = lista;
      this.noticiasDestacadas = lista.filter(n => n.destacada);
      this.noticiasRecientes = lista.slice(0, 6);
    });

    this.subFavoritos = this.noticiasService.favoritos$.subscribe(favs => {
      this.favoritosIds = favs;
    });
  }

  ngOnDestroy(): void {
    if (this.slideTimer) {
      clearInterval(this.slideTimer);
    }
    this.subNoticias?.unsubscribe();
    this.subFavoritos?.unsubscribe();
  }

  iniciarSliderAutomatico(): void {
    this.slideTimer = setInterval(() => {
      this.siguienteSlide();
    }, 4500);
  }

  siguienteSlide(): void {
    this.slideActual = (this.slideActual + 1) % this.slides.length;
  }

  anteriorSlide(): void {
    this.slideActual = (this.slideActual - 1 + this.slides.length) % this.slides.length;
  }

  irASlide(index: number): void {
    this.slideActual = index;
  }

  esFavorito(id: number): boolean {
    return this.favoritosIds.includes(id);
  }

  toggleFavorito(id: number): void {
    this.noticiasService.toggleFavorito(id);
  }
}
