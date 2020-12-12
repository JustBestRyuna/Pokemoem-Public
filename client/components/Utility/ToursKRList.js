import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { TriangleRight, TriangleLeft } from '@styled-icons/entypo'

import ToursListItem from './ToursListItem'

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

const ToursKRList = (props) => {

    const [search, setSearch] = useState('');
    const [toursList, setToursList] = useState(null);
    const [filteredList, setFilteredList] = useState(null);
    const [scrollLimit, setScrollLimit] = useState(30);
    const [mobile, setMobile] = useState(false);
    const [contentToggle, setContentToggle] = useState(false);

    const onChange = (e) => {
        setSearch(e.target.value);
        setScrollLimit(30);
        setFilteredList(e.target.value ? toursList.filter((c) => {
            return c ? c.title.includes(e.target.value) || c.date.includes(e.target.value) : false;
        }) : toursList);
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
        if (props.loading || !props.tours) {
            return;
        }
        setToursList(props.tours);
        setScrollLimit(30);
        setFilteredList(search ? props.tours.filter((c) => {
            return c.title.includes(search) || c.date.includes(search);
        }) : props.tours);
    }, [props.tours]);

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
                {(!props.loading && props.tours && filteredList)
                ? (filteredList.slice(0, scrollLimit).map((tour, index) => {
                    return (tour ? (<ToursListItem
                        key={tour.id}
                        id={tour.id}
                        title={tour.title}
                        />) : null);
                })) : <ToursListItem title={"로딩중..."} />}
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
                {(!props.loading && props.tours && filteredList)
                ? (filteredList.slice(0, scrollLimit).map((tour, index) => {
                    return (tour ? (<ToursListItem
                        key={tour.id}
                        id={tour.id}
                        title={tour.title}
                        />) : null);
                })) : <ToursListItem title={"로딩중..."} />}
                </ListItemsStyle>
        </ListStyle>}</>
    );
}

export default ToursKRList;