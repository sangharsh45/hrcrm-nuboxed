import React, { Component } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { MainWrapper, FlexContainer } from "../../../Components/UI/Layout";
import DealGroupCard from "./DealGroupCard";
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
class DealStageColumn extends Component {
  render() {
    const { opportunity, index, history } = this.props;
    console.log(opportunity);
    // let opportunityValue;
    // if (tradeCurrency) {
    //     if (tradeCurrency === 'USD') {
    //         opportunityValue = USD
    //     }
    //     else if (tradeCurrency === 'INR') {
    //         opportunityValue = INR
    //     }
    //     else if (tradeCurrency === 'GBP') {
    //         opportunityValue = GBP
    //     }
    //     else {
    //         opportunityValue = EUR
    //     }
    // } else {
    //     opportunityValue = EUR
    // }
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
  
            <DealGroupCard
              isDragging={snapshot.isDragging}
              // imageURL={
              //   opportunity.metaData &&
              //   opportunity.metaData.account &&
              //   opportunity.metaData.account.imageURL
              // }
              // imageId={
              //   opportunity.metaData &&
              //   opportunity.metaData.account &&
              //   opportunity.metaData.account.imageId
              // }
              primaryTitle={`${opportunity.opportunityName || ""}`}
              secondaryTitle={`${opportunity.proposalAmount} `}
              currencyType={opportunity.currency}
            //   subtitle1={opportunity.description || "-"}
            //   subtitle2={opportunity.phoneNo || "-"}
              // handlePreview={() => this.props.handleContactDrawer(opportunity, true)}
              handleClick={() =>
                history.push({
                  pathname: `opportunity/${opportunity.opportunityId}`,
                  state: { opportunityDetail: opportunity },
                })
              }
            />
            </div>
            )}
                 </Draggable>
         
    );
  }
}
export default DealStageColumn;
