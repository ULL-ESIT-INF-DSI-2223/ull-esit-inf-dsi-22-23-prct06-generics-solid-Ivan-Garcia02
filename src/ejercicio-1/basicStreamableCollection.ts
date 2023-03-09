import { Streamable } from "./streamable";

abstract class BasicStreamableCollection<T> implements Streamable<T> {
  abstract buscarPorAño(año: number): T;
  abstract buscarPorNombre(nombre: string): T;
    
}

class Peliculas extends BasicStreamableCollection<Peliculas> {
  buscarPorAño(año: number): Peliculas {
    return new Peliculas();
  }
  buscarPorNombre(nombre: string): Peliculas {
    return new Peliculas();
  }
}

class Series extends BasicStreamableCollection<Series> {
  buscarPorAño(año: number): Series {
    return new Series();
  }
  buscarPorNombre(nombre: string): Series {
    return new Series();
  }
}

class Documentales extends BasicStreamableCollection<Documentales> {
  buscarPorAño(año: number): Documentales {
    return new Documentales();
  }
  buscarPorNombre(nombre: string): Documentales {
    return new Documentales();
  }
}