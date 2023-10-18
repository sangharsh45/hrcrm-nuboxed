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
    const { dealDetailsbyID, index, history } = this.props;
  
    return (
      <Draggable
      draggableId={dealDetailsbyID.invOpportunityId}
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
              primaryTitle={`${dealDetailsbyID.opportunityName || ""}`}
              secondaryTitle={`${dealDetailsbyID.proposalAmount} `}
              currencyType={dealDetailsbyID.currency}
            //   subtitle1={opportunity.description || "-"}
            //   subtitle2={opportunity.phoneNo || "-"}
              // handlePreview={() => this.props.handleContactDrawer(opportunity, true)}
              handleClick={() =>
                history.push({
                  pathname: `dealDetails/${dealDetailsbyID.invOpportunityId}`,
                  state: { dealDetail: dealDetailsbyID },
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
