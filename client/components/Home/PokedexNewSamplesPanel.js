import styled from 'styled-components'

import PokedexNewSamplesItem from './PokedexNewSamplesItem'

const PokedexStatsStyle = styled.div`
    ${props => props.width >= 500 ? 'margin: 30px;' : ''}
    text-align: left;
    vertical-align: top;
    display: inline-block;
    position: relative;
`;

const PokedexStatsHeaderStyle = styled.h2`
    font-size: 20px;
    margin-left: 20px;
`;

const PokedexStatsList = styled.div`
    width: 360px;
    height: 365px;
    border: 1px solid #ccc;
    overflow: auto;
`;

const PokedexNewSamplesPanel = (props) => {

    return (
        <PokedexStatsStyle width={props.width}>
            <PokedexStatsHeaderStyle>
                샘플 도감 최신 샘플: {props.rule == 0 ? '싱글배틀' : '더블배틀'}
            </PokedexStatsHeaderStyle>
            <PokedexStatsList>
                {props.samplesData && props.samplesData.length ? props.samplesData.map((element, index) => {
                    return (
                        <PokedexNewSamplesItem 
                            key={index}
                            sampleData={element}
                            userid={props.id}
                            authenticated={props.authenticated}
                            onlistmodalopen={props.onlistmodalopen}
                            onlistmodalclose={props.onlistmodalclose}
                            width={props.width}
                        />
                    );
                }) : null}
            </PokedexStatsList>
        </PokedexStatsStyle>
    );
}

export default PokedexNewSamplesPanel;