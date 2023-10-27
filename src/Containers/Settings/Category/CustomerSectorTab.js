import React, { Component, lazy, Suspense } from "react";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../Components/UI/Antd";
import { TabsWrapper } from "../../../Components/UI/Layout";
import { MainWrapper, FlexContainer } from "../../../Components/UI/Layout";
import { connect } from "react-redux";
import SourceIcon from '@mui/icons-material/Source';
import FactoryIcon from '@mui/icons-material/Factory';
import Sectors from "../Sectors/Sectors";
import Source from "./Source/Source";

const TabPane = StyledTabs.TabPane;

class CustomerSectorTab extends Component {
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
                    <Sectors />
                  </Suspense>
                </TabPane>
                <TabPane
                  tab={
                    <>
                    <SourceIcon  />
                      <span style={{ marginLeft: "0.25em" }}>
                     Source
                      </span>
                    </>
                  }
                  key="1"
                >
                  <Suspense>
                    <Source />
                  </Suspense>
                </TabPane>
                <TabPane
                  tab={
                    <>
                    <SourceIcon  />
                      <span style={{ marginLeft: "0.25em" }}>
                     Ship By
                      </span>
                    </>
                  }
                  key="2"
                >
                  <Suspense>
                    {/* <Source /> */}
                  </Suspense>
                </TabPane>
                <TabPane
                  tab={
                    <>
                    <SourceIcon  />
                      <span style={{ marginLeft: "0.25em" }}>
                     Customer
                      </span>
                    </>
                  }
                  key="3"
                >
                  <Suspense>
                    {/* <Source /> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomerSectorTab);
