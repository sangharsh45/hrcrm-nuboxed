import React, {  useEffect,  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, Popconfirm,  } from "antd";
import { FormattedMessage } from "react-intl";
import { Formik, Form, Field, } from "formik";
import { InputComponent } from "../../../Components/Forms/Formik/InputComponent";
import { StyledLabel } from "../../../Components/UI/Elements";
import { Spacer } from "../../../Components/UI/Elements";
import { addLeadsaging, getLeadAging } from "../SettingsAction";

function LeadsAgingForm(props) {
  useEffect(() => {
    props.getLeadAging(props.organizationId);
  }, []);

  console.log("legdi",props.leadAging && props.leadAging.length && props.leadAging[0].cold )
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          cold:props.leadAging && props.leadAging.length && props.leadAging[0].cold ||"",
          hot:props.leadAging && props.leadAging.length && props.leadAging[0].hot || "",
          worm: props.leadAging && props.leadAging.length && props.leadAging[0].worm || "",
          notDefined:props.leadAging && props.leadAging.length && props.leadAging[0].notDefined || "",
          userId: props.userId,
          liveInd: true,
          orgId: props.organizationId,

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

                <div className="flex flex-col ">
                  <div >
                    <div class="flex justify-between w-[18rem]" >
                      <i
                        className="fas fa-mug-hot"
                        style={{ fontSize: "1.12em" }}
                      />                 
                      <label class="font-semibold ml-8">
                        Hot
                        
                        </label>      
                      <div class="flex">
                        <Field
                          name="hot"
                          // label="To Start"

                          isColumn
                          
                          width={"100%"}
                          component={InputComponent}
                          inlineLabel
                          style={{
                            width:"11rem",
                            marginTop: "0em",
                            height: "2em",
                            textAlign: "center",
                            backgroundColor:"#f5f3f3"
                          }}
                        />
                        <div >
                        <StyledLabel>
                          {/* Days */}
                          <FormattedMessage
                            id="app.days"
                            defaultMessage="Days"
                          />
                        </StyledLabel>
                      </div>
                      </div>
                      
                    </div>

                    <div  class="flex justify-between">
                      
                      <div  class="flex justify-between" >
                    <div>
                      <i className="	fas fa-burn" style={{ fontSize: "1.12em",marginRight:"2rem" }} />
                     <label class="mr-[0.7rem] font-semibold">
                        Warm
                        
                        </label>
                    </div>

                    <div>
                      <div class="flex" >
                        <Field
                          name="worm"
                     
                          isColumn
                          width={"100%"}
                          
                          component={InputComponent}
                          inlineLabel
                          style={{
                            flexBasis: "80%",
                            marginTop: "0em",
                            width:"10rem",
                            height: "2em",
                            textAlign: "center",
                            backgroundColor:"#f5f3f3"
                       
                          }}
                        />
                         <div >
                        <StyledLabel>
                          {/* Days */}
                          <FormattedMessage
                            id="app.days"
                            defaultMessage="Days"
                          />
                        </StyledLabel>
                      </div>
                      </div>
                     
                      <div >
                        {/* <StyledLabel>
                          Days
                        </StyledLabel> */}
                      </div>
                    </div>
                  </div>
                    </div>
                  </div>
                  <div class="flex justify-between w-[18rem]">
                    <div>
                      <i
                        className="far fa-snowflake"
                        style={{ fontSize: "1.12em",marginRight:"2rem" }}
                      />
                    
                      <label class="font-semibold">
                        {/* Cold */}
                        <FormattedMessage
                          id="app.cold"
                          defaultMessage="Cold"
                        />
                      </label>
                    </div>
                    <div class="flex justify-between">
                      <div >
                        <Field
                          name="cold"
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
                      <div >
                        <StyledLabel>
                          {/* Days */}
                          <FormattedMessage
                            id="app.days"
                            defaultMessage="Days"
                          />
                        </StyledLabel>
                      </div>
                    </div>
                  </div>

                  <div class="flex justify-between w-[18rem]">
                  
                    <div >
                    <label class="font-semibold">Not Defined</label>
                    </div>
                    <div class="flex justify-between">
                      <div >
                        <Field
                          name="notDefined"
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
                      <div >
                        <StyledLabel>
                          <FormattedMessage
                            id="app.days"
                            defaultMessage="Days"
                          />
                        </StyledLabel>
                      </div>
                    </div>
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
                  
                </div>
              </div>
            </div>
            <Spacer />

              <>
                <div class=" flex justify-end mr-[0.62em]"
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
                </div>
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
