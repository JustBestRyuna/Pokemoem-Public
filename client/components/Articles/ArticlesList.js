import { useState, useEffect } from 'react'
import Router from 'next/router'
import styled from 'styled-components'
import { TriangleRight, TriangleLeft } from '@styled-icons/entypo'
import { PlusSquare } from '@styled-icons/fa-solid'

import ArticlesListItem from './ArticlesListItem'

const ListStyle = styled.div`
    left: 0px;
    top: 104px;
    bottom: 0;
    width: 310px;
    position: fixed;
    box-sizing: border-box;
`;

const SearchBarStyle = styled.input`
    font-size: 15px;
    font-family: inherit;
    width: 98%;
    padding: 5px;
`;

const ListItemsStyle = styled.div`
    text-align: left;
    height: 94%;
    overflow: auto;
`;

const MobileListStyle = styled.div`
    left: 0px;
    top: 104px;
    bottom: 0;
    width: 95%;
    position: fixed;
    box-sizing: border-box;
    background-color: white;
    z-index: 1;
`;

const MobileContentToggleDiv = styled.div`
    right: 0px;
    top: 160px;
    bottom: 0;
    width: 5%;
    position: fixed;
    vertical-align: middle;
    box-sizing: border-box;
    background-color: white;
    z-index: 1;
`;

const MobileListToggleDiv = styled.div`
    left: 0px;
    top: 160px;
    bottom: 0;
    width: 5%;
    position: fixed;
    box-sizing: border-box;
    vertical-align: middle;
    border-right: 1px solid #ccc;
`;

const TriangleLeftStyle = styled(TriangleLeft)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const TriangleRightStyle = styled(TriangleRight)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const PlusItemStyle = styled.a`
    border: 1px solid #ccc;
    &:hover {
        background-color: #eee;
    }
    display: block;
    vertical-align: middle;
    text-decoration: none;
    color: black;
    position: relative;
`;

const PlusItemTextStyle = styled.span`
    vertical-align: middle;
    padding-left: 15px;
    padding-right: 15px;
    height: 50px;
    display: table-cell;
`;

const ArticlesList = (props) => {

    const [search, setSearch] = useState('');
    const [articlesList, setArticlesList] = useState(null);
    const [filteredList, setFilteredList] = useState(null);
    const [scrollLimit, setScrollLimit] = useState(30);
    const [mobile, setMobile] = useState(false);
    const [contentToggle, setContentToggle] = useState(false);

    const onChange = (e) => {
        setSearch(e.target.value);
        setScrollLimit(30);
        setFilteredList(e.target.value ? articlesList.filter((c) => {
            return c ? c.title.includes(e.target.value) || c.content.includes(e.target.value) : false;
        }) : articlesList);
    }

    const onScroll = (e) => {
        const scrollTop = e.target.scrollTop;
        const scrollHeight = e.target.scrollHeight;
        const offsetHeight = e.target.offsetHeight;
        const scrolledToBottom = Math.ceil(scrollTop + offsetHeight) >= (scrollHeight);
        if (scrolledToBottom) {
            setScrollLimit(scrollLimit + 30);
        }
    }

    const handleContentToggle = (e) => {
        setContentToggle(true);
    }

    const handleListToggle = (e) => {
        setContentToggle(false);
    }

    useEffect(() => {
        if (props.width < 775) {
            setMobile(true);
        } else {
            setMobile(false);
            setContentToggle(false);
        }
    }, [props.width]);

    useEffect(() => {
        if (props.loading || !props.articles) {
            return;
        }
        setArticlesList(props.articles);
        setScrollLimit(30);
        setFilteredList(search ? props.articles.filter((c) => {
            return c.title.includes(search) || c.content.includes(search);
        }) : props.articles);
    }, [props.articles]);

    return (
        <>{mobile ? (contentToggle ? <MobileListToggleDiv onClick={handleListToggle}><TriangleRightStyle size="30" /></MobileListToggleDiv>
         : <><MobileListStyle>
            <SearchBarStyle 
                type="text" 
                placeholder="Search" 
                value={search}
                onChange={onChange}
                />
            <ListItemsStyle 
                onScroll={onScroll}
                >
                {props.userInfo ? <PlusItemStyle onClick={() => {
                    Router.push('/articles/new');}}>
                    <PlusItemTextStyle><PlusSquare size="30" />정보글 기여하기</PlusItemTextStyle>
                </PlusItemStyle> : null}
                {(!props.loading && props.articles && filteredList)
                ? (filteredList.slice(0, scrollLimit).map((article, index) => {
                    return (article ? (<ArticlesListItem
                        key={article.id}
                        id={article.id}
                        title={article.title}
                        />) : null);
                })) : <ArticlesListItem title={"로딩중..."} />}
                </ListItemsStyle>
        </MobileListStyle><MobileContentToggleDiv onClick={handleContentToggle}><TriangleLeftStyle size="30"/></MobileContentToggleDiv></>)
         : <ListStyle>
            <SearchBarStyle 
                type="text" 
                placeholder="Search" 
                value={search}
                onChange={onChange}
                />
            <ListItemsStyle 
                onScroll={onScroll}
                >
                {props.userInfo ? <PlusItemStyle onClick={() => {
                    Router.push('/articles/new');}}>
                    <PlusItemTextStyle><PlusSquare size="30" />정보글 기여하기</PlusItemTextStyle>
                </PlusItemStyle> : null}
                {(!props.loading && props.articles && filteredList)
                ? (filteredList.slice(0, scrollLimit).map((article, index) => {
                    return (article ? (<ArticlesListItem
                        key={article.id}
                        id={article.id}
                        title={article.title}
                        />) : null);
                })) : <ArticlesListItem title={"로딩중..."} />}
                </ListItemsStyle>
        </ListStyle>}</>
    );
}

export default ArticlesList;