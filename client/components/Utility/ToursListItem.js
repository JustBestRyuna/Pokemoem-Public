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

const ListItemTextStyle = styled.span`
    vertical-align: middle;
    padding-left: 15px;
    padding-right: 15px;
    height: 80px;
    display: table-cell;
`;

const ToursListItem = (props) => {
    return (
        <ListItemStyle onClick={() => {
            Router.push('/utility/tours/[id]', `/utility/tours/${props.id}`);
            }}>
            <ListItemTextStyle>
                {props.title}
            </ListItemTextStyle>
        </ListItemStyle>
    );
};

export default ToursListItem;