import 'mocha';
import { expect } from 'chai';
import { DocumentalCollection } from "../../src/ejercicio-1/documentalCollection";
import { Documental } from '../../src/ejercicio-1/documental';

describe('Tests para la clase DocumentalCollection', () => {
  it('Se puede crear una clase DocumentalCollection', () => {
    expect(new DocumentalCollection([ new Documental('Everest', 2015, 'Wiliam', ['accion', 'terror'], false, 40) ])).not.to.be.undefined;
  })

  it('Tests del método buscarPorNombre', () => {
    let documental1: Documental = new Documental('Everest', 2015, 'Wiliam', ['accion', 'terror'], false, 40);
    let documental2: Documental = new Documental('Universo', 2022, 'Russo', ['naturaleza', 'animales'], false, 130);
    let documental3: Documental = new Documental('Newton', 2022, 'Tarantino', ['nostalgico', 'vida'], true, 115);
    let coleccion: DocumentalCollection = new DocumentalCollection([documental1, documental2, documental3]);

    expect(coleccion.buscarPorNombre('Everest')).to.be.eql([documental1]);
    expect(coleccion.buscarPorNombre('Universo')).to.be.eql([documental2]);
    expect(coleccion.buscarPorNombre('Newton')).to.be.eql([documental3]);
    expect(coleccion.buscarPorNombre('Capitan america')).to.be.eql([]);
  })

  it('Tests del método buscarPorAño', () => {
    let documental1: Documental = new Documental('Everest', 2015, 'Wiliam', ['accion', 'terror'], false, 40);
    let documental2: Documental = new Documental('Universo', 2022, 'Russo', ['naturaleza', 'animales'], false, 130);
    let documental3: Documental = new Documental('Newton', 2022, 'Tarantino', ['nostalgico', 'vida'], true, 115);
    let coleccion: DocumentalCollection = new DocumentalCollection([documental1, documental2, documental3]);

    expect(coleccion.buscarPorAño(2015)).to.be.eql([documental1]);
    expect(coleccion.buscarPorAño(2022)).to.be.eql([documental2, documental3]);
    expect(coleccion.buscarPorAño(1916)).to.be.eql([]);
  })

  it('Tests del método buscarPorDirector', () => {
    let documental1: Documental = new Documental('Everest', 2015, 'Wiliam', ['accion', 'terror'], false, 40);
    let documental2: Documental = new Documental('Universo', 2022, 'Russo', ['naturaleza', 'animales'], false, 130);
    let documental3: Documental = new Documental('Newton', 2022, 'Tarantino', ['nostalgico', 'vida'], true, 115);
    let coleccion: DocumentalCollection = new DocumentalCollection([documental1, documental2, documental3]);

    expect(coleccion.buscarPorDirector('Wiliam')).to.be.eql([documental1]);
    expect(coleccion.buscarPorDirector('Russo')).to.be.eql([documental2]);
    expect(coleccion.buscarPorDirector('Tarantino')).to.be.eql([documental3]);
    expect(coleccion.buscarPorDirector('Spielbieg')).to.be.eql([]);
  })

  it('Tests del método buscarPorGenero', () => {
    let documental1: Documental = new Documental('Everest', 2015, 'Wiliam', ['accion', 'terror'], false, 40);
    let documental2: Documental = new Documental('Universo', 2022, 'Russo', ['naturaleza', 'animales'], false, 130);
    let documental3: Documental = new Documental('Newton', 2022, 'Tarantino', ['nostalgico', 'vida'], true, 115);
    let coleccion: DocumentalCollection = new DocumentalCollection([documental1, documental2, documental3]);

    expect(coleccion.buscarPorGenero('accion')).to.be.eql([documental1]);
    expect(coleccion.buscarPorGenero('animales')).to.be.eql([documental2]);
    expect(coleccion.buscarPorGenero('vida')).to.be.eql([documental3]);
    expect(coleccion.buscarPorGenero('terror')).to.be.eql([documental1]);
  })

  it('Tests del método añadirElemento', () => {
    let documental1: Documental = new Documental('Everest', 2015, 'Wiliam', ['accion', 'terror'], false, 40);
    let documental2: Documental = new Documental('Universo', 2022, 'Russo', ['naturaleza', 'animales'], false, 130);
    let documental3: Documental = new Documental('Newton', 2022, 'Tarantino', ['nostalgico', 'vida'], true, 115);
    let coleccion: DocumentalCollection = new DocumentalCollection([documental1, documental2, documental3]);

    expect(coleccion.añadirElemento(documental3)).to.be.eql([documental1, documental2, documental3, documental3]);
    expect(coleccion.añadirElemento(documental2)).to.be.eql([documental1, documental2, documental3, documental3, documental2]);
    expect(coleccion.añadirElemento(documental1)).to.be.eql([documental1, documental2, documental3, documental3, documental2, documental1]);
  })

  it('Tests del método eliminarElemento', () => {
    let documental1: Documental = new Documental('Everest', 2015, 'Wiliam', ['accion', 'terror'], false, 40);
    let documental2: Documental = new Documental('Universo', 2022, 'Russo', ['naturaleza', 'animales'], false, 130);
    let documental3: Documental = new Documental('Newton', 2022, 'Tarantino', ['nostalgico', 'vida'], true, 115);
    let coleccion: DocumentalCollection = new DocumentalCollection([documental1, documental2, documental3]);

    expect(coleccion.eliminarElemento('Newton')).to.be.eql(documental3);
    expect(coleccion.eliminarElemento('Universo')).to.be.eql(documental2);
    expect(coleccion.eliminarElemento('Everest')).to.be.eql(documental1);
  })

  it('Tests del método buscarPorBiograficos', () => {
    let documental1: Documental = new Documental('Everest', 2015, 'Wiliam', ['accion', 'terror'], false, 40);
    let documental2: Documental = new Documental('Universo', 2022, 'Russo', ['naturaleza', 'animales'], false, 130);
    let documental3: Documental = new Documental('Newton', 2022, 'Tarantino', ['nostalgico', 'vida'], true, 115);
    let coleccion: DocumentalCollection = new DocumentalCollection([documental1, documental2, documental3]);

    expect(coleccion.buscarPorBiograficos(false)).to.be.eql([documental1, documental2]);
    expect(coleccion.buscarPorBiograficos(true)).to.be.eql([documental3]);
  })

  it('Tests del método buscarPorDuracion', () => {
    let documental1: Documental = new Documental('Everest', 2015, 'Wiliam', ['accion', 'terror'], false, 40);
    let documental2: Documental = new Documental('Universo', 2022, 'Russo', ['naturaleza', 'animales'], false, 130);
    let documental3: Documental = new Documental('Newton', 2022, 'Tarantino', ['nostalgico', 'vida'], true, 115);
    let coleccion: DocumentalCollection = new DocumentalCollection([documental1, documental2, documental3]);

    expect(coleccion.buscarPorDuracion(130)).to.be.eql([documental2]);
    expect(coleccion.buscarPorDuracion(40)).to.be.eql([documental1]);
    expect(coleccion.buscarPorDuracion(115)).to.be.eql([documental3]);
    expect(coleccion.buscarPorDuracion(10)).to.be.eql([]);
  })
})