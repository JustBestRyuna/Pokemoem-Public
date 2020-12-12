import { useState, useEffect } from 'react';
import styled from 'styled-components';

import httpGet from '../../http-get';
import PokedexAbilitiesItem from './PokedexAbilitiesItem';

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

const PokedexAbilitiesPanel = (props) => {
    const [abilities, setAbilities] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetch = async (abilitiesData) => {
        try {
            setError(null);
            setLoading(true);
            const newList = [];
            if (abilitiesData) {
                for (let i = 0; i < abilitiesData.length; i++) {
                    const response = await httpGet.get(`/pokedex/abilities/${abilitiesData[i].id}`);
                    newList.push(response.data);
                }
                setAbilities(newList);
            } else {
                setAbilities(null);
            }
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetch(props.abilitiesData);
    }, [props.abilitiesData]);

    if (loading) return <div>로딩중...</div>;
    if (error) return <div>에러가 발생했습니다</div>;

    return (
        <PokedexStatsStyle width={props.width}>
            <PokedexStatsHeaderStyle>
                특성
            </PokedexStatsHeaderStyle>
            <PokedexStatsList>
                {abilities && abilities.length ? props.abilitiesData.map((element, index) => {
                    return (
                        <PokedexAbilitiesItem
                            key={index}
                            pokemonData={props.pokemonData}
                            number={parseInt(index) + 1}
                            abilitydata={abilities[index]}
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

export default PokedexAbilitiesPanel;