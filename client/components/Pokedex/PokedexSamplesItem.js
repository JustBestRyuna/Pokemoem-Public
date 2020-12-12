import { useState } from 'react'
import styled from 'styled-components'
import Modal from 'react-modal'

import PokedexSamplesModal from './PokedexSamplesModal'

const PokedexSamplesItemStyle = styled.div`
    width: 100%;
    height: 50px;
    border-bottom: 0.5px solid #bbb;
    position: relative;
    &:hover {
        background-color: #eee;
    }
`;

const PokedexSamplesItemNumber = styled.span`
    font-size: 14px;
    top: 18px;
    left: 18px;
    display: inline-block;
    position: absolute;
`;

const PokedexSamplesItemName = styled.span`
    top: 16px;
    left: 50px;
    display; inline-block;
    position: absolute;
`;

const PokedexSamplesItemLikes = styled.span`
    font-size: 14px;
    top: 16px;
    right: 18px;
    display: inline-block;
    position: absolute;
    color: red;
`;

const PokedexSamplesItem = (props) => {
    
    const [showModal, setShowModal] = useState(false);

    const openModal = (e) => {
        setShowModal(true);
        props.onlistmodalopen();
    }

    const closeModal = (e) => {
        e.stopPropagation();
        setShowModal(false);
        props.onlistmodalclose();
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
        <PokedexSamplesItemStyle onClick={openModal}>
            <Modal isOpen={showModal} style={props.width < 500 ? modalStyleMobile : {}} ariaHideApp={false}>
                <PokedexSamplesModal
                    pokemonData={props.pokemonData}
                    sampleData={props.sampleData}
                    userid={props.userid}
                    authenticated={props.authenticated}
                    onSetName={props.onSetName}
                    onlikechange={props.onlikechange}
                    ondelete={closeModal}
                    onbuttonclick={closeModal}
                    width={props.width}
                />
            </Modal>
            <PokedexSamplesItemNumber>#{props.number}</PokedexSamplesItemNumber>
            <PokedexSamplesItemName>{props.sampleData.title}</PokedexSamplesItemName>
            <PokedexSamplesItemLikes>❤️{props.sampleData.likes}</PokedexSamplesItemLikes>
        </PokedexSamplesItemStyle>
    );
}

export default PokedexSamplesItem;