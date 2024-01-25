
import React, { Component, } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Formik, Form,  } from "formik";
import {
  chooseCandididate
}
  from "../../CandidateAction";
import { Switch, Button } from "antd";
class CandidateChooseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: false,
      email: false,
      mobile: false,
      role: false,
      skills: false,
      availability: false,
      resume:false,
      experience: false,
      identityCard: false,
      overAllExperience: false,
      skillwiseExperience: false,
    };
  }
  handleName = (checked) => {
    this.setState({ name: checked });
  };
  handleEmail = (checked) => {
    this.setState({ email: checked });
  };
  handleMobile = (checked) => {
    this.setState({ mobile: checked });
  };
  handleRole = (checked) => {
    this.setState({ role: checked });
  };
  handleSkills = (checked) => {
    this.setState({ skills: checked });
  };
  handleAvailability = (checked) => {
    this.setState({ availability: checked });
  };
  handleResume = (checked) => {
    this.setState({ resume: checked });
  };
  handleExperience = (checked) => {
    this.setState({ experience: checked });
  };
  handleIdentityCard = (checked) => {
    this.setState({ identityCard: checked });
  };
  handleOverallExperience = (checked) => {
    this.setState({ overAllExperience: checked });
  };
  handleSkillWiseExperience = (checked) => {
    this.setState({ skillwiseExperience: checked });
  };

  render() {
    console.log("select", this.props.selectedRowKeys);
    return (
      <>
        <Formik
          initialValues={{
            candidateIds: this.props.selectedRowKeys,
            nameInd: this.state.name ? "true" : "false",
            email: this.state.email ? "true" : "false",
            mobileNoInd: this.state.mobile ? "true" : "false",
            roleInd: this.state.role ? "true" : "false",
            skillInd: this.state.skills ? "true" : "false",
            resumeInd: this.state.resume ? "true" : "false",
            availableDateInd: this.state.availability ? "true" : "false",
            experienceInd:this.state.experience ? "true" : "false",
            identityCardInd:this.state.identityCard ? "true" : "false",
            skillWiseExperienceInd: this.state.skillwiseExperience ? "true" : "false",
          }}
          //   validationSchema={OpportunitySchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            console.log(values)
            this.props.chooseCandididate(
              {
                ...values,
                candidateIds: this.props.selectedRowKeys,
                nameInd: this.state.name ? "true" : "false",
                emailInd: this.state.email ? "true" : "false",
                mobileNoInd: this.state.mobile ? "true" : "false",
                roleInd: this.state.role ? "true" : "false",
                skillInd: this.state.skills ? "true" : "false",
                resumeInd: this.state.resume ? "true" : "false",
                availableDateInd: this.state.availability ? "true" : "false",
                experienceInd: this.state.experience ? "true" : "false",
                identityCardInd: this.state.identityCard ? "true" : "false",
                skillWiseExperienceInd:this.state.skillwiseExperience ? "true" : "false",
              },
              () => this.handleReset(resetForm)
            );
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
                <div class=" w-[47%]"
                >
                  <div>
                  </div>
               
                  <div class=" flex justify-between w-[52%] mt-3" >
                    <p>Name</p>
                    <Switch
                      onChange={this.handleName}
                      checked={this.state.name}
                      checkedChildren="Yes"
                      unCheckedChildren="No"
                    />
                  </div>
                  <div class=" flex justify-between w-[52%]" >
                    <p>Email</p>
                    <Switch
                      onChange={this.handleEmail}
                      checked={this.state.email}
                      checkedChildren="Yes"
                      unCheckedChildren="No"
                    />
                  </div>
                  <div class=" flex justify-between w-[52%]" >
                    <p>Mobile</p>
                    <Switch
                      onChange={this.handleMobile}
                      checked={this.state.mobile}
                      checkedChildren="Yes"
                      unCheckedChildren="No"
                    />
                  </div>
                  <div class=" flex justify-between w-[52%]" >
                    <p>Role</p>
                    <Switch
                      onChange={this.handleRole}
                      checked={this.state.role}
                      //    checked={opportunityInd || opportunityToggleInd}
                      checkedChildren="Yes"
                      unCheckedChildren="No"
                    />
                  </div>
                  <div class=" flex justify-between w-[52%]" >
                    <p>Skills</p>
                    <Switch
                      onChange={this.handleSkills}
                      checked={this.state.skills}
                      //    checked={opportunityInd || opportunityToggleInd}
                      checkedChildren="Yes"
                      unCheckedChildren="No"
                    />
                  </div>
                  <div class=" flex justify-between w-[52%]" >
                    <p>Availability</p>
                    <Switch
                      onChange={this.handleAvailability}
                      checked={this.state.availability}
                      //    checked={opportunityInd || opportunityToggleInd}
                      checkedChildren="Yes"
                      unCheckedChildren="No"
                    />
                  </div>
                  <div class=" flex justify-between w-[52%]" >
                    {/* <Checkbox
                    // checked={this.state.checked}
                    // onChange={() => this.handleChange()}
                    // style={{ marginLeft: "auto" }}
                    >Attach Resume?
                    </Checkbox> */}
                      <p>Attach Resume?</p>
                    <Switch
                      onChange={this.handleResume}
                      checked={this.state.resume}
                      //    checked={opportunityInd || opportunityToggleInd}
                      checkedChildren="Yes"
                      unCheckedChildren="No"
                    />

                  </div>
                </div>
                <div class=" w-[47%]"
                >
                 
                  <div class=" flex justify-between w-[55%] mt-3" >
                    <p>Experience</p>
                    <Switch
                      onChange={this.handleExperience}
                      checked={this.state.experience}
                      //    checked={opportunityInd || opportunityToggleInd}
                      checkedChildren="Yes"
                      unCheckedChildren="No"
                    />
                  </div>
                  <div class=" flex justify-between w-[55%]" >
                    <p>Identity Card</p>
                    <Switch
                      onChange={this.handleIdentityCard}
                      checked={this.state.identityCard}
                      //    checked={opportunityInd || opportunityToggleInd}
                      checkedChildren="Yes"
                      unCheckedChildren="No"
                    />
                  </div>
                  <div class=" flex justify-between w-[55%]" >
                    <p>SkillWise Experience</p>
                    <Switch
                      onChange={this.handleSkillWiseExperience}
                      checked={this.state.skillwiseExperience}
                      //    checked={opportunityInd || opportunityToggleInd}
                      checkedChildren="Yes"
                      unCheckedChildren="No"
                    />
                  </div>
                </div>
              </div>
           
              <div class=" flex justify-end mt-3" >
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={this.props.handleCandidateEmailModal}
                  Loading={this.props.chooseCandididate}
                > Generate Email
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}
const mapStateToProps = ({ auth, opportunity, contact, candidate }) => ({
  chooseCandidate: candidate.chooseCandidate,
  chooseCandidateEmail: candidate.chooseCandidateEmail
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      chooseCandididate
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(CandidateChooseForm);


