import React, { lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const UpdateEventForm = lazy(() => import("./UpdateEventForm"));
const UpdateEventModal = (props) => {
  const { updateEventModal, handleUpdateEventModal, ...formProps } = props;
  return (
    <>
      <StyledDrawer
        title={<FormattedMessage
          id="app.updateevent"
          defaultMessage="Update Event"
        />}
        width="55vw"
        visible={updateEventModal}
        maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{marginTop:"5rem"}}
        onClose={() => handleUpdateEventModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <UpdateEventForm {...formProps} />
        </Suspense>
      </StyledDrawer>
    </>
  );
};

export default UpdateEventModal;
