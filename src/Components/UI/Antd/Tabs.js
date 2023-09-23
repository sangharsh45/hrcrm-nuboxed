import Tabs from "antd/lib/tabs";
import styled from "styled-components";

const StyledTabs = styled(Tabs)`
    .ant-tabs-nav-container {
        color: ${props => props.theme.color};
    }
    .ant-tabs-bar {
        margin: 0.3rem;
    }
    .ant-tabs-nav .ant-tabs-tab{
        // margin: 0 0.3125em 0 0;
        // padding: 0.75em 1.25em;
        // font-family:poppins;
    }
    .ant-nav-container {
        color: ${props => props.theme.color};
        box-shadow: 0 0.0625em 0.25em 0.0625em ${props => props.theme.boxShadowColor};
        border: 0.0625em solid ${props => props.theme.borderColor}
       // border-radius: 0.3rem;
    }
   
    
`;
export default StyledTabs;
