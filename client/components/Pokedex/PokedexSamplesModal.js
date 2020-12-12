import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { TimesCircle } from '@styled-icons/fa-regular'
import { TwitterSquare } from '@styled-icons/fa-brands'
import dynamic from 'next/dynamic'

const Viewer = dynamic(() => import("@toast-ui/react-editor").then(m => m.Viewer), { ssr: false });

import httpGet from '../../http-get'
import httpPost from '../../http-post'
import Button from '../Button'

const PokedexSamplesModalStyle = styled.div`
    position: relative;
`;

const MobileDiv = styled.div`
    width: 100%;
    ${props => props.width < 600 ? 'height: 30px;' : ''}
`;

const LeftAlign = styled.div`
    text-align: left;
    ${props => props.width >= 500 ? 'padding-left: 150px;' : ''}
    ${props => props.width >= 500 ? 'padding-right: 150px;' : ''}
`;

const RightAlign = styled.div`
    text-align: right;
    ${props => props.width >= 500 ? 'padding-right: 150px;' : ''}
`;

const TwitterButton = styled(TwitterSquare)`
    color: #1DA1F2;
`;

const SampleSpan = styled.span`
    font-size: 20px;
`;

const StatsSpan = styled.span`
    font-size: 16px;
`;

const EditorWrapper = styled.div`
    width: 80%;
    margin: auto;
`;

const LikeButton = styled.button`
    border: 1px solid red;
    border-radius: 80px;
    font-size: 20px;
    padding: 10px 20px;
    margin: 20px;
    outline: none;
    cursor: pointer;
    color: red;

    background-color: white;
    font-family: "Pokemoem Font";

    &:hover {
        color: white;
        background-color: red;
    }
`;

const UnlikeButton = styled.button`
    border: 1px solid red;
    border-radius: 80px;
    font-size: 20px;
    padding: 10px 20px;
    margin: 20px;
    outline: none;
    cursor: pointer;
    color: white;
        background-color: red;
    font-family: "Pokemoem Font";

    &:hover {
        color: red;
        background-color: white;
    }
`;

const CloseButton = styled(TimesCircle)`
    position: absolute;
    right: 20px;
    top: 0px;
    &:hover {
        color: red;
    }
`;

