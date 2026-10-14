import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { Noticia } from '../../models/noticia.model';
import { NoticiasService } from '../../services/noticias.service';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit, OnDestroy {
  noticiasFavoritas: Noticia[] = [];
  cargando: boolean = true;

  private sub?: Subscription;

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit(): void {
    this.sub = combineLatest([
      this.noticiasService.getNoticias(),
      this.noticiasService.favoritos$
    ]).subscribe(([todas, favIds]) => {
      this.noticiasFavoritas = todas.filter(item => favIds.includes(item.id));
      this.cargando = false;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  quitarFavorito(id: number): void {
    this.noticiasService.toggleFavorito(id);
  }

  vaciarFavoritos(): void {
    const confirmacion = window.confirm('¿Seguro que deseas eliminar todas las noticias guardadas en favoritos?');
    if (confirmacion) {
      const ids = this.noticiasFavoritas.map(n => n.id);
      ids.forEach(id => this.noticiasService.toggleFavorito(id));
    }
  }
}
