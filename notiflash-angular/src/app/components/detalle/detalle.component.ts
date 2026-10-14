import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Noticia } from '../../models/noticia.model';
import { NoticiasService } from '../../services/noticias.service';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit, OnDestroy {
  noticia?: Noticia;
  noticiasRelacionadas: Noticia[] = [];
  esFavorito: boolean = false;
  cargando: boolean = true;
  parrafos: string[] = [];

  private subRoute?: Subscription;
  private subNoticia?: Subscription;
  private subFavoritos?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private noticiasService: NoticiasService
  ) {}

  ngOnInit(): void {
    this.subRoute = this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      const id = idParam ? parseInt(idParam, 10) : 0;
      this.cargarDetalle(id);
    });

    this.subFavoritos = this.noticiasService.favoritos$.subscribe(() => {
      if (this.noticia) {
        this.esFavorito = this.noticiasService.esFavorito(this.noticia.id);
      }
    });
  }

  ngOnDestroy(): void {
    this.subRoute?.unsubscribe();
    this.subNoticia?.unsubscribe();
    this.subFavoritos?.unsubscribe();
  }

  cargarDetalle(id: number): void {
    this.cargando = true;
    this.subNoticia = this.noticiasService.getNoticias().subscribe(lista => {
      this.noticia = lista.find(item => item.id === id);
      if (this.noticia) {
        this.esFavorito = this.noticiasService.esFavorito(this.noticia.id);
        this.parrafos = this.noticia.contenido.split('\n').filter(p => p.trim().length > 0);
        this.noticiasRelacionadas = lista
          .filter(n => n.id !== id && (n.categoria === this.noticia?.categoria || n.destacada))
          .slice(0, 3);
      }
      this.cargando = false;
    });
  }

  toggleFavorito(): void {
    if (this.noticia) {
      this.esFavorito = this.noticiasService.toggleFavorito(this.noticia.id);
    }
  }
}
