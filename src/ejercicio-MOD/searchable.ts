export interface Searchable<T> {
  /**
   * Método que recibe un elemento de tipo <T> y busca si esta en la coleccion
   * @param item Elemento de tipo generico <T>
   * @returns un array de los elemntos encontrados
   */
  search(item: T): T[];
}