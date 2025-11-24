// ============================================================================
// Database Client - Works on both Web (sql.js) and Mobile (expo-sqlite)
// ============================================================================

import type { Database as SqlJsDatabase } from 'sql.js';
import { DB_NAME } from '@vidyut/shared';

export interface DatabaseClient {
    init(): Promise<void>;
    exec(sql: string, params?: any[]): Promise<any[]>;
    run(sql: string, params?: any[]): Promise<void>;
    get<T>(sql: string, params?: any[]): Promise<T | undefined>;
    all<T>(sql: string, params?: any[]): Promise<T[]>;
    close(): Promise<void>;
}

/**
 * Web Database Client using sql.js
 */
export class WebDatabaseClient implements DatabaseClient {
    private db: SqlJsDatabase | null = null;

    async init(): Promise<void> {
        if (this.db) return;

        const initSqlJs = await import('sql.js');
        const SQL = await initSqlJs.default({
            locateFile: (file) => `https://sql.js.org/dist/${file}`,
        });

        // Try to load existing database from IndexedDB
        const savedDb = await this.loadFromIndexedDB();
        if (savedDb) {
            this.db = new SQL.Database(savedDb);
        } else {
            this.db = new SQL.Database();
            await this.initSchema();
        }
    }

    async exec(sql: string, params: any[] = []): Promise<any[]> {
        if (!this.db) throw new Error('Database not initialized');
        const result = this.db.exec(sql, params);
        await this.saveToIndexedDB();
        return result;
    }

    async run(sql: string, params: any[] = []): Promise<void> {
        if (!this.db) throw new Error('Database not initialized');
        this.db.run(sql, params);
        await this.saveToIndexedDB();
    }

    async get<T>(sql: string, params: any[] = []): Promise<T | undefined> {
        const results = await this.all<T>(sql, params);
        return results[0];
    }

    async all<T>(sql: string, params: any[] = []): Promise<T[]> {
        if (!this.db) throw new Error('Database not initialized');
        const result = this.db.exec(sql, params);
        if (result.length === 0) return [];

        const columns = result[0].columns;
        const values = result[0].values;

        return values.map((row) => {
            const obj: any = {};
            columns.forEach((col, idx) => {
                obj[col] = row[idx];
            });
            return obj as T;
        });
    }

    async close(): Promise<void> {
        if (this.db) {
            await this.saveToIndexedDB();
            this.db.close();
            this.db = null;
        }
    }

    private async initSchema(): Promise<void> {
        const schemaResponse = await fetch('/schema.sql');
        const schema = await schemaResponse.text();
        await this.exec(schema);
    }

    private async saveToIndexedDB(): Promise<void> {
        if (!this.db) return;

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

    private async loadFromIndexedDB(): Promise<Uint8Array | null> {
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
        } catch {
            return null;
        }
    }

    private openIndexedDB(): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('PeerLearningDB', 1);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;
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
export class MobileDatabaseClient implements DatabaseClient {
    private db: any = null;

    async init(): Promise<void> {
        // In actual implementation:
        // import * as SQLite from 'expo-sqlite';
        // this.db = await SQLite.openDatabaseAsync(DB_NAME);
        // await this.initSchema();
        console.warn('Mobile database client not fully implemented');
    }

    async exec(_sql: string, _params: any[] = []): Promise<any[]> {
        if (!this.db) throw new Error('Database not initialized');
        // return await this.db.execAsync(sql, params);
        return [];
    }

    async run(_sql: string, _params: any[] = []): Promise<void> {
        if (!this.db) throw new Error('Database not initialized');
        // await this.db.runAsync(sql, params);
    }

    async get<T>(_sql: string, _params: any[] = []): Promise<T | undefined> {
        if (!this.db) throw new Error('Database not initialized');
        // return await this.db.getFirstAsync(sql, params);
        return undefined;
    }

    async all<T>(_sql: string, _params: any[] = []): Promise<T[]> {
        if (!this.db) throw new Error('Database not initialized');
        // return await this.db.getAllAsync(sql, params);
        return [];
    }

    async close(): Promise<void> {
        if (this.db) {
            // await this.db.closeAsync();
            this.db = null;
        }
    }

    // private async _initSchema(): Promise<void> {
    //     // Load and execute schema.sql
    // }

}

/**
 * Factory function to create appropriate database client
 */
export function createDatabaseClient(): DatabaseClient {
    const isWeb = typeof window !== 'undefined' && !('expo' in (globalThis as any));
    return isWeb ? new WebDatabaseClient() : new MobileDatabaseClient();
}

/**
 * Global database instance
 */
let dbInstance: DatabaseClient | null = null;

export async function getDatabase(): Promise<DatabaseClient> {
    if (!dbInstance) {
        dbInstance = createDatabaseClient();
        await dbInstance.init();
    }
    return dbInstance;
}
