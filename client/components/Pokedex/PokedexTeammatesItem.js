import styled from 'styled-components'
import Router from 'next/router'

const PokedexTeammatesItemStyle = styled.a`
    height: 50px;
    display: block;
    border-bottom: 0.5px solid #bbb;
    text-decoration: none;
    color: black;
    position: relative;
    &:hover {
        background-color: #eee;
    }
`;

const PokedexTeammatesItemNumber = styled.span`
    font-size: 14px;
    top: 18px;
    left: 18px;
    display: inline-block;
    position: absolute;
`;

const PokedexTeammatesItemName = styled.span`
    top: 17px;
    left: 50px;
    display; inline-block;
    position: absolute;
`;

const PokedexTeammatesItemType1 = styled.img`
    top: -5px;
    right: 100px;
    display: inline-block;
    position: absolute;
    transform: scale(0.5);
`;

const PokedexTeammatesItemType2 = styled.img`
    top: -5px;
    right: 60px;
    display: inline-block;
    position: absolute;
    transform: scale(0.5);
`;

const PokedexTeammatesItemIconWrapper = styled.span`
    top: 5px;
    right: 5px;
    width: 60px;
    height: 50px;
    vertical-align: middle;
    text-align: center;
    position: absolute;
`;

const PokedexTeammatesItem = (props) => {
    return (
        <PokedexTeammatesItemStyle onClick={() => {props.onSetName(props.teammatesData.name_en);
            Router.push('/pokedex/[[...name]]', `/pokedex/${props.teammatesData.name_en}`);}}>
            <PokedexTeammatesItemNumber>#{props.number}</PokedexTeammatesItemNumber>
            <PokedexTeammatesItemName>{props.teammatesData.name_ko}</PokedexTeammatesItemName>
            {props.teammatesData.type2 ? 
                <PokedexTeammatesItemType1 src={`/images/types/Icon_${props.teammatesData.type1}.png`} /> : null}
            <PokedexTeammatesItemType2 src={`/images/types/Icon_${props.teammatesData.type2 ? 
                props.teammatesData.type2 : props.teammatesData.type1}.png`} />
            <PokedexTeammatesItemIconWrapper>
                <img src={`/images/${props.teammatesData.menu_icon}`} 
                    onError={(e) => {e.target.onerror = null; e.target.src=`/images/icon/${('00' + props.teammatesData.dex_no.toString()).slice(-3)}.png`}} />
            </PokedexTeammatesItemIconWrapper>
        </PokedexTeammatesItemStyle>
    );
}

export default PokedexTeammatesItem;