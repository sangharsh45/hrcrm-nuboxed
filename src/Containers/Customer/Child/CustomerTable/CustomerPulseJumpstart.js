import React, {} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import dayjs from "dayjs";
import { JumpStartBox,JumpStartBox1,JumpStartBox2,JumpStartBox3 } from "../../../../Components/UI/Elements";
class CustomerPulseJumpStart extends React.Component{
  constructor() {
    super();
    const startDate = dayjs().startOf("month"); 
    const endDate = dayjs();
    var today = new Date(),
    date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

  this.state = {
    date: date,
    startDate,
    endDate
  };
}


render() {
  const formattedDate = dayjs(this.props.dateOfJoining).format('YYYY-MM-DD'); // Format the date as per your requirement
  const { showDatelist, fetchingDatewiseReport } = this.props;
  console.log( this.props.taskperCount)
   const startDate = `${this.state.startDate.format("YYYY-MM-DD")}T20:00:00Z`
  //   const endDate = new Date(this.state.endDate);

  console.log(startDate)
  console.log(this.state.endDate.format("YYYY MM DD"))
  return(
    <div class=" flex flex-row w-full" >
    <div class="flex w-full" >
        
        <JumpStartBox
            noProgress
            title={
              <FormattedMessage
                id="app.opportunities"
                defaultMessage=" # Opportunities"
              />
            }
            // value={
            //   this.props.user.department === "Recruiter"
            //     ? this.props.showDatelist.openRequirement
            //     : this.props.showSalesDatelist.openRequirement
            // }
            // isLoading={
            //   this.props.user.department === "Recruiter"
            //     ? this.props.fetchingDatewiseReport
            //     : this.props.fetchingSalesDatewiseReport
            // }
          />
  
       
          <JumpStartBox1
            noProgress
            title={
              <FormattedMessage
                id="app.pipeLineValue"
                defaultMessage="Pipe line value"
              />
            }
          
            // isLoading={
            //   this.props.user.department === "Recruiter"
            //   ?this.props.fetchingDatewiseReport
            //   :this.props.fetchingSalesDatewiseReport
            // }
            //bgColor="linear-gradient(270deg, #3066BE 0%, #005075 100%);"
          />
          {/* <JumpStartBox
            noProgress
            title="Profiles Submitted"
            bgColor="linear-gradient(270.23deg, #00A843 0.19%, #1FD071 99.8%)"
            value={this.props.showDatelist.taggedProfile}
            isLoading={this.props.fetchingDatewiseReport}
          /> */}
          <JumpStartBox2
            noProgress
            // title="Open Tasks"
            title={
              <FormattedMessage
                id="app.weightedValue"
                defaultMessage="Weighted Value"
              />
            }
            //bgColor="linear-gradient(270deg, #3066BE 0%, #005075 100%);"
          
            
          />
          <JumpStartBox3
            noProgress
            title={
              <FormattedMessage
                id="app.#Contacts"
                defaultMessage="#Contacts "
              />
            }
            // title="Joining Date"
           // bgColor="linear-gradient(270deg, #3066BE 0%, #005075 100%);"
        //    value={formattedDate}
            // value={this.props.showDatelist.onboarded}
            // value={
            //   this.props.dateOfJoining

            //   // this.props.user.department === "Recruiter"
            //   // ?this.props.showDatelist.onboarded
            //   // :this.props.showSalesDatelist.onboarded
            // }
            
            // isLoading={this.props.fetchingDatewiseReport}
          
            
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
        </div>

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
      </div>
    
  ); 
}
}
const mapStateToProps = ({ dashboard,auth }) => ({
//   user: auth.userDetails,
//   role: auth.userDetails.role,
//   showDatelist:dashboard.showDatelist,
//   orgId:auth.userDetails.organizationId,
//   showSalesDatelist:dashboard.showSalesDatelist,
//   fetchingSalesDatewiseReport:dashboard.fetchingSalesDatewiseReport,
//   fetchingSalesDatewiseReportError:dashboard.fetchingSalesDatewiseReportError,
//   fetchingDatewiseReport:dashboard.fetchingDatewiseReport,
//   fetchingDatewiseReportError:dashboard.fetchingDatewiseReportError,
//   recruiterId:auth.userDetails.userId,
//   fetchingTaskper:dashboard.fetchingTaskper,
//   userId: auth.userDetails.employeeId,
//   dateOfJoining: auth.userDetails && auth.userDetails.dateOfJoining,
//   taskperCount:dashboard.taskperCount,
//   avgHour:dashboard.avgHour,
//   fetchingAvgHour:dashboard.fetchingAvgHour
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
//   getDateWiseList,
//   getSalesDateWiseList,
//   getTasklist,
//   getavgHour
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CustomerPulseJumpStart);
