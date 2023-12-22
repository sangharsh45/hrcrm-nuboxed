import React, { useEffect, useMemo, useState,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import styled from "styled-components"; 
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { StyledTabs} from "../../../Components/UI/Antd";
import { MainWrapper, FlexContainer } from "../../../Components/UI/Layout";
import {
    getProcessForDeals,
    getProcessStagesForDeals,
} from "../../Settings/SettingsAction";
import {updateDealdragstage} from "../DealAction";
import { Spin } from "antd";
import {getAllDealsbyUserId} from "../DealAction";
const DealStageColumn =lazy(()=>import("./DealStageColumn"));

const TabPane = StyledTabs.TabPane;


const Container = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.color};
  display: flex;
  border-bottom: 0.06em solid lightgrey;
  position: absolute;

  // overflow-x: auto;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const StageColumn = styled.div`
  background-color: whitesmoke;
  color: ${(props) => props.theme.color};
  float: left;
  overflow-x: scroll;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 26rem;
  width: 250px;
  margin-top: 3.75em;
  overflow-y: auto;
  border-right: 0.06em solid #d2cfcf;
  /* background-color: ${(props) => props.theme.applicationBackground}; */
  /* color: ${(props) => props.theme.color}; */
  /* min-height: 43.12em; */
`;

const WonColumn = styled.div`
  position: fixed;
  bottom: 0;
  display: ${(props) => (props.isDraggingOver ? "flex" : "flex")};
  /* width: 43.12em; */
  height: 5em;
  /* background-color: lightgreen; */
  color: #fff;
  /* border: 0.06em solid ${(props) => props.theme.backgroundColor}; */
  transition: 0.3s all linear;
  margin-bottom:2.5em;
`;


const StageHeader = styled.div`
  background-color: rgb(214, 144, 149);
  color: white;
  font-size: 0.93em;
  width: 250px;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 0.06em solid ${(props) => props.theme.backgroundColor};
  padding: 0.5rem;
  border-bottom: 2px solid ${(props) => props.theme.borderColor};
  /* position:fixed; */
`;
const DragDropContextDiv = styled.div`
  background-color: whitesmoke;
  color: ${(props) => props.theme.color};
  font-size: 1.2em;
  height: 600px;
  width: 56.25em;
  justify-content: center;
  align-items: center;
  padding: 0.2rem;
  border-bottom: 2px solid ${(props) => props.theme.borderColor};
  /* position:fixed; */
