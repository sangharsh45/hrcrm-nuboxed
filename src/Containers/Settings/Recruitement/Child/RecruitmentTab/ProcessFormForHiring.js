import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import { InputComponent } from "../../../../../Components/Forms/Formik/InputComponent";
import {
  addProcessForOpportunity,
 getProcessForOpportunity,
} from "../../../SettingsAction";

class ProcessFormForHiring extends Component {
  handleCallback = (status) => {
    if (status === "success") {
      return getProcessForOpportunity(this.props.orgId);
    } else {
      return null;
    }
  };

  render() {
    const { addingProcessForOpportunity, addProcessForOpportunity } = this.props;
    return (
      <>
        <Formik
          initialValues={{
            workflowName: "",
            orgId:this.props.orgId
          }}
          onSubmit={(values) => {
            addProcessForOpportunity(
              values,
              this.props.orgId,
              () => this.handleCallback
            );
          }}
        >
          {({ values }) => (
            <Form className="form-background">
              <div class=" w-auto " style={{  margin: "auto" }}>
                <Field
                  name="workflowName"
                  label="Name"
                 
                  component={InputComponent}
                  isColumn
                  width={"100%"}
                  placeholder={"Enter Workflow name "}
                  style={{ flexBasis: "80%", marginTop: "0.25em" }}
                />
           

                <div class=" flex justify-end mt-8" >
                  {" "}
                  <Button
                    type="primary"
                     disabled={!values.workflowName}
                    htmlType="submit"
                    Loading={addingProcessForOpportunity}
                  >
                    Create
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

const mapStateToProps = ({ settings, auth }) => ({
  addingProcessForOpportunity: settings.addingProcessForOpportunity,
  addingProcessForOpportunityError: settings.addingProcessForOpportunityError,
  orgId: auth.userDetails && auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addProcessForOpportunity,
       getProcessForOpportunity,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProcessFormForHiring);
