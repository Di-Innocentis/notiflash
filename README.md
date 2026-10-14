# NotiFlash | Noticias al instante

Portal de noticias interactivo desarrollado para la asignatura de Front End (Politécnico Grancolombiano).

- **Demo en línea (HTML/JS):** https://laurasofiachitiva1-ops.github.io/notiflash
- **Repositorio:** https://github.com/laurasofiachitiva1-ops/notiflash

---

## Integrantes

- Laura Sofía Chitiva Lopez
- María Isabel Valencia Arboleda
- Vittorio Gomez Di Innocentis
- Yully Alexandra Calderón Navarro

**Docente:** John Olarte Ramos  
**Curso:** Front End (Semana 7 - Entrega final)

---

## Entregas del proyecto

### Entrega 1 y 2 (Semana 3 y 5): Prototipo Web y JavaScript Vanilla
- Estructura semántica con HTML5 y diseño responsive mediante CSS3 y Bootstrap 5.
- Navegación entre páginas: Inicio, Noticias, Detalle, Favoritos, Gestionar y Contacto.
- Renderizado dinámico de noticias a partir de `noticias.json` mediante `fetch`.
- Gestión de favoritos y mini CRUD persistido en `localStorage`.
- Validaciones en tiempo real para el formulario de contacto y creación de noticias.

### Entrega 3 (Semana 7 - Entrega final): Implementación en Angular
Implementación de la aplicación Single Page Application (SPA) en Angular (`notiflash-angular/`), estructurada en componentes modulares, servicios reactivos y los cuatro tipos fundamentales de data binding.

---

## Tecnologías utilizadas

- **HTML5** & **CSS3** (Variables CSS, Flexbox, Grid y diseño adaptativo)
- **JavaScript (ES6+)**
- **Bootstrap 5.3**
- **Angular 18** (TypeScript, Componentes Standalone, Enrutamiento SPA, Servicios y RxJS)

---

## Implementación en Angular (`notiflash-angular`)

### Componentes desarrollados

| Componente | Ubicación | Responsabilidad |
|---|---|---|
| `HeaderComponent` | `src/app/components/header/` | Barra superior con logo, enlaces de enrutamiento con `routerLink`, badge dinámico de favoritos y buscador global. |
| `FooterComponent` | `src/app/components/footer/` | Pie de página con secciones, enlaces de contacto, redes sociales e interpolación del año actual. |
| `InicioComponent` | `src/app/components/inicio/` | Pantalla de inicio con carrusel interactivo, noticias destacadas y grilla de artículos recientes. |
| `NoticiasComponent` | `src/app/components/noticias/` | Catálogo completo con buscador en tiempo real, filtro por categorías (Educación, Tecnología, Turismo, Comercial) y ordenación. |
| `DetalleComponent` | `src/app/components/detalle/` | Vista de artículo individual que obtiene el parámetro de ruta `id` mediante `ActivatedRoute` y lista noticias recomendadas. |
| `FavoritosComponent` | `src/app/components/favoritos/` | Listado de noticias guardadas por el usuario, con opción de eliminar individuales o vaciar la colección. |
| `GestionarComponent` | `src/app/components/gestionar/` | Panel administrativo CRUD (crear, editar, listar y eliminar noticias) con vista previa en tiempo real. |
| `ContactoComponent` | `src/app/components/contacto/` | Formulario de contacto con validación de campos, aceptación de términos y mensaje de confirmación. |

### Servicios y modelos

- **`Noticia` (`src/app/models/noticia.model.ts`)**: Interfaz de tipado con los campos requeridos (`id`, `titulo`, `categoria`, `imagen`, `resumen`, `contenido`, `autor`, `fecha`, `destacada`).
- **`NoticiasService` (`src/app/services/noticias.service.ts`)**: Servicio `Injectable` centralizado que administra el estado de las noticias y favoritos a través de `BehaviorSubject`, cargando datos desde `noticias.json` y sincronizándolos en `localStorage`.

---

## Evidencia de los 4 tipos de Data Binding

1. **Interpolación (`{{ }}`)**:
   - Títulos, descripciones, categorías, fechas y autores en las tarjetas de noticias.
   - Cantidad de noticias encontradas en el catálogo: `{{ noticiasFiltradas.length }}`.
   - Conteo de noticias guardadas en el badge del menú: `{{ cantidadFavoritos }}`.
   - Año dinámico en el footer: `© {{ anioActual }} NotiFlash`.

