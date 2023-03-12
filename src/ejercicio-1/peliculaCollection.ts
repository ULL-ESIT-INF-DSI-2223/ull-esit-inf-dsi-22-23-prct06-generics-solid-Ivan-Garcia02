import { BasicStreamableCollection } from "./basicStreamableCollection";
import { Pelicula } from './pelicula';

export class PeliculaCollection extends BasicStreamableCollection<Pelicula> {
  /**
   * Constructor de la clase Peliculas
   * @param coleccion Coleccion de peliculas
   */
  constructor(coleccion: Pelicula[]) {
    super(coleccion);
  }

  /**
   * Método para añadir elementos a la coleccion
   * @param elemento Elemento a añadir a la coleccion
   */
  añadirElemento(elemento: Pelicula): Pelicula[] {
    this.coleccion.push(elemento);
    return this.coleccion;
  }
  
  /**
   * Método para eliminar elementos de la coleccion
   * @param nombre Elemento a eliminar de la coleccion
   */
  eliminarElemento(nombre: string): Pelicula | undefined {
    let indice: number = this.coleccion.findIndex((peli) => peli.nombre === nombre);
    if (indice != -1) {
      return this.coleccion.splice(indice, 1)[0];
    }
    return undefined;
  }

  /**
   * Método que devuelve las peliculas con una duracion indicada a la por parametro
   * @param tiempo Duracion de la pelicula
   * @returns una lista con las pelis que duran lo indicado en la busqueda
   */
  buscarPorDuracion(tiempo: number) : Pelicula[] {
    let resultadoBusqueda: Pelicula[] = [];

    this.coleccion.forEach((peli: Pelicula) => {
      if (peli.duracion === tiempo) {
        resultadoBusqueda.push(peli);
      }
    })

    return resultadoBusqueda;
  }

  /**
   * Método que devuelve las peliculas con el actor/actriz indicada por parametro
   * @param actor Actor/actriz a buscar 
   * @returns una lista con las pelis con el/la actor/atriz indicado/a en la busqueda
   */
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

let peli1 = new Pelicula('jota', 1568, 'spliege', ['miedo', "gracia"], 120, ['brad']);
let peli2 = new Pelicula('kala', 1568, 'spliege', ['terror'], 120, ['brad']);
let coleccion = new PeliculaCollection([peli1, peli2]);
//console.log(coleccion.buscarPorAño(1568));
//console.log(coleccion.buscarPorGenero('miedo'));
//console.log(coleccion.buscarPorNombre('kala'));
//console.log(coleccion.buscarPorDirector('spliege'));

/*coleccion.añadirElemento(peli1);
console.log(coleccion);*/

//console.log(coleccion.eliminarElemento('jota'));
//console.log(coleccion.buscarPorActores('brad'));