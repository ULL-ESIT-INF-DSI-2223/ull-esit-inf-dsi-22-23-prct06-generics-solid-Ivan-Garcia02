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

A continuación, creamos las clases concretas `Pelicula`, que heredara de `Media` y añadira los atributos `duracion y actores`: 
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

La clase `Serie`, que heredara de `Media` y añadira los atributos `numeroTemporadas y numeroEpisodiosTotal`: 
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