import { useRouter } from 'next/router'
import styled from 'styled-components'

import Button from '../Button'

const TemplateBlock = styled.div`
    position: absolute;
    top: 100px;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    background-color: #ddd;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const UtilityBox = styled.div`
    padding: 2rem;
    width: 500px;
    background-color: white;
`;

const UtilityAll = (props) => {

    const Router = useRouter();

    const handleNouthuca = () => {
        Router.push(`/utility/nouthuca`);
    }

    const handleTrainer = () => {
        Router.push(`/utility/trainer`);
    }

    const handleToursKR = () => {
        Router.push(`/utility/tours`);
    }

    return (
        <TemplateBlock>
            <UtilityBox>
                <h1>유용한 기능</h1>
                <p><Button onClick={handleNouthuca}>
                    <img src={`/images/logo_160.png`}/><br/>포켓펑션 검색 도우미</Button></p>
                <p><Button onClick={handleTrainer}>
                    <img src={`/images/trainer/5.png`}/><img src={`/images/trainer/6.png`}/><br/>트레이너 순위 확인</Button></p>
                <p><Button onClick={handleToursKR}>한국 공식 대회 결과</Button></p>
            </UtilityBox>
        </TemplateBlock>
    );
}

export default UtilityAll;