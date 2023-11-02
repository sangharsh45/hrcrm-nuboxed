import React, { lazy, Suspense } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../Components/Placeholder";
import { StyledTabs } from "../../../Components/UI/Antd";
import { TabsWrapper } from "../../../Components/UI/Layout";
import { handleLeadCallModal } from "../../Leads/LeadsAction";
import { PlusOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import { Tooltip } from "antd";
import { StyledDrawer } from "../../../Components/UI/Antd";
import AddCallTaskModal from "../../Leads/Child/LeadsTable/AddCallTaskModal";
import EventForm from "../../Event/Child/EventForm";
import TaskForm from "../../Task/Child/TaskForm";
import CallLeadsTable from "../../Leads/Child/LeadsTable/CallLeadsTable";
import PitchTimeline from "./PitchTimeline";


const TabPane = StyledTabs.TabPane;

function  OpenASSimodal(props)  {

  return (
    <>
      <StyledDrawer
        title={"All"}
        width="60%"
        style={{marginTop:"5rem"}}
        visible={props.openASSImodal}
        destroyOnClose
        closable
        placement="right"
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onClose={() => {
          props.handleAssimodal(false);
        }}
      >
        <Suspense fallback={<BundleLoader />}>
          <LeadsCETTab/>
        </Suspense>
      </StyledDrawer>
    </>
  );

 function LeadsCETTab () {
  const { addCallTaskModal, handleLeadCallModal } = props;
    const { ...formProps } = props;
    console.log(props.rowdata)
    return (
      <>
        <TabsWrapper>
          <StyledTabs
            defaultActiveKey="1"
            style={{ overflow: "visible", width: "53vw", padding: "15px" }}
            animated={false}
          >
            {/* <TabPane
              tab={
                <span>
                 <i class="fas fa-phone-square"></i>&nbsp;
                  Calls
                </span>
              }
              key="1"
            >
              <Suspense fallback={"loading ..."}>
                <CallForm {...formProps} />
              </Suspense>
            </TabPane> */}
            <TabPane
              tab={
                <>
                  <span>
                    
                       <i class="fas fa-phone-square"></i>&nbsp;
                  Calls
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
                       
                        <PlusOutlined
                          type="plus"
                          
                          tooltiptitle={
                            <FormattedMessage
                              id="app.Create"
                              defaultMessage="Create"
                            />
                          }
                          onClick={() => {
                            handleLeadCallModal(true);
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
                <PitchTimeline
                 rowdata={props.rowdata}
                />
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <span>
                  <i class="fas fa-tasks"></i>&nbsp;
                  Events
                </span>
              }
              key="2"
            >
              <Suspense fallback={"loading ..."}>
                <EventForm {...formProps}/>
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <span>
                  <i class="far fa-calendar-check"></i>&nbsp;
                  Tasks
                </span>
              }
              key="3"
            >
              <Suspense fallback={"loading ..."}>
                <TaskForm {...formProps}/>
              </Suspense>
            </TabPane>
          </StyledTabs>
        </TabsWrapper>
        <AddCallTaskModal
        rowdata={props.rowdata}
          addCallTaskModal={addCallTaskModal}
          handleLeadCallModal={handleLeadCallModal}
        />
      </>
    );
}

};

const mapStateToProps = ({ leads }) => ({
  addCallTaskModal: leads.addCallTaskModal,

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleLeadCallModal
     
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(OpenASSimodal);


