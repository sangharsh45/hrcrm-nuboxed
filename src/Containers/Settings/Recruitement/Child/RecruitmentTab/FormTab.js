// import React, { Component, lazy, Suspense } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { StyledTabs } from "../../../../../Components/UI/Antd";
// import { TabsWrapper } from "../../../../../Components/UI/Layout";
// import { ActionIcon } from "../../../../../Components/Utils";
// import AddTemplateModal from "./AddTemplateModal";
// import { handleTemplateModal } from "../../../../Rules/RulesAction";
// import TemplateTable from "./TemplateTable";
// import EmailandNotificationPanel from "./EmailandNotificationPanel";
// import NotificationTable from "./NotificationTable";
// import { Button, Icon } from "antd";

// const TabPane = StyledTabs.TabPane;

// function TemplateTab(props) {
//   console.log(props.current);
//   return (
//     <>
//       {props.current === "Email" && (
//         <>
//           <TabsWrapper>
//             <StyledTabs defaultActiveKey="1">
//               <TabPane
//                 tab={
//                   <>
//                     {/* <span>Create</span>
//                     &nbsp;&nbsp; */}
//                     <>
//                       {/* <ActionIcon
//                         type="plus"
//                         tooltipTitle="Create"
//                         handleIconClick={() => {
//                           props.handleTemplateModal(true);
//                         }}
//                         size="0.875em"
//                         style={{ verticalAlign: "center" }}
//                       /> */}
//                       <Button
//                         type="primary"
//                         onClick={() => props.handleTemplateModal(true)}
//                         style={{ width: "83%" }}
//                       >
//                         <Icon type="plus" />
//                       </Button>
//                     </>
//                   </>
//                 }
//                 key="1"
//               >
//                 <Suspense fallback={"Loading ..."}>
//                   {" "}
//                   {/* <EmailandNotificationPanel /> */}
//                   <TemplateTable />
//                 </Suspense>
//               </TabPane>
//             </StyledTabs>
//           </TabsWrapper>
//         </>
//       )}

//       {props.current === "Notification" && (
//         <>
//           <TabsWrapper>
//             <StyledTabs defaultActiveKey="1">
//               <TabPane
//                 tab={
//                   <>
//                     {/* <span>Create</span>
//                     &nbsp;&nbsp; */}
//                     <Button
//                       type="primary"
//                       onClick={() => props.handleTemplateModal(true)}
//                       style={{ width: "83%" }}
//                     >
//                       <Icon type="plus" />
//                     </Button>
//                     <>
//                       {/* <ActionIcon
//                         type="plus"
//                         tooltipTitle="Create"
//                         handleIconClick={() => {
//                           props.handleTemplateModal(true);
//                         }}
//                         size="0.875em"
//                         style={{ verticalAlign: "center" }}
//                       /> */}
//                     </>
//                   </>
//                 }
//                 key="1"
//               >
//                 <Suspense fallback={"Loading ..."}>
//                   {" "}
//                   {/* <EmailandNotificationPanel /> */}
//                   <NotificationTable />
//                 </Suspense>
//               </TabPane>
//             </StyledTabs>
//           </TabsWrapper>
//         </>
//       )}

//       <AddTemplateModal
//         handleTemplateModal={props.handleTemplateModal}
//         addTemplateModal={props.addTemplateModal}
//         current={props.current}
//       />
//     </>
//   );
// }

// const mapStateToProps = ({ rule }) => ({
//   addTemplateModal: rule.addTemplateModal,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators({ handleTemplateModal }, dispatch);

// export default connect(mapStateToProps, mapDispatchToProps)(TemplateTab);


import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import {
  EyeInvisibleOutlined, PlusOutlined,
 
  
} from '@ant-design/icons';
import CustomerConfigureForm from "./CustomerConfigureForm"
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../../Components/UI/Layout";
import { ActionIcon } from "../../../../../Components/Utils";

import { Button, Icon,Tooltip } from "antd";
import MessageIcon from '@mui/icons-material/Message';
import DraftsIcon from '@mui/icons-material/Drafts';

const TabPane = StyledTabs.TabPane;

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
      // contactPopover: false,
      // partnerPopover: false,
      // quotProPopover: false,
      // deliveryProPopover: false,
      // breadCumb: false,
      // visibleModal: false,
      // recriutmentdashboard: false,
      // currentTabName: "",
      // currentTabId: "",
      // customField: [],
      // ganttChart: false,
      // costId: "",
    };
  }
  handleTabChange = (key) => {
    this.setState({ activeKey: key });
    // if (key === "1") {
    //   this.props.getQuotation(this.props.opportunity.opportunityId);
    // }
  };

  render() {
    const { activeKey } = this.state;

    return(
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
                  <span onClick={this.handleRecruitClick}>
                  {/* <DraftsIcon  /> */}
                    <span style={{ marginLeft: '0.25em' }}>Customer</span>
                  </span>
                  {}
                 
                </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                  {" "}
                  {/* <EmailandNotificationPanel /> */}
                  {/* <TemplateTable /> */}
                  <CustomerConfigureForm/>
               </Suspense>             
            </TabPane>
            {/* <TabPane
              tab={
                <>
                  <span onClick={this.handleRecruitClick}>
                  <MessageIcon />
                    <span style={{ marginLeft: '0.25em' }}>Notification</span>
                  </span>
                  {activeKey === "2" && (
                    <>
                      <>                     
                        <Tooltip title="Create">
                       
                          <PlusOutlined
                            type="plus"
                            tooltipTitle="Create"
                            onClick={() =>
                              this.props.handleTemplateNotificatonModal(true)
                            }
                            size="0.875em"
                            style={{
                              marginLeft: "0.125em",
                              verticalAlign: "center",
                            }}
                          />                       
                          </Tooltip>
                       </>
                    </>
                  )}
                </>
              }
              key="2"
            >
              <Suspense fallback={"Loading ..."}>
                  {" "}
                 
                  <NotificationTable />
               </Suspense>
             
            </TabPane> */}
            {/* <TabPane
              tab={
                <>
                  <span onClick={this.handleRecruitClick}>
            
                    <span style={{ marginLeft: '0.25em' }}>Action</span>
                  </span>
                  {activeKey === "3" && (
                    <>
                      <>                     
                        <Tooltip title="Create">
                       
                       
                          </Tooltip>
                       </>
                    </>
                  )}
                </>
              }
              key="3"
            >
              <Suspense fallback={"Loading ..."}>
                  {" "}
              
                  <ActionTable />
               </Suspense>
             
            </TabPane> */}
            {/* )} */}
          </StyledTabs>
        </TabsWrapper>
       
  
      </>
    
    )

  }
}

const mapStateToProps = ({ rule }) => ({
//   addTemplateModal: rule.addTemplateModal,
//   addTemplateNotificatonModal:rule.addTemplateNotificatonModal
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ 

 }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Form);
