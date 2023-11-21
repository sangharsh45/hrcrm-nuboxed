import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import DashboardJumpstartAll from "../Dashboard/Child/JumpStart/DashboardJumpstartAll"
import DashboardJumpstart from "../Dashboard/Child/JumpStart/DashboardJumpStart";
import DashboardBulbJumpstart from "../Dashboard/Child/JumpStart/DashboardBulbJumpstart";
import StackedClosureChart from "../Dashboard/StackedClosureChart"
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../Components/Placeholder";
import Dashboardheader from "./Child/DashboardHeader";
import { FlexContainer } from "../../Components/UI/Layout";
import TodoDashboardTab from "../Dashboard/TodoDashboardTab"
import StackedClosureChartAll from "./StackedClosureChartAll";
import TaskDashboardTab from "./TaskDashboardTab";
import SourceChart from "./Child/Chart/SourceChart";
import DashboardTaskOrganizationJumpstart from "./Child/JumpStart/DashboardTaskOrganizationJumpstart";
import TaskOrganizationTab from "./TaskOrganizationTab";
import {setDashboardViewType} from "./DashboardAction";
import { version } from "cheerio";
import CustomerLeadsTab from "./CustomerLeadsTab";
import DashboardCustomerOrgJumpstart from "./Child/JumpStart/DashboardCustomerOrgJumpstart";
import DashCustomerChartTab from "./DashCustomerChartTab";
import DashboardInvestorsOrgJumpstart from "./Child/JumpStart/DashboardInvestorsOrgJumpstart";
import InvestorsPitchTab from "./InvestorsPitchTab";
import GantChartTab from "./Child/GantChartTab"
import DashInvestorsChartTab from "./DashInvestorsChartTab";
import FunnelTab from "./Child/FunnelTab";
import DashboardTable2 from "./Child/DashboardTable2";


class Dashboard extends Component {
  state = { visible: false,activeButton:null };

   handleButtonClick=(buttonName)=>{
    this.setState({activeButton:buttonName});
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  handleCallback = () => {
    this.setState({
      visible: false,
    });
  };
  render() {
    const {
      viewType,
      setDashboardViewType,
      timeZone,
      level,
      highestLevel,
      dept,
      country,
    } = this.props;

    return (
      <React.Fragment>
   

        <Dashboardheader 
        viewType={viewType}
        setDashboardViewType={setDashboardViewType}
        handleButtonClick={this.handleButtonClick}
        activeButton={this.state.activeButton}
        />
        <Suspense fallback={<BundleLoader />}>
          <div class="max-sm:h-[44rem] max-sm:overflow-x-auto">
         <div class="flex justify-between max-sm:flex-col">
           <div class="w-[53%] max-sm:w-wk">
           <FlexContainer flexDirection="column" style={{ display: "block" }}>
           {viewType==="ME"?(
             <DashboardJumpstartAll/> )
             :viewType==="bulb" ? (<DashboardBulbJumpstart/>)
             : 
               this.state.activeButton==="Tasks" ?
             (<DashboardTaskOrganizationJumpstart/>)
             : this.state.activeButton==="Investors" ?
             (<DashboardInvestorsOrgJumpstart/>)
             :viewType==="ALL" || this.state.activeButton==="Customer" ?
             (<DashboardCustomerOrgJumpstart/>)
            
             :
             (
              <DashboardJumpstart />
          )}
             <div style={{ width: "-webkit-fill-available" }}>
          <FlexContainer flexDirection="column" style={{ display: "block" }}>
       <FlexContainer justifyContent="space-between" >
       {this.state.activeButton==="Tasks" ? (
       <TaskOrganizationTab/>)
       :this.state.activeButton==="Investors" ?(
        <InvestorsPitchTab/>)
       : viewType==="ALL" || this.state.activeButton==="Customer" ?(
        <CustomerLeadsTab/>)
        :
       <TaskDashboardTab
      viewType={viewType}
      />
       }
      </FlexContainer>
      
    </FlexContainer>
    </div>
       <FlexContainer justifyContent="space-between" >
                
                 {viewType==="ME"?(
                   <StackedClosureChartAll/> )
                   :this.state.activeButton==="Investors" ?
                   (<DashInvestorsChartTab/>)
                   : viewType==="ALL" || this.state.activeButton==="Customer" ? (<DashCustomerChartTab/>)
            
           
            :(
              <StackedClosureChart/>
          )}
               
            </FlexContainer> 
        
    </FlexContainer>
    </div>
     <div class="w-[47%] max-sm:w-wk">
          <FlexContainer flexDirection="column" style={{ display: "block" }}>
       <FlexContainer justifyContent="space-between" >
       {viewType==="ME" || viewType==="test"?(
            <TodoDashboardTab
            viewType={viewType}
            />
             )
             :viewType==="bulb" ? (<SourceChart/>)
            
             :null
            }
             {this.state.activeButton==="Tasks"&&
       <GantChartTab/>
             }

{viewType==="ALL"  &&
       <FunnelTab/>
             }
   
      </FlexContainer>
      
    </FlexContainer>
    </div>
   
    </div>
    </div>
    </Suspense>
 
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ dashboard, auth }) => ({
  viewType:dashboard.viewType,

});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  setDashboardViewType
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);


