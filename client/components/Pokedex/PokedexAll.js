import PokedexHeader from './PokedexHeader'
import PokedexList from './PokedexList'
import PokedexContent from './PokedexContent'

const PokedexAll = (props) => {
    return (
        <div>
            <PokedexHeader 
                rankmatchlist={props.rankmatchlist.data ? props.rankmatchlist.data : []}
                season={props.season}
                ruleset={props.ruleset}
                option={props.option}
                date={props.date}
                datelist={props.datelist.data ? props.datelist.data : []}
                onSetSeason={props.onSetSeason}
                onSetRuleset={props.onSetRuleset}
                onSetOption={props.onSetOption}
                onSetDate={props.onSetDate}
                width={props.width}
            />
            <PokedexList 
                pokedex={props.pokedex.data}
                pokemonranking={props.pokemonranking.data ? props.pokemonranking.data : {}}
                option={props.option}
                loading={props.pokedex.loading || props.pokemonranking.loading}
                onSetName={props.onSetName}
                width={props.width}
            />
            <PokedexContent
                pokemondetails={props.pokemondetails.data ? props.pokemondetails.data : {}}
                name={props.name}
                season={props.season}
                ruleset={props.ruleset}
                onSetName={props.onSetName}
                userid={props.userid}
                authenticated={props.authenticated}
                width={props.width}
            />
        </div>
    );
}

export default PokedexAll;