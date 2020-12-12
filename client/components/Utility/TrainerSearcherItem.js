import styled from 'styled-components'

const TrainerSearcherItemStyle = styled.div`
    width: 100%;
    height: 50px;
    border-bottom: 0.5px solid #bbb;
    position: relative;
    &:hover {
        background-color: #eee;
    }
`;

const TrainerSearcherItemNumber = styled.span`
    font-size: 14px;
    top: 18px;
    left: 18px;
    display: inline-block;
    position: absolute;
`;

const TrainerSearcherItemName = styled.span`
    top: 15px;
    left: 70px;
    display; inline-block;
    position: absolute;
`;

const TrainerSearcherItemUsage = styled.span`
    font-size: 14px;
    top: 18px;
    right: 18px;
    display: inline-block;
    position: absolute;
`;

const TrainerSearcherItem = (props) => {

    return (
        <TrainerSearcherItemStyle>
            {props.trainerdata ? <div>
            <TrainerSearcherItemNumber>#{props.trainerdata.rank}</TrainerSearcherItemNumber>
            <TrainerSearcherItemName>{props.trainerdata.name}</TrainerSearcherItemName>
            <TrainerSearcherItemUsage>{props.trainerdata.rating_value.slice(0, 4)}</TrainerSearcherItemUsage></div> : null}
        </TrainerSearcherItemStyle>
    );
}

export default TrainerSearcherItem;