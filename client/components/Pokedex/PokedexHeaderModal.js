import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { TimesCircle } from '@styled-icons/fa-regular'

const PokedexHeaderModalStyle = styled.div`
    position: relative;
`;

const CloseButton = styled(TimesCircle)`
    position: absolute;
    right: 20px;
    top: 0px;
    &:hover {
        color: red;
    }
`;

const PokedexHeaderModal = (props) => {

    const [thisSeason, setThisSeason] = useState(null);
    const [timestamp, setTimestamp] = useState(null);

    useEffect(() => {
        if (props.rankmatchlist) {
            const seasonData = props.rankmatchlist[`${props.season}`][`10${('0'+props.season).slice(-2)}${parseInt(props.ruleset)+1}`];
            setThisSeason(seasonData);
            const a = new Date(seasonData.ts2 * 1000);
            const year = a.getFullYear();
            const month = a.getMonth() + 1;
            const date = a.getDate();
            const hour = a.getHours();
            const min = a.getMinutes();
            const sec = a.getSeconds();
            const time = `${year}년 ${month}월 ${date}일 ${hour}시 ${min}분 ${sec}초`;
            setTimestamp(time);
        }
    }, []);
    
    return (
        <PokedexHeaderModalStyle>
            {thisSeason ? <div><h1>시즌 {thisSeason.season} - {thisSeason.rule ? '더블배틀' : '싱글배틀'}</h1>
            <p>시즌 시작: {thisSeason.start}</p>
            <p>시즌 종료: {thisSeason.end}</p>
            <p>참가자 수: {thisSeason.cnt}</p>
            <p>포켓몬 순위 집계 기준 시각: {timestamp}</p></div> : null}
            <CloseButton size="30" onClick={props.onbuttonclick} />
        </PokedexHeaderModalStyle>
    );
}

export default PokedexHeaderModal;