import { useState, useEffect } from 'react';
import Router from 'next/router'
import styled from 'styled-components';
import { gql, useMutation } from "@apollo/client";

import WysiwygEditor from '../WysiwygEditor'
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

const TitleForm = styled.input`
    font-size: 24px;
    font-family: inherit;
    width: 90%;
    padding: 5px;
`;

const ArticlesWrite = (props) => {

    const [title, setTitle] = useState('');
    const [editorState, setEditorState] = useState('');

    const handleTitle = (e) => {
        setTitle(e.target.value)
    }

    const CREATE_ARTICLE = gql`
        mutation CreateArticle($title: String, $editorState: String, $token: String) {
            createArticle(title: $title, content: $editorState, token: $token)
        }
    `;

    const [createArticle] = useMutation(CREATE_ARTICLE,
        {
            onCompleted(data) {
                alert("정보글이 정상적으로 등록되었습니다. 관리자의 검수 후 업로드 여부가 결정됩니다.");
                Router.push(`/articles`);
            }
        });

    const postArticle = (e) => {
        e.preventDefault();
        createArticle({ variables: { title: title, editorState: editorState, token: localStorage.getItem('token') } });
    }

    if (props.loading) return <ContentStyle width={props.width}>로딩중..</ContentStyle>;
    if (props.error) return <ContentStyle width={props.width}>에러가 발생했습니다.<br />찾으시는 글이 없는 것 같아요... 아마도?</ContentStyle>;

    return (
        <ContentStyle width={props.width}>
            {props.userInfo ? <><p><form>
                <TitleForm type="text" placeholder="제목" value={title} onChange={handleTitle} width={props.width}/>
            </form></p>
            <p>※ 기여하신 글은 관리자의 검수를 받은 후 업로드 여부가 결정됩니다.<br />
            ※ 부적절한 내용이 있을 경우 수정될 수 있습니다.<br />
            ※ 게시판 기능이 아직 불완전합니다. 글 작성시 꼭 백업을 부탁드립니다.<br />
            ※ HTML 태그를 복사-붙여넣기 시 동작하지 않을 수 있습니다.</p>
            <WysiwygEditor 
                onChange={value => setEditorState(value)}
            />
            <p style={{textAlign: "center"}}><Button onClick={postArticle}>정보글 기여하기</Button></p>
            <p><a href="https://twitter.com/JustBestRyuna" target="_blank">개발자 트위터</a> / <a href="https://www.patreon.com/justbestryuna" target="_blank">개발자 후원</a></p></>
            : null}
        </ContentStyle>
    );
}

export default ArticlesWrite;