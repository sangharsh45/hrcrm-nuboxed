import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../Components/Placeholder";
import { setEditEmployee } from "../../EmployeeAction";
import UpdateEmployeeForm from "./UpdateEmployeeForm";

const UpdateEmployeeModal = (props) => {
//   const isSmallScreen = window.innerWidth <= 600;
//     const drawerWidth = isSmallScreen ? "90%" : "55%";
  const { updateEmployeeModal, handleUpdateEmployeeModal, ...formProps } = props;
  return (
    <>
      <StyledDrawer
        title={props.setEditingEmployee.fullName}
        width="60%"
        visible={props.updateEmployeeModal}
        maskClosable={false}
        closable
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{marginTop:"3rem"}}
        onClose={() => props.handleUpdateEmployeeModal(false)}
        footer={null}
      >
       
          <UpdateEmployeeForm 
             employeeId={props.setEditingEmployee.employeeId}
            />
   
      </StyledDrawer>
    </>
  );
};
const mapStateToProps = ({ auth, employee }) => ({
    setEditingEmployee: employee.setEditingEmployee,
  user: auth.userDetails,
  userId: auth.userDetails.userId,
  organizationId: auth.userDetails.organizationId,
 
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    
        setEditEmployee
      
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateEmployeeModal);

