import Link from 'next/link'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Menu } from '@styled-icons/boxicons-regular'

import { readingArticleVar } from '../lib/apolloClient'

const HeaderStyle = styled.div`
    position: static;
    left: 0;
    right: 0;
    top: 0;
    height: 95px;
    border-bottom: 1px solid #cccccc;
    width: 100%;
`;

const Logo = styled.img`
    display: inline-block;
    vertical-align: top;
    position: fixed;
    ${props => props.windowWidth > 500 ? 'left: 55px;' : 'left: 35px;'}
    top: 10px;
`;

const LogoHeader = styled.a`
    display: inline-block;
    position: fixed;
    top: 35px;
    ${props => props.width > 500 ? 'left: 150px;' : 'left: 130px;'}
    font-size: 20px;
    letter-spacing: 1px;
    text-decoration: none;
    color: black;
`;

const MenuWrapper = styled.span`
    float: right;
    margin-right: 55px;
    display: inline-block;
`;

const MenuItem = styled.a`
    &:hover {
        border-bottom: 7px solid #FFC000;
    }
    display: inline-block;
    font-size: 20px;
    padding: 30px;
    width: 60px;
    vertical-align: top;
    text-decoration: none;
    color: black;
    text-shadow: 0 1px rgba(0,0,0,0.45);
`;

const MenuIcon = styled(Menu)`
    &:hover {
        color: #FFC000;
    }

    display: inline-block;
    vertical-align: top;
    position: fixed;
    right: 35px;
    top: 25px;
`;

const MenuDiv = styled.div`
    z-index: 3;
    position: absolute;
    left: 0;
    right: 0;
    top: 96px;
    height: 200px;
    width: 100%;
    background-color: white;
    border-bottom: 1px solid #cccccc;
`;

const MenuItemMobile = styled.a`
    &:hover {
        border-left: 7px solid #FFC000;
    }
    display: inline-block;
    font-size: 20px;
    width: 100%;
    height: 50px;
    vertical-align: top;
    text-decoration: none;
    color: black;
    text-shadow: 0 1px rgba(0,0,0,0.45);
`;

const Header = (props) => {
    const [menuToggle, setMenuToggle] = useState(false);

    useEffect(() => {
        if (props.width >= 1024) {
            setMenuToggle(false);
        }
    }, [props.width]);

    const handleMenuIcon = () => {
        setMenuToggle(!menuToggle);
    }

    return (
        <>
            <HeaderStyle>
                <Link href="/">
                    <Logo src="/images/790.png" windowWidth={props.width}/></Link>
                <Link href="/">
                    <LogoHeader width={props.width}>Pokémoem Beta</LogoHeader></Link>
                {props.width >= 1024 ? <MenuWrapper>
                    <Link href="/pokedex/[[...name]]" as={`/pokedex/${props.name}`}>
                        <MenuItem>포켓몬</MenuItem></Link>
                    {readingArticleVar() ? 
                    <Link href="/articles/[id]" as={`/articles/${readingArticleVar()}`}><MenuItem>정보글</MenuItem></Link> :
                    <Link href="/articles"><MenuItem>정보글</MenuItem></Link>}
                    <Link href="/utility"><MenuItem>기능</MenuItem></Link>
                    {props.authenticated ? 
                    <Link href="/mypage/[id]" as={`/mypage/${props.userid}`}><MenuItem>내 정보</MenuItem></Link> : 
                    <Link href="/login"><MenuItem>로그인</MenuItem></Link>}
                </MenuWrapper> : 
                <MenuIcon size="50" onClick={handleMenuIcon} />}
            </HeaderStyle>
            {menuToggle ? <MenuDiv>
                <Link href="/pokedex/[[...name]]" as={`/pokedex/${props.name}`}>
                    <MenuItemMobile>포켓몬</MenuItemMobile></Link>
                {readingArticleVar() ? 
                <Link href="/articles/[id]" as={`/articles/${readingArticleVar()}`}><MenuItemMobile>정보글</MenuItemMobile></Link> : 
                <Link href="/articles"><MenuItemMobile>정보글</MenuItemMobile></Link>}
                <Link href="/utility"><MenuItemMobile>기능</MenuItemMobile></Link>
                {props.authenticated ? 
                <Link href="/mypage/[id]" as={`/mypage/${props.userid}`}><MenuItemMobile>내 정보</MenuItemMobile></Link> : 
                <Link href="/login"><MenuItemMobile>로그인</MenuItemMobile></Link>}
            </MenuDiv> : null}
        </>
    );
}

export default Header;