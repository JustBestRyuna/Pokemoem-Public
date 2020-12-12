import styled from 'styled-components'

import MyPagePostedSamplesItem from './MyPagePostedSamplesItem'

const Panel = styled.div`
    margin: 30px;
    display: inline-block;
`;

const PanelHeader = styled.h2`
    font-size: 20px;
`;

const PanelBox = styled.div`
    width: 360px;
    height: 365px;
    border: 1px solid #ccc;
    overflow: auto;
`;

const MyPagePostedSamplesPanel = (props) => {

    return (
        <Panel>
            <PanelHeader>내가 기여한 샘플 ({props.samplesData ? props.samplesData.length : null})</PanelHeader>
            <PanelBox>
                {props.samplesData && props.samplesData.length ? props.samplesData.map((element, index) => {
                    return (
                        <MyPagePostedSamplesItem 
                            key={index}
                            sampleData={element}
                            userid={props.id}
                            onlistmodalopen={props.onlistmodalopen}
                            onlistmodalclose={props.onlistmodalclose}
                            width={props.width}
                        />
                    );
                }) : null}
            </PanelBox>
        </Panel>
    ); 
}

export default MyPagePostedSamplesPanel;