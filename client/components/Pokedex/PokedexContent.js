import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal'
import { ChartLine } from '@styled-icons/fa-solid'

import httpGet from '../../http-get';
import PokedexStatsPanel from './PokedexStatsPanel';
import PokedexMovesPanel from './PokedexMovesPanel';
import PokedexAbilitiesPanel from './PokedexAbilitiesPanel';
import PokedexNaturesPanel from './PokedexNaturesPanel';
import PokedexItemsPanel from './PokedexItemsPanel'
import PokedexTeammatesPanel from './PokedexTeammatesPanel'
import PokedexSamplesPanel from './PokedexSamplesPanel'
import PokedexAdsPanel from './PokedexAdsPanel'
import PokedexContentModal from './PokedexContentModal'

const ContentStyle = styled.div`
    ${props => props.width >= 775 ? 'left: 310px;' : 'left: 10%;'}
    position: fixed;
    padding-top: 30px;
    padding-bottom: 30px;
    ${props => props.width >= 500 ? 'padding-left: 30px;' : ''}
    top: 165px;
    overflow: auto;
    right: 0;
    bottom: 0;
    box-sizing: border-box;
`;

const HeaderStyle = styled.div`
    text-align: left;
    font-weight: bold;
    ${props => props.width >= 500 ? 'padding-left: 40px;' : ''}
    ${props => props.width >= 500 ? 'padding-right: 40px;' : ''}
`;

const HeaderIconWrapper = styled.span`
    display: inline-block;
    padding-top: 10px;
    width: 60px;
    height: 50px;
    vertical-align: middle;
    text-align: center;
`;

const HeaderNameStyle = styled.span`
    font-size: 30px;
    margin-left: 15px;
    display: inline-block;
    vertical-align: middle;
`;

const TypeOneIcon = styled.img`
    display: inline-block;
    vertical-align: middle;
    transform: scale(0.5);
    margin-left: 10px;
`;

const TypeTwoIcon = styled.img`
    display: inline-block;
    vertical-align: middle;
    transform: scale(0.5);
    margin-left: -10px;
`;

const ChartSpanLeft = styled.span`
    display: inline-block;
    width: 50px;
`;

const ChartIcon = styled(ChartLine)`
    display: inline-block;
    vertical-align: middle;
`;

const ChartSpanRight = styled.span`
    display: inline-block;
    vertical-align: middle;
    margin: 10px;
    font-size: 16px;
    font-family: "Pokemoem Font";
`;

const PanelsStyle = styled.div`
    display: inline-block;
    ${props => props.width >= 950 ? 'margin-left: 100px;' : ''}
    ${props => props.width >= 950 ? 'margin-right: 100px;' : ''}
`;

