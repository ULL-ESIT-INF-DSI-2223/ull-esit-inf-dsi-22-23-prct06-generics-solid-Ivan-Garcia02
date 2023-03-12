import "mocha";
import { expect } from "chai";
import { NumericSearchableCollection } from "../../src/ejercicio-MOD/numericSearchableCollection";

describe('Tests para la clase NumericSearchableCollecion', () => {
  it('Test que comprueba la creacion de la clase', () => {
    expect(new NumericSearchableCollection([1, 2, 3, 4, 5])).not.to.be.undefined;
  })

  it('Test que comprueba el método addItem', () => {
    let collection: NumericSearchableCollection = new NumericSearchableCollection([1, 2, 3, 4, 5]);
    collection.addItem(6);
    expect(collection.collection).to.be.eql([1, 2, 3, 4, 5, 6]);

    collection.addItem(6);
    expect(collection.collection).to.be.eql([1, 2, 3, 4, 5, 6, 6]);

    collection.addItem(5.3);
    expect(collection.collection).to.be.eql([1, 2, 3, 4, 5, 6, 6, 5.3]);

    collection.addItem(-2);
    expect(collection.collection).to.be.eql([1, 2, 3, 4, 5, 6, 6, 5.3, -2]);
  })

  it('Test que comprueba el método getItem', () => {
    let collection: NumericSearchableCollection = new NumericSearchableCollection([1, 2, 3, 4, 5, 6, 6, 5.3, -2]);

    expect(collection.getItem(4)).to.be.eql(5);
    expect(collection.getItem(0)).to.be.eql(1);
    expect(collection.getItem(6)).to.be.eql(-2);
    expect(collection.getItem(5)).to.be.eql(5.3);

    expect(collection.getItem(10)).to.be.undefined;
    expect(collection.getItem(-1)).to.be.undefined;
  })

  it('Test que comprueba el método removeItem', () => {
    let collection: NumericSearchableCollection = new NumericSearchableCollection([1, 2, 3, 4, 5, 6, 6, 5.3, -2]);

    expect(collection.removeItem(4)).to.be.eql(5);
    expect(collection.removeItem(0)).to.be.eql(1);
    expect(collection.removeItem(6)).to.be.eql(-2);
    expect(collection.removeItem(5)).to.be.eql(5.3);

    expect(collection.removeItem(8)).to.be.undefined;
    expect(collection.removeItem(-1)).to.be.undefined;
  })

  it('Test que comprueba el método getNumberOfItems', () => {
    let collection1: NumericSearchableCollection = new NumericSearchableCollection([1, 2, 3, 4, 5, 6, 6, 5.3, -2]);
    let collection2: NumericSearchableCollection = new NumericSearchableCollection([1, 2, 3, 4]);
    let collection3: NumericSearchableCollection = new NumericSearchableCollection([]);

    expect(collection1.getNumberOfItems()).to.be.eql(9);
    expect(collection2.getNumberOfItems()).to.be.eql(4);
    expect(collection3.getNumberOfItems()).to.be.eql(0);
  })

  it('Test que comprueba el método search', () => {
    let collection: NumericSearchableCollection = new NumericSearchableCollection([1, 2, 5.3, 3, 4, 5, 6, 6, 5.3, -2]);

    expect(collection.search(1)).to.be.eql([1]);
    expect(collection.search(6)).to.be.eql([6, 6]);
    expect(collection.search(-2)).to.be.eql([-2]);
    expect(collection.search(5.3)).to.be.eql([5.3, 5.3]);
    expect(collection.search(9)).to.be.eql([]);
  })
})