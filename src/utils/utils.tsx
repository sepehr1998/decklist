const API_BASE_URL = 'https://ringsdb.com/api/public/decklist';
const HERO_BASE_URL = 'https://ringsdb.com/api/public/card';

export const fetchDeckById = async (deckId: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/${deckId}.json`);

        if (!response.ok) {
            throw new Error('Failed to fetch deck');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching deck:', error);
        throw error;
    }
};


export async function fetchHeroDetails(heroId: string): Promise<{ id: string, name: string }> {
    const response = await fetch(`${HERO_BASE_URL}/${heroId}.json`);
    const data = await response.json();
    // return { id: heroId, name: data.name };
    return data;
}