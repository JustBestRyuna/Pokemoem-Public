import { combineReducers } from 'redux';
import PokedexReducer from './reducerPokemonRank';
import CalcReducer from './reducerCalc';
import AuthReducer from './reducerAuth';

const rootReducer = combineReducers({
    pokedex: PokedexReducer,
    auth: AuthReducer,
});

export default rootReducer;