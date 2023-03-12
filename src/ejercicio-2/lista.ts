export class Lista<T> {
  private _lista: T[];
  private _tamaño: number;

  /**
   * Constructor de la clase generica Lista
   * @param lista Lista de elementos a contener
   */
  constructor(lista: T[]) {
    this._lista = lista;
    this._tamaño = lista.length; // Hacemos uso de length, ya que anque hagamos un bucle while not undefined, podria contener un undefined.
  }

  /** Getter del atributo lista */
  get lista() {
    return this._lista;
  }
  /** Setter del atributo lista, que obtiene tambien el tamaño */
  set lista(lista: T[]) {
    this._lista = lista;
    this._tamaño = lista.length;
  }

  /** Getter del tamaño */
  get tamaño() {
    return this._tamaño;
  }

  /**
   * Este método añadira al final de la lista que lo llame, una segunda lista que se pasa por parametro
   * @param segundaLista Segunda lista a añadir a la primera
   */
  append(segundaLista: Lista<T>) {
    for (let i = this.tamaño, j = 0; j < segundaLista.tamaño; i++, j++) {
      this.lista[i] = segundaLista.lista[j];
    }

    this._tamaño += segundaLista.tamaño;
  }

  /**
   * Método que concatena la lista con la que el método es llamada + un número variable de listas por parametro
   * @param lists Lista de listas variables
   * @returns una lista con todas las listas unidas
   */
  concatenate(...lists: Lista<T>[]) {
    let conjListas: T[] = [];
    for (let i = 0; i < this._tamaño; i++) {
      conjListas[i] = this._lista[i];
    }

    for (let i = 0, k = this._tamaño; i < lists.length; i++) {
      for (let j = 0; j < lists[i].tamaño; j++, k++) {
        conjListas[k] = lists[i].lista[j];
      }
    }

    return new Lista<T>(conjListas);
  }

  /**
   * Método que a partir de una lista y un predicado logico, si se cumple el predicado se añade a una nueva lista
   * @param predicado Predicado logico
   * @returns una nueva lista con los elementos que cumplen el predicado logico
   */
  filter(predicado: (elemento: T) => boolean) {
    let nuevaLista: T[] = [];

    for (let i = 0, k = 0; i < this._tamaño; i++) {
      if (predicado(this._lista[i])) {
        nuevaLista[k] = this._lista[i];
        k++;
      }
    } 

    return new Lista<T>(nuevaLista);
  }

  /**
   * Método que devuelve el número de elementos de la lista
   * @returns el número de elementos de la lista
   */
  length() {
    return this._tamaño;
  }

  /**
   * Método que modifica una lista según una función recibida por parametro
   * @param funcion Función modificadora
   * @returns una nueva lista modificada
   */
  map(funcion: (elemento: T) => T) {
    let nuevaLista: T[] = [];

    for (let i = 0; i < this._tamaño; i++) {
      nuevaLista[i] = funcion(this._lista[i]);
    } 

    return new Lista<T>(nuevaLista);
  }

  /**
   * Método que reduce cada elemento de la lista al acumalador utilizando la función
   * @param acumulador Acumulador inicial
   * @param funcion Funcion reductora
   * @returns el valor del acumulador al final de todas las iteraciones
   */
  reduce(acumulador: T, funcion: (acumulador: T, elemento: T) => T) {
    for (let i = 0; i < this._tamaño; i++) {
      acumulador = funcion(acumulador, this._lista[i]);
    } 

    return acumulador;
  }

  /**
   * Método que retorna una lista con los elementos originales en orden inverso
   * @returns una nueva lista con los elementos de la que la invoca al reves
   */
  reverse() {
    let nuevaLista: T[] = [];

    for (let i = this.tamaño - 1, k = 0; i >= 0; i--, k++) {
      nuevaLista[k] = this._lista[i];
    } 

    return new Lista<T>(nuevaLista);
  }

  /**
   * Método que permite iterar entre los elementos de la lista y realizar la función pasada por parametro a cada elemento
   * @param funcion Función que aplicar a los elementos
   */
  forEach(funcion: (elemento: T, index: number) => void) {
    for (let i = 0; i < this._tamaño; i++) {
      funcion(this._lista[i], i);
    } 
  }
}