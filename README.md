# Práctica 6 - Clases e interfaces genéricas. Principios SOLID
## Desarrollo de Sistemas Informáticos
> **Nombre:** Iván García González **Correo:** alu0101388786@ull.edu.es

[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct06-generics-solid-Ivan-Garcia02/badge.svg)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct06-generics-solid-Ivan-Garcia02)

## Índice
- [Objetivos](#objetivos-de-la-práctica)
- [Ejercicios propuestos](#ejercicios-propuestos)
  - [Ejercicio 1]()
  - [Ejercicio 2]()
  - [Ejercicio 3]()
- [Ejercicios modificación](#ejercicios-modificación)
  - [Ejercicio 1]()
- [Conclusiones](#conclusiones)
- [Bibliografía](#bibliografía)

## Objetivos de la práctica
En esta práctica vamos a profundizar en los conceptos explicados en clase, sobre clases e interfaces genericas en TypeScript, y los principios SOLID.

## Ejercicios propuestos
### Ejercicio 1 - DSIflix
Para este ejercicio teniamos que diseñar el modelo de datos de una plataforma de video. En esta existiran colecciones de emisiones concretas para los tipo, pelicula, documental y serie. Por ello lo primero que hice fue diseñar estos tipos. Como parte de los atributos de los tres tipos son similares, generé una clase abstracta `Media` que contendra los atributos generales `nombre, año, director y generos`:
```typescript
export abstract class Media {
  readonly nombre: string;
  readonly año: number;
  readonly director: string;
  readonly generos: string[];

  constructor(nombre: string,  año: number, director: string, generos: string[]) {
    this.nombre = nombre;
    this.año = año;
    this.director = director;
    this.generos = generos;
  }
}
```

A continuación, creamos las clases concretas `Pelicula`, que heredará de `Media` y añadira los atributos `duracion y actores`: 
```typescript
export class Pelicula extends Media {
  readonly duracion: number;
  readonly actores: string[];

  /**
   * Constructor de la clase Pelicula
   * @param nombre Nombre de la multimedia
   * @param año Año de lanzamiento
   * @param director Director
   * @param generos Generos
   * @param duracion Duracion de la pelicula
   * @param actores Actores principales de la pelicula
   */
  constructor(nombre: string,  año: number, director: string, generos: string[], duracion: number, actores: string[]) {
    super(nombre, año, director, generos);
    this.duracion = duracion;
    this.actores = actores;
  }
}
```

La clase `Serie`, que heredará de `Media` y añadira los atributos `numeroTemporadas y numeroEpisodiosTotal`: 
```typescript
export class Serie extends Media {
  readonly numeroTemporadas: number;
  readonly numeroEpisodiosTotal: number;
  
  constructor(nombre: string,  año: number, director: string, generos: string[], numeroTemporadas: number, numeroEpisodiosTotal: number) {
    super(nombre, año, director, generos);
    this.numeroTemporadas = numeroTemporadas;
    this.numeroEpisodiosTotal = numeroEpisodiosTotal;
  }
}
```

La clase `Documental`, que heredará de `Media` y añadira los atributos `biografico y duracion`: 
```typescript
export class Documental extends Media {
  readonly biografico: boolean;
  readonly duracion: number;

  constructor(nombre: string,  año: number, director: string, generos: string[], biografico: boolean, duracion: number) {
    super(nombre, año, director, generos);
    this.biografico = biografico;
    this.duracion = duracion;
  }
}
```

Una vez que tenemos ya los tipos de datos a contener en las diferentes colecciones, vamos a definir las interfaces genericas que especifican los métodos con los que deberían contar las colecciones de emisiones. Para ello, y para cumplir con el cuarto principio SOLID, he definido dos interfaces genericas, `StreamableSearchable` que contendra los métodos comunes de busqueda, y `StreamableModify` que contendra los métodos para la modificacion de las colecciones.

```typeScript
export interface StreamableSearchable<T> {
  buscarPorAño(año: number): T[];
  buscarPorNombre(nombre: string): T[];
  buscarPorDirector(nombre: string): T[];
  buscarPorGenero(generos: string): T[];
}
```
```typeScript
export interface StreamableModify<T> {
  añadirElemento(elemento: T): T[];
  eliminarElemento(nombre: string): T | undefined;
}
```

Ahora definimos la clase abstracta `BasicStreamableCollection`, que sera de tipo generico restringido a los tipos `(Serie | Pelicula | Documental)` y que implementara las interfaces genericas `StreamableSearchable<T>` y `StreamableModify<T>`. El unico atributo de esta clase sera la propia colección de elementos de tipo generico `T`.
```typescript
export abstract class BasicStreamableCollection<T extends (Serie | Pelicula | Documental)> implements StreamableSearchable<T>, StreamableModify<T> {
  protected coleccion: T[];

  constructor(coleccion: T[]) {
    this.coleccion = coleccion;
  }
...
```

Ahora, definimos los métodos de la interfaz `StreamableSearchable<T>`, en esta interfaz tenemos cuatro métodos de busqueda, por nombre, año, director y genero. Todos los métodos tienen una implementacion practicamente igual, en el caso de los tres primeros métodos de busqueda, se recorre la coleccion con un bucle `forEach` y para cada elemento si el atributo a buscar coincide con el introducido por parametro, entonces lo añadira a la lista final que retornará.
```typescript
  buscarPorAño(año: number): T[] {
    let resultadoBusqueda: T[] = [];

    this.coleccion.forEach((media: T) => {
      if (media.año === año) {
        resultadoBusqueda.push(media);
      }
    })

    return resultadoBusqueda;
  }

  buscarPorNombre(nombre: string): T[] {
    let resultadoBusqueda: T[] = [];

    this.coleccion.forEach((media: T) => {
      if (media.nombre === nombre) {
        resultadoBusqueda.push(media);
      }
    })

    return resultadoBusqueda;
  }

  buscarPorDirector(nombre: string): T[] {
    let resultadoBusqueda: T[] = [];

    this.coleccion.forEach((media: T) => {
      if (media.director === nombre) {
        resultadoBusqueda.push(media);
      }
    })

    return resultadoBusqueda;
  }
```

En el caso de la cuarta busqueda, por genero será un poco diferente, ya que no buscara aquellos medios que tengan exactamente los mismos generos, sino que desde que exista alguno de los generos, lo incluira como encontrado. Por lo que en la condición del predicado lógico, usaremos el método `find` del *Array.prototype*.
```typescript
  buscarPorGenero(genero: string): T[] {
    let resultadoBusqueda: T[] = [];

    this.coleccion.forEach((media: T) => {
      if (media.generos.find((gener) => gener == genero)) {
        resultadoBusqueda.push(media);
      }
    })

    return resultadoBusqueda;
  }
```

En cuanto a los métodos de la interfaz `StreamableModify`, los he definido como abstractos para que sean implementados en cada colección concreta y no mezclar tipos de media no correspondientes en una coleccion concreta.
```typescript
...
  abstract añadirElemento(elemento: T): T[];
  abstract eliminarElemento(nombre: string): T | undefined;
}
```

Ahora pasamos a implementar las colecciones concretas, empezamos por la de `Peliculas`, `PeliculaCollection`:
```typescript
export class PeliculaCollection extends BasicStreamableCollection<Pelicula> {
  constructor(coleccion: Pelicula[]) {
    super(coleccion);
  }
```

Lo primero que hacemos en todas las clase concretas es definir los metodos abstractos heredados de la clase `BasicStreamableCollection`, `añadirElemento` y `eliminarElemento`. Estos van a ser iguales para todas las clases, lo unico que cambiara serán los tipos de datos a insertar o eliminar. En el caso del `añadirElemento`, se basara en hacer un `push`, y en el caso de `eliminarElemento`, buscara el indice del elemento a eliminar y lo borrara con el método `splice`.
```typescript 
  añadirElemento(elemento: Pelicula): Pelicula[] {
    this.coleccion.push(elemento);
    return this.coleccion;
  }
  
  eliminarElemento(nombre: string): Pelicula | undefined {
    let indice: number = this.coleccion.findIndex((peli) => peli.nombre === nombre);
    if (indice != -1) {
      return this.coleccion.splice(indice, 1)[0];
    }
    return undefined;
  }
```

En esta clase concreta definimos dos nuevos métodos de busqueda, por duración y por actor, cuyas implementaciones son practicamente iguales a las de `busquedaPorAño` y `busquedaPorGeneros` respectivamente.
```typescript
  buscarPorDuracion(tiempo: number) : Pelicula[] {
    let resultadoBusqueda: Pelicula[] = [];

    this.coleccion.forEach((peli: Pelicula) => {
      if (peli.duracion === tiempo) {
        resultadoBusqueda.push(peli);
      }
    })

    return resultadoBusqueda;
  }

  buscarPorActor(actor: string) : Pelicula[] {
    let resultadoBusqueda: Pelicula[] = [];

    this.coleccion.forEach((peli: Pelicula) => {
      if (peli.actores.find((act) => act == actor)) {
        resultadoBusqueda.push(peli);
      }
    })

    return resultadoBusqueda;
  }
}
```

La siguiente clase concreta que implementamos fue, `SerieCollection`, que al igual que `PeliculaCollection`, lo primero que hace es definir los metodos abstractos heredados de la clase `BasicStreamableCollection`, `añadirElemento` y `eliminarElemento`, cuya implementacion es igual a las anteriores clases.
```typescript
export class SerieCollection extends BasicStreamableCollection<Serie> {
  constructor(coleccion: Serie[]) {
    super(coleccion);
  }

  añadirElemento(elemento: Serie): Serie[] {
    this.coleccion.push(elemento);
    return this.coleccion;
  }

  eliminarElemento(nombre: string): Serie | undefined{
    let indice: number = this.coleccion.findIndex((serie) => serie.nombre === nombre);
    if (indice != -1) {
      return this.coleccion.splice(indice, 1)[0];
    }
    return undefined;
  }
```

Al igual que en la anterior clase concreta, definimos dos nuevos métodos de busqueda, por número de temporadas y por número de episodios totales, cuyas implementaciones son practicamente iguales a las de `busquedaPorAño`.
```typescript
  buscarPorNumeroTemporadas(temporadas: number) : Serie[] {
    let resultadoBusqueda: Serie[] = [];

    this.coleccion.forEach((serie: Serie) => {
      if (serie.numeroTemporadas === temporadas) {
        resultadoBusqueda.push(serie);
      }
    })

    return resultadoBusqueda;
  }

  buscarPorEpisodiosTotales(episodios: number) : Serie[] {
    let resultadoBusqueda: Serie[] = [];

    this.coleccion.forEach((serie: Serie) => {
      if (serie.numeroEpisodiosTotal === episodios) {
        resultadoBusqueda.push(serie);
      }
    })

    return resultadoBusqueda;
  }
}
```

La siguiente clase concreta que implementamos fue, `DocumentalCollection`, que al igual que `SerieCollection`, lo primero que hace es definir los metodos abstractos heredados de la clase `BasicStreamableCollection`, `añadirElemento` y `eliminarElemento`, cuya implementacion es igual a las anteriores clases.
```typescript
export class DocumentalCollection extends BasicStreamableCollection<Documental> {
  constructor(coleccion: Documental[]) {
    super(coleccion);
  }

  añadirElemento(elemento: Documental): Documental[] {
    this.coleccion.push(elemento);
    return this.coleccion;
  }

  eliminarElemento(nombre: string): Documental | undefined{
    let indice: number = this.coleccion.findIndex((docu) => docu.nombre === nombre);
    if (indice != -1) {
      return this.coleccion.splice(indice, 1)[0];
    }
    return undefined;
  }
}
```

Al igual que en la anterior clase concreta, definimos dos nuevos métodos de busqueda, por duracion y por si es biografica o no, cuyas implementaciones son practicamente iguales a las de a las busquedas anteriores.
```typescript
  buscarPorBiograficos(siNo: boolean) : Documental[] {
    let resultadoBusqueda: Documental[] = [];

    this.coleccion.forEach((docu: Documental) => {
      if (docu.biografico === siNo) {
        resultadoBusqueda.push(docu);
      }
    })

    return resultadoBusqueda;
  }

  buscarPorDuracion(tiempo: number) : Documental[] {
    let resultadoBusqueda: Documental[] = [];

    this.coleccion.forEach((docu: Documental) => {
      if (docu.duracion === tiempo) {
        resultadoBusqueda.push(docu);
      }
    })

    return resultadoBusqueda;
  }
```