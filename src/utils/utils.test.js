import { fetchDeckById, fetchHeroDetails } from './utils';

describe('fetchDeckById function', () => {
    beforeEach(() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ name: 'Mock Deck', heroes: [] }),
            })
        );
    });

    afterEach(() => {
        global.fetch.mockClear();
        delete global.fetch;
    });

    it('fetches deck details successfully', async () => {
        const deckId = '123';
        const data = await fetchDeckById(deckId);
        expect(data).toEqual({ name: 'Mock Deck', heroes: [] });

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith(`https://ringsdb.com/api/public/decklist/${deckId}.json`);
    });

    it('throws an error if fetching deck fails', async () => {
        global.fetch.mockImplementationOnce(() => Promise.reject('Failed to fetch'));

        const deckId = '123';
        await expect(fetchDeckById(deckId)).rejects.toEqual('Failed to fetch');

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith(`https://ringsdb.com/api/public/decklist/${deckId}.json`);
    });
});

describe('fetchHeroDetails function', () => {
    beforeEach(() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ id: '123', name: 'Mock Hero' }),
            })
        );
    });

    afterEach(() => {
        global.fetch.mockClear();
        delete global.fetch;
    });

    it('fetches hero details successfully', async () => {
        const heroId = '123';
        const data = await fetchHeroDetails(heroId);
        expect(data).toEqual({ id: '123', name: 'Mock Hero' });

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith(`https://ringsdb.com/api/public/card/${heroId}.json`);
    });
});
