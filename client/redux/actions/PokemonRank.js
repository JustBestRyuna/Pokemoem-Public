import * as dexAPI from '../../api/pokedex';
import { createPromiseThunk } from '../lib/asyncUtils';

export const GET_POKEDEX = "GET_POKEDEX";
export const GET_POKEDEX_SUCCESS = "GET_POKEDEX_SUCCESS";
export const GET_POKEDEX_ERROR = "GET_POKEDEX_ERROR";

export const GET_RANKMATCHLIST = "GET_RANKMATCHLIST";
export const GET_RANKMATCHLIST_SUCCESS = "GET_RANKMATCHLIST_SUCCESS";
export const GET_RANKMATCHLIST_ERROR = "GET_RANKMATCHLIST_ERROR";

export const GET_POKEMONRANKING = "GET_POKEMONRANKING";
export const GET_POKEMONRANKING_SUCCESS = "GET_POKEMONRANKING_SUCCESS";
export const GET_POKEMONRANKING_ERROR = "GET_POKEMONRANKING_ERROR";

export const GET_POKEMONDETAILS = "GET_POKEMONDETAILS";
export const GET_POKEMONDETAILS_SUCCESS = "GET_POKEMONDETAILS_SUCCESS";
export const GET_POKEMONDETAILS_ERROR = "GET_POKEMONDETAILS_ERROR";

export const GET_DATELIST = "GET_DATELIST";
export const GET_DATELIST_SUCCESS = "GET_DATELIST_SUCCESS";
export const GET_DATELIST_ERROR = "GET_DATELIST_ERROR";

export const CHANGE_SEASON = "CHANGE_SEASON";
export const CHANGE_RULESET = "CHANGE_RULESET";
export const CHANGE_OPTION = "CHANGE_OPTION";
export const CHANGE_DATE = "CHANGE_DATE";
export const CHANGE_NAME = "CHANGE_NAME";
export const SET_LOAD = "SET_LOAD";

export const getPokedex = createPromiseThunk(GET_POKEDEX, dexAPI.getPokedex);
export const getRankMatchList = createPromiseThunk(GET_RANKMATCHLIST, dexAPI.getRankMatchList);
export const getPokemonRanking = createPromiseThunk(GET_POKEMONRANKING, dexAPI.getPokemonRanking);
export const getDateList = createPromiseThunk(GET_DATELIST, dexAPI.getDateList);
export const getPokemonDetails = createPromiseThunk(GET_POKEMONDETAILS, dexAPI.getPokemonDetails);

export const changeSeason = (season) => {
    return {
        type: CHANGE_SEASON,
        season
    }
}

export const changeRuleset = (ruleset) => {
    return {
        type: CHANGE_RULESET,
        ruleset
    }
}

export const changeOption = (option) => {
    return {
        type: CHANGE_OPTION,
        option
    }
}

export const changeDate = (date) => {
    return {
        type: CHANGE_DATE,
        date
    }
}

export const changeName = (name) => {
    return {
        type: CHANGE_NAME,
        name
    }
}

export const setLoad = (load) => {
    return {
        type: SET_LOAD,
        load
    }
}