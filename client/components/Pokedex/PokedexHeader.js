import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Modal from 'react-modal'
import { Menu } from '@styled-icons/boxicons-regular'
import moment from 'moment'
require('moment-timezone');

import PokedexHeaderModal from './PokedexHeaderModal'

const PokedexHeaderStyle = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    height: 42px;
    font-size: 18px;
    padding-top: 16px;
    background: rgba(68, 114, 196, 0.8);
    color: #fff;
    vertical-align: middle;
    width: 100%;
`;

const PokedexHeaderSelect = styled.select`
    font-size: 18px;
    font-family: "Pokemoem Font";
`;

const PokedexHeaderButton = styled.button`
    background: white;
    font-size: 18px;
    font-family: "Pokemoem Font";
`;

const MenuIcon = styled(Menu)`
    &:hover {
        color: #FFC000;
    }
    color: black;
    display: inline-block;
    vertical-align: top;
    position: absolute;
    top: 10px;
    transform: translate(-50%, 0);
`;

const MenuDiv = styled.div`
    z-index: 2;
    position: absolute;
    left: 0;
    right: 0;
    top: 160px;
    height: 180px;
    width: 100%;
    background: rgba(68, 114, 196, 0.8);
    color: #fff;
    border-bottom: 1px solid #cccccc;
`;

const RelativeDiv = styled.div`
    height: 100%;
    position: relative;
`;

const Rule = styled.div`
    position: absolute;
    width: fit-content;
    left: 50%;
    top: 0%;
    transform: translate(-50%, 0);
`;

const Season = styled.div`
    position: absolute;
    width: fit-content;
    left: 50%;
    top: 20%;
    transform: translate(-52%, 0);
`;

const SeasonInfo = styled.div`
    position: absolute;
    width: fit-content;
    left: 50%;
    top: 40%;
    transform: translate(-20%, 0);
`;

const Datelist = styled.div`
    position: absolute;
    width: fit-content;
    left: 50%;
    top: 60%;
    transform: translate(-56%, 0);
`;

const Filter = styled.div`
    position: absolute;
    width: fit-content;
    left: 50%;
    top: 80%;
    transform: translate(-58%, 0);
`;

const PokedexHeader = (props) => {

    const [menuToggle, setMenuToggle] = useState(false);

    useEffect(() => {
        if (props.width >= 900) {
            setMenuToggle(false);
        }
    }, [props.width]);

    const handleMenuIcon = () => {
        setMenuToggle(!menuToggle);
    }

    const handleRuleset = (e) => {
        props.onSetRuleset(e.target.value);
    }

    const handleSeason = (e) => {
        props.onSetSeason(e.target.value);
    }

    const handleOption = (e) => {
        props.onSetOption(e.target.value);
    }

    const handleDate = (e) => {
        props.onSetDate(e.target.value);
    }

    const [showModal, setShowModal] = useState(false);

    const openModal = (e) => {
        setShowModal(true);
    }

    const closeModal = (e) => {
        e.stopPropagation();
        setShowModal(false);
    }

    const modalStyle = {
        content: {
            width: '50%',
            height: '50%',
            top: '25%',
            left: '25%',
        },
        overlay: {
            zIndex: '4'
        }
    }

    const modalStyleMobile = {
        content: {
            width: '90%',
            height: '90%',
            top: '0',
            left: '0',
        },
        overlay: {
            zIndex: '4'
        }
    }

    return (
        <><PokedexHeaderStyle>
            {props.width >= 900 ? <>배틀 룰: <PokedexHeaderSelect onChange={handleRuleset} defaultValue={props.ruleset}>
                <option value="0">싱글배틀</option>
                <option value="1">더블배틀</option>
            </PokedexHeaderSelect> | 랭크배틀 시즌: <PokedexHeaderSelect onChange={handleSeason} defaultValue={props.season}>
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
            </PokedexHeaderSelect> <PokedexHeaderButton onClick={openModal}>시즌 정보
                <Modal isOpen={showModal} style={props.width >= 775 ? modalStyle : modalStyleMobile} ariaHideApp={false}>
                    <PokedexHeaderModal
                        rankmatchlist={props.rankmatchlist}
                        season={props.season}
                        ruleset={props.ruleset}
                        onbuttonclick={closeModal}
                    />
                </Modal>
            </PokedexHeaderButton> | 날짜: <PokedexHeaderSelect onChange={handleDate} defaultValue={props.date}>
                {Object.keys(props.datelist).reverse().map((value) => {
                    return (
                        <option value={value} 
                            key={Object.keys(props.datelist).indexOf(value)}>
                            {`${value.replace('final', '종료')}일`}
                        </option>
                    );
                })}
            </PokedexHeaderSelect> | 포켓몬 필터: <PokedexHeaderSelect onChange={handleOption} defaultValue={props.option}>
                <option value="ranking">Top 150</option>
                <option value="natdex">전국도감</option>
                <option value="crowntundra">왕관설원</option>
            </PokedexHeaderSelect></> : 
            <MenuIcon size="40" onClick={handleMenuIcon} />}
        </PokedexHeaderStyle>
        {menuToggle ? <MenuDiv><RelativeDiv>
            <Rule>배틀 룰: <PokedexHeaderSelect onChange={handleRuleset} defaultValue={props.ruleset}>
                <option value="0">싱글배틀</option>
                <option value="1">더블배틀</option>
            </PokedexHeaderSelect></Rule>
            <Season>랭크배틀 시즌: <PokedexHeaderSelect onChange={handleSeason} defaultValue={props.season}>
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
            </PokedexHeaderSelect></Season>
            <SeasonInfo><PokedexHeaderButton onClick={openModal}>시즌 정보
                <Modal isOpen={showModal} style={props.width >= 775 ? modalStyle : modalStyleMobile} ariaHideApp={false}>
                    <PokedexHeaderModal
                        rankmatchlist={props.rankmatchlist}
                        season={props.season}
                        ruleset={props.ruleset}
                        onbuttonclick={closeModal}
                    />
                </Modal>
            </PokedexHeaderButton></SeasonInfo>
            <Datelist>날짜: <PokedexHeaderSelect onChange={handleDate} defaultValue={props.date}>
                {Object.keys(props.datelist).reverse().map((value) => {
                    return (
                        <option value={value} 
                            key={Object.keys(props.datelist).indexOf(value)}>
                            {`${value.replace('final', '종료')}일`}
                        </option>
                    );
                })}
            </PokedexHeaderSelect></Datelist>
            <Filter>포켓몬 필터: <PokedexHeaderSelect onChange={handleOption} defaultValue={props.option}>
                <option value="ranking">Top 150</option>
                <option value="natdex">전국도감</option>
                <option value="crowntundra">왕관설원</option>
            </PokedexHeaderSelect></Filter>
        </RelativeDiv></MenuDiv> : null}</>
    );
}

export default PokedexHeader;