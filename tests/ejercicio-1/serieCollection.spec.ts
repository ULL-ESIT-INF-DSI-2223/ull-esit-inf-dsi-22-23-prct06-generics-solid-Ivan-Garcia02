import 'mocha';
import { expect } from 'chai';
import { SerieCollection } from "../../src/ejercicio-1/serieCollection";
import { Serie } from '../../src/ejercicio-1/serie';

describe('Tests para la clase SerieCollection', () => {
  it('Se puede crear una clase SerieCollection', () => {
    expect(new SerieCollection([ new Serie('Stranger Things', 2009, 'Wiliam', ['accion', 'comedia', 'terror'], 5, 40) ])).not.to.be.undefined;
  })

  it('Tests del método buscarPorNombre', () => {
    let serie1: Serie = new Serie('Stranger Things', 2009, 'Wiliam', ['accion', 'comedia', 'terror'], 5, 40);
    let serie2: Serie = new Serie('Formula 1', 2019, 'Russo', ['deportes'], 5, 50);
    let serie3: Serie = new Serie('Lupin', 2021, 'Tarantino', ['accion', 'comedia', 'ladrones'], 1, 9);
    let coleccion: SerieCollection = new SerieCollection([serie1, serie2, serie3]);

    expect(coleccion.buscarPorNombre('Stranger Things')).to.be.eql([serie1]);
    expect(coleccion.buscarPorNombre('Formula 1')).to.be.eql([serie2]);
    expect(coleccion.buscarPorNombre('Lupin')).to.be.eql([serie3]);
    expect(coleccion.buscarPorNombre('Capitan america')).to.be.eql([]);
  })

  it('Tests del método buscarPorAño', () => {
    let serie1: Serie = new Serie('Stranger Things', 2009, 'Wiliam', ['accion', 'comedia', 'terror'], 5, 40);
    let serie2: Serie = new Serie('Formula 1', 2019, 'Russo', ['deportes'], 5, 50);
    let serie3: Serie = new Serie('Lupin', 2021, 'Tarantino', ['accion', 'comedia', 'ladrones'], 1, 9);
    let coleccion: SerieCollection = new SerieCollection([serie1, serie2, serie3]);

    expect(coleccion.buscarPorAño(2021)).to.be.eql([serie3]);
    expect(coleccion.buscarPorAño(2019)).to.be.eql([serie2]);
    expect(coleccion.buscarPorAño(2009)).to.be.eql([serie1]);
    expect(coleccion.buscarPorAño(1916)).to.be.eql([]);
  })

  it('Tests del método buscarPorDirector', () => {
    let serie1: Serie = new Serie('Stranger Things', 2009, 'Wiliam', ['accion', 'comedia', 'terror'], 5, 40);
    let serie2: Serie = new Serie('Formula 1', 2019, 'Russo', ['deportes'], 5, 50);
    let serie3: Serie = new Serie('Lupin', 2021, 'Tarantino', ['accion', 'comedia', 'ladrones'], 1, 9);
    let coleccion: SerieCollection = new SerieCollection([serie1, serie2, serie3]);

    expect(coleccion.buscarPorDirector('Wiliam')).to.be.eql([serie1]);
    expect(coleccion.buscarPorDirector('Russo')).to.be.eql([serie2]);
    expect(coleccion.buscarPorDirector('Tarantino')).to.be.eql([serie3]);
    expect(coleccion.buscarPorDirector('Spielbieg')).to.be.eql([]);
  })

  it('Tests del método buscarPorGenero', () => {
    let serie1: Serie = new Serie('Stranger Things', 2009, 'Wiliam', ['accion', 'comedia', 'terror'], 5, 40);
    let serie2: Serie = new Serie('Formula 1', 2019, 'Russo', ['deportes'], 5, 50);
    let serie3: Serie = new Serie('Lupin', 2021, 'Tarantino', ['accion', 'comedia', 'ladrones'], 1, 9);
    let coleccion: SerieCollection = new SerieCollection([serie1, serie2, serie3]);

    expect(coleccion.buscarPorGenero('accion')).to.be.eql([serie1, serie3]);
    expect(coleccion.buscarPorGenero('ladrones')).to.be.eql([serie3]);
    expect(coleccion.buscarPorGenero('deportes')).to.be.eql([serie2]);
    expect(coleccion.buscarPorGenero('terror')).to.be.eql([serie1]);
  })

  it('Tests del método añadirElemento', () => {
    let serie1: Serie = new Serie('Stranger Things', 2009, 'Wiliam', ['accion', 'comedia', 'terror'], 5, 40);
    let serie2: Serie = new Serie('Formula 1', 2019, 'Russo', ['deportes'], 5, 50);
    let serie3: Serie = new Serie('Lupin', 2021, 'Tarantino', ['accion', 'comedia', 'ladrones'], 1, 9);
    let coleccion: SerieCollection = new SerieCollection([serie1, serie2, serie3]);

    expect(coleccion.añadirElemento(serie3)).to.be.eql([serie1, serie2, serie3, serie3]);
    expect(coleccion.añadirElemento(serie2)).to.be.eql([serie1, serie2, serie3, serie3, serie2]);
    expect(coleccion.añadirElemento(serie1)).to.be.eql([serie1, serie2, serie3, serie3, serie2, serie1]);
  })

  it('Tests del método eliminarElemento', () => {
    let serie1: Serie = new Serie('Stranger Things', 2009, 'Wiliam', ['accion', 'comedia', 'terror'], 5, 40);
    let serie2: Serie = new Serie('Formula 1', 2019, 'Russo', ['deportes'], 5, 50);
    let serie3: Serie = new Serie('Lupin', 2021, 'Tarantino', ['accion', 'comedia', 'ladrones'], 1, 9);
    let coleccion: SerieCollection = new SerieCollection([serie1, serie2, serie3]);

    expect(coleccion.eliminarElemento('Lupin')).to.be.eql(serie3);
    expect(coleccion.eliminarElemento('Formula 1')).to.be.eql(serie2);
    expect(coleccion.eliminarElemento('Stranger Things')).to.be.eql(serie1);
  })

  it('Tests del método buscarPorNumeroTemporadas', () => {
    let serie1: Serie = new Serie('Stranger Things', 2009, 'Wiliam', ['accion', 'comedia', 'terror'], 5, 40);
    let serie2: Serie = new Serie('Formula 1', 2019, 'Russo', ['deportes'], 5, 50);
    let serie3: Serie = new Serie('Lupin', 2021, 'Tarantino', ['accion', 'comedia', 'ladrones'], 1, 9);
    let coleccion: SerieCollection = new SerieCollection([serie1, serie2, serie3]);

    expect(coleccion.buscarPorNumeroTemporadas(5)).to.be.eql([serie1, serie2]);
    expect(coleccion.buscarPorNumeroTemporadas(1)).to.be.eql([serie3]);
    expect(coleccion.buscarPorNumeroTemporadas(10)).to.be.eql([]);
  })

  it('Tests del método buscarPorEpisodiosTotales', () => {
    let serie1: Serie = new Serie('Stranger Things', 2009, 'Wiliam', ['accion', 'comedia', 'terror'], 5, 40);
    let serie2: Serie = new Serie('Formula 1', 2019, 'Russo', ['deportes'], 5, 50);
    let serie3: Serie = new Serie('Lupin', 2021, 'Tarantino', ['accion', 'comedia', 'ladrones'], 1, 9);
    let coleccion: SerieCollection = new SerieCollection([serie1, serie2, serie3]);

    expect(coleccion.buscarPorEpisodiosTotales(50)).to.be.eql([serie2]);
    expect(coleccion.buscarPorEpisodiosTotales(40)).to.be.eql([serie1]);
    expect(coleccion.buscarPorEpisodiosTotales(9)).to.be.eql([serie3]);
    expect(coleccion.buscarPorEpisodiosTotales(10)).to.be.eql([]);
  })
})