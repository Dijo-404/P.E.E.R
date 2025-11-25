import * as Y from 'yjs';
export declare class YjsProvider {
    private docs;
    private persistence;
    /**
     * Get or create a Yjs document
     */
    getDocument(docName: string): Y.Doc;
    /**
     * Get a shared type from a document
     */
    getSharedType<T extends Y.AbstractType<any>>(docName: string, typeName: string, typeConstructor: new () => T): T;
    /**
     * Get a shared map (for key-value data)
     */
    getSharedMap<T = any>(docName: string, mapName: string): Y.Map<T>;
    /**
     * Get a shared array (for ordered data)
     */
    getSharedArray<T = any>(docName: string, arrayName: string): Y.Array<T>;
    /**
     * Get a shared text (for collaborative text editing)
     */
    getSharedText(docName: string, textName: string): Y.Text;
    /**
     * Sync document state with another device
     */
    syncWithDevice(docName: string, _deviceId: string, stateVector: Uint8Array): Promise<Uint8Array>;
    /**
     * Apply update from another device
     */
    applyUpdate(docName: string, update: Uint8Array): Promise<void>;
    /**
     * Get current state vector for a document
     */
    getStateVector(docName: string): Uint8Array;
    /**
     * Export document as update
     */
    exportDocument(docName: string): Uint8Array;
    /**
     * Import document from update
     */
    importDocument(docName: string, update: Uint8Array): void;
    /**
     * Handle document updates
     */
    private onDocumentUpdate;
    /**
     * Destroy a document and clean up
     */
    destroyDocument(docName: string): Promise<void>;
    /**
     * Destroy all documents
     */
    destroyAll(): Promise<void>;
}
export declare function getYjsProvider(): YjsProvider;
/**
 * Helper to sync learning progress using Yjs
 */
export declare function syncLearningProgress(userId: string): Y.Map<any>;
/**
 * Helper to sync chat messages using Yjs
 */
export declare function syncChatMessages(conversationId: string): Y.Array<any>;