const PokedexSamplesModal = (props) => {

    const [username, setUsername] = useState('');
    const [twitter, setTwitter] = useState('');
    const [nature, setNature] = useState('');
    const [liked, setLiked] = useState(false);
    const [created, setCreated] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const Router = useRouter();

    const fetchUsername = async () => {
        setError(null);
        setLoading(true);
        if (props.sampleData) {
            try {
                const response = await httpGet.get(`/users/${props.sampleData.user_id}`);
                setUsername(response.data.username);
            } catch (e) {
                setError(e);
            }
        }   
        setLoading(false);
    }

    const fetchTwitter = async () => {
        setError(null);
        setLoading(true);
        if (props.sampleData) {
            try {
                const response = await httpGet.get(`/users/twitter/${props.sampleData.user_id}`);
                setTwitter(response.data.screen_name);
            } catch (e) {
                setError(e);
            }
        }   
        setLoading(false);
    }

    const fetchNature = async () => {
        try {
            setError(null);
            setLoading(true);
            if (props.sampleData) {
                const response = await httpGet.get(`/pokedex/natures/${props.sampleData.nature}`);
                setNature(response.data);
            }
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    }

    const checkIfLiked = async () => {
        try {
            setError(null);
            setLoading(true);
            const response = await httpGet.get(`/pokedex/checkifliked/${props.sampleData.id}/${props.authenticated}/${props.userid}`);
            if (response.data) {
                setLiked(true);
            }
        } catch (e) {
            setError(e);
            setLiked(false);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchUsername();
        fetchTwitter();
        fetchNature();
        checkIfLiked();
        const serverDate = new Date(props.sampleData.created);
        setCreated(serverDate);
    }, [props.sampleData])

    const handleTwitter = () => {
        window.open(`https://twitter.com/${twitter}`, "_blank");
    }

    const handleLike = async () => {
        try {
            setError(null);
            setLoading(true);
            await httpGet.get(`/pokedex/likesample/${props.sampleData.id}/${props.authenticated}/${props.userid}`);
            setLiked(true);
            props.onlikechange();
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    }

    const handleUnlike = async () => {
        try {
            setError(null);
            setLoading(true);
            await httpGet.get(`/pokedex/unlikesample/${props.sampleData.id}/${props.authenticated}/${props.userid}`);
            setLiked(false);
            props.onlikechange();
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    }

    const handleDelete = async (e) => {
        try {
            setError(null);
            setLoading(true);
            const deleteConfirm = confirm("샘플을 정말로 삭제하시겠습니까?");
            if (deleteConfirm) {
                await httpPost.delete(`/pokedex/deletesample/${props.sampleData.id}`);
                props.onSetName(props.pokemonData.name_en);
                Router.push(`/pokedex/${props.pokemonData.name_en}`)
            }
        } catch (err) {
            setError(err);
        }
        setLoading(false);
    }

    if (loading) return <div>로딩중...</div>;
    if (error) return <div>에러가 발생했습니다</div>;

    return (
        <PokedexSamplesModalStyle>
            <MobileDiv width={props.width}></MobileDiv>
            <h1>{props.pokemonData.name_ko}: {props.sampleData.title}</h1>
            <RightAlign width={props.width}><p>기여자: {username} {twitter ? <TwitterButton size="20" onClick={handleTwitter}/> : null}<br />
            작성 일시: {created ? created.toLocaleString('ko-KR') : null}</p></RightAlign>
            <LeftAlign width={props.width}>
            <h2>샘플 상세</h2>
            <SampleSpan>
                {props.pokemonData.name_ko} @ {props.sampleData.item}<br />
                {nature.name_ko} / {props.sampleData.ability}<br />
                개체값: {props.sampleData.ivh} - {props.sampleData.iva} - {props.sampleData.ivb} - {props.sampleData.ivc} - {props.sampleData.ivd} - {props.sampleData.ivs}<br />
                노력치: {props.sampleData.evh} - {props.sampleData.eva} - {props.sampleData.evb} - {props.sampleData.evc} - {props.sampleData.evd} - {props.sampleData.evs}<br />
                <StatsSpan>(레벨 50 기준 실수치: 
                    {parseInt(((props.pokemonData.hp * 2) + props.sampleData.ivh + parseInt(props.sampleData.evh / 4) + 100) * 0.5) + 10}- 
                    {parseInt((parseInt(((props.pokemonData.attack * 2) + props.sampleData.iva + parseInt(props.sampleData.eva / 4)) * 0.5) + 5) * nature.a)}- 
                    {parseInt((parseInt(((props.pokemonData.defense * 2) + props.sampleData.ivb + parseInt(props.sampleData.evb / 4)) * 0.5) + 5) * nature.b)}- 
                    {parseInt((parseInt(((props.pokemonData.spatk * 2) + props.sampleData.ivc + parseInt(props.sampleData.evc / 4)) * 0.5) + 5) * nature.c)}- 
                    {parseInt((parseInt(((props.pokemonData.spdef * 2) + props.sampleData.ivd + parseInt(props.sampleData.evd / 4)) * 0.5) + 5) * nature.d)}- 
                    {parseInt((parseInt(((props.pokemonData.speed * 2) + props.sampleData.ivs + parseInt(props.sampleData.evs / 4)) * 0.5) + 5) * nature.s)})
                </StatsSpan><br />
                - {props.sampleData.move1}<br />
                - {props.sampleData.move2}<br />
                - {props.sampleData.move3}<br />
                - {props.sampleData.move4}<br />
            </SampleSpan>
            <h2>샘플 설명</h2>
            <Viewer
                initialValue={props.sampleData.content}
                height="auto"
            />
            </LeftAlign>
            {liked ? <UnlikeButton onClick={handleUnlike}>좋아요 ❤️</UnlikeButton> : <LikeButton onClick={handleLike}>좋아요 ❤️</LikeButton>}
            <RightAlign width={props.width}>
                {((props.sampleData.user_id == props.userid) || (props.userid == "9")) ? <Button onClick={handleDelete}>삭제하기</Button>: null}
            </RightAlign>
            <CloseButton size="30" onClick={props.onbuttonclick} />
        </PokedexSamplesModalStyle>
    );
}

export default PokedexSamplesModal;