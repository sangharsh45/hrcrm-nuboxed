import React, { lazy, Suspense } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../Components/UI/Antd";
import { handleProcessHiringModal } from "../../../SettingsAction";
import ProcessFormForHiring from "./ProcessFormForHiring";

// const ProcessFormForRecruit = lazy(() => import("./ProcessFormForRecruit"));

const AddProcessModalForHiring = (props) => {
  const { addProcessHiringModal, handleProcessHiringModal, ...formProps } = props;
  console.log(props);
  return (
    <>
      <StyledModal
        // title="Workflow"
        title={<FormattedMessage
          id="app.workflow"
          defaultMessage="Workflow"
        />}
        width="30%"
        visible={props.addProcessHiringModal}
        maskClosable={false}
        destroyOnClose
        style={{ top: 40 }}
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onCancel={() => props.handleProcessHiringModal(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <ProcessFormForHiring {...formProps} />
        </Suspense>
      </StyledModal>
    </>
  );
};
const mapStateToProps = ({ settings }) => ({
  addProcessHiringModal: settings.addProcessHiringModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        handleProcessHiringModal,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(AddProcessModalForHiring);
