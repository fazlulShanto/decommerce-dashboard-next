export function chunkText(text: string, maxLength: number = 800): string[] {
    const chunks: string[] = [];
    const paragraphs = text
        .split(/\n+/)
        .map((p) => p.trim())
        .filter(Boolean);

    for (const p of paragraphs) {
        if (p.length <= maxLength) {
            chunks.push(p);
        } else {
            const sentences = p.split(/(?<=[.!?])\s+/);
            let currentChunk = "";
            for (const s of sentences) {
                if ((currentChunk + " " + s).length <= maxLength) {
                    currentChunk = (currentChunk + " " + s).trim();
                } else {
                    if (currentChunk) chunks.push(currentChunk);
                    currentChunk = s;
                }
            }
            if (currentChunk) chunks.push(currentChunk);
        }
    }

    const combinedChunks: string[] = [];
    let temp = "";
    for (const c of chunks) {
        if ((temp + "\n" + c).length <= maxLength) {
            temp = temp ? temp + "\n" + c : c;
        } else {
            if (temp) combinedChunks.push(temp);
            temp = c;
        }
    }
    if (temp) combinedChunks.push(temp);

    return combinedChunks.length > 0
        ? combinedChunks
        : [text.slice(0, maxLength)];
}

export async function generateEmbeddings(
    text: string,
): Promise<{ text: string; vector: number[] }[]> {
    const url = "https://api.jina.ai/v1/embeddings";
    const token = process.env.EMBEDDING_API_KEY;

    if (!token) {
        throw new Error(
            "EMBEDDING_API_KEY is not set in environment variables",
        );
    }

    const chunks = chunkText(text);

    const requestData = {
        model: "jina-embeddings-v5-text-small",
        task: "text-matching",
        late_chunking: true,
        input: chunks,
    };

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
        body: JSON.stringify(requestData),
    });

    if (!response.ok) {
        const errText = await response.text();
        throw new Error(
            `Jina AI embedding failed with status ${response.status}: ${errText}`,
        );
    }

    const data = await response.json();

    if (!data?.data || !Array.isArray(data.data)) {
        throw new Error("Jina AI response did not contain an embedding array");
    }

    return data.data.map((item: any, index: number) => ({
        text: chunks[index],
        vector: item.embedding,
    }));
}

export async function rerankDocuments(
    query: string,
    documents: string[],
    topN: number = 3,
): Promise<string[]> {
    if (!documents || documents.length === 0) {
        return [];
    }

    const url = "https://api.jina.ai/v1/rerank";
    const token = process.env.RERANKER_API_KEY;

    if (!token) {
        throw new Error("RERANKER_API_KEY is not set in environment variables");
    }

    const requestData = {
        model: "jina-reranker-v3",
        query: query,
        top_n: topN,
        documents: documents,
    };

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
        body: JSON.stringify(requestData),
    });

    if (!response.ok) {
        const errText = await response.text();
        throw new Error(
            `Jina AI reranker failed with status ${response.status}: ${errText}`,
        );
    }

    const data = await response.json();

    if (!data?.results || !Array.isArray(data.results)) {
        throw new Error(
            "Jina AI reranker response did not contain a results array",
        );
    }

    // Results from Jina contain original text if return_documents is true (which is the default)
    return data.results.map((result: any) => result.document.text);
}