`;

function DealsBoard(props) {
  const { userId, opportunities, process, ProcessStages, udatingOpp } = props;



  const processData = useMemo(() => {
    if (!props.dealsProcess) return null;
    let id = props.dealsProcess[0];
    return id;
  }, [props.dealsProcess]);

  useEffect(() => {
    //debugger;
    // if (!processData) return;
    props.getProcessForDeals(props.orgId);
     props.getAllDealsbyUserId(props.userId)
  }, []);

  useEffect(() => {
    //debugger;
    if (!processData) return;
    props.getProcessStagesForDeals(processData.investorOppWorkflowId);
  }, [processData]);


  const [isDragging, setIsDragging] = useState(false);
  const [currentProcess, setCurrentProcess] = useState({});



  function onDragEnd(result) {
    console.log(result);
    setIsDragging(false);
    //stop navigation is offline
    if (!navigator.onLine) {
      return;
    }
    // dropped nowhere
    if (!result.destination) {
      return;
    }

    const { draggableId, destination, source } = result;
    console.log(destination);
    console.log("drag",draggableId);
    // did not move anywhere - can bail early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const {
      updateDealdragstage,
      getOpportunityRelatedData,
      userId,
      startDate,
      endDate,
    } = props;
    let data={
        investorOppStagesId:destination.droppableId,
        invOpportunityId:result.draggableId,
    }
    updateDealdragstage(data,
      source.droppableId,
      destination.droppableId,
      draggableId,
      //handleCallback
    );
  }

  function dragStart() {
    setIsDragging(true);
  }
  function dragUpdate() {
    setIsDragging(false);
  }
//   useEffect(() => {
//     if (!userId) return;
//     props.getProcess();
//     props.getOpportunities(userId);
//     props.getAccounts(userId);
//   }, [userId]);

  function handleProcessClick(item) {
    setCurrentProcess(item);
    props.getProcessStagesForDeals(item.investorOppWorkflowId);
  }


  return (
    <FlexContainer flexWrap="nowrap">
      <MainWrapper
        style={{
          width: "100%",
          color: "#FFFAFA",
          height: "100vh",
        }}
      >
        <div style={{ display: "flex" }}>
          <StyledTabs
            // defaultActiveKey={this.state.activeKey}
            // onChange={handleTabChange}
            type="card"
          >
            {props.dealsProcess.map((item, i) => {
              return (
                <TabPane
                  key={i}
                  tab={
                    <span onClick={() => handleProcessClick(item)}>
                      {item.workflowName}
                    </span>
                  }
                ></TabPane>
              );
            })}
          </StyledTabs>
        </div>
        {/* {!props.opportunities.length ? (
          <BundleLoader />
        ) : ( */}
          
            <FlexContainer flexWrap="no-wrap" style={{ justifyContent:"center"}}>
              <DragDropContext
                 onDragEnd={onDragEnd}
                type="stage"
                 onDragStart={dragStart}
              >
                <Container style={{ marginTop: "0.75em" }}>
                  <>
                    {props.dealsProcessStages &&props.dealsProcessStages
                      
                     
                      .map((stage, index) => (
                        <Droppable
                          key={index}
                          droppableId={stage.investorOppStagesId}
                          type="stage"
                        
                        >
                          {(provided, snapshot) => (
                            <>
                            
                                <div
                                  style={{
                                    display: "flex",
                                  }}
                                >
                                  <StageHeader style={{ position: "absolute" }}>
                                    <div>{stage.stageName}</div>
                                  </StageHeader>
                                  <Spin
                                    tip="Loading..."
                                    spinning={udatingOpp ? true : false}
                                  >
                                    <StageColumn
                                      ref={provided.innerRef}
                                      isDraggingOver={snapshot.isDraggingOver}
                                      {...provided.droppableProps}
                                      droppableProps={{ hello: "world" }}
                                      className="scrollbar"
                                      id="style-3"
                                    >
                                      {props.aLLdealsList
                                        .filter(
                                          (opp, index) =>
                                            opp.invOpportunityStagesId === stage.investorOppStagesId
                                        )
                                        .map((opp, index) => {
                                          console.log("oPPr",opp)
                                          return (
                                            <DealStageColumn
                                              key={index}
                                              dealDetailsbyID={opp}
                                              index={index}
                                              history={props.history}
                                            />
                                          );
                                        })}
                                 
                                    </StageColumn>
                                  </Spin>
                                </div>
                              
                            </>
                          )}
                        </Droppable>
                      ))}
                  </>
                </Container>
              </DragDropContext>
            </FlexContainer>
          
      </MainWrapper>
    </FlexContainer>
  );
}

const mapStateToProps = ({
  opportunity,
  account,
  dashboard,
  auth,
  settings,
  deal
}) => ({
    dealsProcess: settings.dealsProcess,
    orgId: auth.userDetails && auth.userDetails.organizationId,
//   fetchingOpportunities: opportunity.fetchingOpportunities,
//   startDate: dashboard.startDate,
//   endDate: dashboard.endDate,
   userId: auth.userDetails.userId,
   aLLdealsList:deal.aLLdealsList,
  //  dealsByuserId:deal.dealsByuserId,
//   process: settings.Process,
//   tradeCurrency: auth.userDetails.tradeCurrency,
//   opportunities: opportunitySelector(opportunity, account),
//   ProcessStages: settings.ProcessStages,
//   stages: opportunity.stages,
//   fetchingProcessStages: settings.fetchingProcessStages,
//   udatingOpp: opportunity.udatingOpp,
dealsProcessStages: settings.dealsProcessStages,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getProcessForDeals,
        getProcessStagesForDeals,
        getAllDealsbyUserId,
        updateDealdragstage
    //   updateOpportunityStage,
    //   getOpportunityRelatedData,
    //   getOpportunities,
    //   getAccounts,
    //   getStages,
    //   getProcess,
    //   getProcessStages,
    //   addReson,
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DealsBoard)
);
