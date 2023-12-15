import React, { lazy, Component } from "react";
import { StyledDrawer, } from "../../../Components/UI/Antd";
import { FormattedMessage } from "react-intl";
const EmployeeForm = lazy(() => import("../Child/EmployeeForm"));

class AddEmployeeModal extends Component {
  render() {
    const { addEmployeeModal, handleEmployeeModal, ...formProps } = this.props;
    const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "55%";
    return (
      <>
        <StyledDrawer
          title={<FormattedMessage
            id="app.newjoinee"
            defaultMessage="New Joinee"
          />}

          width={drawerWidth}
          visible={addEmployeeModal}
          destroyOnClose
          maskClosable={false}
          maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
          style={{marginTop:"5rem"}}
          onClose={() => handleEmployeeModal(false)}
          footer={null}
        >
          {/* <StyledTabs defaultActiveKey="1"> */}
            {/* <TabPane tab={`Employee`} key="1"> */}
              <div style={{ marginTop: 20 }}>
                <EmployeeForm />
              </div>
            {/* </TabPane> */}
          {/* </StyledTabs> */}
        </StyledDrawer>
      </>
    );
  }
}

export default AddEmployeeModal;
