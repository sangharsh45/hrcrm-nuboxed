import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import dayjs from "dayjs";
import { Spacer } from "../../../../../Components/UI/Elements";
import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
import {
  addTaskForRecruiter,
  getTaskForRecruit,
} from "../../../SettingsAction";
import { FlexContainer } from "../../../../../Components/UI/Layout";

class RecruitTaskForm extends Component {
  handleCallback = (status) => {
    if (status === "success") {
      return getTaskForRecruit(this.props.organizationId);
    } else {
      return null;
    }
  };
  render() {
    const { addingTaskForRecruit, addTaskForRecruiter } = this.props;
    return (
      <>
        <Formik
          initialValues={{
            taskChecklistName: "",
            organizationId:this.props.organizationId
          }}
          onSubmit={(values) => {
            addTaskForRecruiter(
              values,
              this.props.organizationId,
              () => this.handleCallback
            );
          }}
        >
          {({ values }) => (
            <Form className="form-background">
              <div style={{ width: "auto", margin: "auto" }}>
                <Field
                  name="taskChecklistName"
                  label="Name"
                  // label={<FormattedMessage
                  //   id="app.recruitmentProcessName"
                  //   defaultMessage="Enter Workflow name"
                  // />}
                  component={InputComponent}
                  isColumn
                  width={"100%"}
                  placeholder={"Enter Task name "}
                  style={{ flexBasis: "80%", marginTop: "0.25em" }}
                />
                <Spacer />

                <Spacer style={{ marginTop: 15 }} />
                <FlexContainer justifyContent="flex-end">
                  {" "}
                  <Button
                    type="primary"
                     disabled={!values.taskChecklistName}
                    htmlType="submit"
                     Loading={addingTaskForRecruit}
                  >
                    Create
                  </Button>
                </FlexContainer>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ settings, auth }) => ({
  addingTaskForRecruit: settings.addingTaskForRecruit,
  addingTaskForRecruitError: settings.addingTaskForRecruitError,
  organizationId: auth.userDetails && auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addTaskForRecruiter,
      getTaskForRecruit,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(RecruitTaskForm);
