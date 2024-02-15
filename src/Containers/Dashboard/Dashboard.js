import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../Components/Placeholder";
import {setDashboardViewType} from "./DashboardAction";
const DashboardJumpstartAll= lazy(()=>import("../Dashboard/Child/JumpStart/DashboardJumpstartAll"));
const DashboardJumpstart= lazy(()=>import("../Dashboard/Child/JumpStart/DashboardJumpStart"));
const DashboardBulbJumpstart= lazy(()=>import("../Dashboard/Child/JumpStart/DashboardBulbJumpstart"));
const StackedClosureChart= lazy(()=>import("../Dashboard/StackedClosureChart"));
const Dashboardheader= lazy(()=>import("./Child/DashboardHeader"));
const TodoDashboardTab= lazy(()=>import("../Dashboard/TodoDashboardTab"));
const StackedClosureChartAll= lazy(()=>import("./StackedClosureChartAll"));
const TaskDashboardTab= lazy(()=>import("./TaskDashboardTab"));
const SourceChart= lazy(()=>import("./Child/Chart/SourceChart"));
const DashboardTaskOrganizationJumpstart= lazy(()=>import("./Child/JumpStart/DashboardTaskOrganizationJumpstart"));
const TaskOrganizationTab= lazy(()=>import("./TaskOrganizationTab"));
const CustomerLeadsTab= lazy(()=>import("./CustomerLeadsTab"));
const DashboardCustomerOrgJumpstart= lazy(()=>import("./Child/JumpStart/DashboardCustomerOrgJumpstart"));
const DashCustomerChartTab= lazy(()=>import("./DashCustomerChartTab"));
const DashboardInvestorsOrgJumpstart= lazy(()=>import("./Child/JumpStart/DashboardInvestorsOrgJumpstart"));
const InvestorsPitchTab= lazy(()=>import("./InvestorsPitchTab"));
const GantChartTab= lazy(()=>import("./Child/GantChartTab"));
const DashInvestorsChartTab= lazy(()=>import("./DashInvestorsChartTab"));
const FunnelTab= lazy(()=>import("./Child/FunnelTab"));
const DashboardDetailsTab= lazy(()=>import("./DashboardDetailsTab"));
const DashboardOrderJumpstart= lazy(()=>import("./Child/JumpStart/DashboardOrderJumpstart"));
const OrdersDashTab=lazy(()=>import("./OrdersDashTab"));
const DashboardFinanceJumpstart= lazy(()=>import("./Child/JumpStart/DashboardFinanceJumpstart"));
const FinanceDashTab=lazy(()=>import("./FinanceDashTab"));
class Dashboard extends Component {
  state = { visible: false,activeButton:"test" };

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
           <div class=" flex flex-col display-block" >
           {viewType==="ME"?(
             <DashboardJumpstartAll/> )
             :viewType==="bulb" ? (<DashboardBulbJumpstart/>
             )
             :viewType==="ques" ? (<DashboardDetailsTab/>
             )
             : 
               this.state.activeButton==="Tasks" ?
             (<DashboardTaskOrganizationJumpstart/>)
             : this.state.activeButton==="Investors" ?
             (<DashboardInvestorsOrgJumpstart/>)
             :viewType==="ALL" || this.state.activeButton==="Customer" ?
             (<DashboardCustomerOrgJumpstart/>)
             : this.state.activeButton==="Order" ?
             (<DashboardOrderJumpstart/>)
             : this.state.activeButton==="Finance" ?
             (<DashboardFinanceJumpstart/>)
             :
             (
              <DashboardJumpstart />
          )}
             <div class=" w-wk" >
             <div class=" flex flex-col display-block" >
       <div class=" flex justify-between" >
       {this.state.activeButton==="Tasks" ? (
       <TaskOrganizationTab/>)
       :this.state.activeButton==="Investors" ?(
        <InvestorsPitchTab/>)
        :this.state.activeButton==="Order" ?(
          <OrdersDashTab/>)
          :this.state.activeButton==="Finance" ?(
            <FinanceDashTab/>)
       : viewType==="ALL" || this.state.activeButton==="Customer" ?(
        <CustomerLeadsTab/>)
        :
       <TaskDashboardTab
      viewType={viewType}
      />
       }
      </div>
      
    </div>
    </div>
    <div class=" flex justify-between" >
                
                 {viewType==="ME"?(
                   <StackedClosureChartAll/> )
                   :this.state.activeButton==="Investors" ?
                   (<DashInvestorsChartTab/>)
                   : viewType==="ALL" || this.state.activeButton==="Customer" ? (<DashCustomerChartTab/>)
            
           
            :(
              <StackedClosureChart/>
          )}
               
            </div> 
        
    </div>
    </div>
     <div class="w-[47%] max-sm:w-wk">
     <div class=" flex flex-col display-block" >
       <div class=" flex justify-between" >
       {this.state.activeButton ==="test" && (
            <TodoDashboardTab
            viewType={viewType}
            />)}
             {viewType==="bulb" ? (<SourceChart/>)
            
             :null
            }
             {this.state.activeButton==="Tasks"&&
       <GantChartTab/>
             }

{viewType==="ALL"  &&
       <FunnelTab/>
             }
   
      </div>
      
    </div>
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


