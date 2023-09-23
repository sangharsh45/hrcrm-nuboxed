// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { withRouter } from "react-router-dom";
// import { Formik, Form, Field } from "formik";
// import { Button,message} from "antd";
// import {
//   EyeInvisibleOutlined,
//   CheckCircleOutlined,
//   EyeOutlined
  
// } from '@ant-design/icons';
// import * as Yup from "yup";
// import { AuthContainer, FormWrapper, Input } from "./styled";
// import {
//   Title,
//   SubTitle,
//   ValidationError,
//   HeaderText,
//   Spacer
// } from "../../Components/UI/Elements";
// import { FlexContainer } from "../../Components/UI/Layout";
// // import FWLogo from "../../Assets/Images/Axis_logo_Big.png";
// import FWLogo from "../../Assets/Images/Logo_new.png";
// import { setPassword } from "./AuthAction";
// import RandomImageScreen from "./RandomImageScreen";
// /**
//  * yup validation scheme for set Password
//  */
// const SetPasswordSchema = Yup.object().shape({
//   password: Yup.string()
//     .required("Input needed!")
//     .min(8, "Password should be minimum of 8 characters !")
//     .max(50, "Password should be maximum of 50 characters !"),
//   confirmPassword: Yup.string()
//     .required("Input needed!")
//     .oneOf([Yup.ref("password")], "Passwords do not match")
// });

// class SetPassword extends Component {
//   state = {
//     type: "password",
//     type1: "password",
//     show1: Boolean(),
//     show: Boolean()
//   };

//   handleClick = () =>
//     this.setState(({ type, prevState }) => ({
//       type: type === "text" ? "password" : "text",
//       show: !this.state.show
//     }));
//   handleClick1 = () =>
//     this.setState(({ type1, prevState }) => ({
//       type1: type1 === "text" ? "password" : "text",
//       show1: !this.state.show1
//     }));

//   InputComponent = ({ field, form: { touched, errors }, ...props }) => (
//     <div>
//       <div>
//         <Input {...field} {...props} />
//       </div>
//       {touched[field.name] && errors[field.name] && (
//         <ValidationError>{errors[field.name]}</ValidationError>
//       )}
//     </div>
//   );
//   callback = () => {
//     message.success("You have successfully changed your password");
//     this.props.history.push("/");
//   };
//   render() {
//     return (
//       <>
//         <FlexContainer>
//           <AuthContainer
//             style={{ backgroundColor: "#F5F5F5", flexDirection: "column" }}
//           >
//             <img className="big-logo" src={FWLogo} style={{ width: 200 }} />
//             <br />
//             <FormWrapper>
//               <HeaderText>Set your password</HeaderText>
//               <SubTitle>You've successfully verified your account. </SubTitle>
//               &nbsp;
//               <SubTitle> Enter password below </SubTitle>
//               <Spacer />
//               <Formik
//                 initialValues={{
//                   password: "",
//                   confirmPassword: ""
//                 }}
//                 validationSchema={SetPasswordSchema}
//                 onSubmit={values => {
//                   // same shape as initial values
//                   console.log(values);
//                   this.props.setPassword({
//                     password: values.password,
//                     emailId: this.props.emailId,
//                   },
//                   this.callback
//                   );
//                 }}
//               >
//                 {({ errors, touched, values, isSubmitting }) => (
//                   <Form style={{ width: "25vw" }}>
//                     <div
//                       className="set_password"
//                     // style={{
//                     //   display: "flex",
//                     //   flexDirection: "row",

//                     // }}
//                     >
//                       <div style={{ width: "89%" }}>
//                         <Field
//                           type={this.state.type}
//                           name="password"
//                           placeholder="Password"
//                           component={this.InputComponent}

