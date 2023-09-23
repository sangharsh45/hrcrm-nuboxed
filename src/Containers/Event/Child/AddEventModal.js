import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const EventForm = lazy(() => import("./EventForm"));
const AddEventModal = (props) => {
  const { addEventModal, handleEventModal, ...formProps } = props;
  return (
    <>
      <StyledDrawer
        title={<FormattedMessage
          id="app.scheduleevent"
          defaultMessage="Schedule Event"
        />}
        width="55vw"
        visible={addEventModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{marginTop:"5rem"}}
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
