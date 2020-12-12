import { useState } from 'react'
import styled from 'styled-components'
import Modal from 'react-modal'

import PokedexNaturesModal from './PokedexNaturesModal'

const PokedexNaturesItemStyle = styled.div`
    width: 100%;
    height: 50px;
    border-bottom: 0.5px solid #bbb;
    position: relative;
    &:hover {
        background-color: #eee;
    }
`;

const PokedexNaturesItemNumber = styled.span`
    font-size: 14px;
    top: 18px;
    left: 18px;
    display: inline-block;
    position: absolute;
`;

const PokedexNaturesItemName = styled.span`
    top: 17px;
    left: 50px;
    display; inline-block;
    position: absolute;
`;

const PokedexNaturesItemUsage = styled.span`
    font-size: 14px;
    top: 18px;
    right: 18px;
    display: inline-block;
    position: absolute;
`;

const PokedexNaturesItem = (props) => {

    const [showModal, setShowModal] = useState(false);

    const openModal = (e) => {
        setShowModal(true);
    }

    const closeModal = (e) => {
        e.stopPropagation();
        setShowModal(false);
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
        <PokedexNaturesItemStyle onClick={openModal}>
            {props.naturedata ? <div><Modal isOpen={showModal} style={props.width < 500 ? modalStyleMobile : {}} ariaHideApp={false}>
                <PokedexNaturesModal
                    pokemonData={props.pokemonData}
                    naturedata={props.naturedata}
                    season={props.season}
                    ruleset={props.ruleset}
                    onbuttonclick={closeModal}
                    width={props.width}
                />
            </Modal>
            <PokedexNaturesItemNumber>#{props.number}</PokedexNaturesItemNumber>
            <PokedexNaturesItemName>{props.naturedata.name_ko}</PokedexNaturesItemName>
            <PokedexNaturesItemUsage>{props.usage}%</PokedexNaturesItemUsage></div> : null}
        </PokedexNaturesItemStyle>
    );
}

export default PokedexNaturesItem;