import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { PlusOutlined } from "@ant-design/icons";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ContactsIcon from '@mui/icons-material/Contacts';
import Organization from "../../Organization";
import {getOrganizationList} from "../../../Auth/AuthAction"
import { FormattedMessage } from "react-intl";

const TabPane = StyledTabs.TabPane;
// function handleRefreshPage() {
//   window.location.reload();
// }
class OrganizationHeaderTab extends Component {
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
      file: false,
    };
  }


  handleRecruitClick = () => {
    this.setState({ file: true });
  };

  componentDidMount() {
  this.props.getOrganizationList();
  }

  componentWillUnmount() {
    this.setState({ breadCumb: false });
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

    return (
      <>
        {/* <TabsWrapper style={{display:"flex",flexDirection:"row"}}> */}
          <StyledTabs defaultActiveKey="1" onChange={this.handleTabChange}>
            {this.props.organizationDetailsList.map((item,index)=>{
return (
  <TabPane
              tab={
                <>
                  <span>
                    <LightbulbIcon  style={{fontSize:"1.1rem"}}/>
                    <span class=" ml-1">
                      {item.organizationName}
                      {/* <FormattedMessage
                        id="app.Infosys"
                        defaultMessage="Infosys"
                      /> */}
                    </span>
                  </span>
             
                </>
              }
              key={index}
            >
           
            </TabPane>
)
            })}
          
        
         

            {/* <TabPane
              tab={
                <>
                  <MonetizationOnIcon 
                 style={{fontSize:"1.1rem"}}
                  />
                  <span class=" ml-1">Commercials</span>
                </>
              }
              key="9"
            >
              <CommercialsForm />
            </TabPane> */}

       
           
           
          </StyledTabs>
        {/* </TabsWrapper> */}
  
      </>
    );
  }
}
const mapStateToProps = ({ auth, customer, contact, opportunity }) => ({
  organizationDetailsList:auth.organizationDetailsList,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getOrganizationList
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationHeaderTab);
