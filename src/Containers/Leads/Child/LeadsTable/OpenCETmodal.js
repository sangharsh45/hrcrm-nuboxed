import React, { lazy, Suspense } from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";
import { handleLeadCallModal } from "../../LeadsAction";
import { PlusOutlined } from "@ant-design/icons";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import LeadsOpportunity from "../LeadsDetailTab/OpportunityTab/LeadsOpportunity";
import AddCallTaskModal from "./AddCallTaskModal";
import { FormattedMessage } from "react-intl";
import { Tooltip } from "antd";
import CallLeadsTable from "./CallLeadsTable";
import LeadsActivityTab from "./LeadsActivityTab";
const CallForm = lazy(() =>
  import("../../../Call/Child/CallForm")
);
const EventForm = lazy(() =>
  import("../../../Event/Child/EventForm")
);
const TaskForm = lazy(() =>
  import("../../../Task/Child/TaskForm")
);

const TabPane = StyledTabs.TabPane;

function  OpenCETmodal(props)  {

  return (
    <>
      <StyledDrawer
        title={props.rowdata.name}
        width="60%"
        style={{marginTop:"5rem"}}
        visible={props.openCETmodal}
        destroyOnClose
        closable
        placement="right"
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        onClose={() => {
          props.handleCETmodal(false);
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
                <CallLeadsTable
                  rowdata={props.rowdata}
                />
                {/* <LeadsActivityTab 
                 rowdata={props.rowdata}
                /> */}
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
export default connect(mapStateToProps, mapDispatchToProps)(OpenCETmodal);


