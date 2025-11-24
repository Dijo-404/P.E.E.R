// ============================================================================
// Yjs CRDT Provider for Offline-First Sync
// ============================================================================

import * as Y from 'yjs';
import { IndexeddbPersistence } from 'y-indexeddb';
import type { SyncLog } from '@vidyut/shared';
import { generateId } from '@vidyut/shared';

export class YjsProvider {
    private docs: Map<string, Y.Doc> = new Map();
    private persistence: Map<string, IndexeddbPersistence> = new Map();

    /**
     * Get or create a Yjs document
     */
    getDocument(docName: string): Y.Doc {
        if (!this.docs.has(docName)) {
            const doc = new Y.Doc();
            this.docs.set(docName, doc);

            // Set up IndexedDB persistence
            const persistence = new IndexeddbPersistence(docName, doc);
            this.persistence.set(docName, persistence);

            // Set up change listeners
            doc.on('update', (update: Uint8Array) => {
                this.onDocumentUpdate(docName, update);
            });
        }

        return this.docs.get(docName)!;
    }

    /**
     * Get a shared type from a document
     */
    getSharedType<T extends Y.AbstractType<any>>(
        docName: string,
        typeName: string,
        typeConstructor: new () => T
    ): T {
        const doc = this.getDocument(docName);
        return doc.get(typeName, typeConstructor) as T;
    }

    /**
     * Get a shared map (for key-value data)
     */
    getSharedMap<T = any>(docName: string, mapName: string): Y.Map<T> {
        return this.getSharedType(docName, mapName, Y.Map);
    }

    /**
     * Get a shared array (for ordered data)
     */
    getSharedArray<T = any>(docName: string, arrayName: string): Y.Array<T> {
        return this.getSharedType(docName, arrayName, Y.Array);
    }

    /**
     * Get a shared text (for collaborative text editing)
     */
    getSharedText(docName: string, textName: string): Y.Text {
        return this.getSharedType(docName, textName, Y.Text);
    }

    /**
     * Sync document state with another device
     */
    async syncWithDevice(docName: string, deviceId: string, stateVector: Uint8Array): Promise<Uint8Array> {
        const doc = this.getDocument(docName);
        const diff = Y.encodeStateAsUpdate(doc, stateVector);
        return diff;
    }

    /**
     * Apply update from another device
     */
    async applyUpdate(docName: string, update: Uint8Array): Promise<void> {
        const doc = this.getDocument(docName);
        Y.applyUpdate(doc, update);
    }

    /**
     * Get current state vector for a document
     */
    getStateVector(docName: string): Uint8Array {
        const doc = this.getDocument(docName);
        return Y.encodeStateVector(doc);
    }

    /**
     * Export document as update
     */
    exportDocument(docName: string): Uint8Array {
        const doc = this.getDocument(docName);
        return Y.encodeStateAsUpdate(doc);
    }

    /**
     * Import document from update
     */
    importDocument(docName: string, update: Uint8Array): void {
        const doc = this.getDocument(docName);
        Y.applyUpdate(doc, update);
    }

    /**
     * Handle document updates
     */
    private onDocumentUpdate(docName: string, update: Uint8Array): void {
        // This will be called whenever the document changes
        // Can be used to trigger sync with other devices
        console.log(`Document ${docName} updated, size: ${update.length} bytes`);
    }

    /**
     * Destroy a document and clean up
     */
    async destroyDocument(docName: string): Promise<void> {
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
    async destroyAll(): Promise<void> {
        const docNames = Array.from(this.docs.keys());
        await Promise.all(docNames.map((name) => this.destroyDocument(name)));
    }
}

/**
 * Global Yjs provider instance
 */
let yjsProviderInstance: YjsProvider | null = null;

export function getYjsProvider(): YjsProvider {
    if (!yjsProviderInstance) {
        yjsProviderInstance = new YjsProvider();
    }
    return yjsProviderInstance;
}

/**
 * Helper to sync learning progress using Yjs
 */
export function syncLearningProgress(userId: string) {
    const provider = getYjsProvider();
    const progressMap = provider.getSharedMap(`progress:${userId}`, 'progress');
    return progressMap;
}

/**
 * Helper to sync chat messages using Yjs
 */
export function syncChatMessages(conversationId: string) {
    const provider = getYjsProvider();
    const messagesArray = provider.getSharedArray(`chat:${conversationId}`, 'messages');
    return messagesArray;
}
