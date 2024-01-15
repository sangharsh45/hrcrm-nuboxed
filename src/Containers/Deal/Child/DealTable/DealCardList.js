import React, { useEffect, useState ,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import InfiniteScroll from "react-infinite-scroll-component";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import {  DeleteOutlined } from "@ant-design/icons";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Tooltip,  Menu, Dropdown, Progress } from "antd";
import { CurrencySymbol, Link } from "../../../../Components/Common";
import { CheckCircleTwoTone, StopTwoTone } from "@ant-design/icons";
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import {
  MultiAvatar,
  MultiAvatar2,
  SubTitle,
 } from "../../../../Components/UI/Elements";
import {
  getRecruiterList,
  setEditOpportunity,
  deleteOpportunityData,
  getOpportunityInitiativeSKillDetails,
  updateOwneroppById,
  getAllSalesList,
  handleOpportunityDrawerModal,
  getAllRecruitmentByOppId,
  getAllRecruitmentPositionByOppId,
  getAllRecruitmentAvgTimeByOppId,
  getAllRecruitmentPositionFilledByOppId,
  getAllRecruitmentDetailsByOppId,
  LinkClosedOpportunity,
  getOpportunitySKill,
  lostStatusRecruit,
  LinkStageOpportunity,
  getOpportunityForecast,
} from "../../../Opportunity/OpportunityAction";
import {
  getDealListbyUserId,
  handleUpdateDealModal,
  emptyDeals,
  handleDealsNotesDrawerModal,
  LinkStageDeal,
  sendToWon,
} from "../../DealAction";
const UpdateDealModal =lazy(()=>import("../UpdateDeal/UpdateDealModal"));
const AddDealsNotesDrawerModal =lazy(()=>import("../AddDealsNotesDrawerModal"));
const DealSelectStages =lazy(()=>import("./DealSelectStages"));

