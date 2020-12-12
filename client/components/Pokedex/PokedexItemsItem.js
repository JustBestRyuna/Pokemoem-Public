import { useState } from 'react'
import styled from 'styled-components'
import Modal from 'react-modal'

import PokedexItemsModal from './PokedexItemsModal'

const PokedexItemsItemStyle = styled.div`
    width: 100%;
    height: 50px;
    border-bottom: 0.5px solid #bbb;
    position: relative;
    &:hover {
        background-color: #eee;
    }
`;

const PokedexItemsItemNumber = styled.span`
    font-size: 14px;
    top: 18px;
    left: 18px;
    display: inline-block;
    position: absolute;
`;

const PokedexItemsItemName = styled.span`
    top: 17px;
    left: 50px;
    display; inline-block;
    position: absolute;
`;

const PokedexItemsItemImage = styled.img`
    right: 65px;
    top: 14px;
    display: inline-block;
    position: absolute;
`;

const PokedexItemsItemUsage = styled.span`
    font-size: 14px;
    top: 18px;
    right: 18px;
    display: inline-block;
    position: absolute;
`;

const PokedexItemsItem = (props) => {

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
        <PokedexItemsItemStyle onClick={openModal}>
            {props.itemdata ? <div><Modal isOpen={showModal} style={props.width < 500 ? modalStyleMobile : {}} ariaHideApp={false}>
                <PokedexItemsModal
                    pokemonData={props.pokemonData}
                    itemdata={props.itemdata}
                    season={props.season}
                    ruleset={props.ruleset}
                    onbuttonclick={closeModal}
                    width={props.width}
                />
            </Modal>
            <PokedexItemsItemNumber>#{props.number}</PokedexItemsItemNumber>
            <PokedexItemsItemName>{props.itemdata.name_ko}</PokedexItemsItemName>
            <PokedexItemsItemImage src={`/images/items/Bag_${props.itemdata.name_en.replace(' ', '_')}_Sprite.png`}/>
            <PokedexItemsItemUsage>{props.usage}%</PokedexItemsItemUsage></div> : null}
        </PokedexItemsItemStyle>
    );
}

export default PokedexItemsItem;