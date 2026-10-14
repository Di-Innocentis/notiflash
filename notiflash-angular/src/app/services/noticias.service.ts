import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Noticia } from '../models/noticia.model';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  private readonly STORAGE_NOTICIAS = 'notiflash_noticias';
  private readonly STORAGE_FAVORITOS = 'notiflash_favoritos';

  private noticiasSubject = new BehaviorSubject<Noticia[]>([]);
  public noticias$ = this.noticiasSubject.asObservable();

  private favoritosSubject = new BehaviorSubject<number[]>([]);
  public favoritos$ = this.favoritosSubject.asObservable();

  constructor(private http: HttpClient) {
    this.cargarFavoritos();
    this.cargarNoticias();
  }

  private cargarFavoritos(): void {
    try {
      const guardados = localStorage.getItem(this.STORAGE_FAVORITOS);
      const favoritos = guardados ? JSON.parse(guardados) : [];
      this.favoritosSubject.next(Array.isArray(favoritos) ? favoritos : []);
    } catch {
      this.favoritosSubject.next([]);
    }
  }

  private cargarNoticias(): void {
    const guardadas = localStorage.getItem(this.STORAGE_NOTICIAS);
    if (guardadas) {
      try {
        const parsed = JSON.parse(guardadas);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.noticiasSubject.next(parsed);
          return;
        }
      } catch {
      }
    }

    this.http.get<Noticia[]>('noticias.json').subscribe({
      next: (data) => {
        this.noticiasSubject.next(data);
        this.guardarEnStorage(data);
      },
      error: () => {
        fetch('noticias.json')
          .then(res => res.json())
          .then(data => {
            this.noticiasSubject.next(data);
            this.guardarEnStorage(data);
          })
          .catch(() => {});
      }
    });
  }

  private guardarEnStorage(noticias: Noticia[]): void {
    localStorage.setItem(this.STORAGE_NOTICIAS, JSON.stringify(noticias));
  }

  getNoticias(): Observable<Noticia[]> {
    return this.noticias$;
  }

  getNoticiaPorId(id: number): Observable<Noticia | undefined> {
    return this.noticias$.pipe(
      map(lista => lista.find(item => item.id === id))
    );
  }

  agregarNoticia(nueva: Omit<Noticia, 'id'>): Noticia {
    const actuales = this.noticiasSubject.value;
    const maxId = actuales.reduce((acc, curr) => (curr.id > acc ? curr.id : acc), 0);
    const noticiaCreada: Noticia = {
      ...nueva,
      id: maxId + 1,
      fecha: nueva.fecha || new Date().toISOString().split('T')[0]
    };

    const actualizadas = [noticiaCreada, ...actuales];
    this.noticiasSubject.next(actualizadas);
    this.guardarEnStorage(actualizadas);
    return noticiaCreada;
  }

  actualizarNoticia(noticiaActualizada: Noticia): void {
    const actuales = this.noticiasSubject.value;
    const actualizadas = actuales.map(item =>
      item.id === noticiaActualizada.id ? { ...noticiaActualizada } : item
    );
    this.noticiasSubject.next(actualizadas);
    this.guardarEnStorage(actualizadas);
  }

  eliminarNoticia(id: number): void {
    const actuales = this.noticiasSubject.value;
    const actualizadas = actuales.filter(item => item.id !== id);
    this.noticiasSubject.next(actualizadas);
    this.guardarEnStorage(actualizadas);

    if (this.esFavorito(id)) {
      this.toggleFavorito(id);
    }
  }

  toggleFavorito(id: number): boolean {
    const favs = [...this.favoritosSubject.value];
    const index = favs.indexOf(id);
    let agregado = false;

    if (index > -1) {
      favs.splice(index, 1);
    } else {
      favs.push(id);
      agregado = true;
    }

    this.favoritosSubject.next(favs);
    localStorage.setItem(this.STORAGE_FAVORITOS, JSON.stringify(favs));
    return agregado;
  }

  esFavorito(id: number): boolean {
    return this.favoritosSubject.value.includes(id);
  }

  getCantidadFavoritos(): Observable<number> {
    return this.favoritos$.pipe(map(favs => favs.length));
  }
}
