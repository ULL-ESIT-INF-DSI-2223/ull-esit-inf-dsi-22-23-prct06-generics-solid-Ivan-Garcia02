/*
La segunda deberá modelar una colección de cadenas de caracteres en la que el método search deberá poder 
buscar una subcadena y devolverá un array con todas las cadenas de la colección que contengan dicha subcadena.*/
import { SearchableCollection } from "./searchableCollection";

export class StringSearchableCollection extends SearchableCollection<string> {
  /**
   * Constructor de la clase NumericSearchableCollection
   * @param collection Coleccion de elementos de tipo string
   */
  constructor(collection: string[]) {
    super(collection);
  }

  /**
   * Método que recibe un elemento de tipo <T> y busca si esta en la coleccion
   * @param item Elemento de tipo generico <T>
   * @returns un array de los elemntos encontrados
   */
  search(item: string): string[] {
    let collectionAux: string[] = [];
    this.collection.forEach((itemReal: string) => {
      if (itemReal == item) {
        collectionAux.push(item);
      }
    })

    return collectionAux;
  }
}