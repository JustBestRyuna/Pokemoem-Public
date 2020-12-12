import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { TimesCircle } from '@styled-icons/fa-regular'
import { VictoryChart, VictoryTheme, VictoryAxis, VictoryLine } from 'victory';

import httpGet from '../../http-get'

const PokedexNaturesModalStyle = styled.div`
    position: relative;
`;

const MobileDiv = styled.div`
    width: 100%;
    ${props => props.width < 600 ? 'height: 30px;' : ''}
`;

const PokedexNaturesModalChartDiv = styled.div`
    ${props => props.width >= 500 ? 'margin: 30px;' : ''}
    text-align: left;
    vertical-align: top;
    display: inline-block;
`;

const PokedexNaturesModalChartHeader = styled.h2`
    font-size: 20px;
    margin-left: 20px;
`;

const CloseButton = styled(TimesCircle)`
    position: absolute;
    right: 20px;
    top: 0px;
    &:hover {
        color: red;
    }
`;

const PokedexNaturesModal = (props) => {

    const [natureChartDataPerSeason, setNatureChartDataPerSeason] = useState([]);
    const [natureChartDataPerDate, setNatureChartDataPerDate] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPerSeason = async (season) => {
        setError(null);
        setLoading(true);
        let date;
        let data;
        try {
            const datelist = await httpGet.get(`/metas/dates/${season}`);
            date = Object.keys(datelist.data).reverse()[0];
        } catch (e) {
            setError(e);
        }
        try {
            const response = await httpGet.get(`/metas/pokemondetails/${season}/${props.ruleset}/${date}`);
            if (response.data.hasOwnProperty(props.pokemonData.dex_no.toString()) && 
                response.data[props.pokemonData.dex_no.toString()].hasOwnProperty(props.pokemonData.form.toString())) {
                const newData = response.data[props.pokemonData.dex_no.toString()][props.pokemonData.form.toString()]['temoti']['seikaku'];
                let index = -1;
                for (let i = 0; i < 10; i++) {
                    if (newData[i].id == props.naturedata.nature_index) {
                        index = i;
                        break;
                    }
                }
                if (index > -1) {
                    data = {x: parseInt(season), y: parseFloat(newData[index].val)};
                } else {
                    data = {x: parseInt(season), y: null};
                }
            } else {
                data = {x: parseInt(season), y: null};
            }
        } catch (e) {
            setError(e);
        }
        setLoading(false);
        return data;
    }

    const fetchPerDate = async (season) => {
        setError(null);
        setLoading(true);
        let dates;
        let data = [];
        try {
            const datelist = await httpGet.get(`/metas/dates/${season}`);
            dates = Object.keys(datelist.data);
        } catch (e) {
            setError(e);
        }
        try {
            const fetch = async (date) => {
                let data;
                const response = await httpGet.get(`/metas/pokemondetails/${season}/${props.ruleset}/${date}`);
                if (response.data.hasOwnProperty(props.pokemonData.dex_no.toString())) {
                    const newData = response.data[props.pokemonData.dex_no.toString()][props.pokemonData.form.toString()]['temoti']['seikaku'];
                    let index = -1;
                    for (let i = 0; i < 10; i++) {
                        if (newData[i].id == props.naturedata.nature_index) {
                            index = i;
                            break;
                        }
                    }
                    if (index > -1) {
                        data = {x: parseInt(date), y: parseFloat(newData[index].val)};
                    } else {
                        data = {x: parseInt(date), y: null};
                    }
                } else {
                    data = {x: parseInt(date), y: null};
                }
                return data;
            }
            for (const date of dates) {
                data.push(await fetch(date));
            }
            setNatureChartDataPerDate(data);
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    }

    useEffect(() => {
        const fetchData = async () => {
            let dataPerSeason = [];
            for (let i = 9; i <= props.season; i++) {
                dataPerSeason.push(await fetchPerSeason(i));
            }
            setNatureChartDataPerSeason(dataPerSeason);
        }
        fetchData();
        fetchPerDate(props.season);
    }, []);

    const chartStyle = {
        parent: {
            width: "360px",
            textAlign: "center",
            border: "1px solid #ccc",
        }
    };

    return (
        <PokedexNaturesModalStyle>
            <MobileDiv width={props.width}></MobileDiv>
            <h1>{props.pokemonData.name_ko} - {props.naturedata.name_ko}</h1>
            {loading ? <div>로딩중...</div> : error ? <div>에러가 발생했습니다</div> : 
            <PokedexNaturesModalChartDiv width={props.width}>
                <PokedexNaturesModalChartHeader>
                    시즌별 추이
                </PokedexNaturesModalChartHeader>
                {(natureChartDataPerSeason && natureChartDataPerSeason.length >= 2) ? <VictoryChart
                    theme={VictoryTheme.material}
                    style={chartStyle}
                    domain={{y: [0, 100]}}
                >
                    <VictoryLine 
                        data={natureChartDataPerSeason}
                        labels={({ datum }) => datum.y}
                    />
                </VictoryChart> : <div>표시할 차트가 없습니다</div>}
            </PokedexNaturesModalChartDiv>}
            {loading ? <div>로딩중...</div> : error ? <div>에러가 발생했습니다</div> : 
            <PokedexNaturesModalChartDiv width={props.width}>
                <PokedexNaturesModalChartHeader>
                    시즌 {props.season} 날짜별 추이
                </PokedexNaturesModalChartHeader>
                {(natureChartDataPerDate && natureChartDataPerDate.length >= 2) ? <VictoryChart
                    theme={VictoryTheme.material}
                    style={chartStyle}
                    domain={{x: [1, 31]}}
                >
                    <VictoryLine 
                        data={natureChartDataPerDate}
                    />
                </VictoryChart> : <div>표시할 차트가 없습니다</div>}
            </PokedexNaturesModalChartDiv>}
            <CloseButton size="30" onClick={props.onbuttonclick} />
        </PokedexNaturesModalStyle>
    );
}

export default PokedexNaturesModal;