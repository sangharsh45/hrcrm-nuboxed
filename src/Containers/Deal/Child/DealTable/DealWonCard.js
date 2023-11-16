import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import { Tooltip, Input, Button, Select, Menu, Dropdown, Progress } from "antd";
import Highlighter from "react-highlight-words";
import { CurrencySymbol,Link } from "../../../../Components/Common";
import moment from "moment";
import SearchIcon from "@mui/icons-material/Search";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import LockIcon from "@mui/icons-material/Lock";
import { DeleteOutlined } from "@ant-design/icons";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import OpenInBrowserIcon from "@mui/icons-material/OpenInBrowser";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateDealModal from "../UpdateDeal/UpdateDealModal";
import { StyledTable, StyledPopconfirm } from "../../../../Components/UI/Antd";
import {
  MultiAvatar,
  MultiAvatar2,
  SubTitle,
} from "../../../../Components/UI/Elements";
import { OnlyWrapCard } from "../../../../Components/UI/Layout";
import {
  getRecruiterList,
  handleUpdateOpportunityModal,
  setEditOpportunity,
  deleteOpportunityData,
  updateOwneroppById,
      getAllSalesList,
      handleOpportunityDrawerModal,
      getAllRecruitmentByOppId,
        getAllRecruitmentPositionByOppId,
          getAllRecruitmentAvgTimeByOppId,
         getAllRecruitmentPositionFilledByOppId,
         getAllRecruitmentDetailsByOppId,
         getOpportunitySKill,
         getWonOpportunity,
         LinklostdOpportunity,
         deleteLostOpportunity,
} from "../../../Opportunity/OpportunityAction";
import AddDealsNotesDrawerModal from "../AddDealsNotesDrawerModal";
import DealSelectStages from "./DealSelectStages"

function DealWonCard(props) {
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  useEffect(() => {
    if(props.role==="USER"&&user.department==="Recruiter"){
      props.getRecruiterList(props.recruiterId);     
    }else{
     
    } 
    props.getAllSalesList();
    props. getWonOpportunity(props.userId,page);
    setPage(page + 1);
  }, []);

  const handleLoadMore = () => {
    setPage(page + 1);
      props. getWonOpportunity(props.userId,page);    
  }
  const [currentItem, setCurrentItem] = useState("");

  function handleSetCurrentItem(item) {
    setCurrentItem(item);
  }

    const {
        user,
        fetchingWonOpportunity,
        handleUpdateDealModal,
        openupdateDealModal,
        deleteOpportunityData,
        history,
        fetchingDeal,
     wonOpportunity,
     
      } = props;
      return (    
  <>

     
        <OnlyWrapCard style={{backgroundColor:"#E3E8EE"}}>
      <div className=" flex justify-between w-[99%] p-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" md:w-[14rem]">Name</div>
        <div className=" md:w-20"></div>
        <div className=" md:w-32 ">Phone #</div>
        <div className="md:w-32">Country</div>
        <div className="md:w-56">Company</div>
        <div className="md:w-20">Sector</div> 
        <div className="md:w-24">Assigned to</div>
        <div className="md:w-20">Owner</div>
        <div className="md:w-20">Qualify</div>
        <div className="w-12">Action</div>
      </div>
      <InfiniteScroll
         dataLength={wonOpportunity.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingWonOpportunity ?<h4 style={{ textAlign: 'center' }}>Loading...</h4>:null}
        height={"70vh"}
      >
         {wonOpportunity.map((item) => {
                 
                 var findProbability = 0;
                 return (
                    <div>
                    <div
                      className="flex rounded-xl justify-between mt-4 bg-white h-12 items-center p-3"
                      // style={{
                      //   borderBottom: "3px dotted #515050",
                      // }}
                    >
                      <div class="flex ">
                        <div className=" flex font-medium flex-col w-[14rem]   max-sm:w-full">
                          <div className="flex max-sm:w-full ">
                            <div>
                              <SubTitle>
                              <MultiAvatar
                      primaryTitle={item.opportunityName}
                      imageId={item.imageId}
                      // imageURL={imageURL}
                      imgWidth={"1.8rem"}
                      imgHeight={"1.8rem"}
                    />
                              </SubTitle>
                            </div>
                            <div class="w-[4%]"></div>
      
                            <div class="max-sm:w-full md:flex items-center">
                              <Tooltip>
                                <div class="max-sm:w-full justify-between flex md:flex-col">
                                  {/* <h4 class=" text-sm text-cardBody  font-poppins max-sm:hidden">
                                    Name
                                  </h4> */}
                                  <h4 class="text-sm text-cardBody font-semibold  font-poppins cursor-pointer">
                                  <Link
                        toUrl={`dealDetails/${item.invOpportunityId}`}
                        title={`${item.opportunityName}`}
                      >
                        {item.opportunityName}
                      </Link>
                                    {/* &nbsp;&nbsp;
                                    {date === currentdate ? (
                                      <span class="text-xs"
                                        style={{
                                          color: "tomato",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        New
                                      </span>
                                    ) : null} */}
                                  </h4>
                                </div>
                              </Tooltip>
                            </div>
                          </div>
                          <div className=" flex font-medium flex-col  md:w-32 max-sm:flex-row w-full max-sm:justify-between ">
                          
                          <h4 class=" text-xs text-cardBody font-poppins">
                          {moment(item.startDate).format("ll")}
                          </h4>
                        </div>
                        <div className=" flex font-medium flex-col  md:w-32 max-sm:flex-row w-full max-sm:justify-between ">
                          
                        <CurrencySymbol currencyType={item.currency} />
            &nbsp;
            {item.proposalAmount}
                        </div>
                        <div className=" flex font-medium flex-col  md:w-32 max-sm:flex-row w-full max-sm:justify-between ">
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
                          </div>
                        </div>
                      </div>
                      <div class="flex md:items-center ">
                        <div className=" flex font-medium flex-col md:w-32 max-sm:flex-row w-full max-sm:justify-between ">
                          {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden">
                            Assigned to
                          </h4> */}
      
                          <div class=" text-xs text-cardBody font-poppins">
                            
                          </div>
                        </div>
                        <div className=" flex font-medium flex-col md:w-20  max-sm:flex-row w-full max-sm:justify-between">
                          {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden">
                            Owner
                          </h4> */}
      
                          <span>
                           
                          </span>
                        </div>
                        <div className=" flex font-medium flex-col md:w-[6rem] max-sm:flex-row w-full max-sm:justify-between ">
                          {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden">
                            Qualify
                          </h4> */}
      
                          <div class=" text-xs text-cardBody font-poppins"></div>
                          <div>
                          
                          </div>
                        </div>
                        <div class="flex flex-col w-[6%] max-sm:flex-row max-sm:w-[10%]">
                        </div>
                        <div class="w-[2%]"></div>
                      </div>
                    </div>
                  </div>
                 );
              })}
      </InfiniteScroll>

      </OnlyWrapCard>
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
    </>
  );
}


