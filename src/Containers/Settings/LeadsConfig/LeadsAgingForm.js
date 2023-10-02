import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Switch, Tooltip, Popconfirm, Popover } from "antd";
import { FormattedMessage } from "react-intl";
import { YoutubeOutlined } from '@ant-design/icons';
import { Formik, Form, Field, FastField } from "formik";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { SelectComponent } from "../../../Components/Forms/Formik/SelectComponent";
import { FlexContainer } from "../../../Components/UI/Layout";
import { StyledLabel } from "../../../Components/UI/Elements";
import { Spacer } from "../../../Components/UI/Elements";
import { addLeadsaging, getLeadAging } from "../SettingsAction";
import { StyledTabs } from "../../../Components/UI/Antd";

function LeadsAgingForm(props) {
  useEffect(() => {
    props.getLeadAging(props.organizationId);
  }, []);
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          orgId: props.organizationId,
          cold: 0,
          hot: 0,
          worm: 0,
          notDefined: 0,
          userId: props.userId,

        }}
        onSubmit={(values) => {
      
        }}
      >
        {({ values }) => (
          <Form>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                height: "32vh",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: "45%",
                  marginLeft: "0.62em",
                }}
              >
                <StyledLabel style={{ fontStyle: "italic" }}>
                  Configure rules for ageing of Contacts in Leads section, if
                  not qualified within the stipulated time then they will be
                  automatically transferred to
                </StyledLabel>

                <Spacer />

                <StyledLabel style={{ fontStyle: "italic" }}>
                  Junk section. Junk leads will show up in the admin account for
                  future redistribution.
                </StyledLabel>
                <Spacer style={{ marginBottom: "1.87em" }} />
                <StyledLabel>
                  l<FormattedMessage
                    id="app.category"
                    defaultMessage="Category"
                  />
                </StyledLabel>
                <Spacer />

                <div className="flex justify-arround">
                  <div class="flex justify-evenly">
                    <div
                      style={{
                        marginTop: "1.87em",
                        width: "24%",
                        display: "flex",
                      }}
                    >
                      <i
                        className="fas fa-mug-hot"
                        style={{ fontSize: "1.12em" }}
                      />
                      &nbsp;&nbsp;
                      <StyledLabel>
                        Hot
                        
                      </StyledLabel>
                      &nbsp;&nbsp;
                    </div>

                    <FlexContainer
                      justifyContent="space-between"
                      style={{ width: "30%" }}
                    >
                      <div style={{ width: "22%" }}>
                        <Field
                          name="hotLeads.days"
                          // label="To Start"

                          isColumn
                          
                          width={"100%"}
                          component={InputComponent}
                          inlineLabel
                          style={{
                            flexBasis: "80%",
                            marginTop: "0em",
                            height: "2em",
                            textAlign: "center",
                            backgroundColor:"#f5f3f3"
                          }}
                        />
                      </div>
                      <div style={{ width: "75%", marginTop: "20.5em" }}>
                        <StyledLabel>
                          {/* Days */}
                          <FormattedMessage
                            id="app.days"
                            defaultMessage="Days"
                          />
                        </StyledLabel>
                      </div>
                      <FlexContainer
                    justifyContent="space-between"
                    style={{ marginTop: "-1.25em" }}
                  >
                    <div
                      style={{
                        marginTop: "1.87em",
                        width: "24%",
                        display: "flex",
                      }}
                    >
                      <i className="	fas fa-burn" style={{ fontSize: "1.12em" }} />
                      &nbsp;&nbsp;
                      <StyledLabel>
                        Warm
                        
                      </StyledLabel>
                      &nbsp;&nbsp;
                    </div>

                    <FlexContainer
                      justifyContent="space-between"
                      style={{ width: "30%" }}
                    >
                      <div style={{ width: "22%" }}>
                        <Field
                          name="warmLeads.days"
                     
                          isColumn
                          width={"100%"}
                          
                          component={InputComponent}
                          inlineLabel
                          style={{
                            flexBasis: "80%",
                            marginTop: "0em",
                            height: "2em",
                            textAlign: "center",
                            backgroundColor:"#f5f3f3"
                       
                          }}
                        />
                      </div>
                      <div style={{ width: "75%", marginTop: "1.87em" }}>
                        {/* <StyledLabel>
                          Days
                        </StyledLabel> */}
                      </div>
                    </FlexContainer>
                  </FlexContainer>
                    </FlexContainer>
                  </div>

                 
                </div>
              </div>

              <div
                style={{
                  height: "100%",
                  width: "45%",
                  marginRight: "0.62em",
                }}
              >
                <StyledLabel style={{ color: "white" }}>.</StyledLabel>
                <Spacer />
                <StyledLabel style={{ color: "white" }}>.</StyledLabel>
                <Spacer style={{ marginBottom: "1.87em" }} />
                <StyledLabel style={{ color: "white" }}>.</StyledLabel>
                <Spacer />

                <div style={{ marginLeft: "0%" }}>
                  <FlexContainer justifyContent="space-between">
                    <div
                      style={{
                        marginTop: "1.87em",
                        width: "24%",
                        display: "flex",
                      }}
                    >
                      <i
                        className="far fa-snowflake"
                        style={{ fontSize: "1.12em" }}
                      />
                      &nbsp;&nbsp;
                      <StyledLabel>
                        {/* Cold */}
                        <FormattedMessage
                          id="app.cold"
                          defaultMessage="Cold"
                        />
                      </StyledLabel>
                    </div>
                    <FlexContainer
                      justifyContent="space-between"
                      style={{ width: "30%" }}
                    >
                      <div style={{ width: "20%" }}>
                        <Field
                          name="coldLeads.days"
                          // label="To Start"
                          isColumn
                          disabled={props.subscriptionType === "FREE"}
                          width={"100%"}
                          component={InputComponent}
                          inlineLabel
                          style={{
                            flexBasis: "80%",
                            marginTop: "0em",
                            height: "2em",
                            textAlign: "center",
                            backgroundColor:
                              props.subscriptionType === "FREE"
                                ? "#f5f3f3"
                                : null,
                          }}
                        />
                      </div>
                      <div style={{ width: "75%", marginTop: "20.5em" }}>
                        <StyledLabel>
                          {/* Days */}
                          <FormattedMessage
                            id="app.days"
                            defaultMessage="Days"
                          />
                        </StyledLabel>
                      </div>
                    </FlexContainer>
                  </FlexContainer>

                  <FlexContainer
                    justifyContent="space-between"
                    style={{ marginTop: "-1.25em" }}
                  >
                    <div
                      style={{
                        marginTop: "1.87em",
                        width: "24%",
                        display: "flex",
                      }}
                    >
                      <StyledLabel>Not Defined</StyledLabel>
                    </div>
                    <FlexContainer
                      justifyContent="space-between"
                      style={{ width: "30%" }}
                    >
                      <div style={{ width: "20%" }}>
                        <Field
                          name="otherLeads.days"
                          isColumn
                          width={"100%"}
                          component={InputComponent}
                          inlineLabel
                          style={{
                            flexBasis: "80%",
                            marginTop: "0em",
                            height: "2em",
                            textAlign: "center",
                            backgroundColor:"#f5f3f3"
                          }}
                        />
                      </div>
                      <div style={{ width: "75%", marginTop: "1.87em" }}>
                        <StyledLabel>
                          <FormattedMessage
                            id="app.days"
                            defaultMessage="Days"
                          />
                        </StyledLabel>
                      </div>
                    </FlexContainer>
                  </FlexContainer>
                </div>
              </div>
            </div>
            <Spacer />

              <>
                <FlexContainer
                  justifyContent="flex-end"
                  style={{ marginRight: "0.62em" }}
                >
                  <Popconfirm
                    // title="Do you wish to proceed?"
                    title={<FormattedMessage
                      id="app.doyouwishtoproceed?"
                      defaultMessage="Do you wish to proceed?"
                    />}
                    onConfirm={() => props.addLeadsaging(values)}
                    onCancel={props.getLeadAging}
                    okText="Ok"
                    // cancelText="Cancel"
                    cancelText={<FormattedMessage
                      id="app.cancel"
                      defaultMessage="Cancel"
                    />}
                  >
                    <Button
                      type="primary"
                      loading={props.addingLeadAging}
                      htmlType="submit"
                      style={{
                        marginRight: "-0.43em",
                        marginTop: "1.25em",
                        marginBottom: "0.31em",
                      }}
                    >
                      {/* Update */}
                      <FormattedMessage
                        id="app.update"
                        defaultMessage="Update"
                      />
                    </Button>
                  </Popconfirm>
                </FlexContainer>
              </>
       
          </Form>
        )}
      </Formik>
    </>
  );
}

const mapStateToProps = ({ settings, auth }) => ({
  leadAging: settings.leadAging,
  addingLeadAging: settings.addingLeadAging,
  organizationId: auth.userDetails.organizationId,
  addingLeadAging: settings.addingLeadAging,
  userId:auth.userDetails.userId

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ 
    addLeadsaging, getLeadAging 
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LeadsAgingForm);