//                         />
//                       </div>
//                       {this.state.show ? (
//                         <EyeOutlined
//                           type="eye"
//                           onClick={this.handleClick}
//                           style={{ marginLeft: "-1.25em", marginTop: "1.25em" }}
//                           size="24"
//                         />
//                       ) : (
//                           <EyeInvisibleOutlined 
//                             type="eye-invisible"
//                             onClick={this.handleClick}
//                             size="24"
//                             style={{ marginLeft: "-1.25em", marginTop: "1.25em" }}
//                           />
//                         )}
//                     </div>
//                     <Spacer style={{ marginBottom: "-0.25em" }} />
//                     <div
//                       className="set_password"
//                     // style={{
//                     //   display: "flex",
//                     //   flexDirection: "row"
//                     // }}
//                     >
//                       <div style={{ width: "89%" }}>
//                         <Field
//                           type={this.state.type1}
//                           name="confirmPassword"
//                           placeholder="Confirm password"
//                           component={this.InputComponent}
//                         />
//                       </div>
//                       {this.state.show1 ? (
//                         <EyeOutlined 
//                           type="eye"
//                           onClick={this.handleClick1}
//                           style={{
//                             marginLeft: "-1.25em",
//                             marginTop: "1.25em"
//                           }}
//                         // style={{ size: 24 }}
//                         />
//                       ) : (
//                           <EyeInvisibleOutlined 
//                             type="eye-invisible"
//                             onClick={this.handleClick1}
//                             style={{
//                               marginLeft: "-1.25em",
//                               marginTop: "1.25em"
//                             }}
//                           // style={{ size: 24 }}
//                           />
//                         )}
//                       {values.password.length &&
//                         values.password === values.confirmPassword ? (
//                           <CheckCircleOutlined 
//                             type="check-circle"
//                             theme="twoTone"
//                             twoToneColor="#52c41a"
//                             size={80}
//                             style={{
//                               marginLeft: "1.25em",
//                               marginTop: "0.875em",
//                               fontSize: "1.5625em"
//                             }}
//                           />
//                         ) : null}
//                     </div>

//                     <Spacer />
//                     <div className="setpassword_button">
//                       <Button
//                         type="primary"
//                         htmlType="submit"
//                         Loading={this.props.settingPassword}
//                       >
//                         Done
//                     </Button>
//                     </div>
//                   </Form>
//                 )}
//               </Formik>
//             </FormWrapper>
//             <div
//               className="footer1"
//               style={{
//                 textAlign: "center",
//                 fontSize: "12x",
//                 fontFamily: "SFS, Arial, sans-serif",
//                 position: "absolute",
//                 bottom: 0
//               }}
//             >
//               © {new Date().getFullYear()}, {` `} tekorero.com, All rights
//               reserved.
//             </div>
//           </AuthContainer>
//           {/* <RandomImageScreen /> */}
//         </FlexContainer>
//       </>
//     );
//   }
// }

// const mapStateToProps = ({auth}) => ({
//   settingPassword:auth.settingPassword,
//    settingPasswordError:auth.settingPasswordError,
//   emailId: auth.userDetails.emailId,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators({ setPassword }, dispatch);

// export default withRouter(
//   connect(mapStateToProps, mapDispatchToProps)(SetPassword)
// );


import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { Button } from "antd";
import { EyeOutlined, EyeInvisibleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import * as Yup from "yup";
import { AuthContainer, FormWrapper, Input } from "./styled";
import {
  Title,
  SubTitle,
  ValidationError,
  HeaderText,
  Spacer,
} from "../../Components/UI/Elements";
import { FlexContainer } from "../../Components/UI/Layout";
import FWLogo from "../../Assets/Images/logo_22.png";
import { setPassword } from "./AuthAction";
import RandomImageScreen from "./RandomImageScreen";
/**
 * yup validation scheme for set Password
 */
const SetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Number and one special case Character"
    ),
  confirmPassword: Yup.string()
    .required("Enter Password")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});

class SetPassword extends Component {
  state = {
    type: "password",
    type1: "password",
    show1: Boolean(),
    show: Boolean(),
  };

  handleClick = () =>
    this.setState(({ type, prevState }) => ({
      type: type === "text" ? "password" : "text",
      show: !this.state.show,
    }));
  handleClick1 = () =>
    this.setState(({ type1, prevState }) => ({
      type1: type1 === "text" ? "password" : "text",
      show1: !this.state.show1,
    }));

