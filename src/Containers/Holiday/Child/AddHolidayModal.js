import React, { lazy, Component } from "react";
import { FormattedMessage } from "react-intl";
import { StyledModal, StyledTabs } from "../../../Components/UI/Antd";
const HolidayForm=lazy(()=>import("./HolidayForm"));
const TabPane = StyledTabs.TabPane;

class AddHolidayModal extends Component {
    render() {
        const { addHolidayModal, handleHolidayModal, ...formProps } = this.props;
        return (
            <>
                <StyledModal
                    title={<FormattedMessage
                        id="app.newjoinee"
                        defaultMessage="New Joinee"
                    />}
                    width="30%"
                    visible={addHolidayModal}
                    onCancel={() => handleHolidayModal(false)}
                    footer={null}
                >
                    {/* <Suspense fallback={<BundleLoader />}>
            <EmployeeForm />
          </Suspense> */}
                    {/* <StyledTabs defaultActiveKey="1"> */}
                    {/* <TabPane tab={`Employee`} key="1"> */}
                    {/* <div style={{ marginTop: 20 }}> */}
                    {/* <HolidayPage /> */}
                    <HolidayForm />
                    {/* </div> */}
                    {/* </TabPane> */}
                    {/* <TabPane tab={`Education`} key="2">
              <div style={{ marginTop: 20 }}>
                <EducationDocumentForm />
              </div>
            </TabPane> */}
                    {/* </StyledTabs> */}
                </StyledModal>
            </>
        );
    }
}

export default AddHolidayModal;
