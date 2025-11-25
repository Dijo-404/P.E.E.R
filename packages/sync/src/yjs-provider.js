// ============================================================================
// Yjs CRDT Provider for Offline-First Sync
// ============================================================================
import * as Y from 'yjs';
import { IndexeddbPersistence } from 'y-indexeddb';
export class YjsProvider {
    constructor() {
        Object.defineProperty(this, "docs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        Object.defineProperty(this, "persistence", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
    }
    /**
     * Get or create a Yjs document
     */
    getDocument(docName) {
        if (!this.docs.has(docName)) {
            const doc = new Y.Doc();
            this.docs.set(docName, doc);
            // Set up IndexedDB persistence
            const persistence = new IndexeddbPersistence(docName, doc);
            this.persistence.set(docName, persistence);
            // Set up change listeners
            doc.on('update', (update) => {
                this.onDocumentUpdate(docName, update);
            });
        }
        return this.docs.get(docName);
    }
    /**
     * Get a shared type from a document
     */
    getSharedType(docName, typeName, typeConstructor) {
        const doc = this.getDocument(docName);
        return doc.get(typeName, typeConstructor);
    }
    /**
     * Get a shared map (for key-value data)
     */
    getSharedMap(docName, mapName) {
        return this.getSharedType(docName, mapName, Y.Map);
    }
    /**
     * Get a shared array (for ordered data)
     */
    getSharedArray(docName, arrayName) {
        return this.getSharedType(docName, arrayName, Y.Array);
    }
    /**
     * Get a shared text (for collaborative text editing)
     */
    getSharedText(docName, textName) {
        return this.getSharedType(docName, textName, Y.Text);
    }
    /**
     * Sync document state with another device
     */
    async syncWithDevice(docName, _deviceId, stateVector) {
        const doc = this.getDocument(docName);
        const diff = Y.encodeStateAsUpdate(doc, stateVector);
        return diff;
    }
    /**
     * Apply update from another device
     */
    async applyUpdate(docName, update) {
        const doc = this.getDocument(docName);
        Y.applyUpdate(doc, update);
    }
    /**
     * Get current state vector for a document
     */
    getStateVector(docName) {
        const doc = this.getDocument(docName);
        return Y.encodeStateVector(doc);
    }
    /**
     * Export document as update
     */
    exportDocument(docName) {
        const doc = this.getDocument(docName);
        return Y.encodeStateAsUpdate(doc);
    }
    /**
     * Import document from update
     */
    importDocument(docName, update) {
        const doc = this.getDocument(docName);
        Y.applyUpdate(doc, update);
    }
    /**
     * Handle document updates
     */
    onDocumentUpdate(docName, update) {
        // This will be called whenever the document changes
        // Can be used to trigger sync with other devices
        console.log(`Document ${docName} updated, size: ${update.length} bytes`);
    }
    /**
     * Destroy a document and clean up
     */
    async destroyDocument(docName) {
        const persistence = this.persistence.get(docName);
        if (persistence) {
            await persistence.destroy();
            this.persistence.delete(docName);
        }
        const doc = this.docs.get(docName);
        if (doc) {
            doc.destroy();
            this.docs.delete(docName);
        }
    }
    /**
     * Destroy all documents
     */
    async destroyAll() {
        const docNames = Array.from(this.docs.keys());
        await Promise.all(docNames.map((name) => this.destroyDocument(name)));
    }
}
/**
 * Global Yjs provider instance
 */
let yjsProviderInstance = null;
export function getYjsProvider() {
    if (!yjsProviderInstance) {
        yjsProviderInstance = new YjsProvider();
    }
    return yjsProviderInstance;
}
/**
 * Helper to sync learning progress using Yjs
 */
export function syncLearningProgress(userId) {
    const provider = getYjsProvider();
    const progressMap = provider.getSharedMap(`progress:${userId}`, 'progress');
    return progressMap;
}
/**
 * Helper to sync chat messages using Yjs
 */
export function syncChatMessages(conversationId) {
    const provider = getYjsProvider();
    const messagesArray = provider.getSharedArray(`chat:${conversationId}`, 'messages');
    return messagesArray;
}
