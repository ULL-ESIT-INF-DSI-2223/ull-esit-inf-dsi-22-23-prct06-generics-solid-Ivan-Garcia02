import { Media } from './media';

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