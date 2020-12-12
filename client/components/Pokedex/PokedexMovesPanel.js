import { useState, useEffect } from 'react';
import styled from 'styled-components';

import httpGet from '../../http-get';
import PokedexMovesItem from './PokedexMovesItem';

const PokedexStatsStyle = styled.div`
    ${props => props.width >= 500 ? 'margin: 30px;' : ''}
    text-align: left;
    vertical-align: top;
    display: inline-block;
`;

const PokedexStatsHeaderStyle = styled.h2`
    font-size: 20px;
    margin-left: 20px;
`;

const PokedexStatsList = styled.div`
    width: 360px;
    height: 365px;
    border: 1px solid #ccc;
    overflow: auto;
`;

const PokedexMovesPanel = (props) => {
    const [moves, setMoves] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetch = async (movesData) => {
        try {
            setError(null);
            setLoading(true);
            const newList = [];
            if (movesData) {
                for (let i = 0; i < 10; i++) {
                    const response = await httpGet.get(`/pokedex/moves/${movesData[i].id}`);
                    newList.push(response.data);
                }
                setMoves(newList);
            } else {
                setMoves(null);
            }
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetch(props.movesData);
    }, [props.movesData]);

    if (loading) return <div>로딩중...</div>;
    if (error) return <div>에러가 발생했습니다</div>;

    return (
        <PokedexStatsStyle width={props.width}>
            <PokedexStatsHeaderStyle>
                기술
            </PokedexStatsHeaderStyle>
            <PokedexStatsList>
                {moves && moves.length ? props.movesData.map((element, index) => {
                    return (
                        <PokedexMovesItem
                            key={index}
                            pokemonData={props.pokemonData}
                            number={parseInt(index) + 1}
                            movedata={moves[index]}
                            usage={element.val}
                            season={props.season}
                            ruleset={props.ruleset}
                            width={props.width}
                        />
                    );
                }) : null}
            </PokedexStatsList>
        </PokedexStatsStyle>
    );
};

export default PokedexMovesPanel;