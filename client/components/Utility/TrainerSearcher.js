import { useState, useEffect } from 'react'
import styled from 'styled-components'
import moment from 'moment'
require('moment-timezone');

import httpGet from '../../http-get'
import TrainerSearcherItem from './TrainerSearcherItem'

const ContentStyle = styled.div`
    position: fixed;
    padding-top: 30px;
    padding-bottom: 30px;
    overflow: auto;
    top: 100px;
    left: 0;
    right: 0;
    bottom: 0;
    box-sizing: border-box;
`;

const SelectStyle = styled.select`
    font-size: 18px;
    font-family: "Pokemoem Font";
`;

const PokedexStatsList = styled.div`
    width: 360px;
    height: 540px;
    border: 1px solid #ccc;
    overflow: auto;
    display: inline-block;
`;

const TrainerSearcher = (props) => {

    const [trainers, setTrainers] = useState(null);
    const [checked, setChecked] = useState(false);
    const [trainersFiltered, setTrainersFiltered] = useState(null);
    
    const fetch = async (season, ruleset, date) => {
        const response = await httpGet.get(`/metas/trainers/${season}/${ruleset}/${date}`);
        setTrainers(response.data);
        setTrainersFiltered(response.data);
    }

    useEffect(() => {
        fetch(props.season, props.ruleset, props.date);
    }, [props.season, props.ruleset, props.date]);

    const handleCheckbox = () => {
        setChecked(!checked);
    }

    useEffect(() => {
        if (checked) {
            const newArray = trainers.filter((c) => {
                return c ? c.lng == "8" : false;
            });
            setTrainersFiltered(newArray);
        } else {
            setTrainersFiltered(trainers);
        }
    }, [checked]);

    return (
        <ContentStyle><h1>트레이너 순위 확인하기</h1>
            배틀 룰: <SelectStyle onChange={props.onChangeRuleset} defaultValue={props.ruleset}>
                <option value="0">싱글배틀</option>
                <option value="1">더블배틀</option>
            </SelectStyle><br />
            랭크배틀 시즌: <SelectStyle onChange={props.onChangeSeason} defaultValue={props.season}>
                {Object.keys(props.rankmatchlist).reverse().map((value) => {
                    moment.tz.setDefault("Asia/Seoul");
                    const month = moment().month() + 1;
                    const date = moment().date();
                    if (value > 13 && (((month + 1) < parseInt(value)) || ((month + 1) == parseInt(value) && date < 2))) {
                        return null;
                    }
                    return (
                        <option value={value} 
                            key={Object.keys(props.rankmatchlist).indexOf(value)}>
                            {`시즌 ${value} (${(value - 1) % 12 ? (value - 1) % 12 : 12}월)`}
                        </option>
                    );
                })}
            </SelectStyle><br />
            날짜: <SelectStyle onChange={props.onChangeDate} defaultValue={props.date}>
                {Object.keys(props.datelist).reverse().map((value) => {
                    return (
                        <option value={value} 
                            key={Object.keys(props.datelist).indexOf(value)}>
                            {`${value.replace('final', '종료')}일`}
                        </option>
                    );
                })}
            </SelectStyle><br />
            <input type="checkbox" checked={checked} onChange={handleCheckbox}/>한국 계정만<br />
            <PokedexStatsList>
                {trainersFiltered ? trainersFiltered.map((value) => {
                    return (
                        <TrainerSearcherItem 
                            key={value.rank} 
                            trainerdata={value}
                        />
                    );
                }) : null}
            </PokedexStatsList>
        </ContentStyle>
    );
}

export default TrainerSearcher;