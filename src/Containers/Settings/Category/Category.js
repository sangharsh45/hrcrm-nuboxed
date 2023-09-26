import React, { Component, lazy, Suspense } from "react";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { StyledTabs } from "../../../Components/UI/Antd";
import { TabsWrapper } from "../../../Components/UI/Layout";
import { MainWrapper, FlexContainer } from "../../../Components/UI/Layout";
import { connect } from "react-redux";
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import Sector from "../Sectors/Sectors";
import { FileOutlined } from "@ant-design/icons";
import Designation from "../Designation/Designation";
import Department from "../Department/Department";
import FactoryIcon from '@mui/icons-material/Factory';
import Role from "./Role/Role";
import RoleTalent from "./Role/RoleTalent";
// import IdProof from "../Id Proof/IdProof";
const TabPane = StyledTabs.TabPane;

class Category extends Component {
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
          <div style={{ width: "70%" }}>
            <TabsWrapper>
              <StyledTabs defaultActiveKey="0" onChange={this.handleTabChange}>
                <TabPane
                  tab={
                    <>
                    <FactoryIcon  />
                      <span style={{ marginLeft: "0.25em" }}>
                        Sector
                      </span>
                    </>
                  }
                  key="0"
                >
                  <Suspense>
                    <Sector />
                  </Suspense>
                </TabPane>
               <TabPane
                  tab={
                    <>
                      <i class="fas fa-building"></i>
                      <span 
                        style={{ marginLeft: "0.25em" }} >Department</span>
                    </>
                  }
                  key="4"
                >
                  <Suspense>
                    <Department />
                  </Suspense>
                </TabPane>

                <TabPane
                  tab={
                    <>
                      <AccessibilityIcon 
                      // icon={solid("user-tie")}
                       />

                      <span 
                      style={{ marginLeft: "0.25em" }}>Role (Internal)</span>
                    </>
                  }
                  key="5"
                >
                  <Suspense>
                    <Role />
                  </Suspense>
                </TabPane>
                <TabPane
                tab={
                  <>
                   <AccessibilityIcon 
                      // icon={solid("user-tie")}
                       />

                    <span style={{ marginLeft: "0.25em" }}>Role (Talent)</span>
                  </>
                }
                key="6"
              >
                <Suspense>
                  <RoleTalent />
                </Suspense>
              </TabPane>
                <TabPane
                  tab={
                    <>
                      <i class="fab fa-artstation"></i>
                      <span
                      style={{ marginLeft: "0.25em" }} >Designation</span>
                    </>
                  }
                  key="7"
                >
                  <Suspense>
                    <Designation />
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

export default connect(mapStateToProps, mapDispatchToProps)(Category);
