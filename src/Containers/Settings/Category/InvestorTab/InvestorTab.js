import React, { Component, Suspense } from "react";
import { bindActionCreators } from "redux";
import { StyledTabs } from "../../../../Components/UI/Antd";
import { TabsWrapper } from "../../../../Components/UI/Layout";
import { FlexContainer } from "../../../../Components/UI/Layout";
import { connect } from "react-redux";
import FactoryIcon from '@mui/icons-material/Factory';
import InvestorList from "./InvestorList";
const TabPane = StyledTabs.TabPane;

class InvestorTab extends Component {
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
                      <FactoryIcon />
                      <span style={{ marginLeft: "0.25em" }}>
                        Type
                      </span>
                    </>
                  }
                  key="0"
                >
                  <Suspense>
                    <InvestorList />
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
const mapStateToProps = ({ }) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(InvestorTab);