const mapStateToProps = ({ auth, account, opportunity }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  role: auth.userDetails.role,
  opportunitySkills:opportunity.opportunitySkills,
  sales: opportunity.sales,
  recruiterName: opportunity.recruiterName,
  recruiterList:opportunity.recruiterList,
  fetchinglostOpportunity:opportunity.fetchinglostOpportunity,
  fetchinglostOpportunityError:opportunity.fetchinglostOpportunityError,
  fetchingRecruiterList:opportunity.fetchingRecruiterList,
  fetchingRecruiterListError:opportunity.fetchingRecruiterListError,
  fetchingOpportunity: opportunity.fetchingOpportunity,
  fetchingOpportunityError: opportunity.fetchingOpportunityError,
  fetchingAllOpportunities:opportunity.fetchingAllOpportunities,
  opportunityByUserId: opportunity.opportunityByUserId,
  updateOpportunityModal: opportunity.updateOpportunityModal,
  recruiterId:auth.userDetails.userId,
  addDrawerOpportunityModal:opportunity.addDrawerOpportunityModal,
  allRecruitmentPositionByOppId: opportunity.allRecruitmentPositionByOppId,
  allRecruitmentAvgTimeByOppId: opportunity.allRecruitmentAvgTimeByOppId,
  allRecruitmentPositionFilledByOppId:
    opportunity.allRecruitmentPositionFilledByOppId,
    allRecruitmentByOppId: opportunity.allRecruitmentByOppId,
    allRecruitmentDetailsByOppId:opportunity.allRecruitmentDetailsByOppId,
    wonOpportunity:opportunity.wonOpportunity
  
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getRecruiterList,
      getOpportunitySKill,
      getAllSalesList,
      handleUpdateOpportunityModal,
      handleOpportunityDrawerModal,
      setEditOpportunity,
      deleteOpportunityData,
      updateOwneroppById,
      getAllRecruitmentByOppId,
         getAllRecruitmentPositionByOppId,
          getAllRecruitmentAvgTimeByOppId,
         getAllRecruitmentPositionFilledByOppId,
         getAllRecruitmentDetailsByOppId,
         getWonOpportunity,
         LinklostdOpportunity,
         deleteLostOpportunity,
    },
    dispatch
  );
export default connect(
mapStateToProps,
mapDispatchToProps
)(DealWonCard);
