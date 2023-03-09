export interface Streamable<T> {
    buscarPorAño(año: number): T;
    buscarPorNombre(nombre: string): T;
}