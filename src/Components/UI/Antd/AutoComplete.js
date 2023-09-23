import AutoComplete from "antd/lib/auto-complete";
import styled from 'styled-components'

const StyledAutoComplete = styled(AutoComplete)`
.ant-input{
    // border-radius: 0.1875em;
    border: 0.0625em solid ${props => props.theme.inputBorderColor};
    background-color: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.color};
    display: block;
// border-radius: 0.3rem;
    outline: none;
    box-shadow: 0em 0.25em 0.625em -0.25em  ${props => props.theme.boxShadowColor};
    padding: 0.3rem 1rem;
   &:hover{
    outline: none;
    box-shadow: 0em 0.25em 0.625em -0.125em  ${props => props.theme.boxShadowColor};
    }
    ::placeholder {
      color: #888;
    }
}

`
export default StyledAutoComplete;