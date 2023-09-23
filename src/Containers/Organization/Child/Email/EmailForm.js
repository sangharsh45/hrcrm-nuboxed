import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Spacer } from "../../../../Components/UI/Elements";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { addEmailCredentials } from "../Email/EmailAction";
import { FlexContainer } from "../../../../Components/UI/Layout";
import { FormattedMessage } from "react-intl";
/**
 * yup validation scheme for creating a Team
 */
const EmailSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid Email")
    .required("Email is needed!"),
  password: Yup.string().required("Password is needed!"),
  host: Yup.string().required("Host name is needed!"),
  port: Yup.string().required("Port is needed!"),
});

class EmailForm extends Component {
  render() {
    const {
      addingEmail,
      addEmailCredentials,
      //   addingEmailCredentialForAdmin,
    } = this.props;
    return (
      <>
        <Formik
          enableReinitialize
          initialValues={{
            email: "",
            password: "",
            host: "",
            port: "",
          }}
          validationSchema={EmailSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            addEmailCredentials(values);
            resetForm();
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
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div
                    style={{
                      height: "100%",
                      width: "75%",
                    }}
                  >
                    <Field
                      name="email"
                      label="Email Id"
                      isColumn
                      isRequired
                      component={InputComponent}
                      width={"100%"}
                    />
                    <Spacer />
                    <Field
                      type="password"
                      isRequired
                      name="password"
                      label="Password"
                      isColumn
                      width={"100%"}
                      component={InputComponent}
                    />
                    <Spacer />
                    
                    <Field
                      isMulti
                      isRequired
                      name="host"
                      label="Host Name"
                      component={InputComponent}
                      isColumn
                      width={"100%"}
                    />
                    <span
                      style={{
                        fontSize: "0.75em",
                        fontStyle: "italic",
                        marginLeft: "6.25em",
                      }}
                    >
                      Example for Outlook users - smtp-mail.outlook.com{" "}
                    </span>
                    <br />
                    <span
                      style={{
                        fontSize: "0.75em",
                        fontStyle: "italic",
                        marginLeft: "6.25em",
                      }}
                    >
                      Example for other webmail host - mail.example.com{" "}
                    </span>
                    <Spacer />
                    <Field
                      name="port"
                      label={
                        <FormattedMessage
                          id="app.port"
                          defaultMessage="Port"
                        />
                      }
                      isColumn
                      isRequired
                      width={"100%"}
                      component={InputComponent}
                    />
                    <Spacer />
                  </div>
                </div>
                <FlexContainer justifyContent="flex-end">
                  <Button
                    type="primary"
                    htmlType="submit"
                    // style={{ float: "right" }}
                    Loading={addingEmail}
                  >
                    Create
                </Button>
                </FlexContainer>
              </Form>
            )}
        </Formik>
      </>
    );
  }
}
const mapStateToProps = ({ email }) => ({
  addingEmail: email.addingEmail,
  addingEmailError: email.addingEmailError,
  //   addingEmailCredentialForAdminError: email.addingEmailCredentialForAdminError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addEmailCredentials,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EmailForm);
