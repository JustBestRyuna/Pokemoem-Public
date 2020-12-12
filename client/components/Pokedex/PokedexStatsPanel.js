import styled from 'styled-components';
import { VictoryChart, VictoryTheme, VictoryAxis, VictoryBar } from 'victory';
import { useState, useEffect } from 'react';

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

const PokedexStatsPanel = (props) => {

    const [domainY, setDomainY] = useState([0, 120]);

    const stats = [
        {x: '체력', y: props.pokemonData.hp},
        {x: '공격', y: props.pokemonData.attack},
        {x: '방어', y: props.pokemonData.defense},
        {x: '특공', y: props.pokemonData.spatk},
        {x: '특방', y: props.pokemonData.spdef},
        {x: '스핏', y: props.pokemonData.speed}
    ]
    
    const style = {
        parent: {
            width: "360px",
            textAlign: "center",
            border: "1px solid #ccc",
        }
    }

    useEffect(() => {
        let max = 150;
        for (let i = 0; i < 6; i++) {
            if (stats[i].y > max) {
                max = stats[i].y;
            }
        }
        setDomainY([0, max]);
    }, []);

    return (
        <PokedexStatsStyle width={props.width}>
            <PokedexStatsHeaderStyle>
                종족값
            </PokedexStatsHeaderStyle>
            <VictoryChart 
                theme={VictoryTheme.material}
                style={style}
                domain={{x: [0.5, 6.5], y: domainY}}
                domainPadding={10}
                >
                <VictoryAxis
                    style={{
                        grid: { stroke: "#fff" },
                    }}
                    />
                <VictoryBar horizontal
                    data={stats} 
                    categories={{x: ['스핏', '특방', '특공', '방어', '공격', '체력']}}
                    labels={({ datum }) => datum.y}
                    />
            </VictoryChart>
        </PokedexStatsStyle>
    );
};

export default PokedexStatsPanel;