import React, { Component, lazy, Suspense } from "react";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { StyledTabs } from "../../../Components/UI/Antd";
import { TabsWrapper } from "../../../Components/UI/Layout";
import { MainWrapper, FlexContainer } from "../../../Components/UI/Layout";
import { connect } from "react-redux";
import { Menu, Icon, Popover } from "antd";
import ReceiptIcon from '@mui/icons-material/Receipt';
import RememberMeIcon from '@mui/icons-material/RememberMe';
import {
  DatabaseOutlined,
  EyeInvisibleOutlined,
  
} from '@ant-design/icons';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import Documents from "../Documents/Documents"
import Education from "../Educations/Education"
import Expense from "../Expense/Expense";
import IdProofs from "../Id Proof/IdProofs";
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
        <FlexContainer flexWrap="nowrap">
        <div style= {{width:"46%"}}>
          <TabsWrapper>
            <StyledTabs defaultActiveKey="0" onChange={this.handleTabChange}>
             
              <TabPane
                tab={
                  <>
                  <InsertDriveFileIcon/>
                    <span style={{ marginLeft: "0.25em" }}>Documents</span>
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
                    <span style={{ marginLeft: "0.25em" }}>Identity</span>
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
                    <span style={{ marginLeft: "0.25em" }}>Education</span>
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
                    <span style={{ marginLeft: "0.25em" }} >
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
            </StyledTabs>
          </TabsWrapper>
          </div>
        </FlexContainer>
      </>
    );
  }
}
const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OthersTab);




