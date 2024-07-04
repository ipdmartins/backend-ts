import Database from 'better-sqlite3';

const db = new Database('database.db');

function searchForTableInDB(tableName: string) {
	// Check if the user table exists
	const resp = db
		.prepare(
			`SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}';`
		)
		.get();

	return resp;
}

function initializeDatabase() {
	const tableExists = searchForTableInDB('user');

	// If the user table does not exist, create it
	if (!tableExists) {
		db.prepare(
			`CREATE TABLE user (
            uuid TEXT PRIMARY KEY,
            clientId TEXT NOT NULL,
            hostId TEXT NOT NULL,
            type TEXT NOT NULL,
            description TEXT NULL,
            initial_date TEXT NOT NULL,
            final_date TEXT NOT NULL
          );`
		).run();
	} else {
		console.log('user table already exists.');
	}

	const tableEvent = searchForTableInDB('event');
	// If the event table does not exist, create it
	if (!tableExists) {
		db.prepare(
			`CREATE TABLE event (
            uuid TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            description TEXT NULL,
            initial_date TEXT NOT NULL,
            final_date TEXT NOT NULL
          );`
		).run();
	} else {
		console.log('event table already exists.');
	}
}

initializeDatabase();

export default db;
