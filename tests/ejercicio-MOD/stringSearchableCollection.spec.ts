import "mocha";
import { expect } from "chai";
import { StringSearchableCollection } from "../../src/ejercicio-MOD/stringSearchableCollection";

describe('Tests para la clase NumericSearchableCollecion', () => {
  it('Test que comprueba la creacion de la clase', () => {
    expect(new StringSearchableCollection(["hola", "que", "tal", "estas", "hola"])).not.to.be.undefined;
  })

  it('Test que comprueba el método addItem', () => {
    let collection: StringSearchableCollection = new StringSearchableCollection(["hola", "que", "tal", "estas", "hola"]);
    collection.addItem("hola2");
    expect(collection.collection).to.be.eql(["hola", "que", "tal", "estas", "hola", "hola2"]);

    collection.addItem("hola3");
    expect(collection.collection).to.be.eql(["hola", "que", "tal", "estas", "hola", "hola2", "hola3"]);

    collection.addItem("");
    expect(collection.collection).to.be.eql(["hola", "que", "tal", "estas", "hola", "hola2", "hola3", ""]);

    collection.addItem("hola4");
    expect(collection.collection).to.be.eql(["hola", "que", "tal", "estas", "hola", "hola2", "hola3", "", "hola4"]);
  })

  it('Test que comprueba el método getItem', () => {
    let collection: StringSearchableCollection = new StringSearchableCollection(["hola", "que", "tal", "estas", "hola", "hola2", "hola3", "", "hola4"]);

    expect(collection.getItem(0)).to.be.eql("hola");
    expect(collection.getItem(2)).to.be.eql("estas");
    expect(collection.getItem(5)).to.be.eql("");
    expect(collection.getItem(1)).to.be.eql("tal");

    expect(collection.getItem(8)).to.be.undefined;
    expect(collection.getItem(-1)).to.be.undefined;
  })

  it('Test que comprueba el método removeItem', () => {
    let collection: StringSearchableCollection = new StringSearchableCollection(["hola", "que", "tal", "estas", "hola", "hola2", "hola3", "", "hola4"]);

    expect(collection.removeItem(0)).to.be.eql("hola");
    expect(collection.removeItem(2)).to.be.eql("estas");
    expect(collection.removeItem(5)).to.be.eql("");
    expect(collection.removeItem(1)).to.be.eql("tal");

    expect(collection.removeItem(8)).to.be.undefined;
    expect(collection.removeItem(-1)).to.be.undefined;
  })

  it('Test que comprueba el método getNumberOfItems', () => {
    let collection1: StringSearchableCollection = new StringSearchableCollection(["hola", "que", "tal", "estas", "hola", "hola2", "hola3", "", "hola4"]);
    let collection2: StringSearchableCollection = new StringSearchableCollection(["hola", "que", "tal", "estas", "hola"]);
    let collection3: StringSearchableCollection = new StringSearchableCollection([]);

    expect(collection1.getNumberOfItems()).to.be.eql(9);
    expect(collection2.getNumberOfItems()).to.be.eql(5);
    expect(collection3.getNumberOfItems()).to.be.eql(0);
  })

  it('Test que comprueba el método search', () => {
    let collection: StringSearchableCollection = new StringSearchableCollection(["hola", "que", "tal", "estas", "hola", "hola2", "hola3", "", "hola4"]);

    expect(collection.search("hola2")).to.be.eql(["hola2"]);
    expect(collection.search("hola")).to.be.eql(["hola", "hola"]);
    expect(collection.search("tal")).to.be.eql(["tal"]);
    expect(collection.search("type")).to.be.eql([]);
  })
})