import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal'
import { PlusSquare } from '@styled-icons/fa-solid'

import PokedexSamplesItem from './PokedexSamplesItem';
import PokedexSamplesPostModal from './PokedexSamplesPostModal';

const PokedexStatsStyle = styled.div`
    ${props => props.width >= 500 ? 'margin: 30px;' : ''}
    text-align: left;
    vertical-align: top;
    display: inline-block;
    position: relative;
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

const PlusIcon = styled(PlusSquare)`
    display: inline-block;
    vertical-align: middle;
    color: rgb(97, 206, 112);
    position: absolute;
    top: 20px;
    right: 10px;
`;

const PokedexSamplesPanel = (props) => {

    const [showModal, setShowModal] = useState(false);
    const [likeChange, setLikeChange] = useState(false);

    const openModal = (e) => {
        setShowModal(true);
    }

    const closeModal = (e) => {
        e.stopPropagation();
        setShowModal(false);
    }

    const handleLikeChange = () => {
        setLikeChange(!likeChange);
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
        <PokedexStatsStyle width={props.width}>
            <PokedexStatsHeaderStyle>
                샘플 도감
            </PokedexStatsHeaderStyle>
            <PlusIcon size="30" onClick={openModal} />
            <Modal isOpen={showModal} style={props.width < 500 ? modalStyleMobile : {}} ariaHideApp={false}>
                <PokedexSamplesPostModal 
                    pokemonData={props.pokemonData}
                    ruleset={props.ruleset}
                    userid={props.userid}
                    authenticated={props.authenticated}
                    onSetName={props.onSetName}
                    onpost={e => {props.onlistmodalclose(); closeModal(e);}}
                    onbuttonclick={closeModal}
                    width={props.width}
                />
            </Modal>
            <PokedexStatsList>
                {props.samplesData && props.samplesData.length ? props.samplesData.filter((c) => {
                    return c ? (c.rule == parseInt(props.ruleset)) : false;
                }).map((element, index) => {
                    return (
                        <PokedexSamplesItem
                            key={index}
                            pokemonData={props.pokemonData}
                            sampleData={element}
                            userid={props.userid}
                            authenticated={props.authenticated}
                            number={parseInt(index) + 1}
                            onSetName={props.onSetName}
                            onlikechange={handleLikeChange}
                            onlistmodalopen={props.onlistmodalopen}
                            onlistmodalclose={props.onlistmodalclose}
                            width={props.width}
                        />
                    );
                }) : null}
            </PokedexStatsList>
        </PokedexStatsStyle>
    );
}

export default PokedexSamplesPanel;