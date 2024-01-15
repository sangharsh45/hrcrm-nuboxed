import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const EventForm = lazy(() => import("./EventForm"));
const AddEventModal = (props) => {
  const { addEventModal, handleEventModal, ...formProps } = props;
  const isSmallScreen = window.innerWidth <= 600;
    const drawerWidth = isSmallScreen ? "90%" : "60%";
  return (
    <>
      <StyledDrawer
        title={<FormattedMessage
          id="app.scheduleevent"
          defaultMessage="Schedule Event"
        />}
        width={drawerWidth}
        visible={addEventModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{marginTop:"3rem"}}
        onClose={() => handleEventModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <EventForm {...formProps} />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default AddEventModal;
