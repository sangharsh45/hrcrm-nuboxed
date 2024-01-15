import React, { Component, Suspense } from "react";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../Components/UI/Antd";
import { TabsWrapper } from "../../../Components/UI/Layout";
import { connect } from "react-redux";
import LanguageIcon from '@mui/icons-material/Language';
import ReceiptIcon from '@mui/icons-material/Receipt';
import RememberMeIcon from '@mui/icons-material/RememberMe';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import Documents from "../Documents/Documents"
import Education from "../Educations/Education"
import Expense from "../Expense/Expense";
import IdProofs from "../Id Proof/IdProofs";
import Country from "./Country/Country";
const TabPane = StyledTabs.TabPane;

class OthersTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
      value: 1,
    };
  }
  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };
  handleTabChange = (key) => this.setState({ activeKey: key });
  render() {
    return (
      <>
  <div class="flex flex-nowrap" >
        <div class=" w-full">
          <TabsWrapper>
            <StyledTabs defaultActiveKey="0" onChange={this.handleTabChange}>
             
              <TabPane
                tab={
                  <>
                  <InsertDriveFileIcon/>
                    <span class=" ml-[0.25em]">Documents</span>
                  </>
                }
                key="1"
              >
                <Suspense>
                  
                  <Documents/>
                </Suspense>
              </TabPane>
              <TabPane
                tab={
                  <>
                    <RememberMeIcon 
                    // icon={solid('id-card-clip')}
                     />
                    <span class=" ml-[0.25em]" >Identity</span>
                  </>
                }
                key="2"
              >
                <Suspense>
                  <IdProofs/>
                </Suspense>
              </TabPane>
              <TabPane
                tab={
                  <>
                    <i class="fa fa-graduation-cap"></i>
                    <span class=" ml-[0.25em]">Education</span>
                  </>
                }
                key="3"
              >
                <Suspense>
                  <Education />
                </Suspense>
              </TabPane>

              <TabPane
                tab={
                  <>  
                  <ReceiptIcon  />
                    <span class=" ml-[0.25em]" >
                    Expense
                     </span>
                  </>
                }
                key="4"
              >
                <Suspense>
                  <Expense />
                </Suspense>
              </TabPane>
              <TabPane
                tab={
                  <>
                 <LanguageIcon/>
                    <span class=" ml-[0.25em]">Country</span>
                  </>
                }
                key="5"
              >
                <Suspense>
                  <Country />
                </Suspense>
              </TabPane>
            </StyledTabs>
          </TabsWrapper>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OthersTab);




