import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import {deleteDealsData} from "../DealAction";
const DealGroupCard =lazy(()=>import("./DealGroupCard"));


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
    const { dealDetailsbyID, index, history,handleDelete } = this.props;
  
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
              primaryTitle={`${dealDetailsbyID.opportunityName || ""}`}
              secondaryTitle={`${dealDetailsbyID.proposalAmount} `}
              currencyType={dealDetailsbyID.currency}
              user={this.props.user}
            //   subtitle1={opportunity.description || "-"}
            //   subtitle2={opportunity.phoneNo || "-"}
              // handlePreview={() => this.props.handleContactDrawer(opportunity, true)}
              handleClick={() =>
                history.push({
                  pathname: `dealDetails/${dealDetailsbyID.invOpportunityId}`,
                  state: { dealDetail: dealDetailsbyID },
                })
              }
              handleDelete={() => this.props.deleteDealsData(dealDetailsbyID.invOpportunityId)}
            />
            </div>
            )}
                 </Draggable>
         
    );
  }
}
const mapStateToProps = ({ auth }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    
      deleteDealsData
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(DealStageColumn);
