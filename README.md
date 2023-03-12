# Práctica 6 - Clases e interfaces genéricas. Principios SOLID
## Desarrollo de Sistemas Informáticos
> **Nombre:** Iván García González **Correo:** alu0101388786@ull.edu.es

[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct06-generics-solid-Ivan-Garcia02/badge.svg)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct06-generics-solid-Ivan-Garcia02)

## Índice
- [Objetivos](#objetivos-de-la-práctica)
- [Ejercicios propuestos](#ejercicios-propuestos)
  - [Ejercicio 1](#ejercicio-1---dsiflix)
  - [Ejercicio 2](#ejercicio-2---implementación-de-una-lista-y-sus-operaciones)
  - [Ejercicio 3](#ejercicio-3---ampliando-la-biblioteca-musical)
- [Ejercicios modificación](#ejercicio-modificación)
- [Conclusiones](#conclusiones)
- [Bibliografía](#bibliografía)

## Objetivos de la práctica
En esta práctica vamos a profundizar en los conceptos explicados en clase, sobre clases e interfaces genéricas en TypeScript, y los principios SOLID.

## Ejercicios propuestos
### Ejercicio 1 - DSIflix
Para este ejercicio teníamos que diseñar el modelo de datos de una plataforma de video. En esta existirán colecciones de emisiones concretas para los tipos, película, documental y serie. Por ello lo primero que hice fue diseñar estos tipos. Como parte de los atributos de los tres tipos son similares, generé una clase abstracta `Media` que contendrá los atributos generales, `nombre, año, director y generos`:
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

A continuación, creamos las clases concretas `Pelicula`, que heredará de `Media` y añadirá los atributos, `duracion y actores`: 
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

La clase `Serie`, que heredará de `Media` y añadirá los atributos, `numeroTemporadas y numeroEpisodiosTotal`: 
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

La clase `Documental`, que heredará de `Media` y añadirá los atributos, `biografico y duracion`: 
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

Una vez que tenemos ya los tipos de datos a contener en las diferentes colecciones, vamos a definir las interfaces genéricas que especifican los métodos con los que deberían contar las colecciones de emisiones. Para ello, y para cumplir con el cuarto principio SOLID, he definido dos interfaces genéricas, `StreamableSearchable` que contendrá los métodos comunes de búsqueda, y `StreamableModify` que contendrá los métodos para la modificación de las colecciones.

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

Ahora definimos la clase abstracta `BasicStreamableCollection`, que será de tipo génerico restringido a los tipos `(Serie | Pelicula | Documental)` y que implementara las interfaces genéricas `StreamableSearchable<T>` y `StreamableModify<T>`. El único atributo de esta clase será la propia colección de elementos de tipo génerico `T`.
```typescript
export abstract class BasicStreamableCollection<T extends (Serie | Pelicula | Documental)> implements StreamableSearchable<T>, StreamableModify<T> {
  protected coleccion: T[];

  constructor(coleccion: T[]) {
    this.coleccion = coleccion;
  }
...
```

Ahora, definimos los métodos de la interfaz `StreamableSearchable<T>`, en esta interfaz tenemos cuatro métodos de búsqueda, por nombre, año, director y genero. Todos los métodos tienen una implementación prácticamente igual, en el caso de los tres primeros métodos de búsqueda, se recorre la coleccion con un bucle `forEach` y para cada elemento si el atributo a buscar coincide con el introducido por parámetro, entonces lo añadirá a la lista final que retornará.
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

En el caso de la cuarta búsqueda, por genero será un poco diferente, ya que no buscara aquellos medios que tengan exactamente los mismos generos, sino que desde que exista alguno de los generos, lo incluirá como encontrado. Por lo que en la condición del predicado lógico, usaremos el método `find` del *Array.prototype*.
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

Lo primero que hacemos en todas las clases concretas es definir los métodos abstractos heredados de la clase `BasicStreamableCollection`, `añadirElemento` y `eliminarElemento`. Estos van a ser iguales para todas las clases, lo único que cambiara serán los tipos de datos a insertar o eliminar. En el caso del `añadirElemento`, se basará en hacer un `push`, y en el caso de `eliminarElemento`, buscara el indice del elemento a eliminar y lo borrara con el método `splice`.
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

En esta clase concreta definimos dos nuevos métodos de búsqueda, por duración y por actor, cuyas implementaciones son prácticamente iguales a las de `busquedaPorAño` y `busquedaPorGeneros` respectivamente.
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

La siguiente clase concreta que implementamos fue, `SerieCollection`, que al igual que `PeliculaCollection`, lo primero que hace es definir los métodos abstractos heredados de la clase `BasicStreamableCollection`, `añadirElemento` y `eliminarElemento`, cuya implementación es igual a las anteriores clases.
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

Al igual que en la anterior clase concreta, definimos dos nuevos métodos de búsqueda, por número de temporadas y por número de episodios totales, cuyas implementaciones son prácticamente iguales a las de `busquedaPorAño`.
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

La siguiente clase concreta que implementamos fue, `DocumentalCollection`, que al igual que `SerieCollection`, lo primero que hace es definir los métodos abstractos heredados de la clase `BasicStreamableCollection`, `añadirElemento` y `eliminarElemento`, cuya implementación es igual a las anteriores clases.
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

Al igual que en la anterior clase concreta, definimos dos nuevos métodos de búsqueda, por duracion y por si es biografica o no, cuyas implementaciones son prácticamente iguales a las de a las búsquedas anteriores.
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


### Ejercicio 2 - Implementación de una lista y sus operaciones
Para este ejercicio hemos implementado una clase generica `Lista<T>`, que modela una lista de elementos de cualquier tipo, para ello los atributos de la clase serán, `lista` que tendrá los elemento de tipo T, y `tamaño` que será el tamaño del array, que obtendremos con el uso de el método `length`, esta es la única vez que usaremos un método de *Array.prototype*, ya que no vi otra forma de averiguar el tamaño, ya que si usamos, mientras no sea *undefined*, puede existir la posibilidad de que un elemento de dentro sea *undefined*.
```typescript
export class Lista<T> {
  private _lista: T[];
  private _tamaño: number;

  constructor(lista: T[]) {
    this._lista = lista;
    this._tamaño = lista.length; // Hacemos uso de length, ya que anque hagamos un bucle while not undefined, podria contener un undefined.
  }

  /** Getter del atributo lista */
  get lista() {
    return this._lista;
  }
  /** Setter del atributo lista, que obtiene tambien el tamaño */
  set lista(lista: T[]) {
    this._lista = lista;
    this._tamaño = lista.length;
  }

  /** Getter del tamaño */
  get tamaño() {
    return this._tamaño;
  }
```

El primer método que implementamos es `append` que recibe añadirá al final de la lista que lo llame, una segunda lista que se pasa por parámetro. 
Para ello se va al final de la primera lista y añade con el operador `[]` individualmente todos los elementos de la otra lista.
```typescript
  append(segundaLista: Lista<T>) {
    for (let i = this.tamaño, j = 0; j < segundaLista.tamaño; i++, j++) {
      this.lista[i] = segundaLista.lista[j];
    }

    this._tamaño += segundaLista.tamaño;
  }
```

El segundo método `concatenate`, concatena la lista con la que el método es llamada + un número variable de listas pasadas por parámetro.
Para ello inserta individualmente los elementos de la lista que lo llama, y a continuación al final de la lista que resulta vamos añadiendo todas las listas una por una, añadiendo sus elementos uno por uno con el operador `[]`.
```typescript
  concatenate(...lists: Lista<T>[]) {
    let conjListas: T[] = [];
    for (let i = 0; i < this._tamaño; i++) {
      conjListas[i] = this._lista[i];
    }

    for (let i = 0, k = this._tamaño; i < lists.length; i++) {
      for (let j = 0; j < lists[i].tamaño; j++, k++) {
        conjListas[k] = lists[i].lista[j];
      }
    }

    return new Lista<T>(conjListas);
  }
```

El tercer método `filter`, a partir de una lista y un predicado lógico, si se cumple el predicado se añade a una nueva lista los elementos que cumplen la condición. 
Para ello, pasamos por parámetro un *callback*, correspondiente al predicado lógico a cumplir. Y en un bucle, cuando se cumpla la condición del predicado lógico, añadimos el elemento a una nueva lista con el operador `[]`.
```typescript
  filter(predicado: (elemento: T) => boolean) {
    let nuevaLista: T[] = [];

    for (let i = 0, k = 0; i < this._tamaño; i++) {
      if (predicado(this._lista[i])) {
        nuevaLista[k] = this._lista[i];
        k++;
      }
    } 

    return new Lista<T>(nuevaLista);
  }
```

El cuarto método `length`, devuelve el número de elementos de la lista. Para ello retorna el atributo de la clase `_tamallo`.
```typescript
  length() {
    return this._tamaño;
  }
```

El quinto método `map`, modifica una lista según una función recibida por parámetro. 
Para ello, pasamos por parámetro un *callback*, correspondiente a la función modificadora. Y en un bucle, llamamos a la función con cada elemento y vamos añadimos el elemento a una nueva lista con el operador `[]`.
```typescript
  map(funcion: (elemento: T) => T) {
    let nuevaLista: T[] = [];

    for (let i = 0; i < this._tamaño; i++) {
      nuevaLista[i] = funcion(this._lista[i]);
    } 

    return new Lista<T>(nuevaLista);
  }
```

El sexto método `reduce`, reduce cada elemento de la lista al acumulador utilizando una función.
Para ello, pasamos por parámetro un *callback*, correspondiente a la función acumuladora, y un valor acumulador inicial. En un bucle para cada elemento, igualamos el acumulador al valor que retorna la función con el valor actual del acumulador.
```typescript
  reduce(acumulador: T, funcion: (acumulador: T, elemento: T) => T) {
    for (let i = 0; i < this._tamaño; i++) {
      acumulador = funcion(acumulador, this._lista[i]);
    } 

    return acumulador;
  }
```

El séptimo método `reverse` retorna una lista con los elementos originales en orden inverso.
Para ello recorremos la lista en orden inverso y vamos añadiendo elemento a elemento en una nueva lista con el operador `[]`.
```typescript
  reverse() {
    let nuevaLista: T[] = [];

    for (let i = this.tamaño - 1, k = 0; i >= 0; i--, k++) {
      nuevaLista[k] = this._lista[i];
    } 

    return new Lista<T>(nuevaLista);
  }
```

El último método `forEach`, permite iterar entre los elementos de la lista y realizar la función pasada por parámetro a cada elemento. 
Para ello, pasamos por parámetro un *callback*, correspondiente a la función a realizar. Y en un bucle, llamamos a la función con cada elemento.
```typescript
  forEach(funcion: (elemento: T, index: number) => void) {
    for (let i = 0; i < this._tamaño; i++) {
      funcion(this._lista[i], i);
    } 
  }
}
```

### Ejercicio 3 - Ampliando la biblioteca musical
Por problemas de tiempo no he podido realizar la implementación de este ejercicio.

## Ejercicio Modificación
