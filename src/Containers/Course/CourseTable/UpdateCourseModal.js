import React, { lazy, Suspense } from "react";
import { connect } from "react-redux";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../Components/Placeholder";
import UpdateCourseForm from "./UpdateCourseForm";
// const UpdateCustomerForm = lazy(() => import("./UpdateCustomerForm"));

const UpdateCourseModal = (props) => {
  const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "60%";
  const { updateCustomerModal, handleUpdateCustomerModal, ...formProps } = props;
  return (
    <>
      <StyledDrawer
        title={props.course.courseName}
        width={drawerWidth}
        visible={props.addEditDrawerModal}
        maskClosable={false}
        closable
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{marginTop:"3rem"}}
        onClose={() => props.handleEditModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdateCourseForm course={props.course} />{" "}
        </Suspense>
      </StyledDrawer>
    </>
  );
};
const mapStateToProps = ({ auth, customer }) => ({
  setEditingCustomer: customer.setEditingCustomer,
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
)(UpdateCourseModal);

