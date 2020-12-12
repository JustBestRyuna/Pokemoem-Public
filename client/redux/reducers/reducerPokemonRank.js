import * as actions from '../actions/PokemonRank'
import { reducerUtils, handleAsyncActions } from '../lib/asyncUtils'

const initialState = {
    pokedex: reducerUtils.initial(),
    rankmatchlist: reducerUtils.initial(),
    pokemonranking: reducerUtils.initial(),
    pokemondetails: reducerUtils.initial(),
    datelist: reducerUtils.initial(),
    season: '13',
    ruleset: '0',
    option: 'ranking',
    date: 'final',
    name: 'Zapdos',
    load: false
}

export default function pokedexReducer (state = initialState, action) {
    switch (action.type) {
        case actions.GET_POKEDEX:
        case actions.GET_POKEDEX_SUCCESS:
        case actions.GET_POKEDEX_ERROR:
            return handleAsyncActions(actions.GET_POKEDEX, 'pokedex')(state, action);
        case actions.GET_RANKMATCHLIST:
        case actions.GET_RANKMATCHLIST_SUCCESS:
        case actions.GET_RANKMATCHLIST_ERROR:
            return handleAsyncActions(actions.GET_RANKMATCHLIST, 'rankmatchlist')(state, action);
        case actions.GET_POKEMONRANKING:
        case actions.GET_POKEMONRANKING_SUCCESS:
        case actions.GET_POKEMONRANKING_ERROR:
            return handleAsyncActions(actions.GET_POKEMONRANKING, 'pokemonranking')(state, action);
        case actions.GET_DATELIST:
        case actions.GET_DATELIST_SUCCESS:
        case actions.GET_DATELIST_ERROR:
            return handleAsyncActions(actions.GET_DATELIST, 'datelist')(state, action);
        case actions.GET_POKEMONDETAILS:
        case actions.GET_POKEMONDETAILS_SUCCESS:
        case actions.GET_POKEMONDETAILS_ERROR:
            return handleAsyncActions(actions.GET_POKEMONDETAILS, 'pokemondetails')(state, action);
        case actions.CHANGE_SEASON:
            return {
                ...state,
                season: action.season
            }
        case actions.CHANGE_RULESET:
            return {
                ...state,
                ruleset: action.ruleset
            }
        case actions.CHANGE_OPTION:
            return {
                ...state,
                option: action.option
            }
        case actions.CHANGE_DATE:
            return {
                ...state,
                date: action.date
            }
        case actions.CHANGE_NAME:
            return {
                ...state,
                name: action.name
            }
        case actions.SET_LOAD:
            return {
                ...state,
                load: action.load
            }
        default:
            return state;
    }
}