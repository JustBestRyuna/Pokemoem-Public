import { useState, useEffect } from 'react';
import styled from 'styled-components';

import httpGet from '../../http-get';
import PokedexTeammatesItem from './PokedexTeammatesItem';

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

const PokedexTeammatesPanel = (props) => {

    const [teammates, setTeammates] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetch = async (teammatesData) => {
        try {
            setError(null);
            setLoading(true);
            const newList = [];
            if (teammatesData) {
                for (let i = 0; i < teammatesData.length; i++) {
                    const response = await httpGet.get(`/pokedex/find/${teammatesData[i].id}/${teammatesData[i].form}`);
                    newList.push(response.data);
                }
                setTeammates(newList);
            } else {
                setTeammates(null);
            }
        } catch (e) {
            setError(e);
            console.log(e);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetch(props.teammatesData);
    }, [props.teammatesData]);

    if (loading) return <div>로딩중...</div>;
    if (error) return <div>에러가 발생했습니다</div>;

    return (
        <PokedexStatsStyle width={props.width}>
            <PokedexStatsHeaderStyle>
                함께 배틀팀에 포함된 포켓몬
            </PokedexStatsHeaderStyle>
            <PokedexStatsList>
                {teammates && teammates.length ? props.teammatesData.map((element, index) => {
                    return (
                        <PokedexTeammatesItem
                            key={index}
                            pokemonData={props.pokemonData}
                            number={parseInt(index) + 1}
                            teammatesData={teammates[index]}
                            usage={element.val}
                            season={props.season}
                            ruleset={props.ruleset}
                            onSetName={props.onSetName}
                        />
                    );
                }) : null}
            </PokedexStatsList>
        </PokedexStatsStyle>
    );
};

export default PokedexTeammatesPanel;