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

const ArticlesModify = (props) => {

    const [title, setTitle] = useState('');
    const [editorState, setEditorState] = useState('');

    const handleTitle = (e) => {
        setTitle(e.target.value)
    }

    const UPDATE_ARTICLE = gql`
        mutation UpdateArticle($id: Int, $title: String, $editorState: String, $token: String) {
            updateArticle(id: $id, title: $title, content: $editorState, token: $token)
        }
    `;

    const [updateArticle] = useMutation(UPDATE_ARTICLE,
        {
            onCompleted(data) {
                alert("정보글이 정상적으로 수정되었습니다.");
                Router.push(`/articles`);
            }
        });

    useEffect(() => {
        if (!props.articleInfo) return;
        setTitle(props.articleInfo.title);
        setEditorState(props.articleInfo.content)
    }, [props.articleInfo]);

    const postArticle = (e) => {
        e.preventDefault();
        updateArticle({ variables: { id: props.articleInfo.id, title: title, editorState: editorState, token: localStorage.getItem('token') } });
    }

    if (props.loading) return <ContentStyle width={props.width}>로딩중..</ContentStyle>;
    if (props.error) return <ContentStyle width={props.width}>에러가 발생했습니다.<br />찾으시는 글이 없는 것 같아요... 아마도?</ContentStyle>;

    return (
        <ContentStyle width={props.width}>
            {(props.userInfo && (props.userInfo.id === props.articleInfo.user_id || props.userInfo.role === "Administrator")) ?
            <><p><form>
                <TitleForm type="text" placeholder="제목" value={title} onChange={handleTitle} width={props.width}/>
            </form></p>
            <WysiwygEditor 
                initialValue={props.articleInfo.content}
                onChange={value => setEditorState(value)}
            />
            <p style={{textAlign: "center"}}><Button onClick={postArticle}>수정 완료하기</Button></p>
            <p><a href="https://twitter.com/JustBestRyuna" target="_blank">개발자 트위터</a> / <a href="https://www.patreon.com/justbestryuna" target="_blank">개발자 후원</a></p></> : null}
        </ContentStyle>
    );
}

export default ArticlesModify;