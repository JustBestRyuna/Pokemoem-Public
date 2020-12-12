import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { TimesCircle } from '@styled-icons/fa-regular'
import { VictoryChart, VictoryTheme, VictoryAxis, VictoryLine } from 'victory';

import httpGet from '../../http-get'

const PokedexContentModalStyle = styled.div`
    position: relative;
`;

const MobileDiv = styled.div`
    width: 100%;
    ${props => props.width < 600 ? 'height: 30px;' : ''}
`;

const PokedexContentModalSpan = styled.span`
    display: inline-block;
    vertical-align: middle;
`;

const PokedexContentType = styled.img`
    display: inline-block;
    transform: scale(0.5);
    vertical-align: middle;
`;

const PokedexContentModalChartDiv = styled.div`
    ${props => props.width >= 500 ? 'margin: 30px;' : ''}
    text-align: left;
    vertical-align: top;
    display: inline-block;
`;

const PokedexContentModalChartHeader = styled.h2`
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

const PokedexContentModal = (props) => {

    const [placeChartDataPerSeason, setPlaceChartDataPerSeason] = useState([]);
    const [placeChartDataPerDate, setPlaceChartDataPerDate] = useState([]);
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
            const response = await httpGet.get(`/metas/pokemonrank/${season}/${props.ruleset}/${date}`);
            let place = -1;
            for (let i = 0; i < 150; i++) {
                if (response.data[i].id == props.pokemonData.dex_no.toString() && 
                    response.data[i].form == props.pokemonData.form.toString()) {
                    place = i + 1;
                    break;
                }
            }
            if (place > -1) {
                data = {x: parseInt(season), y: place}
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
                const response = await httpGet.get(`/metas/pokemonrank/${season}/${props.ruleset}/${date}`);
                let place = -1;
                for (let i = 0; i < 150; i++) {
                    if (response.data[i].id == props.pokemonData.dex_no.toString() && 
                        response.data[i].form == props.pokemonData.form.toString()) {
                        place = i + 1;
                        break;
                    }
                }
                if (place > -1) {
                    data = {x: parseInt(date), y: place}
                } else {
                    data = {x: parseInt(date), y: null};
                }
                return data;
            }
            for (const date of dates) {
                data.push(await fetch(date));
            }
            setPlaceChartDataPerDate(data);
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    }

    useEffect(() => {
        const fetchData = async () => {
            let dataPerSeason = [];
            for (let i = 1; i <= props.season; i++) {
                dataPerSeason.push(await fetchPerSeason(i));
            }
            setPlaceChartDataPerSeason(dataPerSeason);
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
        <PokedexContentModalStyle>
            <MobileDiv width={props.width}></MobileDiv>
            <h1>{props.pokemonData.name_ko} - 순위 변동 추이</h1>
            <p><PokedexContentModalSpan>타입: </PokedexContentModalSpan>
            <PokedexContentType src={`/images/types/Icon_${props.pokemonData.type1}.png`}></PokedexContentType>
            {props.pokemonData.type2 ? 
                <PokedexContentType src={`/images/types/Icon_${props.pokemonData.type2}.png`}></PokedexContentType> : null}</p>
            {loading ? <div>로딩중...</div> : error ? <div>에러가 발생했습니다</div> : 
            <PokedexContentModalChartDiv width={props.width}>
                <PokedexContentModalChartHeader>
                    시즌별 추이
                </PokedexContentModalChartHeader>
                {(placeChartDataPerSeason && placeChartDataPerSeason.length >= 2) ? <VictoryChart
                    theme={VictoryTheme.material}
                    style={chartStyle}
                    domain={{y: [150, 0]}}
                >
                    <VictoryLine 
                        data={placeChartDataPerSeason}
                        labels={({ datum }) => datum.y}
                    />
                </VictoryChart> : <div>표시할 차트가 없습니다</div>}
            </PokedexContentModalChartDiv>}
            {loading ? <div>로딩중...</div> : error ? <div>에러가 발생했습니다</div> : 
            <PokedexContentModalChartDiv width={props.width}>
                <PokedexContentModalChartHeader>
                    시즌 {props.season} 날짜별 추이
                </PokedexContentModalChartHeader>
                {(placeChartDataPerDate && placeChartDataPerDate.length >= 2) ? <VictoryChart
                    theme={VictoryTheme.material}
                    style={chartStyle}
                    domain={{x: [1, 31], y: [150, 0]}}
                >
                    <VictoryLine 
                        data={placeChartDataPerDate}
                    />
                </VictoryChart> : <div>표시할 차트가 없습니다</div>}
            </PokedexContentModalChartDiv>}
            <CloseButton size="30" onClick={props.onbuttonclick} />
        </PokedexContentModalStyle>
    );
}

export default PokedexContentModal;