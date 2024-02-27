import React, { lazy,Suspense } from "react";
import { BundleLoader } from "../../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";
import { FormattedMessage } from "react-intl";
import { Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { handleCETactivityContactModal} from "../../ContactAction";
const ContactCETdr =lazy(()=>import("./ContactCETdr"));
const ContactCETcard =lazy(()=>import("./ContactCETcard"));

const TabPane = StyledTabs.TabPane;

function ContactCETdrawer (props) {

    return (
      <div>
        <StyledDrawer
          title={props.currentContact.fullName}
          width="60%"
          visible={props.contactCETdrawer}
          closable
          placement="right"
          destroyOnClose
          onClose={() => props.handleContactCETdrawer(false)}
        >
          <Suspense fallback={<BundleLoader />}>
          <ContactCETTab/>
          </Suspense>
        </StyledDrawer>
      </div>
    );

    function ContactCETTab () {
        const { clickCETcontactActivity, handleCETactivityContactModal } = props;
          const { ...formProps } = props;

          return (
            <>
              <TabsWrapper>
                <StyledTabs
                  defaultActiveKey="1"
                  style={{ overflow: "visible", width: "53vw", padding: "15px" }}
                  animated={false}
                >
                  <TabPane
                    tab={
                      <>
                        <span>
                          
                             <i class="fas fa-phone-square"></i>&nbsp;
                        Activity
                        </span>
                      
                          <>
                            <Tooltip 
                              title={
                                <FormattedMessage
                                  id="app.create"
                                  defaultMessage="Create"
                                />
                              }
                            >
                             &nbsp;
                              <PlusOutlined
                                type="plus"
                                style={{color:"blue"}}
                                tooltiptitle={
                                  <FormattedMessage
                                    id="app.Create"
                                    defaultMessage="Create"
                                  />
                                }
                                onClick={() => {
                                    handleCETactivityContactModal(true);
                                }}
                                size="0.875em"
                              />
                             
                            </Tooltip>
                          </>
                       
                      </>
                    }
                    key="1"
                  >
                    <Suspense fallback={"Loading ..."}>
                      {" "}
                      <ContactCETcard
                        // rowdata={props.rowdata}
                      />
                    </Suspense>
                  </TabPane>
                
                </StyledTabs>
              </TabsWrapper>
              <Suspense fallback={<BundleLoader/>}>
              <ContactCETdr
              rowdata={props.rowdata}
                clickCETcontactActivity={clickCETcontactActivity}
                handleCETactivityContactModal={handleCETactivityContactModal}
              />
              </Suspense>
            </>
          );
      }
};
const mapStateToProps = ({ contact }) => ({
    clickCETcontactActivity:contact.clickCETcontactActivity
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    handleCETactivityContactModal
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactCETdrawer);
