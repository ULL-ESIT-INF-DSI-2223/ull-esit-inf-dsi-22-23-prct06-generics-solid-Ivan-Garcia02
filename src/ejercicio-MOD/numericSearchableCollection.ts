import { SearchableCollection } from "./searchableCollection";

export class NumericSearchableCollection extends SearchableCollection<number> {
  /**
   * Constructor de la clase NumericSearchableCollection
   * @param collection Coleccion de elementos de tipo number
   */
  constructor(collection: number[]) {
    super(collection);
  }

  /**
   * Método que recibe un elemento de tipo <T> y busca si esta en la coleccion
   * @param item Elemento de tipo generico <T>
   * @returns un array de los elemntos encontrados
   */
  search(item: number): number[] {
    let collectionAux: number[] = [];
    this.collection.forEach((itemReal: number) => {
      if (itemReal == item) {
        collectionAux.push(item);
      }
    })

    return collectionAux;
  }
}