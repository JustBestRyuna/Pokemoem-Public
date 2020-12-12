import Router from 'next/router'
import styled from 'styled-components'

const ListItemStyle = styled.a`
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

const ListItemIconWrapper = styled.span`
    display: table-cell;
    width: 60px;
    height: 50px;
    vertical-align: middle;
    text-align: center;
`;

const ListItemTextStyle = styled.span`
    vertical-align: middle;
    height: 50px;
    display: table-cell;
`;

const ListItemUsage = styled.span`
    font-size: 14px;
    top: 18px;
    right: 18px;
    display: table-cell;
    position: absolute;
`;

const PokedexListItem = (props) => {
    return (
        <ListItemStyle onClick={() => {props.onSetName(props.name_en);
            Router.push('/pokedex/[[...name]]', `/pokedex/${props.name_en}`);}}>
            <ListItemIconWrapper>
                <img src={`/images/${props.menuicon}`} 
                    onError={(e) => {e.target.onerror = null; e.target.src=`/images/icon/${('00' + props.dex_no.toString()).slice(-3)}.png`}} />
            </ListItemIconWrapper>
            <ListItemTextStyle>
                {props.name_ko}
            </ListItemTextStyle>
            <ListItemUsage>
                #{props.number}
            </ListItemUsage>
        </ListItemStyle>
    );
};

export default PokedexListItem;