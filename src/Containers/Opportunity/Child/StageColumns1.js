import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Draggable } from "react-beautiful-dnd";
import { BussinessCard } from "../../../Components/UI/Elements";
import OpportunityGroupCard from "../Child/OpportunityGroupCard";
import { MainWrapper, FlexContainer } from "../../../Components/UI/Layout";
import { elipsize } from "../../../Helpers/Function/Functions";
import {  StatusRecruit, lostStatusRecruit} from "../OpportunityAction";

const StageContainer = styled.div`
  padding: 0.8rem 1.5rem;
  margin: 0.2rem;
  background-color: ${(props) => (props.isDragging ? "lightgreen" : "#1890ff")}
  border: 0.06em solid ${(props) => props.theme.borderColor};
  border-radius: 0.2rem;
`;
const Stage = styled.h3`
  color: #fff;
  font-size: 1.46em;;
`;
class StageColumns1 extends Component {
  render() {
    const { opportunity, index, history } = this.props;
    return (
      <Draggable
      draggableId={opportunity.opportunityId}
      index={index}
      type="stage"
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
  
            <OpportunityGroupCard
              isDragging={snapshot.isDragging}
              opportunityId={opportunity.opportunityId}
              primaryTitle={`${elipsize(opportunity.opportunityName, 60)}`} 
              secondaryTitle={`${opportunity.proposalAmount} `}
              currencyType={opportunity.currency}
              handleClick={() =>
                history.push({
                  pathname: `opportunity/${opportunity.opportunityId}`,
                  state: { opportunityDetail: opportunity },
                })
              }
               handleWon={() => {
                this.props.StatusRecruit(opportunity.opportunityId, {
                  wonInd:true
                })
              }}
              handleConfirm ={() => {
                this.props.lostStatusRecruit(opportunity.opportunityId, {
                  lostInd: true
                })
              }}
            />
             
            </div>
            )}
                 </Draggable>
         
    );
  }
}
const mapStateToProps = ({ auth, account, opportunity }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    
         StatusRecruit,
         lostStatusRecruit,
     
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(StageColumns1); ;