  handleSetPassword = (password) => {
    const {
      history,
      location: {
        state: { employeeId, emailId, organizationId },
      },
      user,
    } = this.props;
    console.log("email",emailId)
    this.props.setPassword(employeeId, organizationId, emailId, password, history);
    
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
  render() {
    return (
      <>
        <FlexContainer>
          <AuthContainer
            style={{ backgroundColor: "#F5F5F5", flexDirection: "column" }}
          >
            <img className="big-logo" src={FWLogo} style={{ width: 200 }} />
            <br />
            <FormWrapper>
              <HeaderText>Set your password</HeaderText>
              <SubTitle>You've successfully verified your account. </SubTitle>
              &nbsp;
              {/* <SubTitle>Enter Password below</SubTitle>
              &nbsp; */}
              <SubTitle>
                Minimum 8 characters and contain atleast 1 Number,
              </SubTitle>
              <SubTitle>1 Capital Letter & 1 Special Character.</SubTitle>
              <Spacer />
              <Formik
                initialValues={{
                  password: "",
                  confirmPassword: "",
                }}
                validationSchema={SetPasswordSchema}
                onSubmit={(values) => {
                  // same shape as initial values
                  console.log(values);
                  this.handleSetPassword(values.password);
                }}
              >
                {({ errors, touched, values, isSubmitting }) => (
                  <Form style={{ width: "25vw" }}>
                    <div
                      className="set_password"
                    // style={{
                    //   display: "flex",
                    //   flexDirection: "row",

                    // }}
                    >
                      <div style={{ width: "80%", marginLeft: "2.18em" }}>
                        <Field
                          type={this.state.type}
                          name="password"
                          placeholder="Password"
                          component={this.InputComponent}
                        />
                      </div>
                      {this.state.show ? (
                        <EyeOutlined
                          // type="eye"
                          onClick={this.handleClick}
                          style={{ marginLeft: "-1.25em", marginTop: "1.25em" }}
                          size="24"
                        />
                      ) : (
                        <EyeInvisibleOutlined
                          // type="eye-invisible"
                          onClick={this.handleClick}
                          size="24"
                          style={{ marginLeft: "-1.25em", marginTop: "1.25em" }}
                        />
                      )}
                    </div>
                    <Spacer style={{ marginBottom: "-0.25em" }} />
                    <div
                      className="set_password"
                    // style={{
                    //   display: "flex",
                    //   flexDirection: "row"
                    // }}
                    >
                      <div style={{ width: "80%", marginLeft: "2.18em" }}>
                        <Field
                          type={this.state.type1}
                          name="confirmPassword"
                          placeholder="Confirm password"
                          component={this.InputComponent}
                        />
                      </div>
                      {this.state.show1 ? (
                        <EyeOutlined
                          // type="eye"
                          onClick={this.handleClick1}
                          style={{
                            marginLeft: "-1.25em",
                            marginTop: "1.25em",
                          }}
                        // style={{ size: 24 }}
                        />
                      ) : (
                        <EyeInvisibleOutlined
                          // type="eye-invisible"
                          onClick={this.handleClick1}
                          style={{
                            marginLeft: "-1.25em",
                            marginTop: "1.25em",
                          }}
                        // style={{ size: 24 }}
                        />
                      )}
                      {values.password.length &&
                        values.password === values.confirmPassword ? (
                        <CheckCircleOutlined
                          // type="check-circle"
                          theme="twoTone"
                          twoToneColor="#52c41a"
                          size={100}
                          style={{
                            marginLeft: "1.25em",
                            marginTop: "0.875em",
                            // fontSize: "1.56em",
                          }}
                        />
                      ) : null}
                    </div>

                    <Spacer />
                    <div className="setpassword_button">
                      <Button
                        block
                        type="primary"
                        htmlType="submit"
                        loading={isSubmitting}

                      // onClick={this.handleSetPassword}
                      >
                        Done
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </FormWrapper>
            <div
              className="footer1"
              style={{
                textAlign: "center",
                fontSize: "12x",
                // fontFamily: "SFS, Arial, sans-serif",
                fontFamily: "Poppins",
                position: "absolute",
                bottom: 0,
              }}
            >
              © {new Date().getFullYear()}, {` `} tekorero.com, All rights
              reserved.
            </div>
          </AuthContainer>
          <RandomImageScreen />
        </FlexContainer>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ setPassword }, dispatch);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SetPassword)
);

