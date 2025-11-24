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
export declare class WebDatabaseClient implements DatabaseClient {
    private db;
    init(): Promise<void>;
    exec(sql: string, params?: any[]): Promise<any[]>;
    run(sql: string, params?: any[]): Promise<void>;
    get<T>(sql: string, params?: any[]): Promise<T | undefined>;
    all<T>(sql: string, params?: any[]): Promise<T[]>;
    close(): Promise<void>;
    private initSchema;
    private saveToIndexedDB;
    private loadFromIndexedDB;
    private openIndexedDB;
}
/**
 * Mobile Database Client using expo-sqlite
 * Note: This is a placeholder. Actual implementation requires expo-sqlite
 */
export declare class MobileDatabaseClient implements DatabaseClient {
    private db;
    init(): Promise<void>;
    exec(_sql: string, _params?: any[]): Promise<any[]>;
    run(_sql: string, _params?: any[]): Promise<void>;
    get<T>(_sql: string, _params?: any[]): Promise<T | undefined>;
    all<T>(_sql: string, _params?: any[]): Promise<T[]>;
    close(): Promise<void>;
}
/**
 * Factory function to create appropriate database client
 */
export declare function createDatabaseClient(): DatabaseClient;
export declare function getDatabase(): Promise<DatabaseClient>;