function DealCardList(props) {
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  useEffect(() => {
    if (props.role === "USER" && user.department === "Recruiter") {
      props.getRecruiterList(props.recruiterId);
    } else {
      props.getDealListbyUserId(props.userId, page);
      setPage(page + 1);
    }
    props.getAllSalesList();
  }, []);

  const handleLoadMore = () => {
    setPage(page + 1);
    props.getDealListbyUserId(props.userId, page);
  };

  useEffect(() => {
    return () => props.emptyDeals();
  }, []);

  const [currentItem, setCurrentItem] = useState("");

  function handleSetCurrentItem(item) {
    setCurrentItem(item);
  }

  const {
    user,
    dealsByuserId,
    handleUpdateDealModal,
    openupdateDealModal,
    deleteOpportunityData,
    history,
    fetchingDeal,
  } = props;

  return (
    <>
      <InfiniteScroll
        dataLength={dealsByuserId.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={
          fetchingDeal ? (
            <h4 style={{ textAlign: "center" }}>Loading...</h4>
          ) : null
        }
        height={"75vh"}
      >
        <CardWrapper>

          {dealsByuserId.map((item) => {
            var findProbability = item.probability;
            item.stageList.forEach((element) => {
              if (element.oppStage === item.oppStage) {
                findProbability = element.probability;
              }
            });
            return (
              <CardElement>
                <div class=" flex flex-no-wrap items-center h-[2.81em]"
                >
                  <div class=" mr-[0.2rem]"
                    style={{ flexBasis: "15%",}}
                  >
                    <MultiAvatar
                      primaryTitle={item.opportunityName}
                      imageId={item.imageId}
                      // imageURL={imageURL}
                      imgWidth={"1.8rem"}
                      imgHeight={"1.8rem"}
                    />
                  </div>
                  &nbsp;
                  <div class=" flex flex-col"
                    style={{ flexBasis: "83%", overflow: "hidden" }}
                  >
                    <div
                      class="font-semibold "
                      style={{
                        color: "#337df4",
                        cursor: "pointer",
                        fontSize: "1em",
                      }}
                    >
                      <Link
                        toUrl={`dealDetails/${item.invOpportunityId}`}
                        title={`${item.opportunityName}`}
                      >
                        {item.opportunityName}
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="flex justify-around">
                  <div>
                    {item.customer && (
                      <SubTitle
                        overflow="hidden"
                        textOverflow="ellipsis"
                        style={{
                          cursor: "pointer",
                          fontSize: "0.9375em",
                          display: "flex",
                          alignItems: "center",
                        }}
                        // onClick={handleSecondaryTitleClick || null}
                      >
                        {item.customer || ""}
                      </SubTitle>
                    )}
                  </div>
                  <div>
                    <SubTitle
                      style={{
                        fontWeight: 500,
                        fontSize: "0.9375em",
                        // marginTop: "-0.37em",
                        marginBottom: "-0.18em",
                      }}
                    >
                      &nbsp;&nbsp;
                      {<CurrencySymbol currencyType={item.currency} />}
                      &nbsp;{item.proposalAmount || ""}
                    </SubTitle>
                  </div>
                </div>
                <div className="flex justify-around">
                  <div>
                    <span>
                      <Dropdown
                        overlay={
                          <div>
                            <Menu mode="horizontal">
                              <Menu.Item
                                style={{
                                  paddingLeft: 5,
                                  paddingRight: 5,
                                  backgroundColor: "#F5F5F5",
                                }}
                              >
                                <DealSelectStages
                                  rec={item}
                                  oppStage={item.oppStage}
                                  // recruitOwner={item.recruitOwner}
                                  // candidateName={item.candidateName}
                                  // approveInd={item.approveInd}
                                  // rejectInd={item.rejectInd}
                                  stageClick={(investorOppStagesId) => {
                                    props.LinkStageDeal({
                                      invOpportunityId: item.invOpportunityId,

                                      invOpportunityStagesId:
                                        investorOppStagesId,
                                    });
                                  }}
                                />{" "}
                              </Menu.Item>
                            </Menu>
                          </div>
                        }
                        trigger={["click"]}
                      >
                        <Tooltip title={item.oppStage}>
                          {" "}
                          <Progress
                            type="circle"
                            style={{ cursor: "pointer", color: "red" }}
                            percent={findProbability}
                            //disable={true}
                            width={30}
                            strokeColor={"#005075"}
                          />
                        </Tooltip>
                      </Dropdown>
                    </span>
                  </div>
                  <span>
                    <MultiAvatar2
                      primaryTitle={item.assignedTo}
                      imgWidth={"1.8em"}
                      imgHeight={"1.8em"}
                    />
                  </span>
                </div>

                <div
                  style={{
                    width: "100%",
                    paddingLeft: "0.5em",
                    marginTop: "-0.18em",
                  }}
                >
                  <div class="flex justify-between w-wk">
                    <div>
                      {item.approveInd && item.opportunityOwner ? (
                        <>
                          <Tooltip
                            title={
                              <FormattedMessage
                                id="app.Own"
                                defaultMessage="Own"
                              />
                            }
                          >
                            <CheckCircleTwoTone
                              type="check-circle"
                              theme="twoTone"
                              twoToneColor="#24D8A7"
                              style={{ fontSize: "1rem" }}
                            />
                          </Tooltip>
                        </>
                      ) : item.rejectInd && item.opportunityOwner ? (
                        <>
                          <Tooltip title={"Lost"}>
                            {" "}
                            <StopTwoTone
                              type="stop"
                              theme="twoTone"
                              twoToneColor="red"
                              style={{
                                fontSize: "1rem",
                                marginLeft: "0.875em",
                              }}
                            />
                          </Tooltip>
                        </>
                      ) : (
                        <>
                          <Tooltip
                            title={
                              <FormattedMessage
                                id="app.Own"
                                defaultMessage="Won"
                              />
                            }
                          >
                            <CheckCircleTwoTone
                              type="check-circle"
                              theme="twoTone"
                              twoToneColor="#24D8A7"
                              size={140}
                              style={{ fontSize: "1rem" }}
                              onClick={() =>
                                props.sendToWon(
                                  item.invOpportunityId,

                                  {
                                    wonInd: true,
                                  }
                                )
                              }
                            />
                          </Tooltip>
                          &nbsp; &nbsp;
                          <Tooltip
                            title={
                              <FormattedMessage
                                id="app.drop"
                                defaultMessage="Lost"
                              />
                            }
                          >
                            <StopTwoTone
                              type="stop"
                              theme="twoTone"
                              twoToneColor="red"
                              size={140}
                              style={{ fontSize: "1rem" }}
                              onClick={() =>
                                props.lostStatusRecruit(item.opportunityId, {
                                  lostInd: true,
                                })
                              }
                            />
                          </Tooltip>
                        </>
                      )}
                    </div>
                    <div>
                      <Tooltip
                        placement="right"
                        title={
                          <FormattedMessage
                            id="app.notes"
                            defaultMessage="Notes"
                          />
                        }
                      >
                        <span
                          onClick={() => {
                            props.handleDealsNotesDrawerModal(true);
                            handleSetCurrentItem(item);
                          }}
                        >
                          <NoteAltIcon
                            style={{
                              color: "green",
                              cursor: "pointer",
                              fontSize: "1rem",
                            }}
                          />
                        </span>
                      </Tooltip>
                      <Tooltip
                        placement="right"
                        title={
                          <FormattedMessage
                            id="app.edit"
                            defaultMessage="Edit"
                          />
                        }
                      >
                        {user.imInd === true && user.dealUpdateInd === true && (
                          <span
                            style={{ cursor: "pointer", color: "blue" }}
                            onClick={() => {
                              handleUpdateDealModal(true);
                              handleSetCurrentItem(item);
                            }}
                          >
                            <BorderColorIcon
                              style={{ color: "grey", fontSize: "1rem" }}
                            />
                          </span>
                        )}
                      </Tooltip>
                      <StyledPopconfirm
                        title="Do you want to delete?"
                        onConfirm={() =>
                          deleteOpportunityData(item.opportunityId)
                        }
                      >
                        {user.imInd === true && user.dealDeleteInd === true && (
                          <DeleteOutlined
                            type="delete"
                            style={{
                              cursor: "pointer",
                              color: "red",
                              fontSize: "1rem",
                            }}
                          />
                        )}
                      </StyledPopconfirm>
                    </div>
                  </div>
                </div>
              </CardElement>
            );
          })}
        </CardWrapper>
      </InfiniteScroll>

      <UpdateDealModal
        currentItem={currentItem}
        openupdateDealModal={openupdateDealModal}
        handleUpdateDealModal={handleUpdateDealModal}
        handleSetCurrentItem={handleSetCurrentItem}
      />
      <AddDealsNotesDrawerModal
        currentItem={currentItem}
        addDrawerDealsNotesModal={props.addDrawerDealsNotesModal}
        handleDealsNotesDrawerModal={props.handleDealsNotesDrawerModal}
        handleSetCurrentItem={handleSetCurrentItem}
      />
      {/*
<AddOpportunityDrawerModal
 opportunityData={currentItem}
opportunityForecast={props.opportunityForecast}
opportunityInitiativesSkillsDetails={props.opportunityInitiativesSkillsDetails}
 handleSetCurrentItem={handleSetCurrentItem}
 
 fetchingOpportunitySkills={props.fetchingOpportunitySkills}
 item={currentItem}
 opportunitySkills={props.opportunitySkills}
allRecruitmentDetailsByOppId={props.allRecruitmentDetailsByOppId}
             allRecruitmentByOppId={props.allRecruitmentByOppId}
             allRecruitmentPositionFilledByOppId={props.allRecruitmentPositionFilledByOppId}
             allRecruitmentAvgTimeByOppId={props.allRecruitmentAvgTimeByOppId}
             allRecruitmentPositionByOppId={props.allRecruitmentPositionByOppId}
               handleOpportunityDrawerModal={props.handleOpportunityDrawerModal}
               addDrawerOpportunityModal={props.addDrawerOpportunityModal}
      /> */}
    </>
  );
}

const mapStateToProps = ({ auth, deal, opportunity }) => ({
  dealsByuserId: deal.dealsByuserId,
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  role: auth.userDetails.role,
  opportunitySkills: opportunity.opportunitySkills,
  sales: opportunity.sales,
  recruiterName: opportunity.recruiterName,
  recruiterList: opportunity.recruiterList,
  fetchingRecruiterList: opportunity.fetchingRecruiterList,
  fetchingRecruiterListError: opportunity.fetchingRecruiterListError,
  fetchingDeal: deal.fetchingDeal,
  fetchingDealError: deal.fetchingDealError,
  fetchingAllOpportunities: opportunity.fetchingAllOpportunities,
  opportunityId: opportunity.opportunityId,
  openupdateDealModal: deal.openupdateDealModal,
  recruiterId: auth.userDetails.userId,
  addDrawerOpportunityModal: opportunity.addDrawerOpportunityModal,
  allRecruitmentPositionByOppId: opportunity.allRecruitmentPositionByOppId,
  allRecruitmentAvgTimeByOppId: opportunity.allRecruitmentAvgTimeByOppId,
  opportunityInitiativesSkillsDetails:
    opportunity.opportunityInitiativesSkillsDetails,
  allRecruitmentPositionFilledByOppId:
    opportunity.allRecruitmentPositionFilledByOppId,
  addDrawerDealsNotesModal: deal.addDrawerDealsNotesModal,
  opportunityForecast: opportunity.opportunityForecast,
  allRecruitmentByOppId: opportunity.allRecruitmentByOppId,
  allRecruitmentDetailsByOppId: opportunity.allRecruitmentDetailsByOppId,
  fetchingOpportunitySkills: opportunity.fetchingOpportunitySkills,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDealListbyUserId,

      getOpportunityInitiativeSKillDetails,
      getRecruiterList,
      getOpportunitySKill,
      getOpportunityForecast,
      getAllSalesList,
      handleUpdateDealModal,
      handleOpportunityDrawerModal,
      handleDealsNotesDrawerModal,
      setEditOpportunity,
      deleteOpportunityData,
      updateOwneroppById,
      getAllRecruitmentByOppId,
      getAllRecruitmentPositionByOppId,
      getAllRecruitmentAvgTimeByOppId,
      getAllRecruitmentPositionFilledByOppId,
      getAllRecruitmentDetailsByOppId,
      LinkClosedOpportunity,
      sendToWon,
      lostStatusRecruit,
      LinkStageOpportunity,
      emptyDeals,
      LinkStageDeal,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(DealCardList);

const Header = styled.div`
  text-overflow: ellipsis;

  white-space: nowrap;
  overflow: hidden;
  height: 2em;
  font-size: 1em;
padding:4px;
  color:blue;
  cursor:pointer;
  // font-family: Poppins;
  //font-weight: 700;
  @media only screen and (max-width: 600px) {
    text-overflow: ellipsis;

white-space: nowrap;
overflow: hidden;
height: 2em;
font-size: 1.3em;
font-family: Poppins;
font-weight: 700;
width:100%

text-align:center
  }
`;
const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  @media only screen and (max-width: 600px) {
    -webkit-justify-content: space-between;
    flex-direction: column;
    align-items: center;
  }
`;
const CardElement = styled.div`
  border-radius: 0.35rem;
  border: 3px solid #eeeeee;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 0.25em 0.62em #aaa;
  height: 7rem;
  color: rgb(68, 68, 68);
  margin: 1em;
  padding: 0.2rem;
  width: 19vw;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 600px) {
    width: -webkit-fill-available;
  }
`;
