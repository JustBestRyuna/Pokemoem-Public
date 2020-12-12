import { useState } from 'react'
import styled from 'styled-components'
import Modal from 'react-modal'

import PokedexMovesModal from './PokedexMovesModal'

const PokedexMovesItemStyle = styled.div`
    width: 100%;
    height: 50px;
    border-bottom: 0.5px solid #bbb;
    position: relative;
    &:hover {
        background-color: #eee;
    }
`;

const PokedexMovesItemNumber = styled.span`
    font-size: 14px;
    top: 18px;
    left: 18px;
    display: inline-block;
    position: absolute;
`;

const PokedexMovesItemName = styled.span`
    top: 17px;
    left: 50px;
    display; inline-block;
    position: absolute;
`;

const PokedexMovesItemType = styled.img`
    display: inline-block;
    transform: scale(0.5);
    top: -5px;
    right: 60px;
    position: absolute;
`;

const PokedexMovesItemUsage = styled.span`
    font-size: 14px;
    top: 18px;
    right: 18px;
    display: inline-block;
    position: absolute;
`;

const PokedexMovesItem = (props) => {

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
        <PokedexMovesItemStyle onClick={openModal}>
            <Modal isOpen={showModal} style={props.width < 500 ? modalStyleMobile : {}} ariaHideApp={false}>
                <PokedexMovesModal
                    pokemonData={props.pokemonData}
                    movedata={props.movedata}
                    season={props.season}
                    ruleset={props.ruleset}
                    onbuttonclick={closeModal}
                    width={props.width}
                />
            </Modal>
            <PokedexMovesItemNumber>#{props.number}</PokedexMovesItemNumber>
            <PokedexMovesItemName>{props.movedata.name_ko}</PokedexMovesItemName>
            <PokedexMovesItemType src={`/images/types/Icon_${props.movedata.type}.png`}></PokedexMovesItemType>
            <PokedexMovesItemUsage>{props.usage}%</PokedexMovesItemUsage>
        </PokedexMovesItemStyle>
    );
}

export default PokedexMovesItem;