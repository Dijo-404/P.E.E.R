// ============================================================================
// Database Client - Works on both Web (sql.js) and Mobile (expo-sqlite)
// ============================================================================
import { DB_NAME } from '@vidyut/shared';
/**
 * Web Database Client using sql.js
 */
export class WebDatabaseClient {
    constructor() {
        Object.defineProperty(this, "db", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
    }
    async init() {
        if (this.db)
            return;
        const initSqlJs = await import('sql.js');
        const SQL = await initSqlJs.default({
            locateFile: (file) => `https://sql.js.org/dist/${file}`,
        });
        // Try to load existing database from IndexedDB
        const savedDb = await this.loadFromIndexedDB();
        if (savedDb) {
            this.db = new SQL.Database(savedDb);
        }
        else {
            this.db = new SQL.Database();
            await this.initSchema();
        }
    }
    async exec(sql, params = []) {
        if (!this.db)
            throw new Error('Database not initialized');
        const result = this.db.exec(sql, params);
        await this.saveToIndexedDB();
        return result;
    }
    async run(sql, params = []) {
        if (!this.db)
            throw new Error('Database not initialized');
        this.db.run(sql, params);
        await this.saveToIndexedDB();
    }
    async get(sql, params = []) {
        const results = await this.all(sql, params);
        return results[0];
    }
    async all(sql, params = []) {
        if (!this.db)
            throw new Error('Database not initialized');
        const result = this.db.exec(sql, params);
        if (result.length === 0)
            return [];
        const columns = result[0].columns;
        const values = result[0].values;
        return values.map((row) => {
            const obj = {};
            columns.forEach((col, idx) => {
                obj[col] = row[idx];
            });
            return obj;
        });
    }
    async close() {
        if (this.db) {
            await this.saveToIndexedDB();
            this.db.close();
            this.db = null;
        }
    }
    async initSchema() {
        const schemaResponse = await fetch('/schema.sql');
        const schema = await schemaResponse.text();
        await this.exec(schema);
    }
    async saveToIndexedDB() {
        if (!this.db)
            return;
        const data = this.db.export();
        const db = await this.openIndexedDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(['databases'], 'readwrite');
            const store = tx.objectStore('databases');
            const request = store.put({ name: DB_NAME, data });
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }
    async loadFromIndexedDB() {
        try {
            const db = await this.openIndexedDB();
            return new Promise((resolve, reject) => {
                const tx = db.transaction(['databases'], 'readonly');
                const store = tx.objectStore('databases');
                const request = store.get(DB_NAME);
                request.onsuccess = () => {
                    const result = request.result;
                    resolve(result?.data || null);
                };
                request.onerror = () => reject(request.error);
            });
        }
        catch {
            return null;
        }
    }
    openIndexedDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('PeerLearningDB', 1);
            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains('databases')) {
                    db.createObjectStore('databases', { keyPath: 'name' });
                }
            };
        });
    }
}
/**
 * Mobile Database Client using expo-sqlite
 * Note: This is a placeholder. Actual implementation requires expo-sqlite
 */
export class MobileDatabaseClient {
    constructor() {
        Object.defineProperty(this, "db", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        // private async _initSchema(): Promise<void> {
        //     // Load and execute schema.sql
        // }
    }
    async init() {
        // In actual implementation:
        // import * as SQLite from 'expo-sqlite';
        // this.db = await SQLite.openDatabaseAsync(DB_NAME);
        // await this.initSchema();
        console.warn('Mobile database client not fully implemented');
    }
    async exec(_sql, _params = []) {
        if (!this.db)
            throw new Error('Database not initialized');
        // return await this.db.execAsync(sql, params);
        return [];
    }
    async run(_sql, _params = []) {
        if (!this.db)
            throw new Error('Database not initialized');
        // await this.db.runAsync(sql, params);
    }
    async get(_sql, _params = []) {
        if (!this.db)
            throw new Error('Database not initialized');
        // return await this.db.getFirstAsync(sql, params);
        return undefined;
    }
    async all(_sql, _params = []) {
        if (!this.db)
            throw new Error('Database not initialized');
        // return await this.db.getAllAsync(sql, params);
        return [];
    }
    async close() {
        if (this.db) {
            // await this.db.closeAsync();
            this.db = null;
        }
    }
}
/**
 * Factory function to create appropriate database client
 */
export function createDatabaseClient() {
    const isWeb = typeof window !== 'undefined' && !('expo' in globalThis);
    return isWeb ? new WebDatabaseClient() : new MobileDatabaseClient();
}
/**
 * Global database instance
 */
let dbInstance = null;
export async function getDatabase() {
    if (!dbInstance) {
        dbInstance = createDatabaseClient();
        await dbInstance.init();
    }
    return dbInstance;
}
