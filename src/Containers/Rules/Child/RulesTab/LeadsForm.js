import React, { useState, useEffect,  } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { Button,  } from "antd";
import { Formik, Form, Field,  } from "formik";
import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
import { FlexContainer } from "../../../../Components/UI/Layout";
import { Spacer } from "../../../../Components/UI/Elements";
import { addLeaves, getLeavesDetails } from "../../../Settings/SettingsAction";
import moment from "moment";


function LeadsForm(props) {
  const [visible, setVisible] = useState(false);

  const handleChange = (checked) => {
    debugger;
    setVisible(checked);
  };
  useEffect(() => {
    props.getLeavesDetails(props.countryId);
    // props.getOnlySalesUser();
  }, []);

  // const teamOption = useMemo(() => {
  //   if (!props.onlySalesUsers) return [];
  //   return (
  //     props.onlySalesUsers.length &&
  //     props.onlySalesUsers.map((user) => {
  //       return {
  //         label: `${user.firstName} - ${user.emailId}` || "",
  //         value: user.userId,
  //       };
  //     })
  //   );
  // }, [props.onlySalesUsers]);

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          // employeeId: props.userId,
country:props.countryId,
          maximumLeaves: props.leaveData.maximumLeaves || "",
          carryForward: props.leaveData.carryForward || "",
          mileageRate:props.leaveData.mileageRate || "",

          leavesCappedTimesAnnualy: props.leaveData.leavesCappedTimesAnnualy || "",
          // organizationId: props.organizationId,
        }}
        // onSubmit={(values) => {
        //   props.addLeaves(values),props.countryId;
        // }}
        onSubmit={(values) => {
          props.addLeaves({ ...values  },props.countryId);
      }}
      
      >
        {({ values }) => (
          <Form className="form-background">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{
                  height: "100%",
                  width: "100%",
                }}
              >
                <Field
                  isRequired
                  name="maximumLeaves"
                  // label="Max leaves (in days)"
                  label={<div class="w-60"><FormattedMessage
                    id="app.maximumLeaves"
                    defaultMessage="Max leaves (in days)"
                  /></div>}
                  width={"10%"}
                  component={InputComponent}
                  inlineLabel
                // style={{
                //   flexBasis: "80%",
                //   marginTop: "0.25em",
                //   height: "2.0625em",
                // }}
                />
                <Spacer />
                <Field
                  isRequired
                  name="carryForward"
                  //label="Carry Forward(%)"
                  label={<div class="w-60"><FormattedMessage
                    id="app.carryForward"
                    defaultMessage="Carry Forward(%)"
                  /></div>}
                  inlineLabel
                  width={"10%"}
                  component={InputComponent}
                
                // style={{
                //   flexBasis: "80%",
                //   marginTop: "0.25em",
                //   height: "2.0625em",
                // }}
                />
                <Spacer />
                <Field
                  isRequired
                  name="leavesCappedTimesAnnualy"
                  //label="Max Carry Forward(%)"
                  label={<div class="w-60"><FormattedMessage
                    id="app.leavesCappedTimesAnnualy"
                    defaultMessage="Leaves Capped at times Annual Leave"
                  /></div>}
                  inlineLabel
                  width={"10%"}
                  component={InputComponent}
                  // inlineLabel
                // style={{
                //   flexBasis: "80%",
                //   marginTop: "0.25em",
                //   height: "2.0625em",
                // }}
                />
                <Spacer />
                <Field
                  isRequired
                  name="mileageRate"
                  // label="Max leaves (in days)"
                  label={<div class="w-60"><FormattedMessage
                    id="app.mileageRate"
                    defaultMessage="Mileage Rate (ur/km)"
                  /></div>}
                  width={"10%"}
                  component={InputComponent}
                  inlineLabel
                // style={{
                //   flexBasis: "80%",
                //   marginTop: "0.25em",
                //   height: "2.0625em",
                // }}
                />

                {/* <FlexContainer justifyContent="space-between">
                  <div style={{ width: "50%", marginTop: "0.625em" }}>
                    <StyledLabel>Assign To</StyledLabel>
                    <Switch
                      style={{ width: "7.5em", marginLeft: "0.625em" }}
                      onChange={handleChange}
                      checked={true}
                      checkedChildren="Specific"
                      unCheckedChildren="Round Robin"
                    />
                  </div>
                </FlexContainer> */}

                <Spacer />
                {/* <Field
                  name="userId"
                  label="Sales User"
                  isRequired
                  isColumn
                  style={{
                    flexBasis: "80%",

                    marginTop: "0.25em",
                  }}
                  component={SelectComponent}
                  options={Array.isArray(teamOption) ? teamOption : []}
                /> */}
                <Spacer />
                <FlexContainer justifyContent="flex-end">
                  <Button
                    type="primary"
                    htmlType="submit"
                    Loading={props.addingLeaves}
                  >
                    Submit
                  </Button>
                </FlexContainer>
                
                <h4>Updated on {moment(props.leaveData.updationDate).format("ll")} by {props.leaveData.updatedBy}</h4> 
                <Spacer />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ auth, settings, team }) => ({
  userId: auth.userDetails.userId,
  addingLeaves: settings.addingLeaves,
  leaveData: settings.leaveData,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addLeaves,
      getLeavesDetails,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LeadsForm);
