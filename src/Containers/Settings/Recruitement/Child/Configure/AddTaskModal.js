import React, { lazy, Suspense } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { StyledModal } from "../../../../../Components/UI/Antd";
import { handleTaskDrawer } from "../../../SettingsAction";
import RecruitTaskForm from "./RecruitTaskForm";


const AddTaskModal = (props) => {
  const { addTaskDrawer, handleTaskDrawer, ...formProps } = props;
  console.log(props);
  return (
    <>
      <StyledModal
        // title="Workflow"
        title={<FormattedMessage
          id="app.task"
          defaultMessage="Task"
        />}
        width="30%"
        visible={props.addTaskDrawer}
        maskClosable={false}
        destroyOnClose
        style={{ top: 40 }}
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onCancel={() => props.handleTaskDrawer(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <RecruitTaskForm {...formProps} />
        </Suspense>
      </StyledModal>
    </>
  );
};
const mapStateToProps = ({ settings }) => ({
  addTaskDrawer: settings.addTaskDrawer,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleTaskDrawer,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(AddTaskModal);
