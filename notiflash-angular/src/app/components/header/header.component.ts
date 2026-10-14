import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NoticiasService } from '../../services/noticias.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  menuAbierto: boolean = false;
  terminoBusqueda: string = '';
  cantidadFavoritos: number = 0;
  private sub?: Subscription;

  constructor(
    private router: Router,
    private noticiasService: NoticiasService
  ) {}

  ngOnInit(): void {
    this.sub = this.noticiasService.getCantidadFavoritos().subscribe(total => {
      this.cantidadFavoritos = total;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  toggleMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }

  buscar(): void {
    if (this.terminoBusqueda.trim()) {
      this.router.navigate(['/noticias'], {
        queryParams: { q: this.terminoBusqueda.trim() }
      });
      this.menuAbierto = false;
    }
  }
}
