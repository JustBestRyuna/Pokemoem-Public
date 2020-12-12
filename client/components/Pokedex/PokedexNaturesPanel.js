import { useState, useEffect } from 'react';
import styled from 'styled-components';

import httpGet from '../../http-get';
import PokedexNaturesItem from './PokedexNaturesItem';

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

const PokedexNaturesPanel = (props) => {
    const [natures, setNatures] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetch = async (naturesData) => {
        try {
            setError(null);
            setLoading(true);
            const newList = [];
            if (naturesData) {
                for (let i = 0; i < naturesData.length; i++) {
                    const response = await httpGet.get(`/pokedex/natures/${naturesData[i].id}`);
                    newList.push(response.data);
                }
                setNatures(newList);
            } else {
                setNatures(null);
            }
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetch(props.naturesData);
    }, [props.naturesData]);

    if (loading) return <div>로딩중...</div>;
    if (error) return <div>에러가 발생했습니다</div>;

    return (
        <PokedexStatsStyle width={props.width}>
            <PokedexStatsHeaderStyle>
                성격
            </PokedexStatsHeaderStyle>
            <PokedexStatsList>
                {natures && natures.length ? props.naturesData.map((element, index) => {
                    return (
                        <PokedexNaturesItem
                            key={index}
                            pokemonData={props.pokemonData}
                            number={parseInt(index) + 1}
                            naturedata={natures[index]}
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

export default PokedexNaturesPanel;