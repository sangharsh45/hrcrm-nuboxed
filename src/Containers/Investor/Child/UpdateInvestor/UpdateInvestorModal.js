import React, { lazy, Suspense } from "react";
import { connect } from "react-redux";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../Components/Placeholder";
const UpdateInvestorForm = lazy(() => import("./UpdateInvestorForm.js"));

const UpdateInvestorModal = (props) => {
  const isSmallScreen = window.innerWidth <= 600;
  const drawerWidth = isSmallScreen ? "90%" : "60%";
  const { updateInvestorModal, handleUpdateInvestorModal,RowData, ...formProps } = props;
  return (
    <>
      <StyledDrawer
        title={RowData.name}
        width={drawerWidth}
        visible={updateInvestorModal}
        maskClosable={false}
        closable
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{marginTop:"3rem"}}
        onClose={() => handleUpdateInvestorModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdateInvestorForm RowData={RowData} />{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};
const mapStateToProps = ({ auth, }) => ({
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  organizationId: auth.userDetails.organizationId,
 
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
)(UpdateInvestorModal);

