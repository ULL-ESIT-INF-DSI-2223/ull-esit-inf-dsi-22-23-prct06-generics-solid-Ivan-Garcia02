export interface StreamableModify<T> {
  /**
   * Método para añadir elementos a la coleccion
   * @param elemento Elemento a añadir a la coleccion
   */
  añadirElemento(elemento: T): T[];

  /**
   * Método para eliminar elementos de la coleccion
   * @param nombre Elemento a eliminar de la coleccion
   */
  eliminarElemento(nombre: string): T | undefined;
}