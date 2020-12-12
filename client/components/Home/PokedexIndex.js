import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { gql, useQuery } from "@apollo/client";

import httpGet from '../../http-get'
import PokedexNewSamplesPanel from './PokedexNewSamplesPanel'

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

const PokedexIndex = (props) => {

    const [listModalClosed, setListModalClosed] = useState(true);

    const GET_NEW_POSTS = gql`
    {
        singles: getSamplePosts(rule: "0", order_by_likes: false, limit: 30, user_id: 0, liked_user_id: 0, pokemon_name: "") {
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
        doubles: getSamplePosts(rule: "1", order_by_likes: false, limit: 30, user_id: 0, liked_user_id: 0, pokemon_name: "") {
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

    const { loading, error, data, refetch } = useQuery(GET_NEW_POSTS);

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
    }, [listModalClosed]);

    return (
        <ContentStyle>
            <h1>Pokémoem에 오신 것을{props.width < 500 ? <br /> : ' '}환영합니다</h1>
            <p>포케모음은 포켓몬 배틀 정보 전문 웹사이트입니다.{props.width < 500 ? <br /> : ' '}잘 부탁드립니다!</p>
            <p><strong>정보글 게시판 오픈!</strong></p>
            <p>로그인하시면 정보글을 기여하실 수 있습니다.{props.width < 500 ? <br /> : ' '}게시판을 풍성하게 만들어주세요!</p>
            <p><strong>한국 공식 대회 결과 정리 페이지 오픈!</strong></p>
            <p>[기능] 탭을 통해 이용하실 수 있습니다.</p>
            {loading ? <div>로딩중...</div> : error ? <div>에러가 발생했습니다</div> : 
            <><PokedexNewSamplesPanel 
                id={props.userid}
                authenticated={props.authenticated}
                samplesData={data.singles}
                rule={0}
                onlistmodalopen={handleListModalOpen}
                onlistmodalclose={handleListModalClose}
                width={props.width}
            /><PokedexNewSamplesPanel 
                id={props.userid}
                authenticated={props.authenticated}
                samplesData={data.doubles}
                rule={1}
                onlistmodalopen={handleListModalOpen}
                onlistmodalclose={handleListModalClose}
                width={props.width}
            /></>}
            <p><a href="https://twitter.com/JustBestRyuna" target="_blank">개발자 트위터</a> / <a href="https://www.patreon.com/justbestryuna" target="_blank">개발자 후원</a></p>
        </ContentStyle>
    );
}

export default PokedexIndex;