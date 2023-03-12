export abstract class Media {
  readonly nombre: string;
  readonly año: number;
  readonly director: string;
  readonly generos: string[];

  /**
   * Constructor de la clase abstracta Media
   * @param nombre Nombre de la multimedia
   * @param año Año de lanzamiento
   * @param director Director
   * @param generos Generos
   */
  constructor(nombre: string,  año: number, director: string, generos: string[]) {
    this.nombre = nombre;
    this.año = año;
    this.director = director;
    this.generos = generos;
  }
}