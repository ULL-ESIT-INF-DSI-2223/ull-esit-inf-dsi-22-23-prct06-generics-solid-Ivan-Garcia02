import { Media } from './media';

export class Serie extends Media {
  readonly numeroTemporadas: number;
  readonly numeroEpisodiosTotal: number;
  
  /**
   * Constructor de la clase Serie
   * @param nombre Nombre de la multimedia
   * @param año Año de lanzamiento
   * @param director Director
   * @param generos Generos
   * @param numeroTemporadas Numero de temporadas de la serie
   * @param numeroEpisodiosTotal Numero de episodios totales
   */
  constructor(nombre: string,  año: number, director: string, generos: string[], numeroTemporadas: number, numeroEpisodiosTotal: number) {
    super(nombre, año, director, generos);
    this.numeroTemporadas = numeroTemporadas;
    this.numeroEpisodiosTotal = numeroEpisodiosTotal;
  }
}