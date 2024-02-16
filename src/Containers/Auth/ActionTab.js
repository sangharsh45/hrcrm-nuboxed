import { Badge } from "antd";
import React, { Component, lazy, Suspense } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {  StyledTabs } from "../../Components/UI/Antd";
import TabsWrapper1 from "../../Components/UI/Layout/TabsWrapper1";
import IncludedDealCardList from "./ActionRequired/IncludedDealCardList";
import OppIncludedCardList from "./ActionRequired/OppIncludedCardList";
// const LeadHotTable=lazy(()=>import("./LeadHotTable"));
// const LeadColdTable=lazy(()=>import("./LeadColdTable"));
// const LeadWarmTable=lazy(()=>import("./LeadWarmTable"));

const TabPane = StyledTabs.TabPane;

class ActionTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
    };
  }

  handleTabChange = (key) => {
    this.setState({ activeKey: key });
  };
  render() {
    const { activeKey } = this.state;
    return (
      <>
        <TabsWrapper1 style={{ height:"100vh"}}>
          <StyledTabs
            defaultActiveKey="1"
            onChange={this.handleTabChange}
            forceRender={true}
          >
            <TabPane
              tab={
                <>
                 
                 
               <span class=" ml-1">
               <Badge count={this.props.oppIncludedCount.OpportunityCount} overflowCount={999}>
               <FormattedMessage
          id="app.Opportunity"
          defaultMessage="Opportunity"
        />
        </Badge>
                </span>
              

                  {activeKey === "1" && (
                    <>
                    </>
                  )}
                </>
              }
              key="1"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
           <OppIncludedCardList/>
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  
                 
               <span class=" ml-1">
               <Badge count={this.props.dealsIncludedCount.InvestorOppCount} overflowCount={999}>
               <FormattedMessage
          id="app.Deals"
          defaultMessage="Deals"
        />
          </Badge>
                </span>
              

                  {activeKey === "2" && (
                    <>
                    </>
                  )}
                </>
              }
              key="2"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
            <IncludedDealCardList/>
              </Suspense>
            </TabPane>
            <TabPane
              tab={
                <>
                  
                 
               <span class=" ml-1">
               <FormattedMessage
          id="app.Task"
          defaultMessage="Task"
        />
                </span>
              

                  {activeKey === "3" && (
                    <>
                    </>
                  )}
                </>
              }
              key="3"
            >
              <Suspense fallback={"Loading ..."}>
                {" "}
            {/* <LeadColdTable/> */}
              </Suspense>
            </TabPane>
         
          </StyledTabs>
        </TabsWrapper1>
      </>
    );
  }
}
const mapStateToProps = ({dashboard,auth}) => ({
  oppIncludedCount:auth.oppIncludedCount,
  dealsIncludedCount:auth.dealsIncludedCount,
});
const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
   
  },
   dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ActionTab);
