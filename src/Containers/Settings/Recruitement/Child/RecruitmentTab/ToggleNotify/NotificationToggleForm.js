import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch } from "antd";
import { Formik, Form, Field, FieldArray } from "formik";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import { FlexContainer } from "../../../../../../Components/UI/Layout";
;


class NotificationToggleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        admin:  false,
        reportingManager: false,
        reportingManager1: false,
    };
  }
  handleProduction = () => {
    this.setState((prevState) => ({
      admin: !prevState.admin,
    }));
  };
  handleBilling = () => {
    this.setState((prevState) => ({
        reportingManager: !prevState.reportingManager,
    }));
  };

  handleCorporate = () => {
    this.setState((prevState) => ({
      reportingManager1: !prevState.reportingManager1,
    }));
  };
  
  componentDidMount() {
  }

  render() {

    

    return (
      <>
        <Formik
          initialValues={{
            
            admin: this.state.admin ? "true" : "false",
            reportingManager: this.state.reportingManager  ? "true" :"false",
            reportingManager1: this.state.reportingManager1 ? "true" : "false",
          }}
          // validationSchema={FormSchema}
          onSubmit={(values, { resetForm }) => {
            //debugger;
            console.log(values);
            this.props.updateLocation(
              {
                ...values,
                admin: this.state.admin ? "true" : "false",
                reportingManager: this.state.reportingManager  ? "true" :"false",
                reportingManager1: this.state.reportingManager1 ? "true" : "false",
              },
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
            <div class="overflow-y-auto h-[30rem] overflow-x-hidden">
            <Form class="form-background">
              <div class="flex justify-between max-sm:flex-col">
                <div class="h-full w-[45%] max-sm:w-wk">
                
                
                  <FlexContainer>
                    <div style={{ width: "47%" }} class="mt-2">
                      <div class="font-bold text-xs">Admin &nbsp;</div>
                      <div>
                        <Switch
                          style={{ width: "6.25em" }}
                          checked={this.state.admin}
                          onChange={this.handleProduction}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </div>
                    </div>
                    <div style={{ width: "47%" }} class="mt-2">
                      <div class="font-bold text-xs">RM &nbsp;</div>
                      <div>
                        <Switch
                          style={{ width: "6.25em" }}
                          checked={this.state.reportingManager}
                          onChange={this.handleInventory}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </div>
                    </div>
                  </FlexContainer>
                  <FlexContainer>
                  <div style={{ width: "47%" }} class="mt-2">
                      <div class="font-bold text-xs">RM2 &nbsp;</div>
                      <div>
                        <Switch
                          style={{ width: "6.25em" }}
                          checked={this.state.reportingManager1}
                          onChange={this.handleProdManuf}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </div>
                    </div>
                   
                  </FlexContainer>
                 
                </div>
              </div>
              <div class="flex justify-end w-wk bottom-2 mr-2 md:absolute ">
                <Button
                  type="primary"
                  htmlType="submit"
                //   loading={this.props.updatingLocations}
                >
                 Update
                </Button>
              </div>
            </Form>
            </div>
          )}
        </Formik>
      </>
    );
  }
}
const mapStateToProps = ({ location, auth, teams, plant }) => ({
//   updatingLocations: location.updatingLocations,
  userId:auth.userDetails.userId,
  orgId:auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {

    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(NotificationToggleForm);


