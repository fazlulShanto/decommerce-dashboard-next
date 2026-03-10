import { QdrantClient } from "@qdrant/js-client-rest";

const getQdrantClient = () => {
    const url = process.env.QDRAND_ENDPOINT;
    const apiKey = process.env.QDRAND_KEY;

    if (!url || !apiKey) {
        throw new Error(
            "QDRAND_ENDPOINT or QDRAND_KEY is not set in environment variables",
        );
    }

    return new QdrantClient({
        url,
        apiKey,
    });
};

const COLLECTION_NAME = "decommerce_knowledge";
const VECTOR_SIZE = 1024; // jina-embeddings-v5-text-small output dimension

export async function ensureCollectionExists() {
    const client = getQdrantClient();
    try {
        const result = await client.collectionExists(COLLECTION_NAME);
        if (!result.exists) {
            console.log(`Creating Qdrant collection: ${COLLECTION_NAME}`);
            await client.createCollection(COLLECTION_NAME, {
                vectors: {
                    size: VECTOR_SIZE,
                    distance: "Cosine",
                },
            });

            // Create payload index for guildId to optimize retrieval filtering
            console.log(
                `Creating payload index for 'guildId' on ${COLLECTION_NAME}`,
            );
            await client.createPayloadIndex(COLLECTION_NAME, {
                field_name: "guildId",
                field_schema: "keyword",
                wait: true,
            });
        }
    } catch (error) {
        console.error("Error ensuring Qdrant collection exists:", error);
        throw error;
    }
}

export async function upsertVector(
    id: string,
    vector: number[],
    payload: Record<string, any>,
) {
    const client = getQdrantClient();
    await ensureCollectionExists();

    await client.upsert(COLLECTION_NAME, {
        wait: true,
        points: [
            {
                id,
                vector,
                payload,
            },
        ],
    });
}

export async function deleteVectorsByPayloadMatch(key: string, value: string) {
    const client = getQdrantClient();

    try {
        const exists = await client.collectionExists(COLLECTION_NAME);
        if (!exists.exists) return;

        await client.delete(COLLECTION_NAME, {
            filter: {
                must: [
                    {
                        key,
                        match: { value },
                    },
                ],
            },
            wait: true,
        });
    } catch (error) {
        console.error("Error deleting vectors from Qdrant:", error);
    }
}
