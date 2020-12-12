import { useState, useEffect } from 'react';
import Router from 'next/router'
import styled from 'styled-components';
import { gql, useMutation } from "@apollo/client";
import { TwitterSquare } from '@styled-icons/fa-brands'
import dynamic from 'next/dynamic'

const Viewer = dynamic(() => import("@toast-ui/react-editor").then(m => m.Viewer), { ssr: false });

import httpGet from '../../http-get'
import Button from '../Button'

const ContentStyle = styled.div`
    ${props => props.width >= 775 ? 'left: 310px;' : 'left: 10%;'}
    position: fixed;
    padding-top: 30px;
    padding-bottom: 30px;
    ${props => props.width >= 500 ? 'padding-left: 30px;' : ''}
    ${props => props.width >= 500 ? 'padding-right: 30px;' : ''}
    top: 104px;
    overflow: auto;
    right: 0;
    bottom: 0;
    text-align: left;
    box-sizing: border-box;
`;

const TwitterButton = styled(TwitterSquare)`
    color: #1DA1F2;
`;

const ArticlesContent = (props) => {

    const [username, setUsername] = useState('');
    const [twitter, setTwitter] = useState('');
    const [created, setCreated] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUsername = async () => {
        setError(null);
        setLoading(true);
        if (props.articleInfo) {
            try {
                const response = await httpGet.get(`/users/${props.articleInfo.user_id}`);
                setUsername(response.data.username);
            } catch (e) {
                setError(e);
            }
        }   
        setLoading(false);
    }

    const fetchTwitter = async () => {
        setError(null);
        setLoading(true);
        if (props.articleInfo) {
            try {
                const response = await httpGet.get(`/users/twitter/${props.articleInfo.user_id}`);
                setTwitter(response.data.screen_name);
            } catch (e) {
                setError(e);
            }
        }   
        setLoading(false);
    }

    useEffect(() => {
        fetchUsername();
        fetchTwitter();
        if (props.articleInfo) {
            const serverDate = new Date(parseInt(props.articleInfo.created));
            setCreated(serverDate);
        }
    }, [props.articleInfo])

    const handleTwitter = () => {
        window.open(`https://twitter.com/${twitter}`, "_blank");
    }

    const DELETE_ARTICLE = gql`
        mutation DeleteArticle($id: Int, $token: String) {
            deleteArticle(id: $id, token: $token)
        }
    `;

    const [deleteArticle] = useMutation(DELETE_ARTICLE,
        {
            onCompleted(data) {
                alert("정보글이 정상적으로 삭제되었습니다.");
                Router.push(`/articles`);
            }
        });

    if (props.loading) return <ContentStyle width={props.width}>로딩중..</ContentStyle>;
    if (props.error) return <ContentStyle width={props.width}>에러가 발생했습니다.<br />찾으시는 글이 없는 것 같아요... 아마도?</ContentStyle>;

    return (
        <ContentStyle width={props.width}>
            <h1>{props.articleInfo.title}</h1>
            <p>기여자: {username} {twitter ? <TwitterButton size="20" onClick={handleTwitter}/> : null}<br />
            작성 일시: {created ? created.toLocaleString('ko-KR') : null}</p>
            <Viewer
                initialValue={props.articleInfo.content}
                height="auto"
            />
            {(props.userInfo && (props.userInfo.id === props.articleInfo.user_id || props.userInfo.role === "Administrator")) ?
            <p style={{textAlign: "right"}}>
                <Button onClick={e => Router.push('/articles/modify/[id]', `/articles/modify/${props.articleInfo.id}`)}>수정하기</Button>
                <Button onClick={e => deleteArticle({ variables: { id: props.articleInfo.id, token: localStorage.getItem('token') } })}>삭제하기</Button>
            </p> : null}
            <p><a href="https://twitter.com/JustBestRyuna" target="_blank">개발자 트위터</a> / <a href="https://www.patreon.com/justbestryuna" target="_blank">개발자 후원</a></p>
        </ContentStyle>
    );
}

export default ArticlesContent;