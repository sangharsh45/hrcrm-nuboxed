import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { Formik, Form, Field, FastField } from "formik";
import { FormWrapper, Input } from "./styled";
import { ValidationError, Spacer } from "../../Components/UI/Elements";
import { FlexContainer } from "../../Components/UI/Layout";
import Button from "antd/lib/button";
import { login, generateOtpByEmail, validateOtp } from "./AuthAction";
import { SelectComponent } from "../../Components/Forms/Formik/SelectComponent";
   import FWLogo from "../../Assets/Images/logo_22 copy.png";
import { FormattedMessage } from "react-intl";


class OnBoardOrganizationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      organizationName: "",
      industry: "",
      Loading: false,
      render: false,
      // type: "password",
      show: Boolean(),
    };
  }


  submit = (values) => {
    // this.enterLoading();
    this.props.login(values, this.props.history);
  };
  InputComponent = ({ field, form: { touched, errors }, ...props }) => (
    <div>
      <div>
        <Input {...field} {...props} />
      </div>
      {touched[field.name] && errors[field.name] && (
        <ValidationError>{errors[field.name]}</ValidationError>
      )}
    </div>
  );
  componentDidMount() {
    this.timeoutHandle = setTimeout(() => {
      // Add your logic for the transition
    }, 5000);

    console.log("inside cDM login");
    console.log(this.props);
    const params = this.props.match.params;
    if (params.organizationName && params.industry) {
      this.setState({
        organizationName: params.organizationName,
        industry: params.industry,
      });
    }
  }
  componentWillUnmount() {
    clearTimeout(this.timeoutHandle); // This is just necessary in the case that the screen is closed before the timeout fires, otherwise it would cause a memory leak that would trigger the transition regardless, breaking the user experience.
  }
  render() {
    console.log(this.props);
    return (
      <>
       <div class="flex justify-between ">
          <div class=" flex justify-center w-1/2 items-center md:min-h-screen max-sm:w-wk h-[80vh] "
            style={{
              backgroundColor: "#F5F5F5",
              flexDirection: "column",
              position: "relative",
              margin: "auto",
            }}
          >
            <img
              className="big-logo"
              src={FWLogo}
              style={{ width: 200 }}
              alt="Tekorero logo"
            />
            <br />
     
            <FormWrapper width="25em">
              <Formik
                enableReinitialize
                initialValues={{
                  organizationName: this.state.organizationName || "",
                  industry: this.state.industry || "",
                }}
             
                onSubmit={(values) => {
                  // same shape as initial values
                  this.submit(values);
                }}
              >
                {({ errors, touched, isSubmitting, values }) => (
                  <Form className="form-background">
                    <h2>Organization</h2>
                    <Field
                      className="gvbmIs"
                      name="organizationName"
                      type="text"
                      placeholder="Organization Name"
                      component={this.InputComponent}
                    />
                    <Spacer />
                      <FastField
    name="industry"
    placeholder="Select Industry" 
    isColumn
    options={["E-Waste Recycle", "Manufacturing", "Retail"]}
    component={SelectComponent}
    inlineLabel
/>
                
                    <Spacer />
                    <h2>Fiscal</h2>
                    <FastField
                            name="date"
                            placeholder="Select Date"
                            isColumn
                            options={["1", "2","3","4","5", "6","7","8","9", "10","11","12","13", "14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"]}
                            component={SelectComponent}
                            inlineLabel
                          />
                            <Spacer />
                            <FastField
    name="month"
    placeholder="Select Month"  
    isColumn
    options={["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]}
    component={SelectComponent}
    inlineLabel
/>
                    <Spacer />
                    <h2>User Details</h2>
                     <Field
                      className="gvbmIs"
                      name="firstName"
                      type="text"
                      placeholder="First Name"
                      component={this.InputComponent}
                    />
                          <Spacer />
                       
                     <Field
                      className="gvbmIs"
                      name="middleName"
                      type="text"
                      placeholder="Middle Name"
                      component={this.InputComponent}
                    />
                      <Spacer />
                     <Field
                      className="gvbmIs"
                      name="lastName"
                      type="text"
                      placeholder="Last Name"
                      component={this.InputComponent}
                    />
                    <Spacer />
                    <Field
                      className="gvbmIs"
                      name="emailId"
                      type="email"
                      placeholder="Email Id"
                      component={this.InputComponent}
                    />
                  <Spacer />
                    <Button
                      type="primary"
                      htmlType="submit"
                      Loading={isSubmitting}
                      style={{ width: "100%", height: "2.5em" }}
                    >
                  Create
                    </Button>
                  </Form>
                )}
              </Formik>
           
            </FormWrapper>
            <Spacer />

           
          </div>
      
         
          </div>
    
      </>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  logging: auth.logging,
  loginError: auth.loginError,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    login,
    generateOtpByEmail,
    validateOtp
  }, dispatch);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OnBoardOrganizationPage));
