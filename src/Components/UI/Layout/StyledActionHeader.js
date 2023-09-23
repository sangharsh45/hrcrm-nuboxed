import styled from "styled-components";

const StyledActionHeader = styled.div`
    background:${props => props.theme.backgroundColor}; 
    color: ${props => props.theme.color}
    height: 2.5em;
    margin:  0.3rem;
    padding: 0.3rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    border-radius: 0.2rem;
    box-shadow: 0 0.0625em 0.25em 0.0625em${props => props.theme.boxShadowColor};
`
export default StyledActionHeader;