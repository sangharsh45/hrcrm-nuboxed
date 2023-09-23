import styled from "styled-components";

const StyledLabel = styled.label`
  color: ${props => props.theme.color};
  font-weight: bold;
   margin: 0.1rem 0 0.02rem 0.2rem;
   font-size: 0.75rem;
   display:flex;
   flex-direction: column;
`;
export default StyledLabel;
