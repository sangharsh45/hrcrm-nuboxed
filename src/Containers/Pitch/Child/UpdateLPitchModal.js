import React, { lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledDrawer } from "../../../Components/UI/Antd";
// import { setEditLeads } from "../../LeadsAction";
 const UpdatePitchForm = lazy(() => import("./UpdatePitchForm"));

const UpdateLPitchModal = (props) => {
  const { updateCustomerModal, handleUpdateCustomerModal, ...formProps } = props;
//   console.log("dn",props.setEditingLeads.name)

  return (
    <>
      <StyledDrawer
        title="Update Pitch"
        width="60%"
        visible={props.updatePitchModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ marginTop:"5rem" }}
        onClose={() => props.handleUpdatePitchModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
         
          <UpdatePitchForm 
        //   leadsId={props.item.leadsId} 
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

