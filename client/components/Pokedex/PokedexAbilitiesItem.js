import { useState } from 'react'
import styled from 'styled-components'
import Modal from 'react-modal'

import PokedexAbilitiesModal from './PokedexAbilitiesModal'

const PokedexAbilitiesItemStyle = styled.div`
    width: 100%;
    height: 50px;
    border-bottom: 0.5px solid #bbb;
    position: relative;
    &:hover {
        background-color: #eee;
    }
`;

const PokedexAbilitiesItemNumber = styled.span`
    font-size: 14px;
    top: 18px;
    left: 18px;
    display: inline-block;
    position: absolute;
`;

const PokedexAbilitiesItemName = styled.span`
    top: 17px;
    left: 50px;
    display; inline-block;
    position: absolute;
`;

const PokedexAbilitiesItemUsage = styled.span`
    font-size: 14px;
    top: 18px;
    right: 18px;
    display: inline-block;
    position: absolute;
`;

const PokedexAbilitiesItem = (props) => {

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
        <PokedexAbilitiesItemStyle onClick={openModal}>
            {props.abilitydata ? <div><Modal isOpen={showModal} style={props.width < 500 ? modalStyleMobile : {}} ariaHideApp={false}>
                <PokedexAbilitiesModal
                    pokemonData={props.pokemonData}
                    abilitydata={props.abilitydata}
                    season={props.season}
                    ruleset={props.ruleset}
                    onbuttonclick={closeModal}
                    width={props.width}
                />
            </Modal>
            <PokedexAbilitiesItemNumber>#{props.number}</PokedexAbilitiesItemNumber>
            <PokedexAbilitiesItemName>{props.abilitydata.name_ko}</PokedexAbilitiesItemName>
            <PokedexAbilitiesItemUsage>{props.usage}%</PokedexAbilitiesItemUsage></div> : null}
        </PokedexAbilitiesItemStyle>
    );
}

export default PokedexAbilitiesItem;