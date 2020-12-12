import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { gql, useQuery } from "@apollo/client";

import httpGet from '../../http-get'
import MyPageInfoPanel from './MyPageInfoPanel'
import MyPagePostedSamplesPanel from './MyPagePostedSamplesPanel'
import MyPageLikedSamplesPanel from './MyPageLikedSamplesPanel'

const ContentStyle = styled.div`
    position: fixed;
    padding-top: 30px;
    padding-bottom: 30px;
    overflow: auto;
    top: 100px;
    left: 0;
    right: 0;
    bottom: 0;
    box-sizing: border-box;
`;

const MyPage = (props) => {

    const [listModalClosed, setListModalClosed] = useState(true);

    const GET_MY_POSTS = gql`
    {
        posted: getSamplePosts(rule: "none", order_by_likes: false, limit: 0, user_id: ${props.id}, liked_user_id: 0, pokemon_name: "") {
            id
            user_id
            title
            content
            likes
            created
            dex_no
            name_en
            name_ko
            menu_icon
            rule
            item
            nature
            ability
            hp
            attack
            defense
            spatk
            spdef
            speed
            ivh
            iva
            ivb
            ivc
            ivd
            ivs
            evh
            eva
            evb
            evc
            evd
            evs
            move1
            move2
            move3
            move4
        } 
        liked: getSamplePosts(rule: "none", order_by_likes: false, limit: 0, user_id: 0, liked_user_id: ${props.id}, pokemon_name: "") {
            id
            user_id
            title
            content
            likes
            created
            dex_no
            name_en
            name_ko
            menu_icon
            rule
            item
            nature
            ability
            hp
            attack
            defense
            spatk
            spdef
            speed
            ivh
            iva
            ivb
            ivc
            ivd
            ivs
            evh
            eva
            evb
            evc
            evd
            evs
            move1
            move2
            move3
            move4
        }  
    }
    `;

    const { loading, error, data, refetch } = useQuery(GET_MY_POSTS);

    const handleListModalOpen = () => {
        setListModalClosed(false);
    }

    const handleListModalClose = () => {
        setListModalClosed(true);
    }

    useEffect(() => {
        if (listModalClosed) {
            refetch();
        }
    }, [props.id, listModalClosed]);

    return (
        <ContentStyle>
            <h1>마이 페이지</h1>
            <h2>{props.username}님, 환영합니다!</h2>
            {loading ? <div>로딩중...</div> : error ? <div>에러가 발생했습니다</div> : 
            <><MyPagePostedSamplesPanel 
                id={props.id}
                samplesData={data.posted}
                onlistmodalopen={handleListModalOpen}
                onlistmodalclose={handleListModalClose}
                width={props.width}
            /><MyPageLikedSamplesPanel 
                id={props.id}
                samplesData={data.liked}
                onlistmodalopen={handleListModalOpen}
                onlistmodalclose={handleListModalClose}
                width={props.width}
            /></>}
            <MyPageInfoPanel
                kakao={props.kakao}
                twitter={props.twitter}
            />
        </ContentStyle>
    );
}

export default MyPage;