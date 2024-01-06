import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button} from "antd";
import { FormattedMessage } from "react-intl";
import { Formik, Form, Field } from "formik";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { addAssessment } from "../AccessmentAction";

function AccessmentForm(props) {
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          assessmentName: "",
          theme: "",
          level: "",
          url: "",
          category: "",
          userId: props.userId,
          orgId: props.orgId,
        }}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          props.addAssessment({
            ...values,
          });
        }}
      >
        {({
          errors,
          touched,
          isSubmitting,
          setFieldValue,
          setFieldTouched,
          values,
          ...rest
        }) => (
          <Form className="form-background">
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                height: "100%",
                width: "100%",
                alignItems: "center",
              }}
            >
              <div class="w-[16%]">
                <Field
                  isRequired
                  name="assessmentName"
                  type="text"
                  component={InputComponent}
                  label={<FormattedMessage id="app.name" defaultMessage="Name" />}
                  isColumn
                  width={"100%"}
                  inlineLabel
                />
              </div>
              <div class="w-[16%]">
                <Field
                  name="theme"
                  type="text"
                  label={<FormattedMessage id="app.theme" defaultMessage="Theme" />}
                  isColumn
                  width={"100%"}
                  component={InputComponent}
                  inlineLabel
                />
              </div>
              <div class="w-[8%]">
                <Field
                  name="level"
                  type="text"
                  // label="Email"
                  label={
                    <FormattedMessage id="app.level" defaultMessage="Level" />
                  }
                  //isRequired
                  isColumn
                  width={"100%"}
                  component={InputComponent}
                  inlineLabel
                />
              </div>
              <div class="w-[16%]">
                <Field
                  name="category"
                  type="text"
                  // label="URL"
                  label={
                    <FormattedMessage
                      id="app.category"
                      defaultMessage="Category"
                    />
                  }
                  isColumn
                  width={"100%"}
                  component={InputComponent}
                  inlineLabel
                />
              </div>
              <div class="w-[8%]">
                <Field
                  name="duration"
                  type="text"
                  // label="URL"
                  label={
                    <FormattedMessage
                      id="app.duration"
                      defaultMessage="Duration"
                    />
                  }
                  isColumn
                  width={"100%"}
                  component={InputComponent}
                  inlineLabel
                />
              </div>
              <div>
              <Button
                type="primary"
                htmlType="submit"
                loading={props.addingAssessment}
              >
                <FormattedMessage id="app.create" defaultMessage="Create" />
              </Button>
            </div>
            </div>

           
          </Form>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ auth, assessment }) => ({
  addingAssessment: assessment.addingAssessment,
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addAssessment,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AccessmentForm);
