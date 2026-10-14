import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Noticia } from '../../models/noticia.model';
import { NoticiasService } from '../../services/noticias.service';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit, OnDestroy {
  noticias: Noticia[] = [];
  noticiasFiltradas: Noticia[] = [];
  favoritosIds: number[] = [];

  categorias: string[] = ['Todas', 'Educación', 'Tecnología', 'Turismo', 'Comercial'];
  categoriaSeleccionada: string = 'Todas';
  terminoBusqueda: string = '';
  orden: string = 'recientes';

  private subNoticias?: Subscription;
  private subFavoritos?: Subscription;
  private subQuery?: Subscription;

  constructor(
    private noticiasService: NoticiasService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subNoticias = this.noticiasService.getNoticias().subscribe(lista => {
      this.noticias = lista;
      this.aplicarFiltros();
    });

    this.subFavoritos = this.noticiasService.favoritos$.subscribe(favs => {
      this.favoritosIds = favs;
    });

    this.subQuery = this.route.queryParams.subscribe(params => {
      if (params['q']) {
        this.terminoBusqueda = params['q'];
      }
      if (params['cat']) {
        this.categoriaSeleccionada = params['cat'];
      }
      this.aplicarFiltros();
    });
  }

  ngOnDestroy(): void {
    this.subNoticias?.unsubscribe();
    this.subFavoritos?.unsubscribe();
    this.subQuery?.unsubscribe();
  }

  seleccionarCategoria(cat: string): void {
    this.categoriaSeleccionada = cat;
    this.aplicarFiltros();
  }

  limpiarFiltros(): void {
    this.categoriaSeleccionada = 'Todas';
    this.terminoBusqueda = '';
    this.orden = 'recientes';
    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    let resultado = [...this.noticias];

    if (this.categoriaSeleccionada !== 'Todas') {
      resultado = resultado.filter(n =>
        n.categoria.toLowerCase() === this.categoriaSeleccionada.toLowerCase()
      );
    }

    if (this.terminoBusqueda.trim()) {
      const q = this.terminoBusqueda.toLowerCase().trim();
      resultado = resultado.filter(n =>
        n.titulo.toLowerCase().includes(q) ||
        n.resumen.toLowerCase().includes(q) ||
        n.categoria.toLowerCase().includes(q) ||
        (n.autor && n.autor.toLowerCase().includes(q))
      );
    }

    if (this.orden === 'recientes') {
      resultado.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
    } else if (this.orden === 'antiguas') {
      resultado.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
    } else if (this.orden === 'titulo') {
      resultado.sort((a, b) => a.titulo.localeCompare(b.titulo));
    }

    this.noticiasFiltradas = resultado;
  }

  esFavorito(id: number): boolean {
    return this.favoritosIds.includes(id);
  }

  toggleFavorito(id: number): void {
    this.noticiasService.toggleFavorito(id);
  }
}