const PokedexContent = (props) => {

    const [pokemonData, setPokemonData] = useState(null);
    const [movesData, setMovesData] = useState(null);
    const [abilitiesData, setAbilitiesData] = useState(null);
    const [naturesData, setNaturesData] = useState(null);
    const [itemsData, setItemsData] = useState(null);
    const [teammatesData, setTeammatesData] = useState(null);
    const [samplesData, setSamplesData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [listModalClosed, setListModalClosed] = useState(true);

    const fetch = async (name) => {
        try {
            setError(null);
            setPokemonData(null);
            setMovesData(null);
            setLoading(true);
            if (name) {
                const response = await httpGet.get(`/pokedex/${name}`);
                setPokemonData(response.data);
                if (props.pokemondetails.hasOwnProperty(response.data.dex_no.toString())) {
                    const newMovesData = props.pokemondetails[response.data.dex_no.toString()][response.data.form.toString()]['temoti']['waza'];
                    const newAbilitiesData = props.pokemondetails[response.data.dex_no.toString()][response.data.form.toString()]['temoti']['tokusei'];
                    const newNaturesData = (parseInt(props.season) >= 9) ? 
                        props.pokemondetails[response.data.dex_no.toString()][response.data.form.toString()]['temoti']['seikaku'] : null;
                    const newItemsData = props.pokemondetails[response.data.dex_no.toString()][response.data.form.toString()]['temoti']['motimono'];
                    const newTeammatesData = props.pokemondetails[response.data.dex_no.toString()][response.data.form.toString()]['temoti']['pokemon'];
                    setMovesData(newMovesData);
                    setAbilitiesData(newAbilitiesData);
                    setNaturesData(newNaturesData);
                    setItemsData(newItemsData);
                    setTeammatesData(newTeammatesData);
                } else {
                    setMovesData(null);
                    setAbilitiesData(null);
                    setNaturesData(null);
                    setItemsData(null);
                    setTeammatesData(null);
                }
                const response2 = await httpGet.get(`/pokedex/samples/${name}`);
                setSamplesData(response2.data);
            } else {
                setPokemonData(null);
                setMovesData(null);
                setAbilitiesData(null);
                setNaturesData(null);
                setItemsData(null);
                setTeammatesData(null);
                setSamplesData(null);
            }
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    }

    useEffect(() => {
        if (listModalClosed) fetch(props.name);
    }, [props.name, listModalClosed]);

    useEffect(() => {
        if (!pokemonData || !props.pokemondetails || !Object.keys(props.pokemondetails).length) return;
        if (!props.pokemondetails.hasOwnProperty(pokemonData.dex_no.toString())) {
            setMovesData(null);
            setAbilitiesData(null);
            setNaturesData(null);
            setItemsData(null);
            setTeammatesData(null);
            return;
        }
        const newMovesData = props.pokemondetails[pokemonData.dex_no.toString()][pokemonData.form.toString()]['temoti']['waza'];
        const newAbilitiesData = props.pokemondetails[pokemonData.dex_no.toString()][pokemonData.form.toString()]['temoti']['tokusei'];
        const newNaturesData = (parseInt(props.season) >= 9) ? 
            props.pokemondetails[pokemonData.dex_no.toString()][pokemonData.form.toString()]['temoti']['seikaku'] : null;
        const newItemsData = props.pokemondetails[pokemonData.dex_no.toString()][pokemonData.form.toString()]['temoti']['motimono'];
        const newTeammatesData = props.pokemondetails[pokemonData.dex_no.toString()][pokemonData.form.toString()]['temoti']['pokemon'];
        setMovesData(newMovesData);
        setAbilitiesData(newAbilitiesData);
        setNaturesData(newNaturesData);
        setItemsData(newItemsData);
        setTeammatesData(newTeammatesData);
    }, [props.pokemondetails]);

    const openModal = (e) => {
        setShowModal(true);
    }

    const closeModal = (e) => {
        e.stopPropagation();
        setShowModal(false);
    }

    const handleListModalOpen = () => {
        setListModalClosed(false);
    }

    const handleListModalClose = () => {
        setListModalClosed(true);
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

    if (loading) return <ContentStyle width={props.width}>로딩중..</ContentStyle>;
    if (error) return <ContentStyle width={props.width}>에러가 발생했습니다.<br />찾으시는 포켓몬이 없는 것 같아요... 아마도?</ContentStyle>;
    if (!pokemonData) return null;

    return (
        <ContentStyle width={props.width}>
            <HeaderStyle>
                <HeaderIconWrapper><img src={`/images/${pokemonData.menu_icon}`} 
                    onError={(e) => {e.target.onerror = null; e.target.src=`/images/icon/${('00' + pokemonData.dex_no.toString()).slice(-3)}.png`}}/></HeaderIconWrapper>
                <HeaderNameStyle>{` ${pokemonData.name_ko}`}</HeaderNameStyle>
                <TypeOneIcon src={`/images/types/Icon_${pokemonData.type1}.png`}/>
                <TypeTwoIcon src={pokemonData.type2 ? `/images/types/Icon_${pokemonData.type2}.png` : ''}/>
                <ChartSpanLeft></ChartSpanLeft>
                <button style={{WebkitAppearance: 'none'}} onClick={openModal}>
                    <ChartIcon size="30" />
                    <ChartSpanRight>추이 확인하기</ChartSpanRight>
                    <Modal isOpen={showModal} style={props.width < 500 ? modalStyleMobile : {}} ariaHideApp={false}>
                        <PokedexContentModal 
                            pokemonData={pokemonData}
                            season={props.season}
                            ruleset={props.ruleset}
                            onbuttonclick={closeModal}
                            width={props.width}
                        />
                    </Modal>
                </button>
            </HeaderStyle>
            <PanelsStyle width={props.width}>
                <PokedexStatsPanel
                    pokemonData={pokemonData}
                    width={props.width}
                />
                {movesData ? <PokedexMovesPanel 
                    pokemonData={pokemonData}
                    movesData={movesData}
                    season={props.season}
                    ruleset={props.ruleset}
                    width={props.width}
                /> : null}
                {abilitiesData ? <PokedexAbilitiesPanel 
                    pokemonData={pokemonData}
                    abilitiesData={abilitiesData}
                    season={props.season}
                    ruleset={props.ruleset}
                    width={props.width}
                /> : null}
                {naturesData ? <PokedexNaturesPanel
                    pokemonData={pokemonData}
                    naturesData={naturesData}
                    season={props.season}
                    ruleset={props.ruleset}
                    width={props.width}
                /> : null}
                {itemsData ? <PokedexItemsPanel
                    pokemonData={pokemonData}
                    itemsData={itemsData}
                    season={props.season}
                    ruleset={props.ruleset}
                    width={props.width}
                /> : null}
                {teammatesData ? <PokedexTeammatesPanel
                    pokemonData={pokemonData}
                    teammatesData={teammatesData}
                    season={props.season}
                    ruleset={props.ruleset}
                    onSetName={props.onSetName}
                    width={props.width}
                /> : null}
                <PokedexSamplesPanel
                    pokemonData={pokemonData}
                    samplesData={samplesData}
                    ruleset={props.ruleset}
                    userid={props.userid}
                    authenticated={props.authenticated}
                    onSetName={props.onSetName}
                    onlistmodalopen={handleListModalOpen}
                    onlistmodalclose={handleListModalClose}
                    width={props.width}
                />
                {/* <PokedexAdsPanel 
                    width={props.width}
                /> */}
            </PanelsStyle>
            <p><a href="https://twitter.com/JustBestRyuna" target="_blank">개발자 트위터</a> / <a href="https://www.patreon.com/justbestryuna" target="_blank">개발자 후원</a></p>
        </ContentStyle>
    );
}

export default PokedexContent;