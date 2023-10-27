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
import { getRequirementsDuration } from "../../../../Settings/SettingsAction";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import { addingNotifications, getNotifications } from "../../../SettingsAction";
import dayjs from "dayjs";
import moment from "moment";
const { Option } = Select;
function Notifications(props) {
  useEffect(() => {
    props.getNotifications(props.orgId);
    // props.getRequirementsDuration(props.orgId);
  }, []);

  const { inappInd } = props.notifications;
  console.log(inappInd);
  const [toggle, setToggle] = useState(inappInd);
  function handleAppClick(checked) {
    console.log(inappInd);
    if (inappInd) {
      //disable url
      props.addingNotifications({
        ...props.notifications,
        orgId: props.orgId,
        inappInd: inappInd ? false : true,
      });
      setToggle(inappInd ? false : true);
    } else {
      props.addingNotifications(
        {
          ...props.notifications,
          orgId: props.orgId,
          inappInd: inappInd ? false : true,
        },
        props.orgId
      );
      setToggle(inappInd ? false : true);
    }
  }
  function handleCancel() {
    if (inappInd) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }

  const { smsInd } = props.notifications;
  console.log(smsInd);
  const [inSmsInd, setsmsInd] = useState(smsInd);
  function handleSmsClick(checked) {
    console.log(smsInd);
    if (smsInd) {
      //disable url
      props.addingNotifications({
        ...props.notifications,
        orgId: props.orgId,
        smsInd: smsInd ? false : true,
      });
      setsmsInd(smsInd ? false : true);
    } else {
      props.addingNotifications(
        {
          ...props.notifications,
          orgId: props.orgId,
          smsInd: smsInd ? false : true,
        },
        props.orgId
      );
      setsmsInd(smsInd ? false : true);
    }
  }
  function handleCancel() {
    if (smsInd) {
      setsmsInd(true);
    } else {
      setsmsInd(false);
    }
  }

  const { emailInd } = props.notifications;
  console.log(emailInd);
  const [inEmailInd, setemailInd] = useState(emailInd);
  function handleEmailClick(checked) {
    console.log(emailInd);
    if (emailInd) {
      //disable url
      props.addingNotifications({
        ...props.notifications,
        orgId: props.orgId,
        emailInd: emailInd ? false : true,
      });
      setemailInd(emailInd ? false : true);
    } else {
      props.addingNotifications(
        {
          ...props.notifications,
          orgId: props.orgId,
          emailInd: emailInd ? false : true,
        },
        props.orgId
      );
      setemailInd(emailInd ? false : true);
    }
  }
  function handleCancel() {
    if (emailInd) {
      setemailInd(true);
    } else {
      setemailInd(false);
    }
  }

  const { whatsappInd } = props.notifications;
  console.log(whatsappInd);
  const [inWhatsappInd, setwhatsappInd] = useState(whatsappInd);
  function handleWpClick(checked) {
    console.log(whatsappInd);
    if (whatsappInd) {
      //disable url
      props.addingNotifications({
        ...props.notifications,
        orgId: props.orgId,
        whatsappInd: whatsappInd ? false : true,
      });
      setwhatsappInd(whatsappInd ? false : true);
    } else {
      props.addingNotifications(
        {
          ...props.notifications,
          orgId: props.orgId,
          whatsappInd: whatsappInd ? false : true,
        },
        props.orgId
      );
      setwhatsappInd(whatsappInd ? false : true);
    }
  }
  function handleCancel() {
    if (whatsappInd) {
      setwhatsappInd(true);
    } else {
      setwhatsappInd(false);
    }
  }

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
        //   timePeriod: "",
          userId: props.userId,
          orgId: props.organizationId,
        }}
        onSubmit={(values, { resetForm }) => {}}
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
                  <div>
                    <StyledLabel
                      style={{
                        flexBasis: "13%",
                        marginTop: "0.625em",
                        fontSize: "1em",
                        fontStyle: "italic",
                      }}
                    >
                      Notifications
                    </StyledLabel>
                  </div>

                  <Spacer />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <p>In app</p>
                    <div>
                      <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleAppClick}
                        onCancel={handleCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          style={{ width: "5em" }}
                          checked={toggle || inappInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
                  </div>
                  <Spacer />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <p>In sms</p>
                    <div>
                      <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleSmsClick}
                        onCancel={handleCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          style={{ width: "5em" }}
                          checked={inSmsInd || smsInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
                  </div>
                  <Spacer />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <p>In Email</p>
                    <div>
                      <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleEmailClick}
                        onCancel={handleCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          style={{ width: "5em" }}
                          checked={inEmailInd || emailInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
                  </div>
                  <Spacer />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <p>In whatsapp</p>
                    <div>
                      <Popconfirm
                        title="Do you wish to change Status ? "
                        onConfirm={handleWpClick}
                        onCancel={handleCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          style={{ width: "5em" }}
                          checked={inWhatsappInd || whatsappInd}
                          checkedChildren="Yes"
                          unCheckedChildren="No"
                        />
                      </Popconfirm>
                    </div>
                  </div>
                  {/* <Spacer />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <p>Level</p>
                    <div>
                      <Popconfirm
                        title="Do you wish to change Status ? "
                        // onConfirm={handleSmsClick}
                        // onCancel={handleCancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Switch
                          style={{ width: "5em" }}
                          // checked={inSmsInd || smsInd}
                          checkedChildren="Basic"
                          unCheckedChildren="Advanced"
                        />
                      </Popconfirm>
                    </div>
                  </div> */}
                </div>
              </FlexContainer>
              <h4>Updated on {moment(props.notifications.updatedDate).format("ll")} by {props.notifications.ownerName}</h4>
            </Form>
          </MainWrapper>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ settings, opportunity, auth }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
  notifications: settings.notifications,
  fetchingNotifications: settings.fetchingNotifications,
  fetchingNotificationsError: settings.fetchingNotificationsError,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getNotifications,
      addingNotifications,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
