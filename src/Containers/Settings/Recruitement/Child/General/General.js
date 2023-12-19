import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Formik, Form, Field } from "formik";
import {
  Select,
} from "../../../../../Components/UI/Elements";
import { SwitchComponent } from "../../../../../Components/Forms/Formik/SwitchComponent";
import { MainWrapper, Spacer } from "../../../../../Components/UI/Elements";
import { FormattedMessage } from "react-intl";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
import { Button,  } from "antd";
import {
  updateRequirement,
  getRequirementsDuration,
} from "../../../../Settings/SettingsAction";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import Notifications from "./Notifications";
import moment from "moment";
const { Option } = Select;
function General(props) {
  const [anniversary, setAnniversary] = useState(props.requirementDuration.jobAniEmailInd);
  const [birthday, setBirthday] = useState(props.requirementDuration.birthdayEmailInd);

  const handleAnniversay = (checked) => {
    setAnniversary(checked);
  };
  const handleBirthday = (checked) => {
    setBirthday(checked);
  };
  useEffect(() => {
    props.getRequirementsDuration(props.orgId);
  }, []);


  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          // jobAniEmailInd:props.requirementDuration.jobAniEmailInd,
          timePeriod: props.requirementDuration.timePeriod === 0 ? "Not Applicable" : props.requirementDuration.timePeriod || "",
          oppTimePeriod: props.requirementDuration.oppTimePeriod === 0 ? "Not Applicable" : props.requirementDuration.oppTimePeriod || "",
          userId: props.userId,
          orgId: props.organizationId,
          jobAniEmailInd: props.requirementDuration.jobAniEmailInd,
          birthdayEmailInd: props.requirementDuration.birthdayEmailInd,
          inspectionRequiredInd: props.requirementDuration.inspectionRequiredInd,
        }}
        onSubmit={(values) => {
          console.log(values)
          // if (values.timePeriod === "0") {
          //   values.timePeriod = "Not Applicable";
          // }
          // if (values.orderTimePeriod === "0") {
          //   values.orderTimePeriod = "Not Applicable";
          // }
          props.updateRequirement(
            {
              ...values,
              // jobAniEmailInd:  anniversary ? true : false,
              // birthdayEmailInd:  birthday ? true : false,
              timePeriod: values.timePeriod === "Not Applicable" ? "0" : values.timePeriod,
              oppTimePeriod: values.oppTimePeriod === "Not Applicable" ? "0" : values.oppTimePeriod,
            },
            props.orgId
          );
        }}
      >
        {({ values }) => (
          <MainWrapper style={{ height: "525px", width: "", overflow: "auto" }}>
            <Form className="form-background">
              <FlexContainer
                justifyContent="space-between"
                style={{ width: "100%" }}
              >
                <div
                  style={{
                    width: "44%",

                    marginTop: "0.625em",
                    marginLeft: "1em",
                  }}
                >

                  <div
                    style={{
                      width: "74%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <p style={{ minWidth: "-webkit-fill-available" }}>Auto drop Open Orders (in months)</p>
                    <div>
                      <Field
                        style={{ width: "10rem" }}
                        name="timePeriod"

                        component={SelectComponent}
                        options={["1", "2", "3", "4", "5", "Not Applicable"]}
                        isColumn
                      //  inlineLabel
                      />
                    </div>
                  </div>
                  <Spacer />
                  <div
                    style={{
                      width: "74%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <p style={{ minWidth: "-webkit-fill-available" }}>Auto drop Open Opportunities (in months)</p>
                    <div>
                      <Field
                        name="oppTimePeriod"
                        style={{ width: "10rem" }}
                        component={SelectComponent}
                        options={["1", "2", "3", "4", "5", "Not Applicable"]}
                        isColumn
                      // inlineLabel
                      />
                    </div>
                  </div>
                  <Spacer />
                  <div
                    style={{
                      width: "74%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <p style={{ minWidth: "-webkit-fill-available" }}>Auto Send Job Anniversary Email</p>
                    <div>
    {/* <Popconfirm
      title="Do you wish to change the status?"
      onConfirm={() => handleAnniversay(!anniversary)}
      okText="Yes"
      cancelText="No"
    > */}
   <Field
                        name="jobAniEmailInd"
                        component={SwitchComponent}
                        data={values.jobAniEmailInd}
                        checkedChildren={"Yes"}
                        unCheckedChildren={"No"}
                        width={"5em"}
                      />
    {/* </Popconfirm> */}
  </div>
                  </div>
                  <Spacer />
                  <div
                    style={{
                      width: "74%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <p style={{ minWidth: "-webkit-fill-available" }}>Auto Send BirthDay Email</p>
                    <div>

                    <Field
                        name="birthdayEmailInd"
                        component={SwitchComponent}
                        data={values.birthdayEmailInd}
                        checkedChildren={"Yes"}
                        unCheckedChildren={"No"}
                        width={"5em"}
                      />
 
  
  </div>
                  </div>
                  <Spacer />
                  <div
                    style={{
                      width: "74%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <p style={{ minWidth: "-webkit-fill-available" }}>Production Process Only</p>
                    <div>
                      <Field
                        name="inspectionRequiredInd"
                        component={SwitchComponent}
                        data={values.inspectionRequiredInd}
                        checkedChildren={"Yes"}
                        unCheckedChildren={"No"}
                        width={"5em"}
                      />
                    </div>
                  </div>
                  <Spacer />
                </div>
              </FlexContainer>
              <h4 class="mt-4">
                Updated on{" "}
                {moment(props.requirementDuration.creationDate).format("ll")} by{" "}
                {props.requirementDuration.ownerName}
              </h4>
              <Spacer style={{ marginTop: "1.25em" }} />
              <FlexContainer justifyContent="flex-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  Loading={props.updateRequirement}
                >
                  <FormattedMessage id="app.update" defaultMessage="Update" />
                  {/* Update */}
                </Button>
              </FlexContainer>
              <Notifications />
            </Form>
          </MainWrapper>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ settings, opportunity, auth }) => ({
  userId: auth.userDetails.userId,
  requirementDuration: settings.requirementDuration,
  orgId: auth.userDetails.organizationId,
  updateRequirement: settings.updateRequirement,
  updateRequirementError: settings.updateRequirementError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateRequirement,
      getRequirementsDuration,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(General);
