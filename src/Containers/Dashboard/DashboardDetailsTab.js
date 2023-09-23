import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button, message, Tooltip, Popover, Icon } from "antd";
import { FormattedMessage } from "react-intl";
import { StyledModal, StyledTabs } from "../../Components/UI/Antd";
import {
  FlexContainer,
  TabsWrapper,
} from "../../Components/UI/Layout";
import AddIcon from '@mui/icons-material/Add';
import { PlusOutlined } from "@ant-design/icons";
import {handleBillableCandidateModal} from "../Dashboard/DashboardAction"
import GroupsIcon from '@mui/icons-material/Groups';
import DnsIcon from '@mui/icons-material/Dns';
import DashboardAllTable2 from "../Dashboard/DashboardAllTable2"
import StackedClosureChart from "../Dashboard/StackedClosureChart"
import { ActionIcon } from "../../Components/Utils";
import { AddPopover } from "../../Components/Common";
import DashboardTable from "../Dashboard/Child/DashboardTable";
import DashboardTable2 from "../Dashboard/Child/DashboardTable2";
import DashBoardCommissionTable from "../Dashboard/Child/DashBoardCommissionTable";
import { BundleLoader } from "../../Components/Placeholder";

import { Breadcrumb, Alert } from "antd";
import StackedChart from "./StackedChart";
import AddCandidateBillableModal from "./Child/BillableCandidate/AddCandidateBillableModal";


const TabPane = StyledTabs.TabPane;
function handleRefreshPage() {
  window.location.reload();
}
class DashboardDetailsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
      contactPopover: false,
      partnerPopover: false,
      quotProPopover: false,
      deliveryProPopover: false,
      breadCumb: false,
      visibleModal: false,
      recriutmentdashboard: false,
      currentTabName: "",
      currentTabId: "",
      customField: [],
      ganttChart: false,
      costId: "",
    };
  }

  handleContactPopoverVisibleChange = () =>
    this.setState({ contactPopover: !this.state.contactPopover });
  handlepartnerPopoverVisibleChange = () =>
    this.setState({ partnerPopover: !this.state.partnerPopover });
  handleTabChange = (key) => {
    this.setState({ activeKey: key });
  };
  render() {
    const { activeKey } = this.state;
    const {
      handleBillableCandidateModal,
      billableCandidateModal
    }=this.props;
    return (
      <>
        <TabsWrapper>
          <StyledTabs
            defaultActiveKey="1"
            onChange={this.handleTabChange}
            forceRender={true}
          >

          <TabPane
              tab={
                <>
                  <DnsIcon 
                   style={{fontSize:"1.1rem"}}
                  />
                    <span class=" ml-1">Open Requirements</span>
                  
                  {activeKey === "1" && (
                    <>
                    </>
                  )}
                </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                
                {this.props.viewType==="ME"?(
                   <DashboardAllTable2/>
     
          
            ) : (
              <DashboardTable2
      />
          )}
              </Suspense>
    </TabPane>
            <TabPane
              tab={
                <>
                 
                  <GroupsIcon 
                  style={{fontSize:"1.1rem"}}
                   />
                    <span class=" ml-1">Forecast</span>
                  
                  {activeKey === "2" && (
                    <>
                     
                    </>
                  )}
                </>
              }
              key="2"
            >
              {/* <Suspense fallback={"Loading ..."}>
                {" "}
                <DashboardTable 
                />
              </Suspense> */}
            </TabPane>
           

            <TabPane
              tab={
                <>
                  <DnsIcon 
                   style={{fontSize:"1.1rem"}}
                  />
                    <span class=" ml-1">Billable Candidate</span>
                  
                  {activeKey === "3" && (
                     <>
                     <AddIcon
                      //  type="plus"
                      //  tooltipTitle=" Document"
                       onClick={() => handleBillableCandidateModal(true)}
                       size="0.875em"
                       style={{
                         marginLeft: "0.3125em",
                         verticalAlign: "center",
                       }}
                     />
                   </>
                  )}
                </>
              }
              key="3"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                
            
                   {/* <DashboardAllTable2/> */}
     
          
         
    
       
              </Suspense>
    </TabPane>
            {/* <TabPane
              tab={
                <>
                 
                 <FontAwesomeIcon icon={solid ('dollar-sign')} />
                    <span class=" ml-1">Customer</span>
                  
                  {activeKey === "2" && (
                    <>
                    
                    </>
                  )}
                </>
              }
              key="2"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <StackedChart
                />
              </Suspense>
            </TabPane> */}
              {/* <TabPane
              tab={
                <>
                 
                 
                 <FontAwesomeIcon icon={solid('bullseye')} />
                    <span class=" ml-1">Closure</span>
                  
                  {activeKey === "2" && (
                    <>
                    
                    </>
                  )}
                </>
              }
              key="2"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <StackedClosureChart
                />
              </Suspense>
            </TabPane> */}
           
            {/* <TabPane
              tab={
                <>
                 
                 <FontAwesomeIcon icon={solid ('dollar-sign')} />
                    <span class=" ml-1">Commission</span>
                  
                  {activeKey === "3" && (
                    <>
                     
                    </>
                  )}
                </>
              }
              key="3"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <DashBoardCommissionTable
                />
              </Suspense>
            </TabPane> */}

          
           
           

            
            {/* )} */}
          </StyledTabs>
        </TabsWrapper>
        <Suspense fallback={"Loading..."}>
        <AddCandidateBillableModal
            billableCandidateModal={billableCandidateModal}
            handleBillableCandidateModal={handleBillableCandidateModal}
          />
                  </Suspense>
      </>
    );
  }
}
const mapStateToProps = ({
  dashboard
}) => ({
 
  billableCandidateModal:dashboard.billableCandidateModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
 
      handleBillableCandidateModal
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardDetailsTab);
