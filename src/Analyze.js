async function AnalyzePosition(fen) {
    const resp = await fetch("https://stockfish.online/api/v2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fen: fen, depth: 12 })
    });
    const data = await resp.json();
    return data;
}