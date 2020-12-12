import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { TriangleRight, TriangleLeft } from '@styled-icons/entypo'

import PokedexListItem from './pokedexListItem'

const ListStyle = styled.div`
    left: 0px;
    top: 160px;
    bottom: 0;
    width: 310px;
    position: fixed;
    box-sizing: border-box;
`;

const SearchBarStyle = styled.input`
    font-size: 15px;
    font-family: inherit;
    width: 98%;
    padding: 5px;
`;

const ListItemsStyle = styled.div`
    text-align: left;
    height: 94%;
    overflow: auto;
`;

const MobileListStyle = styled.div`
    left: 0px;
    top: 160px;
    bottom: 0;
    width: 95%;
    position: fixed;
    box-sizing: border-box;
    background-color: white;
    z-index: 1;
`;

const MobileContentToggleDiv = styled.div`
    right: 0px;
    top: 160px;
    bottom: 0;
    width: 5%;
    position: fixed;
    vertical-align: middle;
    box-sizing: border-box;
    background-color: white;
    z-index: 1;
`;

const MobileListToggleDiv = styled.div`
    left: 0px;
    top: 160px;
    bottom: 0;
    width: 5%;
    position: fixed;
    box-sizing: border-box;
    vertical-align: middle;
    border-right: 1px solid #ccc;
`;

const TriangleLeftStyle = styled(TriangleLeft)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const TriangleRightStyle = styled(TriangleRight)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const PokedexList = (props) => {

    const [search, setSearch] = useState('');
    const [pokemonList, setPokemonList] = useState(null);
    const [filteredList, setFilteredList] = useState(null);
    const [scrollLimit, setScrollLimit] = useState(30);
    const [mobile, setMobile] = useState(false);
    const [contentToggle, setContentToggle] = useState(false);

    const onChange = (e) => {
        setSearch(e.target.value);
        setScrollLimit(30);
        setFilteredList(e.target.value ? pokemonList.filter((c) => {
            return c ? c.name_ko.includes(e.target.value) : false;
        }) : pokemonList);
    }

    const onScroll = (e) => {
        const scrollTop = e.target.scrollTop;
        const scrollHeight = e.target.scrollHeight;
        const offsetHeight = e.target.offsetHeight;
        const scrolledToBottom = Math.ceil(scrollTop + offsetHeight) >= (scrollHeight);
        if (scrolledToBottom) {
            setScrollLimit(scrollLimit + 30);
        }
    }

    const handleContentToggle = (e) => {
        setContentToggle(true);
    }

    const handleListToggle = (e) => {
        setContentToggle(false);
    }

    useEffect(() => {
        if (props.width < 775) {
            setMobile(true);
        } else {
            setMobile(false);
            setContentToggle(false);
        }
    }, [props.width]);

    useEffect(() => {
        if (props.loading || 
            !props.pokedex ||
            !Object.keys(props.pokedex).length || 
            !props.pokemonranking || 
            !Object.keys(props.pokemonranking).length) {
            return;
        }
        if (props.option == "ranking") {
            const newList = [];
            for (let i = 0; i < props.pokemonranking.length; i++) {
                newList.push(props.pokedex.filter((c) => {
                    return c.dex_no == props.pokemonranking[i].id && c.form == props.pokemonranking[i].form
                })[0]);
                if (newList[i]) newList[i].ranking = i + 1;
            }
            setPokemonList(newList);
            setScrollLimit(30);
            setFilteredList(search ? newList.filter((c) => {
                return c ? c.name_ko.includes(search) : false;
            }) : newList);
        } else if (props.option == "natdex") {
            setPokemonList(props.pokedex);
            setScrollLimit(30);
            setFilteredList(search ? props.pokedex.filter((c) => {
                return c.name_ko.includes(search);
            }) : props.pokedex);
        } else if (props.option == "crowntundra") {
            const newList = props.pokedex.filter((c) => {
                return c.crown_tundra;
            })
            setPokemonList(newList);
            setScrollLimit(30);
            setFilteredList(search ? newList.filter((c) => {
                return c.name_ko.includes(search);
            }) : newList);
        }
    }, [props.pokedex, props.pokemonranking, props.option]);

    return (
        <>{mobile ? (contentToggle ? <MobileListToggleDiv onClick={handleListToggle}><TriangleRightStyle size="30" /></MobileListToggleDiv>
         : <><MobileListStyle>
            <SearchBarStyle 
                type="text" 
                placeholder="Search" 
                value={search}
                onChange={onChange}
                />
            <ListItemsStyle 
                onScroll={onScroll}
                >
                { (!props.loading && props.pokedex && props.pokemonranking && filteredList && filteredList.length)
                ? (filteredList.slice(0, scrollLimit).map((pokemon, index) => {
                    return (pokemon ? (<PokedexListItem 
                        key={pokemon.index}
                        number={props.option == "ranking" ? pokemon.ranking : pokemon.dex_no}
                        dex_no={pokemon.dex_no}
                        name_ko={pokemon.name_ko}
                        name_en={pokemon.name_en}
                        menuicon={pokemon.menu_icon}
                        onSetName={props.onSetName}
                        />
                    ) : null);
                })) : <PokedexListItem name_ko="로딩중..." number="0" />}
                </ListItemsStyle>
        </MobileListStyle><MobileContentToggleDiv onClick={handleContentToggle}><TriangleLeftStyle size="30"/></MobileContentToggleDiv></>)
         : <ListStyle>
            <SearchBarStyle 
                type="text" 
                placeholder="Search" 
                value={search}
                onChange={onChange}
                />
            <ListItemsStyle 
                onScroll={onScroll}
                >
                { (!props.loading && props.pokedex && props.pokemonranking && filteredList && filteredList.length)
                ? (filteredList.slice(0, scrollLimit).map((pokemon, index) => {
                    return (pokemon ? (<PokedexListItem 
                        key={pokemon.index}
                        number={props.option == "ranking" ? pokemon.ranking : pokemon.dex_no}
                        dex_no={pokemon.dex_no}
                        name_ko={pokemon.name_ko}
                        name_en={pokemon.name_en}
                        menuicon={pokemon.menu_icon}
                        onSetName={props.onSetName}
                        />
                    ) : null);
                })) : <PokedexListItem name_ko="로딩중..." number="0" />}
                </ListItemsStyle>
        </ListStyle>}</>
    );
}

export default PokedexList;