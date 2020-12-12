import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Modal from 'react-modal'

import httpGet from '../../http-get'
import MyPagePostedSamplesModal from './MyPagePostedSamplesModal'

const PokedexSamplesItemStyle = styled.div`
    width: 100%;
    height: 50px;
    border-bottom: 0.5px solid #bbb;
    position: relative;
    &:hover {
        background-color: #eee;
    }
`;

const PokedexSamplesItemIconWrapper = styled.span`
    top: 5px;
    left: 5px;
    width: 60px;
    height: 50px;
    vertical-align: middle;
    text-align: center;
    position: absolute;
`;

const PokedexSamplesItemName = styled.span`
    top: 16px;
    left: 70px;
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

const MyPageSamplesItem = (props) => {
    
    const [showModal, setShowModal] = useState(false);
    const [likeChange, setLikeChange] = useState(false);

    const openModal = (e) => {
        setShowModal(true);
        props.onlistmodalopen();
    }

    const closeModal = (e) => {
        e.stopPropagation();
        setShowModal(false);
        props.onlistmodalclose();
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
        <PokedexSamplesItemStyle onClick={openModal}>
            <Modal isOpen={showModal} style={props.width < 500 ? modalStyleMobile : {}} ariaHideApp={false}>
                <MyPagePostedSamplesModal
                    sampleData={props.sampleData}
                    userid={props.userid}
                    authenticated={true}
                    onlikechange={handleLikeChange}
                    onbuttonclick={closeModal}
                    width={props.width}
                />
            </Modal>
            <PokedexSamplesItemIconWrapper>{props.sampleData ? <img src={`/images/${props.sampleData.menu_icon}`} 
                onError={(e) => {e.target.onerror = null; e.target.src=`/images/icon/${('00' + props.sampleData.dex_no.toString()).slice(-3)}.png`}}/> : null}
            </PokedexSamplesItemIconWrapper>
            <PokedexSamplesItemName>{props.sampleData.title}</PokedexSamplesItemName>
            <PokedexSamplesItemLikes>❤️{props.sampleData.likes}</PokedexSamplesItemLikes>
        </PokedexSamplesItemStyle>
    );
}

export default MyPageSamplesItem;