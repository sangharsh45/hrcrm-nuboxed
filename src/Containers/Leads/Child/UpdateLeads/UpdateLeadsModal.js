import React, { lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { setEditLeads } from "../../LeadsAction";
 const UpdateLeadsForm = lazy(() => import("./UpdateLeadsForm"));

const UpdateLeadsModal = (props) => {
  const { updateCustomerModal, handleUpdateCustomerModal, ...formProps } = props;
  console.log("dn",props.setEditingLeads.name)
  const isSmallScreen = window.innerWidth <= 600;
  const drawerWidth = isSmallScreen ? "90%" : "55%";
  return (
    <>
      <StyledDrawer
        title={props.item.name}
        width={drawerWidth}
        visible={props.updateLeadsModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{ marginTop:"5rem" }}
        onClose={() => props.handleUpdateLeadsModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdateLeadsForm leadsId={props.item.leadsId} />{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};
const mapStateToProps = ({ auth, leads }) => ({
    setEditingLeads: leads.setEditingLeads,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  organizationId: auth.userDetails.organizationId,
 
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setEditLeads
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateLeadsModal);

