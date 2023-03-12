import 'mocha';
import { expect } from 'chai';
import { PeliculaCollection } from "../../src/ejercicio-1/peliculaCollection";
import { Pelicula } from '../../src/ejercicio-1/pelicula';

describe('Tests para la clase PeliculaCollection', () => {
  it('Se puede crear una clase PeliculaCollection', () => {
    expect(new PeliculaCollection([ new Pelicula('Vengadores', 2011, 'Wiliam', ['accion', 'comedia', 'heroes'], 126, ['Roberd', 'Chris']) ])).not.to.be.undefined;
  })

  it('Tests del método buscarPorNombre', () => {
    let peli1: Pelicula = new Pelicula('Vengadores', 2011, 'Wiliam', ['accion', 'comedia', 'heroes'], 126, ['Roberd', 'Chris']);
    let peli2: Pelicula = new Pelicula('Iron Man', 2008, 'Russo', ['accion', 'heroes'], 135, ['Roberd']);
    let peli3: Pelicula = new Pelicula('Spiderman', 2018, 'Russo', ['accion', 'heroes'], 142, ['Tom']);
    let coleccion: PeliculaCollection = new PeliculaCollection([peli1, peli2, peli3]);

    expect(coleccion.buscarPorNombre('Spiderman')).to.be.eql([peli3]);
    expect(coleccion.buscarPorNombre('Iron Man')).to.be.eql([peli2]);
    expect(coleccion.buscarPorNombre('Vengadores')).to.be.eql([peli1]);
    expect(coleccion.buscarPorNombre('Capitan america')).to.be.eql([]);
  })

  it('Tests del método buscarPorAño', () => {
    let peli1: Pelicula = new Pelicula('Vengadores', 2011, 'Wiliam', ['accion', 'comedia', 'heroes'], 126, ['Roberd', 'Chris']);
    let peli2: Pelicula = new Pelicula('Iron Man', 2008, 'Russo', ['accion', 'heroes'], 135, ['Roberd']);
    let peli3: Pelicula = new Pelicula('Spiderman', 2018, 'Russo', ['accion', 'heroes'], 142, ['Tom']);
    let coleccion: PeliculaCollection = new PeliculaCollection([peli1, peli2, peli3]);

    expect(coleccion.buscarPorAño(2018)).to.be.eql([peli3]);
    expect(coleccion.buscarPorAño(2008)).to.be.eql([peli2]);
    expect(coleccion.buscarPorAño(2011)).to.be.eql([peli1]);
    expect(coleccion.buscarPorAño(1916)).to.be.eql([]);
  })

  it('Tests del método buscarPorDirector', () => {
    let peli1: Pelicula = new Pelicula('Vengadores', 2011, 'Wiliam', ['accion', 'comedia', 'heroes'], 126, ['Roberd', 'Chris']);
    let peli2: Pelicula = new Pelicula('Iron Man', 2008, 'Russo', ['accion', 'heroes'], 135, ['Roberd']);
    let peli3: Pelicula = new Pelicula('Spiderman', 2018, 'Russo', ['accion', 'heroes'], 142, ['Tom']);
    let coleccion: PeliculaCollection = new PeliculaCollection([peli1, peli2, peli3]);

    expect(coleccion.buscarPorDirector('Wiliam')).to.be.eql([peli1]);
    expect(coleccion.buscarPorDirector('Russo')).to.be.eql([peli2, peli3]);
    expect(coleccion.buscarPorDirector('Tarantino')).to.be.eql([]);
  })

  it('Tests del método buscarPorGenero', () => {
    let peli1: Pelicula = new Pelicula('Vengadores', 2011, 'Wiliam', ['accion', 'comedia', 'heroes'], 126, ['Roberd', 'Chris']);
    let peli2: Pelicula = new Pelicula('Iron Man', 2008, 'Russo', ['accion', 'heroes'], 135, ['Roberd']);
    let peli3: Pelicula = new Pelicula('Spiderman', 2018, 'Russo', ['accion', 'heroes'], 142, ['Tom']);
    let coleccion: PeliculaCollection = new PeliculaCollection([peli1, peli2, peli3]);

    expect(coleccion.buscarPorGenero('accion')).to.be.eql([peli1, peli2, peli3]);
    expect(coleccion.buscarPorGenero('comedia')).to.be.eql([peli1]);
    expect(coleccion.buscarPorGenero('heroes')).to.be.eql([peli1, peli2, peli3]);
    expect(coleccion.buscarPorGenero('terror')).to.be.eql([]);
  })

  it('Tests del método añadirElemento', () => {
    let peli1: Pelicula = new Pelicula('Vengadores', 2011, 'Wiliam', ['accion', 'comedia', 'heroes'], 126, ['Roberd', 'Chris']);
    let peli2: Pelicula = new Pelicula('Iron Man', 2008, 'Russo', ['accion', 'heroes'], 135, ['Roberd']);
    let peli3: Pelicula = new Pelicula('Spiderman', 2018, 'Russo', ['accion', 'heroes'], 142, ['Tom']);
    let coleccion: PeliculaCollection = new PeliculaCollection([peli1, peli2, peli3]);

    expect(coleccion.añadirElemento(peli3)).to.be.eql([peli1, peli2, peli3, peli3]);
    expect(coleccion.añadirElemento(peli2)).to.be.eql([peli1, peli2, peli3, peli3, peli2]);
    expect(coleccion.añadirElemento(peli1)).to.be.eql([peli1, peli2, peli3, peli3, peli2, peli1]);
  })

  it('Tests del método eliminarElemento', () => {
    let peli1: Pelicula = new Pelicula('Vengadores', 2011, 'Wiliam', ['accion', 'comedia', 'heroes'], 126, ['Roberd', 'Chris']);
    let peli2: Pelicula = new Pelicula('Iron Man', 2008, 'Russo', ['accion', 'heroes'], 135, ['Roberd']);
    let peli3: Pelicula = new Pelicula('Spiderman', 2018, 'Russo', ['accion', 'heroes'], 142, ['Tom']);
    let coleccion: PeliculaCollection = new PeliculaCollection([peli1, peli2, peli3]);

    expect(coleccion.eliminarElemento('Spiderman')).to.be.eql(peli3);
    expect(coleccion.eliminarElemento('Iron Man')).to.be.eql(peli2);
    expect(coleccion.eliminarElemento('Vengadores')).to.be.eql(peli1);
  })

  it('Tests del método buscarPorDuracion', () => {
    let peli1: Pelicula = new Pelicula('Vengadores', 2011, 'Wiliam', ['accion', 'comedia', 'heroes'], 126, ['Roberd', 'Chris']);
    let peli2: Pelicula = new Pelicula('Iron Man', 2008, 'Russo', ['accion', 'heroes'], 135, ['Roberd']);
    let peli3: Pelicula = new Pelicula('Spiderman', 2018, 'Russo', ['accion', 'heroes'], 142, ['Tom']);
    let coleccion: PeliculaCollection = new PeliculaCollection([peli1, peli2, peli3]);

    expect(coleccion.buscarPorDuracion(126)).to.be.eql([peli1]);
    expect(coleccion.buscarPorDuracion(142)).to.be.eql([peli3]);
    expect(coleccion.buscarPorDuracion(135)).to.be.eql([peli2]);
    expect(coleccion.buscarPorDuracion(456)).to.be.eql([]);
  })

  it('Tests del método buscarPorActor', () => {
    let peli1: Pelicula = new Pelicula('Vengadores', 2011, 'Wiliam', ['accion', 'comedia', 'heroes'], 126, ['Roberd', 'Chris']);
    let peli2: Pelicula = new Pelicula('Iron Man', 2008, 'Russo', ['accion', 'heroes'], 135, ['Roberd']);
    let peli3: Pelicula = new Pelicula('Spiderman', 2018, 'Russo', ['accion', 'heroes'], 142, ['Tom']);
    let coleccion: PeliculaCollection = new PeliculaCollection([peli1, peli2, peli3]);

    expect(coleccion.buscarPorActor('Roberd')).to.be.eql([peli1, peli2]);
    expect(coleccion.buscarPorActor('Tom')).to.be.eql([peli3]);
    expect(coleccion.buscarPorActor('Chris')).to.be.eql([peli1]);
    expect(coleccion.buscarPorActor('Benedict')).to.be.eql([]);
  })
})