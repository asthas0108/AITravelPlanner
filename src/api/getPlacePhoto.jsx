export default async function handler(req, res) {
    const { query } = req.query;  // Get search query from request
    const API_KEY = import.meta.env.VITE_PEXELS_API_KEY; // Use environment variable
    const url = `https://api.pexels.com/v1/search?query=${query}&per_page=1`;

    try {
        const response = await fetch(url, {
            headers: { Authorization: API_KEY }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch from Pexels API");
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
