import Modal from "antd/lib/modal";
import styled from "styled-components";

const StyledModal = styled(Modal)`
    .ant-modal-content{
        background-color: #fff !important;
        
        color: ${props => props.theme.color};
        border-radius: ${props => props.modalBorderRadius || ""};
     }
     .ant-modal-header{
          background-image: linear-gradient(-90deg, #001529, #94b3e4);
          color: ${props => props.theme.color};
     }
     .ant-modal-body{
          background-color :"	#F5F5F5"
          /* background-color: ${props =>
          props.theme.backgroundColor} !important; */
          color: ${props => props.theme.color};
         // padding: ${props => props.bodyPadding};
         padding: "18px";
         font-size: 0.75rem;
         line-height:1;
     //     top: 40;
     //     width:55%;
         
         border-radius: ${props => props.modalBorderRadius || ""};
   }
    .ant-modal-footer{
        background-color: ${props => props.theme.backgroundColor} !important;
        color: ${props => props.theme.color};
   }
    .ant-modal-title{
        color: ${props => "#fff"};
        font-size: 1.3rem;

   }
   .ant-modal-close-x{
        color: ${props => "#fff"};
   }
  
`;
export default StyledModal;
