import styled from 'styled-components'

const ContentStyle = styled.div`
    ${props => props.width >= 775 ? 'left: 310px;' : 'left: 10%;'}
    position: fixed;
    padding-top: 30px;
    padding-bottom: 30px;
    ${props => props.width >= 500 ? 'padding-left: 30px;' : ''}
    ${props => props.width >= 500 ? 'padding-right: 30px;' : ''}
    top: 104px;
    overflow: auto;
    right: 0;
    bottom: 0;
    text-align: left;
    box-sizing: border-box;
`;

const ToursKRContent = (props) => {

    if (props.loading) return <ContentStyle width={props.width}>로딩중..</ContentStyle>;
    if (props.error) return <ContentStyle width={props.width}>에러가 발생했습니다.<br />찾으시는 글이 없는 것 같아요... 아마도?</ContentStyle>;

    return (
        <ContentStyle width={props.width}>
            <h1>{props.tourinfo.title}</h1>
            <p>날짜: {props.tourinfo.date}</p>
            <p>룰: {props.tourinfo.rule}</p>
            <p>{props.tourinfo.description}</p>
            <h2>대회 결과</h2>
            <table>
                <thead>
                    <tr>
                        <th>순위</th>
                        <th>성명</th>
                        <th>닉네임</th>
                        <th colSpan="6">포켓몬</th>
                    </tr>
                </thead>
                <tbody>
                    {props.result.map((team, index) => {
                    return (team ? (<tr key={team.id}>
                        <th>{team.place}</th>
                        <td>{team.name}</td>
                        <td>{team.nickname}</td>
                        <td>{team.poke1 ? <img src={`/images/${team.poke1icon}`} 
                            onError={(e) => {e.target.onerror = null; e.target.src=`/images/icon/${('00' + team.poke1dexno.toString()).slice(-3)}.png`}}/>
                            : null}</td>
                        <td>{team.poke2 ? <img src={`/images/${team.poke2icon}`} 
                            onError={(e) => {e.target.onerror = null; e.target.src=`/images/icon/${('00' + team.poke2dexno.toString()).slice(-3)}.png`}}/>
                            : null}</td>
                        <td>{team.poke3 ? <img src={`/images/${team.poke3icon}`} 
                            onError={(e) => {e.target.onerror = null; e.target.src=`/images/icon/${('00' + team.poke3dexno.toString()).slice(-3)}.png`}}/>
                            : null}</td>
                        <td>{team.poke4 ? <img src={`/images/${team.poke4icon}`} 
                            onError={(e) => {e.target.onerror = null; e.target.src=`/images/icon/${('00' + team.poke4dexno.toString()).slice(-3)}.png`}}/>
                            : null}</td>
                        <td>{team.poke5 ? <img src={`/images/${team.poke5icon}`} 
                            onError={(e) => {e.target.onerror = null; e.target.src=`/images/icon/${('00' + team.poke5dexno.toString()).slice(-3)}.png`}}/>
                            : null}</td>
                        <td>{team.poke6 ? <img src={`/images/${team.poke6icon}`} 
                            onError={(e) => {e.target.onerror = null; e.target.src=`/images/icon/${('00' + team.poke6dexno.toString()).slice(-3)}.png`}}/>
                            : null}</td>
                    </tr>) : null)})}
                </tbody>
            </table>
            <p><a href="https://twitter.com/JustBestRyuna" target="_blank">개발자 트위터</a> / <a href="https://www.patreon.com/justbestryuna" target="_blank">개발자 후원</a></p>
        </ContentStyle>
    );
};

export default ToursKRContent;