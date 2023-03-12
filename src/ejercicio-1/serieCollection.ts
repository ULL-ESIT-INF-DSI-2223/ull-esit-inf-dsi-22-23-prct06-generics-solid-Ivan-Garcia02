import { BasicStreamableCollection } from "./basicStreamableCollection";
import { Serie } from './serie';

export class SerieCollection extends BasicStreamableCollection<Serie> {
  constructor(coleccion: Serie[]) {
    super(coleccion);
  }

  /**
   * Método para añadir elementos a la coleccion
   * @param elemento Elemento a añadir a la coleccion
   */
  añadirElemento(elemento: Serie): Serie[] {
    this.coleccion.push(elemento);
    return this.coleccion;
  }

  /**
   * Método para eliminar elementos de la coleccion
   * @param nombre Elemento a eliminar de la coleccion
   */
  eliminarElemento(nombre: string): Serie | undefined{
    let indice: number = this.coleccion.findIndex((serie) => serie.nombre === nombre);
    if (indice != -1) {
      return this.coleccion.splice(indice, 1)[0];
    }
    return undefined;
  }

  /**
   * Método que busca las series que tenga X temporadas
   * @param temporadas Número de temporadas a buscar
   * @returns una lista con las series que cumplen con la busqueda
   */
  buscarPorNumeroTemporadas(temporadas: number) : Serie[] {
    let resultadoBusqueda: Serie[] = [];

    this.coleccion.forEach((serie: Serie) => {
      if (serie.numeroTemporadas === temporadas) {
        resultadoBusqueda.push(serie);
      }
    })

    return resultadoBusqueda;
  }

  /**
   * Método que busca las series que tengan X episodios
   * @param episodios Número de episodios a buscar
   * @returns una lista con las series que cumplen la busqueda
   */
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