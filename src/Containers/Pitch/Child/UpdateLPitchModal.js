import React, { lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer } from "../../../Components/UI/Antd";
 const UpdatePitchForm = lazy(() => import("./UpdatePitchForm"));

const UpdateLPitchModal = (props) => {
  const { updateCustomerModal, handleUpdateCustomerModal, ...formProps } = props;
//   console.log("dn",props.setEditingLeads.name)
const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "60%";
console.log(props.item)

  return (
    <>
      <StyledDrawer
        title="Update Pitch"
        width={drawerWidth}
        visible={props.updatePitchModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ marginTop:"3rem" }}
        onClose={() => props.handleUpdatePitchModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
         
          <UpdatePitchForm 
        investorleadsId={props.item.investorLeadsId} 
          />{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};
const mapStateToProps = ({ auth, leads }) => ({
//     setEditingLeads: leads.setEditingLeads,
//   user: auth.userDetails,
//   userId: auth.userDetails.userId,
//   organizationId: auth.userDetails.organizationId,
 
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    //   setEditLeads
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateLPitchModal);

