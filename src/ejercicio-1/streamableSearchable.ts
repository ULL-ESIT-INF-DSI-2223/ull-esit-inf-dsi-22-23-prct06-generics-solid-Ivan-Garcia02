export interface StreamableSearchable<T> {
  /**
   * Método que busca los medios que coincidan con el año de busqueda
   * @param año Año de busqueda
   * @returns una lista con los elementos que coinciden con la busqueda
   */
  buscarPorAño(año: number): T[];

  /**
   * Método que busca los medios que coincidan con el nombre de la busqueda
   * @param nombre Nombre de busqueda
   * @returns una lista con los elementos que coinciden con la busqueda
   */
  buscarPorNombre(nombre: string): T[];

  /**
   * Método que busca los medios que coincidan con el nombre del director
   * @param nombre Nombre del director
   * @returns una lista con los elementos que coinciden con la busqueda
   */
  buscarPorDirector(nombre: string): T[];

  /**
   * Método que busca los medios que coincidan con los generos de la busqueda
   * @param generos Generos del medio
   * @returns una lista con los elementos que coinciden con la busqueda
   */
  buscarPorGenero(generos: string): T[];
}