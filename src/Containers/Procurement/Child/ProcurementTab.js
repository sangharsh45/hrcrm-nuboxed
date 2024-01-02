import React, { Component, lazy, Suspense } from "react";
import { Button, Tooltip } from "antd";
import { StyledTabs } from "../../../Components/UI/Antd";
import { TabsWrapper } from "../../../Components/UI/Layout";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const ProcurementCard=lazy(()=>import("./ProcurementCard"));
const ProcurementTCForm=lazy(()=>import("./ProcurementTCForm"));
const ProcurementIndentCard=lazy(()=>import("./ProcurementIndentCard"));
const ProcurementQuotationCard=lazy(()=>import("./ProcurementQuotationCard"));
const ProcurementPurchaseCard=lazy(()=>import("./ProcurementPurchaseCard"));

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
            <TabPane
              tab={
                <>
                  <span>
                    
                  T&C
                  </span>
                
                </>
              }
              key="2"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <ProcurementTCForm/>
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  <span>
                    
                  Indent
                  </span>
                
                </>
              }
              key="3"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <ProcurementIndentCard/>
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  <span>
                    
                  Inquiry
                  </span>
                
                </>
              }
              key="4"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
                <ProcurementQuotationCard/>
              </Suspense>
            </TabPane>

              <TabPane
              tab={
                <>
                  <span>
                    
                 Purchase Order
                  </span>
                
                </>
              }
              key="5"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
               <ProcurementPurchaseCard/>
              </Suspense>
            </TabPane>
         
                 <TabPane
              tab={
                <>
                  <span>
                    
                 CI
                  </span>
                
                </>
              }
              key="6"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
               CIk
              </Suspense>
            </TabPane>
                 <TabPane
              tab={
                <>
                  <span>
                    
               Dispatch
                  </span>
                
                </>
              }
              key="7"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
               Dispatch
              </Suspense>
            </TabPane>
                 <TabPane
              tab={
                <>
                  <span>
                    
               Stock
                  </span>
                
                </>
              }
              key="8"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
               Stock
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
