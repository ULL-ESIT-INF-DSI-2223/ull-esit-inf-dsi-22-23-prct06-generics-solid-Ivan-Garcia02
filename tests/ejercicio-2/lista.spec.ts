import 'mocha'
import { expect } from "chai";
import { Lista } from "../../src/ejercicio-2/lista";

describe('Tests para la clase Lista<number>', () => {
  it('Se puede crear un objeto del tipo Lista<number>', () => {
    expect(new Lista<number>([1, 2, 3, 4, 5])).not.to.be.undefined;
  })

  it('Tests para el metodo append', () => {
    let lista1: Lista<number> = new Lista<number>([1, 2, 3, 4, 5]);
    let lista2: Lista<number> = new Lista<number>([6, 7, 8, 9]);
    let lista3: Lista<number> = new Lista<number>([]);

    lista1.append(lista3);
    expect(lista1).to.be.eql(new Lista<number>([1, 2, 3, 4, 5]));

    lista1.append(lista2);
    expect(lista1.lista).to.be.eql([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    lista2.append(lista3);
    expect(lista2.lista).to.be.eql([6, 7, 8, 9]);
  })

  it('Tests para el metodo concatenate', () => {
    let lista1: Lista<number> = new Lista<number>([1, 2, 3, 4, 5]);
    let lista2: Lista<number> = new Lista<number>([6, 7, 8, 9]);
    let lista3: Lista<number> = new Lista<number>([]);
    let lista4: Lista<number> = new Lista<number>([15, 16]);

    expect(lista1.concatenate(lista2, lista3).lista).to.be.eql([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(lista3.concatenate(lista4, lista1).lista).to.be.eql([15, 16, 1, 2, 3, 4, 5]);
    expect(lista2.concatenate(lista2).lista).to.be.eql([6, 7, 8, 9, 6, 7, 8, 9]);
    expect(lista4.concatenate(lista1, lista2, lista3, lista4).lista).to.be.eql([15, 16, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16]);
  })

  it('Tests para el metodo filter', () => {
    let lista1: Lista<number> = new Lista<number>([1, 2, 3, 4, 5]);
    let lista2: Lista<number> = new Lista<number>([6, 7, 8, 9]);

    expect(lista1.filter((elemento) => elemento == 2).lista).to.be.eql([2]);
    expect(lista1.filter((elemento) => elemento > 2 && elemento < 5).lista).to.be.eql([3, 4]);
    expect(lista2.filter((elemento) => elemento <= 7).lista).to.be.eql([6, 7]);
    expect(lista1.filter((elemento) => elemento == 25).lista).to.be.eql([]);
  })

  it('Tests para el metodo length', () => {
    let lista1: Lista<number> = new Lista<number>([1, 2, 3, 4, 5]);
    let lista2: Lista<number> = new Lista<number>([6, 7, 8, 9]);
    let lista3: Lista<number> = new Lista<number>([]);
    let lista4: Lista<number> = new Lista<number>([15, 16]);

    expect(lista1.length()).to.be.eql(5);
    expect(lista2.length()).to.be.eql(4);
    expect(lista3.length()).to.be.eql(0);
    expect(lista4.length()).to.be.eql(2);
  })

  it('Tests para el metodo map', () => {
    let lista1: Lista<number> = new Lista<number>([1, 2, 3, 4, 5]);
    let lista2: Lista<number> = new Lista<number>([6, 7, 8, 9]);

    expect(lista1.map((elemento) => elemento + 2).lista).to.be.eql([3, 4, 5, 6, 7]);
    expect(lista1.map((elemento) => elemento * 2 + elemento * 5).lista).to.be.eql([7, 14, 21, 28, 35]);
    expect(lista2.map((elemento) => elemento / 1).lista).to.be.eql([6, 7, 8, 9]);
    expect(lista2.map((elemento) => elemento).lista).to.be.eql([6, 7, 8, 9]);
  })

  it('Tests para el metodo reduce', () => {
    let lista1: Lista<number> = new Lista<number>([1, 2, 3, 4, 5]);
    let lista2: Lista<number> = new Lista<number>([6, 7, 8, 9]);
    let lista3: Lista<number> = new Lista<number>([]);
    let lista4: Lista<number> = new Lista<number>([15, 16]);

    expect(lista1.reduce(0, (acumulador, elemento) => acumulador + elemento)).to.be.eql(15);
    expect(lista2.reduce(0, (acumulador, elemento) => acumulador + elemento)).to.be.eql(30);
    expect(lista3.reduce(0, (acumulador, elemento) => acumulador * elemento)).to.be.eql(0);
    expect(lista4.reduce(0, (acumulador, elemento) => acumulador - elemento)).to.be.eql(-31);
  })

  it('Tests para el metodo reverse', () => {
    let lista1: Lista<number> = new Lista<number>([1, 2, 3, 4, 5]);
    let lista2: Lista<number> = new Lista<number>([6, 7, 8, 9]);
    let lista3: Lista<number> = new Lista<number>([]);
    let lista4: Lista<number> = new Lista<number>([15, 16]);

    expect(lista1.reverse().lista).to.be.eql([5, 4, 3, 2, 1]);
    expect(lista2.reverse().lista).to.be.eql([9, 8, 7, 6]);
    expect(lista3.reverse().lista).to.be.eql([]);
    expect(lista4.reverse().lista).to.be.eql([16, 15]);
  })

  it('Tests para el metodo forEach', () => {
    let lista1: Lista<number> = new Lista<number>([1, 2]);
    let lista2: Lista<number> = new Lista<number>([]);

    expect(lista1.forEach((elemento) => console.log(elemento + elemento))).to.be.undefined;
    expect(lista2.forEach((elemento) => console.log(elemento * 2 * elemento))).to.be.undefined;  
  })
})



describe('Tests para la clase Lista<string>', () => {
  it('Se puede crear un objeto del tipo Lista<string>', () => {
    expect(new Lista<string>(['A', 'B', 'C', 'D', 'E'])).not.to.be.undefined;
  })

  it('Tests para el metodo append', () => {
    let lista1: Lista<string> = new Lista<string>(['A', 'B', 'C', 'D', 'E']);
    let lista2: Lista<string> = new Lista<string>(['F', 'G', 'H', 'I']);
    let lista3: Lista<string> = new Lista<string>([]);

    lista1.append(lista3);
    expect(lista1).to.be.eql(new Lista<string>(['A', 'B', 'C', 'D', 'E']));

    lista1.append(lista2);
    expect(lista1.lista).to.be.eql(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']);

    lista2.append(lista3);
    expect(lista2.lista).to.be.eql(['F', 'G', 'H', 'I']);
  })

  it('Tests para el metodo concatenate', () => {
    let lista1: Lista<string> = new Lista<string>(['A', 'B', 'C', 'D', 'E']);
    let lista2: Lista<string> = new Lista<string>(['F', 'G', 'H', 'I']);
    let lista3: Lista<string> = new Lista<string>([]);
    let lista4: Lista<string> = new Lista<string>(['X', 'Y']);

    expect(lista1.concatenate(lista2, lista3).lista).to.be.eql(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']);
    expect(lista3.concatenate(lista4, lista1).lista).to.be.eql(['X', 'Y', 'A', 'B', 'C', 'D', 'E']);
    expect(lista2.concatenate(lista2).lista).to.be.eql(['F', 'G', 'H', 'I', 'F', 'G', 'H', 'I']);
    expect(lista4.concatenate(lista1, lista2, lista3, lista4).lista).to.be.eql(['X', 'Y', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'X', 'Y']);
  })

  it('Tests para el metodo filter', () => {
    let lista1: Lista<string> = new Lista<string>(['A', 'B', 'C', 'D', 'E']);
    let lista2: Lista<string> = new Lista<string>(['F', 'G', 'H', 'I']);

    expect(lista1.filter((elemento) => elemento == 'B').lista).to.be.eql(['B']);
    expect(lista1.filter((elemento) => elemento > 'B' && elemento < 'E').lista).to.be.eql(['C', 'D']);
    expect(lista2.filter((elemento) => elemento <= 'G').lista).to.be.eql(['F', 'G']);
    expect(lista1.filter((elemento) => elemento == 'X').lista).to.be.eql([]);
  })

  it('Tests para el metodo length', () => {
    let lista1: Lista<string> = new Lista<string>(['A', 'B', 'C', 'D', 'E']);
    let lista2: Lista<string> = new Lista<string>(['F', 'G', 'H', 'I']);
    let lista3: Lista<string> = new Lista<string>([]);
    let lista4: Lista<string> = new Lista<string>(['X', 'Y']);

    expect(lista1.length()).to.be.eql(5);
    expect(lista2.length()).to.be.eql(4);
    expect(lista3.length()).to.be.eql(0);
    expect(lista4.length()).to.be.eql(2);
  })

  it('Tests para el metodo map', () => {
    let lista1: Lista<string> = new Lista<string>(['A', 'B', 'C', 'D', 'E']);
    let lista2: Lista<string> = new Lista<string>(['F', 'G', 'H', 'I']);

    expect(lista1.map((elemento) => elemento + 2).lista).to.be.eql(['A2', 'B2', 'C2', 'D2', 'E2']);
    expect(lista2.map((elemento) => elemento + 1).lista).to.be.eql(['F1', 'G1', 'H1', 'I1']);
  })

  it('Tests para el metodo reduce', () => {
    let lista1: Lista<string> = new Lista<string>(['A', 'B', 'C', 'D', 'E']);
    let lista2: Lista<string> = new Lista<string>(['F', 'G', 'H', 'I']);
    let lista3: Lista<string> = new Lista<string>([]);
    let lista4: Lista<string> = new Lista<string>(['X', 'Z']);

    expect(lista1.reduce('', (acumulador, elemento) => acumulador + elemento)).to.be.eql('ABCDE');
    expect(lista2.reduce('', (acumulador, elemento) => acumulador + elemento)).to.be.eql('FGHI');
    expect(lista3.reduce('', (acumulador, elemento) => acumulador + elemento)).to.be.eql('');
    expect(lista4.reduce('', (acumulador, elemento) => acumulador + elemento)).to.be.eql('XZ');
  })

  it('Tests para el metodo reverse', () => {
    let lista1: Lista<string> = new Lista<string>(['A', 'B', 'C', 'D', 'E']);
    let lista2: Lista<string> = new Lista<string>(['F', 'G', 'H', 'I']);
    let lista3: Lista<string> = new Lista<string>([]);
    let lista4: Lista<string> = new Lista<string>(['X', 'Z']);

    expect(lista1.reverse().lista).to.be.eql(['E', 'D', 'C', 'B', 'A']);
    expect(lista2.reverse().lista).to.be.eql(['I', 'H', 'G', 'F']);
    expect(lista3.reverse().lista).to.be.eql([]);
    expect(lista4.reverse().lista).to.be.eql(['Z', 'X']);
  })

  it('Tests para el metodo forEach', () => {
    let lista1: Lista<string> = new Lista<string>(['A', 'B']);
    let lista2: Lista<string> = new Lista<string>([]);

    expect(lista1.forEach((elemento) => console.log(elemento + elemento))).to.be.undefined;
    expect(lista2.forEach((elemento) => console.log(elemento + 2 + elemento))).to.be.undefined;  
  })
})