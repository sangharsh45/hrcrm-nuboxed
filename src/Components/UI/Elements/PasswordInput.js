import styled from "styled-components";

const PasswordInput = styled.input.attrs({
  type: "password",
  size: props => (props.small ? 4 : undefined)
})`
   // border-radius: 0.1875em;
    // border: 0.0625em solid ${props => props.theme.inputBorderColor};
   // border: 0.0625em solid gainsboro;
    background-color: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.color};
    //  box-shadow: 0em 0.25em 0.625em -0.25em  ${props => props.theme.boxShadowColor}; 
     box-shadow:${props => (props.isShadow ? "" : "0em 0.25em 0.625em -0.25em #aaa")} ; 
    display: block;
    margin: 0 0 0.42rem 0;
   // border-radius: 0.3rem;
    outline: none;
    width:${props => (props ? props.width : "100%")};
    height:${props => (false ? props.height : "1.8125em")};
    Left:${props => props.Left || "auto"}
    /* box-shadow: 0em 0.25em 0.625em -0.25em  ${props => props.theme.boxShadowColor}; */
    padding: 0.3rem 1rem;
    
    border-right: ${props => (props.isRequired ? "0.1875em solid #ed260b" : "")};
  
    &:hover{
      box-shadow: 0em 0.25em 0.625em -0.125em  #777;
      border: 0.0625em solid #1890ff;
      // box-shadow: 0em 0.25em 0.625em -0.125em  ${props => props.theme.boxShadowColor};
      }
    ::placeholder {
      color: #888;
    }
   `;
export default PasswordInput;
