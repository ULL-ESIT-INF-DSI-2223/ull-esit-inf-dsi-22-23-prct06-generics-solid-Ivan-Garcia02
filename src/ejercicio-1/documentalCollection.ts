import { BasicStreamableCollection } from "./basicStreamableCollection";
import { Documental } from './documental';

export class DocumentalCollection extends BasicStreamableCollection<Documental> {
  constructor(coleccion: Documental[]) {
    super(coleccion);
  }

  /**
   * Método para añadir elementos a la coleccion
   * @param elemento Elemento a añadir a la coleccion
   */
  añadirElemento(elemento: Documental): Documental[] {
    this.coleccion.push(elemento);
    return this.coleccion;
  }

  /**
   * Método para eliminar elementos de la coleccion
   * @param nombre Elemento a eliminar de la coleccion
   */
  eliminarElemento(nombre: string): Documental | undefined{
    let indice: number = this.coleccion.findIndex((docu) => docu.nombre === nombre);
    if (indice != -1) {
      return this.coleccion.splice(indice, 1)[0];
    }
    return undefined;
  }

  /**
   * Método para buscar los documentales biograficos o no biograficos
   * @param siNo Valor booleano, si quiere buscar los biograficos o los no biograficos
   * @returns una lista con los documentales que cumplen la condicion de busqueda
   */
  buscarPorBiograficos(siNo: boolean) : Documental[] {
    let resultadoBusqueda: Documental[] = [];

    this.coleccion.forEach((docu: Documental) => {
      if (docu.biografico === siNo) {
        resultadoBusqueda.push(docu);
      }
    })

    return resultadoBusqueda;
  }

  /**
   * Método que devuelve los documentales con una duracion X
   * @param tiempo Duracion del documental
   * @returns una lista con los documentales que duran lo indicado en la busqueda
   */
  buscarPorDuracion(tiempo: number) : Documental[] {
    let resultadoBusqueda: Documental[] = [];

    this.coleccion.forEach((docu: Documental) => {
      if (docu.duracion === tiempo) {
        resultadoBusqueda.push(docu);
      }
    })

    return resultadoBusqueda;
  }
}