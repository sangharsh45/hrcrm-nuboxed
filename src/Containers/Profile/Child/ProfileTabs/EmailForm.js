import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { addEmailProfileCredentials } from "../../ProfileAction";
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
      addEmailProfileCredentials,

      addingEmailProfile,
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
            addEmailProfileCredentials(values);
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
                <div class=" flex justify-between" >
                  <div class=" h-full w-[75%]"
                  >
                    <Field
                      name="email"
                      label="Email Id"
                      isColumn
                      isRequired
                      component={InputComponent}
                      width={"100%"}
                    />
                  <div class=" mt-3">
                    <Field
                      type="password"
                      isRequired
                      name="password"
                      label="Password"
                      isColumn
                      width={"100%"}
                      component={InputComponent}
                    />
                    </div>
                    <div class=" mt-3">
                    <Field
                      isMulti
                      isRequired
                      name="host"
                      label="Host Name"
                      component={InputComponent}
                      isColumn
                      width={"100%"}
                    />
                     </div>
                    <span class=" text-[0.75em] text-[italic] ml-[6.25em]"
                    >
                      Example for Outlook users - smtp-mail.outlook.com{" "}
                    </span>
                    <br />
                    <span class=" text-[0.75em] text-[italic] ml-[6.25em]"
                    >
                      Example for other webmail host - mail.example.com{" "}
                    </span>
       <div class=" mt-3">
                    <Field
                      name="port"
                      label="Port"
                      isColumn
                      isRequired
                      width={"100%"}
                      component={InputComponent}
                    />
                    </div>
                 
                  </div>
                </div>
                <div class=" flex justify-end" >
                  <Button
                    type="primary"
                    htmlType="submit"
                    Loading={addingEmailProfile}
                  >
                    Create
                </Button>
                </div>
              </Form>
            )}
        </Formik>
      </>
    );
  }
}
const mapStateToProps = ({ profile }) => ({
    addingEmailProfile:profile.addingEmailProfile
//   addingEmail: email.addingEmail,
//   addingEmailError: email.addingEmailError,
  //   addingEmailCredentialForAdminError: email.addingEmailCredentialForAdminError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        addEmailProfileCredentials,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(EmailForm);
