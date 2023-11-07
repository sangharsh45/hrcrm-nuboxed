import React, { lazy, Suspense,useEffect } from "react";
import { StyledModal } from "../../../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReceivedOrderIdPhoneNoteForm from "./ReceivedOrderIdPhoneNoteForm.js";

const ReceivedOrderIdPhoneNoteModal = (props) => {
    const { particularRowData,...formProps } = props;
    return (
        <>
            <StyledModal
                title={`Notes`}
                width="35vw"
                visible={props.phoNoteReceivedOrderIdModal}
                maskClosable={false}
                destroyOnClose
                maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                style={{ top: 40 }}
                onCancel={() => props.handleReceivedOrderIdPhoneNoteModal(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    <ReceivedOrderIdPhoneNoteForm particularRowData={particularRowData} />
                </Suspense>
            </StyledModal>
        </>
    );


}
const mapStateToProps = ({}) => ({
   
      
});
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
     
      },
      dispatch
    );
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ReceivedOrderIdPhoneNoteModal);
