import { useState, useEffect, useReducer } from 'react'
import styled from 'styled-components'

import httpPost from '../../http-post'
import Button from '../Button'

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

const SampleSpan = styled.span`
    font-size: 20px;
`;

const PokeForm = styled.input`
    font-size: 20px;
    font-family: inherit;
    width: 120px;
    padding: 5px;
`;

const ItemForm = styled.input`
    font-size: 20px;
    font-family: inherit;
    width: 160px;
    padding: 5px;
`;

const NouthucaSearcher = (props) => {

    const initialState = {
        poke1: '',
        item1: '',
        poke2: '',
        item2: '',
        poke3: '',
        item3: '',
        rule: 0
    }

    const reducer = (state, action) => {
        return {...state, [action.type]: action.payload};
    }

    const dispatcher = (string, dispatch) => {
        return (e) => dispatch({type: string, payload: e.target.value});
    }

    const [search, dispatch] = useReducer(reducer, initialState);
    const [nouthucaButton, setNouthucaButton] = useState(null);

    const fetch = async () => {
        try {
            const response = await httpPost.post('/pokedex/nouthuca', search);
            const poke1 = response.data[0];
            const item1 = response.data[1];
            const poke2 = response.data[2];
            const item2 = response.data[3];
            const poke3 = response.data[4];
            const item3 = response.data[5];
            const nouthucaString = `https://nouthuca.com/search/?${poke1 ? 'pokemon%5B0%5D=' + poke1 : ''}${item1 ? '&item%5B0%5D=' + item1 : ''}${poke2 ? '&pokemon%5B3%5D=' + poke2 : ''}${item2 ? '&item%5B3%5D=' + item2 : ''}${poke3 ? '&pokemon%5B6%5D=' + poke3 : ''}${item3 ? '&item%5B6%5D=' + item3 : ''}${search.rule ? '&rule%5Bダブル%5D=on' : '&rule%5Bシングル%5D='}`;
            setNouthucaButton(<Button onClick={() => {window.open(nouthucaString, '_blank');}}><img src={`/images/logo_160.png`}/><br/>Let's Go!</Button>);
        } catch (e) {
            console.log(e);
        }
    }

    const handleButton = () => {
        fetch();
    }

    return (
        <ContentStyle>
            <h1>포켓펑션(노스카) 검색 도우미</h1>
            <form>
                <SampleSpan>포켓몬 1: </SampleSpan><PokeForm type="text" placeholder="포켓몬" value={search.poke1} onChange={dispatcher('poke1', dispatch)} />
                <SampleSpan> @ </SampleSpan><ItemForm type="text" placeholder="지닌물건" value={search.item1} onChange={dispatcher('item1', dispatch)} /><br/>
                <SampleSpan>포켓몬 2: </SampleSpan><PokeForm type="text" placeholder="포켓몬" value={search.poke2} onChange={dispatcher('poke2', dispatch)} />
                <SampleSpan> @ </SampleSpan><ItemForm type="text" placeholder="지닌물건" value={search.item2} onChange={dispatcher('item2', dispatch)} /><br/>
                <SampleSpan>포켓몬 3: </SampleSpan><PokeForm type="text" placeholder="포켓몬" value={search.poke3} onChange={dispatcher('poke3', dispatch)} />
                <SampleSpan> @ </SampleSpan><ItemForm type="text" placeholder="지닌물건" value={search.item3} onChange={dispatcher('item3', dispatch)} /><br/>
                <p><SampleSpan>검색할 룰: </SampleSpan>
                <span onChange={dispatcher('rule', dispatch)}>
                    <input type="radio" name="rule" value={0} defaultChecked /><SampleSpan> 싱글배틀</SampleSpan>
                    <input type="radio" name="rule" value={1} /><SampleSpan> 더블배틀</SampleSpan>
                </span></p>
            </form>
            <p><Button onClick={handleButton}>링크 생성</Button></p>
            <p>{nouthucaButton}</p>
        </ContentStyle>
    );
}

export default NouthucaSearcher;