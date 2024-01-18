import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch } from "antd";
import { FormattedMessage } from "react-intl";
import { Formik, Form, FastField } from "formik";
import { InputComponent } from "../../../../../../Components/Forms/Formik/InputComponent";
import {addNotificationConfig,getNotificationConfig} from "../../../../SettingsAction";


class NotificationToggleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        admini:  this.props.notificationConfig.admin,
        reportingMan:this.props.notificationConfig.reportingManager,
        reportingMan1:this.props.notificationConfig.reportingManager1,
    };
  }
  handleAdmini = () => {
    this.setState((prevState) => ({
      admini: !prevState.admini,
    }));
  };
  handleReportingMan = () => {
    this.setState((prevState) => ({
        reportingMan: !prevState.reportingMan,
    }));
  };

  handleReportingMan1 = () => {
    this.setState((prevState) => ({
      reportingMan1: !prevState.reportingMan1,
    }));
  };
  
  componentDidMount() {
    this.props.getNotificationConfig("candidate","create");
  }

  render() {
console.log("433434344",this.props.notificationConfig)
    

    return (
      <>
        <Formik
          initialValues={{
            
            admin: this.state.admini ? "true" : "false",
            reportingManager: this.state.reportingMan  ? "true" :"false",
            reportingManager1: this.state.reportingMan1 ? "true" : "false",
            type: "Create",
            name: "Candidate",

          }}
          // validationSchema={FormSchema}
          onSubmit={(values, { resetForm }) => {
            //debugger;
            console.log(values);
            this.props.addNotificationConfig(
              {
                ...values,
                admin: this.state.admini ? "true" : "false",
                reportingManager: this.state.reportingMan  ? "true" :"false",
                reportingManager1: this.state.reportingMan1 ? "true" : "false",
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
                
                
                  <div class=" flex ">
                    <div class=" w-[47%] mt-2"  >
                      <div class="font-bold text-xs">Admin &nbsp;</div>
                      <div>
                        <Switch
                          style={{ width: "6.25em" }}
                          checked={this.props.notificationConfig.admin || this.state.admini}
                          onChange={this.handleAdmini}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </div>
                    </div>
                    <div class=" w-[47%] mt-2" >
                      <div class="font-bold text-xs">RM &nbsp;</div>
                      <div>
                        <Switch
                          style={{ width: "6.25em" }}
                          checked={this.props.notificationConfig.reportingManager || this.state.reportingMan}
                          onChange={this.handleReportingMan}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </div>
                      <div>
                      <FastField
                        name="name"
                        label={
                          <FormattedMessage
                            id="app.name"
                            defaultMessage="Name"
                          />}
                        isColumn
                        width={"100%"}
                        component={InputComponent}
                        inlineLabel
                        isRequired
                      />
                      </div>
                    </div>
                  </div>
                  <div class=" flex">
                  <div class=" w-[47%] mt-2" >
                      <div class="font-bold text-xs">RM2 &nbsp;</div>
                      <div>
                        <Switch
                          style={{ width: "6.25em" }}
                          checked={this.props.notificationConfig.reportingManager1 || this.state.reportingMan1}
                          onChange={this.handleReportingMan1}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </div>
                    </div>
                   
                  </div>
                 
                </div>
              </div>
              <div class="flex justify-end w-wk bottom-2 mr-2 md:absolute ">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={this.props.addingNotificationConfig}
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
const mapStateToProps = ({ settings, auth, }) => ({
  addingNotificationConfig:settings.addingNotificationConfig,
  userId:auth.userDetails.userId,
  orgId:auth.userDetails.organizationId,
  notificationConfig:settings.notificationConfig

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addNotificationConfig,
      getNotificationConfig
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(NotificationToggleForm);


