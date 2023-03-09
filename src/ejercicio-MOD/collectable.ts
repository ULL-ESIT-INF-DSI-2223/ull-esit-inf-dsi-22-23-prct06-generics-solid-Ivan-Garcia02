export interface Collectable<T> {
  /**
   * Método para insertar un elemento a la coleccion
   * @param item Elemento de tipo generico <T> a insertar
   */
  addItem(item: T): void;

  /**
   * Método para devolver un elemento de la coleccion
   * @param index Índice del elemento a devolver
   * @returns el elemento correspondiente al índice o undefined si el índice no existe en la coleccion
   */
  getItem(index: number): T | undefined;

  /**
   * Método para eliminar un elemento de la coleccion
   * @param index Índice del elemento a eliminar
   * @returns el elemento correspondiente al índice o undefined si el índice no existe en la coleccion
   */
  removeItem(index: number): T | undefined;

  /**
   * Método que devuelve el número de elementos de la coleccion
   * @returns el número de elementos de la coleccion
   */
  getNumberOfItems(): number;
}