import httpGet from '../http-get';

export const getPokedex = async () => {
    const response = await httpGet.get(`/pokedex`);
    return response.data;
}

export const getRankMatchList = async () => {
    const response = await httpGet.get(`/metas/rankmatchlist`);
    return response.data;
}

export const getPokemonRanking = async ({season, ruleset, date}) => {
    const response = await httpGet.get(`/metas/pokemonrank/${season}/${ruleset}/${date}`);
    return response.data;
}

export const getPokemonDetails = async ({season, ruleset, date}) => {
    const response = await httpGet.get(`metas/pokemondetails/${season}/${ruleset}/${date}`);
    return response.data;
}

export const getDateList = async (season) => {
    const response = await httpGet.get(`/metas/dates/${season}`);
    return response.data;
}