2. **Property Binding (`[ ]`)**:
   - Enlace a rutas dinámicas: `[routerLink]="['/noticia', item.id]"`.
   - Carga dinámica de imágenes y textos alternativos: `[src]="noticia.imagen"` y `[alt]="noticia.titulo"`.
   - Clases CSS condicionales para estados activos: `[class.activo]="esFavorito(item.id)"`, `[class.error]="tituloInput.invalid"`.
   - Control de habilitación del botón de guardar: `[disabled]="!esValido()"`.

3. **Event Binding (`( )`)**:
   - Alternar favoritos desde cualquier tarjeta o vista de detalle: `(click)="toggleFavorito(item.id)"`.
   - Controles de navegación del carrusel: `(click)="siguienteSlide()"` y `(click)="anteriorSlide()"`.
   - Filtrado interactivo por categorías: `(click)="seleccionarCategoria(cat)"`.
   - Envío de formularios: `(ngSubmit)="guardar()"` en gestión y `(ngSubmit)="enviar()"` en contacto.
   - Acciones de edición y eliminación: `(click)="iniciarEdicion(n)"` y `(click)="eliminar(n.id)"`.

4. **Two-way Data Binding (`[( )]`)**:
   - Buscador global y del catálogo con `[(ngModel)]="terminoBusqueda"`.
   - Filtro de categoría con selector desplegable `[(ngModel)]="categoriaSeleccionada"`.
   - Formulario de contacto completo: `[(ngModel)]="datos.nombre"`, `[(ngModel)]="datos.correo"`, `[(ngModel)]="datos.mensaje"`.
   - Formulario CRUD de noticias: `[(ngModel)]="formulario.titulo"`, `[(ngModel)]="formulario.resumen"`, `[(ngModel)]="formulario.destacada"`, actualizando la vista previa en vivo inmediatamente.

---

## Estructura del repositorio

```
notiflash/
├── index.html                   # Portal web Entrega 1 y 2 (GitHub Pages)
├── noticias.html                # Catálogo web
├── detalle.html                 # Detalle de noticia web
├── favoritos.html               # Favoritos web
├── gestionar.html               # Gestión web
├── contacto.html                # Contacto web
├── noticias.json                # Datos iniciales compartidos
├── css/                         # Estilos del portal HTML/CSS
├── js/                          # Lógica JavaScript vanilla
├── img/                         # Gráficos e ilustraciones SVG
└── notiflash-angular/           # Aplicación Angular (Entrega 3)
    ├── src/
    │   ├── app/
    │   │   ├── components/
    │   │   │   ├── header/      # Header con menú y buscador
    │   │   │   ├── footer/      # Footer con año dinámico
    │   │   │   ├── inicio/      # Carrusel y destacados
    │   │   │   ├── noticias/    # Catálogo con filtros reactivos
    │   │   │   ├── detalle/     # Vista individual de noticia
    │   │   │   ├── favoritos/   # Noticias guardadas
    │   │   │   ├── gestionar/   # CRUD completo con vista previa
    │   │   │   └── contacto/    # Formulario validado
    │   │   ├── models/          # Interfaz Noticia
    │   │   ├── services/        # NoticiasService con RxJS
    │   │   ├── app.component.*  # Componente raíz
    │   │   ├── app.config.ts    # Configuración de proveedores (Router, HttpClient)
    │   │   └── app.routes.ts    # Rutas SPA
    │   ├── index.html
    │   ├── main.ts
    │   └── styles.css           # Estilos base
    ├── angular.json
    └── package.json
```

---

## Cómo ejecutar el proyecto

### 1. Ejecutar el portal web vanilla (Entregas 1 y 2)

Puedes abrir `index.html` con un servidor local:

```bash
# Con Python
python -m http.server 8000

# O con npx
npx serve .
```

O visitar la versión en línea en GitHub Pages:  
https://laurasofiachitiva1-ops.github.io/notiflash

### 2. Ejecutar la aplicación en Angular (Entrega 3)

1. Ingresar a la carpeta de Angular:
   ```bash
   cd notiflash-angular
   ```

2. Instalar las dependencias (si es la primera vez):
   ```bash
   npm install
   ```

3. Iniciar el servidor de desarrollo:
   ```bash
   npm start
   ```

4. Abrir en el navegador:
   [http://localhost:4200](http://localhost:4200)

---

## Licencia

Proyecto con fines académicos para el Politécnico Grancolombiano.
