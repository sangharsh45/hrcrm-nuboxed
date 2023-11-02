import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Formik, Form, Field } from "formik";
import {
  TextInput,
  Select,
  StyledLabel,
} from "../../../../../Components/UI/Elements";
import { MainWrapper, Spacer } from "../../../../../Components/UI/Elements";
import { FormattedMessage } from "react-intl";
import { SelectComponent } from "../../../../../Components/Forms/Formik/SelectComponent";
import { Button, Popconfirm, Switch } from "antd";
import {
  updateRequirement,
  getRequirementsDuration,
  // updateOpportunity,
  // getRequirementsDuration,
} from "../../../../Settings/SettingsAction";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import Notifications from "./Notifications";
import dayjs from "dayjs";
import moment from "moment";
const { Option } = Select;
function General(props) {
  useEffect(() => {
    props.getRequirementsDuration(props.orgId);
  }, []);

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          timePeriod: props.requirementDuration.timePeriod || "",
          orderTimePeriod: props.requirementDuration.orderTimePeriod || "",
          userId: props.userId,
          orgId: props.organizationId,
        }}
        onSubmit={(values) => {
          props.updateRequirement(
            {
              ...values,
            },
            props.orgId
          );
        }}
      >
        {({ values }) => (
        <MainWrapper style={{ height: "446px", width: "", overflow: "auto" }}>
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
                <p style={{ minWidth:"-webkit-fill-available"}}>Auto drop Open Orders (in months)</p>
                <div>
                <Field
                style={{width:"8rem"}}
                    name="timePeriod"
                 
                    component={SelectComponent}
                    options={["1", "2", "3", "4", "5","Not Applicable"]}
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
                <p style={{ minWidth:"-webkit-fill-available"}}>Auto drop Open Opportunities (in months)</p>
                <div>
                <Field
                    name="orderTimePeriod"
                    style={{width:"8rem"}}
                    component={SelectComponent}
                    options={["1", "2", "3", "4", "5","Not Applicable"]}
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
                <p style={{ minWidth:"-webkit-fill-available"}}>Auto Send Job Anniversary Email</p>
                <div>
                      <Popconfirm
                        title="Do you wish to change Status ? "
                        // onConfirm={handleAppClick}
                        // onCancel={handleCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          style={{ width: "5em" }}
                          // checked={toggle || inappInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
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
                <p style={{ minWidth:"-webkit-fill-available"}}>Auto Send BirthDay Anniversary Email</p>
                <div>
                      <Popconfirm
                        title="Do you wish to change Status ? "
                        // onConfirm={handleAppClick}
                        // onCancel={handleCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          style={{ width: "5em" }}
                          // checked={toggle || inappInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
              </div>
              <Spacer />
            </div>
          </FlexContainer>
          <h4>
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
