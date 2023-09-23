import React, {useEffect} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { JumpStartBox, Spacer } from "../../../../Components/UI/Elements";
import { FlexContainer } from "../../../../Components/UI/Layout";
 import {getAllSalesDateWiseList,
  // getAllDateWiseList
} from "../../DashboardAction";

class DashboardJumpstartAll extends React.Component{
  constructor() {
    super();
    var today = new Date(),
    date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

  this.state = {
    date: date,
  };
}
componentDidMount() {
  //  if(this.props.role==="USER"&&this.props.user.department==="Recruiter"){
  // const { getAllDateWiseList, recruiterId, startDate, endDate } = this.props;
  // getAllDateWiseList(recruiterId,  startDate, endDate);
  //  }else{
    const { getAllSalesDateWiseList, userId, department,startDate, endDate } = this.props;
    getAllSalesDateWiseList(userId,  startDate, endDate,department);
   }
//  }
componentWillReceiveProps(nextProps) {
  if (
    this.props.startDate !== nextProps.startDate ||
    this.props.endDate !== nextProps.endDate
  ) {
    //     if(this.props.role==="USER"&&this.props.user.department==="Recruiter"){
    // const { getAllDateWiseList, recruiterId, startDate, endDate } = nextProps;
    // getAllDateWiseList(recruiterId, startDate, endDate);
    //     }else{
          const { getAllSalesDateWiseList, userId, department,startDate, endDate } = nextProps;
          getAllSalesDateWiseList(userId, startDate, endDate,department);
        }
  // }
}

//   useEffect(() => { 
//    props.getDateWiseList(props.recruiterId,props.startDate, props.endDate);
// }, [props.startDate, props.endDate, props.type]);
  
render() {
  const { showDatelist, fetchingDatewiseReport } = this.props;
  return(
      <FlexContainer flexDirection="row" style={{ width: "100%"}}>
        <FlexContainer style={{ width: "100%"}}>
        
          <JumpStartBox
            noProgress
            title="Requirements"
            // bgColor="#da5432"
            //bgColor="linear-gradient(270deg, #3066BE 0%, #005075 100%);"
            value={
              // this.props.user.department === "Recruiter"
              // ?this.props.showDatelist.openRequirement
              this.props.showAllSalesDatelist.openRequirement
            }
            isLoading={
              // this.props.user.department === "Recruiter"
              // ?this.props.fetchingDatewiseReport
              this.props.fetchingAllSalesDatewiseReport
            }
          />
       
          <JumpStartBox
            noProgress
            title="Positions "
            value={
              // this.props.user.department === "Recruiter"
              // ?this.props.showDatelist.openPosition
              // :this.props.showSalesDatelist.openPosition
              this.props.showAllSalesDatelist.openPosition
            }
            isLoading={
              // this.props.user.department === "Recruiter"
              // ?this.props.fetchingDatewiseReport
              this.props.fetchingAllSalesDatewiseReport
            }
            //bgColor="linear-gradient(270deg, #3066BE 0%, #005075 100%);"
          />
          {/* <JumpStartBox
            noProgress
            title="Profiles Submitted"
            bgColor="linear-gradient(270.23deg, #00A843 0.19%, #1FD071 99.8%)"
            value={this.props.showDatelist.taggedProfile}
            isLoading={this.props.fetchingDatewiseReport}
          /> */}
          <JumpStartBox
            noProgress
            title="Selected"
            //bgColor="linear-gradient(270deg, #3066BE 0%, #005075 100%);"
            // value={this.props.showDatelist.selectted}
            value={
              // this.props.user.department === "Recruiter"
              // ?this.props.showDatelist.selectted
              // :this.props.showSalesDatelist.selectted
              this.props.showAllSalesDatelist.selectted
            }
            // isLoading={this.props.fetchingDatewiseReport}
            isLoading={
              this.props.fetchingAllSalesDatewiseReport
              // this.props.user.department === "Recruiter"
              // ?this.props.fetchingDatewiseReport
              // :this.props.fetchingSalesDatewiseReport
            }
            
          />
          <JumpStartBox
            noProgress
            title="On Boarded"
           // bgColor="linear-gradient(270deg, #3066BE 0%, #005075 100%);"
            
             value={this.props.showAllSalesDatelist.onboarded}
            // value={
            //   this.props.user.department === "Recruiter"
            //   ?this.props.showDatelist.onboarded
            //   :this.props.showSalesDatelist.onboarded
            // }
            
            isLoading={this.props.fetchingAllSalesDatewiseReport}
            // isLoading={
            //   this.props.user.department === "Recruiter"
            //   ?this.props.fetchingDatewiseReport
            //   :this.props.fetchingSalesDatewiseReport
            // }
            
          />
           
           {/* <JumpStartBox
            noProgress
            title="DashBoard6"
            bgColor="linear-gradient(269.97deg, #FFFFFF 0.02%, #000000 0.03%)"
          /> */}
          {/* <JumpStartBox
                    // jumpstartClick={
                    //   subscriptionType === "PROFESSIONALPLUS"
                    //     ? () => this.props.handleLifetimeModal(true)
                    //     : null
                    // }
                    // cursorData={
                    //   subscriptionType === "PROFESSIONALPLUS" ? "pointer" : "default"
                    // }
                    noProgress
                    currencyType={currencyType}
                    title="Won"
                    bgColor="#4cc9f0"
                />
                <JumpStartBox
                    // jumpstartClick={
                    //   subscriptionType === "PROFESSIONALPLUS"
                    //     ? () => this.props.handleLifetimeModal(true)
                    //     : null
                    // }
                    // cursorData={
                    //   subscriptionType === "PROFESSIONALPLUS" ? "pointer" : "default"
                    // }
                    noProgress
                    currencyType={currencyType}
                    title="Customers Added"
                    bgColor="#92defe"
                /> */}
        </FlexContainer>
        <Spacer />
        {/* <FlexContainer>
          <JumpStartBox noProgress title="All Products" bgColor="#8791a1" />
          <JumpStartBox noProgress title="Quantity On Hand" bgColor="#8791a1" />
          <JumpStartBox
            noProgress
            title="Out of Stock Products"
            bgColor="#8791a1"
          />
          <JumpStartBox noProgress title="Total Visitors" bgColor="#8791a1" />
        </FlexContainer> */}
      </FlexContainer>
    
  ); 
}
}
const mapStateToProps = ({ dashboard,auth }) => ({
  userId:auth.userDetails.userId,
  user: auth.userDetails,
   role: auth.userDetails.role,
   department:auth.userDetails.department,
//   showDatelist:dashboard.showDatelist,
//   orgId:auth.userDetails.organizationId,
fetchingAllSalesDatewiseReportError:dashboard.fetchingAllSalesDatewiseReportError,
fetchingAllSalesDatewiseReport:dashboard.fetchingAllSalesDatewiseReport,
showAllSalesDatelist:dashboard.showAllSalesDatelist,
//   showSalesDatelist:dashboard.showSalesDatelist,
//   fetchingSalesDatewiseReport:dashboard.fetchingSalesDatewiseReport,
//   fetchingSalesDatewiseReportError:dashboard.fetchingSalesDatewiseReportError,
//   fetchingDatewiseReport:dashboard.fetchingDatewiseReport,
//   fetchingDatewiseReportError:dashboard.fetchingDatewiseReportError,
//   recruiterId:auth.userDetails.userId,
showAllDatelist:dashboard.showAllDatelist,
fetchingAllDatewiseReport:dashboard.fetchingAllDatewiseReport,

   endDate: dashboard.endDate,
   startDate: dashboard.startDate,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
//   getDateWiseList,
// getAllDateWiseList,
getAllSalesDateWiseList,
//getAllDateWiseList
//   getSalesDateWiseList
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DashboardJumpstartAll);
