import DatePicker from "antd/lib/date-picker";
import styled from "styled-components";

const StyledDatePicker = styled(DatePicker)`
  .ant-input {
    // border-radius: 0.1875em;
     border: 0.0625em solid ${props => props.theme.inputBorderColor};
     border: 0.0625em solid gainsboro;
    background-color: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.color};
    display: block;
    // margin: 0.2rem 0;
    margin:0 0 0.2em 0;
    // border-radius: 0.3rem;
    outline: none;
    height: 1.8125em;
    box-shadow: 0em 0.25em 0.625em -0.25em ${props => props.theme.boxShadowColor};
    border-right: ${props => (props.isRequired ? "0.1875em solid #ed260b" : "")};
   // padding: 0.3rem 1rem;
    width: ${props => (props ? props.width : "100%")};
  }
`;
export default StyledDatePicker;
