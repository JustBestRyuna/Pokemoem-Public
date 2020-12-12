import { useState, useEffect } from 'react';
import styled from 'styled-components';

import httpGet from '../../http-get';
import PokedexItemsItem from './PokedexItemsItem';

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

const PokedexItemsPanel = (props) => {
    const [items, setItems] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetch = async (itemsData) => {
        try {
            setError(null);
            setLoading(true);
            const newList = [];
            if (itemsData) {
                for (let i = 0; i < itemsData.length; i++) {
                    const response = await httpGet.get(`/pokedex/items/${itemsData[i].id}`);
                    newList.push(response.data);
                }
                setItems(newList);
            } else {
                setItems(null);
            }
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetch(props.itemsData);
    }, [props.itemsData]);

    if (loading) return <div>로딩중...</div>;
    if (error) return <div>에러가 발생했습니다</div>;

    return (
        <PokedexStatsStyle width={props.width}>
            <PokedexStatsHeaderStyle>
                도구
            </PokedexStatsHeaderStyle>
            <PokedexStatsList>
                {items && items.length ? props.itemsData.map((element, index) => {
                    return (
                        <PokedexItemsItem
                            key={index}
                            pokemonData={props.pokemonData}
                            number={parseInt(index) + 1}
                            itemdata={items[index]}
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

export default PokedexItemsPanel;