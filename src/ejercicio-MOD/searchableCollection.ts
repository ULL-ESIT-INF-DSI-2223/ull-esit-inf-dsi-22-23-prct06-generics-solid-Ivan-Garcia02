import { Collectable } from "./collectable";
import { Searchable } from "./searchable";

export abstract class SearchableCollection<T> implements Collectable<T>, Searchable<T> {
  private _collection: T[];

  /**
   * Constructor de la clase SearchableCollection
   * @param collection Coleccion de elementos de tipo generico <T>
   */
  constructor(collection: T[]) {
    this._collection = collection;
  }

  /** Getter del atributo collection */
  get collection() {
    return this._collection;
  }
  /** Setter del atributo collection */
  set collection(collection: T[]) {
    this.collection = collection;
  }

  /**
   * Método para insertar un elemento a la coleccion
   * @param item Elemento de tipo generico <T> a insertar
   */
  addItem(item: T): void {
    this._collection.push(item);
  }

  /**
   * Método para devolver un elemento de la coleccion
   * @param index Índice del elemento a devolver
   * @returns el elemento correspondiente al índice o undefined si el índice no existe en la coleccion
   */
  getItem(index: number): T | undefined{
    if (index >= 0 && index < this._collection.length) {
      return this._collection[index];
    }
    return undefined;
  }

  /**
   * Método para eliminar un elemento de la coleccion
   * @param index Índice del elemento a eliminar
   * @returns el elemento correspondiente al índice o undefined si el índice no existe en la coleccion
   */
  removeItem(index: number): T | undefined{
    if (index >= 0 && index < this._collection.length) {
      let collectionAux: T[] = [];
      this._collection.forEach((item: T, indexReal: number) => {
        if (indexReal - 1 != index) {
          collectionAux.push(item);
        }
      })
      this._collection = collectionAux;
      //this._collection.splice(index)
      return this._collection[index];
    }
    return undefined;
  }

  /**
   * Método que devuelve el número de elementos de la coleccion
   * @returns el número de elementos de la coleccion
   */
  getNumberOfItems(): number {
    return this._collection.length
  }

  /**
   * Método que recibe un elemento de tipo <T> y busca si esta en la coleccion
   * @param item Elemento de tipo generico <T>
   * @returns un array de los elemntos encontrados
   */
  abstract search(item: T): T[];
}