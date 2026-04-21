const API_URL = "https://official-joke-api.appspot.com/random_ten";

async function fetchJokes() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const jokes = await response.json();

        const filtered = jokes.filter((joke) => joke.type === "general");

        const formatted = filtered.map((joke) => ({
            id: joke.id,
            question: joke.setup,
            answer: joke.punchline,
        }));

        formatted.forEach((joke) => {
            console.log(`Q: ${joke.question}`);
            console.log(`R: ${joke.answer}`);
            console.log("---");
        });

        return formatted;

    } catch (err) {
        console.error("Impossible de récupérer les blagues :", err.message);
        return [];
    }
}

Promise.all([fetchJokes(), fetchJokes()]).then((results) => {})
