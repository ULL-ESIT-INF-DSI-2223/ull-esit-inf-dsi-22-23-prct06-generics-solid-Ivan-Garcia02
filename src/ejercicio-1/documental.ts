import { Media } from './media';

export class Documental extends Media {
  readonly biografico: boolean;
  readonly duracion: number;

  /**
   * Contructor de la clase Documental
   * @param nombre Nombre de la multimedia
   * @param año Año de lanzamiento
   * @param director Director
   * @param generos Generos
   * @param biografico Boleano si es o no un documental bibliografico
   * @param duracion Duracion del documental
   */
  constructor(nombre: string,  año: number, director: string, generos: string[], biografico: boolean, duracion: number) {
    super(nombre, año, director, generos);
    this.biografico = biografico;
    this.duracion = duracion;
  }
}