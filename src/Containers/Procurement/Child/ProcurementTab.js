import React, { Component, lazy, Suspense } from "react";
import { Button, Tooltip } from "antd";
import { StyledTabs } from "../../../Components/UI/Antd";
import { TabsWrapper } from "../../../Components/UI/Layout";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const ProcurementCard=lazy(()=>import("./ProcurementCard"));

const TabPane = StyledTabs.TabPane;

class ProcurementTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
    };
  }
  handleTabChange = (key) => this.setState({ activeKey: key });
  render() {
    const { activeKey } = this.state;
    return (
      <>
        <TabsWrapper>
          <StyledTabs defaultActiveKey="1" onChange={this.handleTabChange}>
            <TabPane
              tab={
                <>
                  <span>
                    
                 BOM
                  </span>
                  {/* {activeKey === "1" && (
                    <>
                      <ActionIcon
                        // type="plus"
                        tooltipTitle="Add"
                        size="1em"
                        // style={{ marginLeft: 10, verticalAlign: "center" }}
                      />
                    </>
                  )} */}
                </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <ProcurementCard />
              </Suspense>
            </TabPane>

           
          </StyledTabs>
        </TabsWrapper>
      
      </>
    );
  }
}
const mapStateToProps = ({ leave }) => ({

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProcurementTab);
