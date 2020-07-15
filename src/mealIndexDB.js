/* eslint-disable no-fallthrough */
import { openDB } from 'idb/with-async-ittr';

export default class MealIDB {
  constructor(name, version) {
    if (!('indexedDB' in window)) {
      throw new Error('No IndexDB support');
    }
    this.name = name;
    this.version = version;
    this.createDB();
  }

  async createDB() {
    console.log(`Creating ${this.name}, version ${this.version}...`);

    this.dbPromise = await openDB(this.name, this.version, {
      upgrade(db) {
        // Create a store of objects
        console.log('Creating the meals object store');
        const store = db.createObjectStore('meals', {
          // The 'id' property of the object will be the key.
          keyPath: 'name',
          // If it isn't explicitly set, create a value by auto incrementing.
          // autoIncrement: true,
        });
        // Create an index on the 'name' property of the objects.
        store.createIndex('name', 'name', { unique: true });
      },
    });
  }

  // READ
  getMeal(query) {
    // use the get method to get an object by name
    if (query.trim() === '') return;

    console.log(`Fetching ${query} from db...`);
    const tx = this.dbPromise.transaction('meals', 'readonly');
    const store = tx.objectStore('meals');
    const index = store.index('name');
    return index.get(query).then(data => data);
  }

  // CREATE
  async addMeals(query, jsonData) {
    // All database operations must be carried out within a transaction.
    // we first open the transaction on the database object and then open the object store on the transaction.
    // Now when we call store.add on that object store, the operation happens inside the transaction.
    if (!query && !jsonData) return;

    const tx = this.dbPromise.transaction('meals', 'readwrite');
    const store = tx.objectStore('meals');
    console.log('Adding query: ', query);

    try {
      await store.add(jsonData);
      console.log(`${query} added successfully!`);
    } catch (error) {
      tx.abort();
      console.log(error);
    }

    // this.dbPromise
    //   .then(db => {
    //     var tx = db.transaction('meals', 'readwrite');
    //     var store = tx.objectStore('meals');
    //     console.log('Adding query: ', query);
    //     return store.add(jsonData);
    //   })
    //   .catch(e => {
    //     tx.abort();
    //     console.log(e);
    //   })
    //   .then(function (dd) {
    //     console.log('All items added successfully! ' + dd);
    //   });
  }
}
