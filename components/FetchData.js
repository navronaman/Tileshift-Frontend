async function loadJsonData(filename) {
    try {
        const response = await fetch(`./data/${filename}`); // Ensure correct path
        if (!response.ok) {
            throw new Error(`Failed to fetch ${filename}: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(`Loaded ${filename}:`, data);
        return data;
    } catch (error) {
        console.error("Error loading JSON:", error.message);
        return null;
    }
}

export async function fetchBiasData(query) {
    console.log("fetchBiasData:", query);

    // Manual check for specific queries
    if (query === 'birthright citizenship') {
        return await loadJsonData("birthright_citizenship_news_analysis.json");
    } else if (query === 'california fires') {
        return await loadJsonData("california_fires_news_analysis.json");
    } else if (query === 'canada tariffs') {
        return await loadJsonData("canada_tarrifs_news_analysis.json");
    } else if (query === 'dei plane') {
        return await loadJsonData("dei_plane_news_analysis.json");
    }

    const url = `http://localhost:5000/process?query=${encodeURIComponent(query)}`;

    try {
        console.log("Fetching from URL:", url);
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: Failed to fetch data`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("API Error:", error.message);
        return null; // Instead of redirecting, return null
    }
}
