import { StreamableSearchable } from "./streamableSearchable";
import { StreamableModify } from "./streamableModify";
import { Pelicula } from './pelicula';
import { Serie } from './serie';
import { Documental } from './documental';

export abstract class BasicStreamableCollection<T extends (Serie | Pelicula | Documental)> implements StreamableSearchable<T>, StreamableModify<T> {
  protected coleccion: T[];

  constructor(coleccion: T[]) {
    this.coleccion = coleccion;
  }

  /**
   * Método que busca los medios que coincidan con el año de busqueda
   * @param año Año de busqueda
   * @returns una lista con los elementos que coinciden con la busqueda
   */
  buscarPorAño(año: number): T[] {
    let resultadoBusqueda: T[] = [];

    this.coleccion.forEach((media: T) => {
      if (media.año === año) {
        resultadoBusqueda.push(media);
      }
    })

    return resultadoBusqueda;
  }

  /**
   * Método que busca los medios que coincidan con el nombre de la busqueda
   * @param nombre Nombre de busqueda
   * @returns una lista con los elementos que coinciden con la busqueda
   */
  buscarPorNombre(nombre: string): T[] {
    let resultadoBusqueda: T[] = [];

    this.coleccion.forEach((media: T) => {
      if (media.nombre === nombre) {
        resultadoBusqueda.push(media);
      }
    })

    return resultadoBusqueda;
  }

  /**
   * Método que busca los medios que coincidan con el nombre del director
   * @param nombre Nombre del director
   * @returns una lista con los elementos que coinciden con la busqueda
   */
  buscarPorDirector(nombre: string): T[] {
    let resultadoBusqueda: T[] = [];

    this.coleccion.forEach((media: T) => {
      if (media.director === nombre) {
        resultadoBusqueda.push(media);
      }
    })

    return resultadoBusqueda;
  }

  /**
   * Método que busca los medios que coincidan con los generos de la busqueda
   * @param generos Generos del medio
   * @returns una lista con los elementos que coinciden con la busqueda
   */
  buscarPorGenero(genero: string): T[] {
    let resultadoBusqueda: T[] = [];

    this.coleccion.forEach((media: T) => {
      if (media.generos.find((gener) => gener == genero)) {
        resultadoBusqueda.push(media);
      }
    })

    return resultadoBusqueda;
  }

  /**
   * Método para añadir elementos a la coleccion
   * @param elemento Elemento a añadir a la coleccion
   */
  abstract añadirElemento(elemento: T): T[];

  /**
   * Método para eliminar elementos de la coleccion
   * @param elemento Elemento a eliminar de la coleccion
   */
  abstract eliminarElemento(nombre: string): T | undefined;
}