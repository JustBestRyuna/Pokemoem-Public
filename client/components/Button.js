import styled from 'styled-components'

const StyledButton = styled.button`
    border: none;
    border-radius: 4px;
    font-size: 20px;
    font-weight: bold;
    padding: 0.75rem 1.25rem;
    color: white;
    outline: none;
    cursor: pointer;

    background: black;
    font-family: "Pokemoem Font"
`;

const Button = (props) => {
    return <StyledButton {...props} />;
}

export default Button;