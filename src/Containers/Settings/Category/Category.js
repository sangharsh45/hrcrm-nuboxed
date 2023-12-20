import React, { Component,  Suspense } from "react";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../Components/UI/Antd";
import { TabsWrapper } from "../../../Components/UI/Layout";
import { connect } from "react-redux";
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import Designation from "../Designation/Designation";
import Department from "../Department/Department";
import Role from "./Role/Role";
import RoleTalent from "./Role/RoleTalent";
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
        <div flexWrap="nowrap">
          <div class=" w-full">
            <TabsWrapper>
              <StyledTabs defaultActiveKey="0" onChange={this.handleTabChange}>
                {/* <TabPane
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
                </TabPane> */}
                <TabPane
                  tab={
                    <>
                      <i class="fas fa-building"></i>
                      <span class=" ml-[0.25em]"
                       >Department</span>
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

                      <span class=" ml-[0.25em]"
                       >Role (Internal)</span>
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

                      <span class=" ml-[0.25em]">Role (External)</span>
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
                       class=" ml-[0.25em]" >Designation</span>
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
        </div>
      </>
    );
  }
}
const mapStateToProps = ({ }) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Category);
