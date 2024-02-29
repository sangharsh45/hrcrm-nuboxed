import React, {} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import dayjs from "dayjs";
// import {getProspectWeightedValue,getProspectOppValue,getProspectPipeLineValue,getProspectContactValue} from "../../CustomerAction"
import { JumpStartBox,JumpStartBox1,JumpStartBox2,JumpStartBox3 } from "../../../../Components/UI/Elements";
class InvestorPulseJumpStart extends React.Component{
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
// componentDidMount() {
//   // const startDate = `${this.state.startDate.format("YYYY-MM-DD")}T20:00:00Z`
//   // const endDate = `${this.state.endDate.format("YYYY-MM-DD")}T20:00:00Z`
//   this.props.getProspectWeightedValue(this.props.customer.customerId)
//     this.props.getProspectOppValue(this.props.customer.customerId);    
//     this.props.getProspectContactValue(this.props.customer.customerId);
//     this.props.getProspectPipeLineValue(this.props.customer.customerId);
//   // console.log(`Start Date: ${this.state.startDate.format("ll")}`);
//   // console.log(`End Date: ${this.state.endDate.format("ll")}`);
// }

render() {
  const weightedValue = `${this.props.WeightedValue.weightedValue} ${this.props.WeightedValue.tradeCurrency}`;
  const pipeLineValue = `${this.props.pipelineValue.pipeLineValue} ${this.props.pipelineValue.tradeCurrency}`;
  const OpportunityValue = `${this.props.OppValue.pipeLineValue} ${this.props.WeightedValue.tradeCurrency}`
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
            value={
              this.props.OppValue.CustomerOppertunityDetails

            }
            isLoading={this.props.fetchingOppValue} 
            //bgColor="linear-gradient(270deg, #3066BE 0%, #005075 100%);"
          
          />
  
       
          <JumpStartBox1
            noProgress
            title={
              <FormattedMessage
                id="app.pipeLineValue"
                defaultMessage="Pipe line value"
              />
            }
          
            value={
              pipeLineValue

            }
            isLoading={this.props.fetchingPipelineValue} 
            //bgColor="linear-gradient(270deg, #3066BE 0%, #005075 100%);"
          
          />

          <JumpStartBox2
            noProgress
            // title="Open Tasks"
            title={
              <FormattedMessage
                id="app.weightedValue"
                defaultMessage="Weighted Value"
              />
            }
            value={
              weightedValue

            }
            isLoading={this.props.fetchingWeightedValue} 
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

            value={
              this.props.contactValue.CustomerContactDetails

            }
            isLoading={this.props.fetchingContactValue} 
            //bgColor="linear-gradient(270deg, #3066BE 0%, #005075 100%);"
          
            
          />
           

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
const mapStateToProps = ({ customer,auth }) => ({
  contactValue:customer.contactValue,
  fetchingContactValue:customer.fetchingContactValue,
  pipelineValue:customer.pipelineValue,
  fetchingPipelineValue:customer.fetchingPipelineValue,
  OppValue:customer.OppValue,
  fetchingOppValue:customer.fetchingOppValue,
  WeightedValue:customer.WeightedValue,
  fetchingWeightedValue:customer.fetchingWeightedValue
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
//   getProspectWeightedValue,
//   getProspectOppValue,
//   getProspectPipeLineValue,
//   getProspectContactValue
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(InvestorPulseJumpStart);
