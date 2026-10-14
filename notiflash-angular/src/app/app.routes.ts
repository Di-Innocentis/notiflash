import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { DetalleComponent } from './components/detalle/detalle.component';
import { FavoritosComponent } from './components/favoritos/favoritos.component';
import { GestionarComponent } from './components/gestionar/gestionar.component';
import { ContactoComponent } from './components/contacto/contacto.component';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'noticias', component: NoticiasComponent },
  { path: 'noticia/:id', component: DetalleComponent },
  { path: 'favoritos', component: FavoritosComponent },
  { path: 'gestionar', component: GestionarComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: '**', redirectTo: 'inicio' }
];
