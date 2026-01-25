import { Dexie } from 'dexie';

export const db = new Dexie('myDatabase');
db.version(1).stores({
  deck: '++id, name, createdAt', // Primary key and indexed props
});

