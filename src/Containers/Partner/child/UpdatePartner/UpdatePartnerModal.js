import React, { lazy, Suspense } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setEditPartner } from "../../PartnerAction";
const UpdatePartnerForm = lazy(() => import("./UpdatePartnerForm"));


const UpdatePartnerModal = (props) => {
  const { updatePartnerModal, handleUpdatePartnerModal, ...formProps } = props;
 console.log("dn",props.setEditingPartner.partnerName)
  return (
    <>
      <StyledDrawer
        title={props.setEditingPartner.partnerName}
        width="55%"
        style={{marginTop:"5rem"}}
        visible={props.updatePartnerModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onClose={() => props.handleUpdatePartnerModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdatePartnerForm partnerId={props.partnerId} />{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};
const mapStateToProps = ({ auth, partner, }) => ({
  setEditingPartner: partner.setEditingPartner,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  partnerByUserId: partner.partnerByUserId,
 
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    
      setEditPartner
      
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdatePartnerModal);
