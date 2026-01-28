import { Dexie } from 'dexie';

export const db = new Dexie('lotrJimeDecks');

db.version(1).stores({
  decks: '++id, name, createdAt, updatedAt',
});

db.open()
  .then(() => {
    console.log('DB connection success.');
  })
  .catch((err) => {
    console.error(`Failed to open DB: ${err.stack || err}`);
  });
