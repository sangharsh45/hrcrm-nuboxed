import React, { useEffect, useState,lazy} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { FormattedMessage } from "react-intl";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import { Tooltip, Menu, Dropdown, Progress } from "antd";
import { CurrencySymbol,Link } from "../../../../Components/Common";
import moment from "moment";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import LockIcon from "@mui/icons-material/Lock";
import { DeleteOutlined } from "@ant-design/icons";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import {
  MultiAvatar,
  MultiAvatar2,
} from "../../../../Components/UI/Elements";
import {
  getRecruiterList,
  handleUpdateOpportunityModal,
  setEditOpportunity,
  deleteOpportunityData,
  updateOwneroppById,
      handleOpportunityDrawerModal,
      getAllRecruitmentByOppId,
        getAllRecruitmentPositionByOppId,
          getAllRecruitmentAvgTimeByOppId,
         getAllRecruitmentPositionFilledByOppId,
         getAllRecruitmentDetailsByOppId,
         getOpportunitySKill,
         LinklostdOpportunity,
         deleteLostOpportunity,
} from "../../../Opportunity/OpportunityAction";
import {getWonDeals,handleUpdateDealModal,handleDealsNotesDrawerModal} from "../../DealAction";
const AddDealsNotesDrawerModal =lazy(()=>import("../AddDealsNotesDrawerModal"));
const UpdateDealModal =lazy(()=>import("../UpdateDeal/UpdateDealModal"));


function DealWonCard(props) {
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  useEffect(() => {
    if(props.role==="USER"&&user.department==="Recruiter"){
      props.getRecruiterList(props.recruiterId);     
    }else{
     
    } 
    props. getWonDeals(props.userId,page);
    setPage(page + 1);
  }, []);

  const handleLoadMore = () => {
    setPage(page + 1);
      props. getWonDeals(props.userId,page);    
  }
  const [currentItem, setCurrentItem] = useState("");

  function handleSetCurrentItem(item) {
    setCurrentItem(item);
  }

    const {
        user,
        fetchingWonDeals,
        handleUpdateDealModal,
        openupdateDealModal,
        deleteOpportunityData,
        wonDeals,
     
      } = props;
      return (    
  <>

     
<div class="rounded-lg m-5 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
      <div className=" flex justify-between w-[99%] p-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" md:w-[13.12rem]"><FormattedMessage
                  id="app.name"
                  defaultMessage="name"
                /></div>
        <div className=" md:w-[6.21rem]"><FormattedMessage
                  id="app.investor"
                  defaultMessage="investor"
                /></div>
        <div className=" md:w-[9.21rem] "><FormattedMessage
                  id="app.sponsor"
                  defaultMessage="sponsor"
                /></div>
        <div className="md:w-[7.11rem]"><FormattedMessage
                  id="app.startdate"
                  defaultMessage="startdate"
                /></div>
        <div className="md:w-[11.16rem]"><FormattedMessage
                  id="app.proposalamt"
                  defaultMessage="proposalamt"
                /></div>
        <div className="md:w-[5.14rem]"><FormattedMessage
                  id="app.stages"
                  defaultMessage="stages"
                /></div> 
        <div className="md:w-[7.1rem]"><FormattedMessage
                  id="app.salesRep"
                  defaultMessage="salesRep"
                /></div>
        <div className="md:w-[3.22rem]"><FormattedMessage
                  id="app.owner"
                  defaultMessage="owner"
                /></div>
        <div className="md:w-[5.71rem]"></div>
        <div className="w-12"><FormattedMessage
                  id="app.action"
                  defaultMessage="action"
                /></div>
      </div>
      <InfiniteScroll
         dataLength={wonDeals.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingWonDeals ?<div class="flex justify-center">Loading...</div>:null}
        height={"75vh"}
      >
         {wonDeals.map((item) => {
                 
                 var findProbability = item.probability;
                 item.stageList.forEach((element) => {
                   if (element.oppStage === item.oppStage) {
                     findProbability = element.probability;
                   }
                 });
                 return (
                    <div>
                    <div
                      className="flex rounded-xl justify-between mt-4 bg-white h-12 items-center p-3"
                      // style={{
                      //   borderBottom: "3px dotted #515050",
                      // }}
                    >
                      <div class="flex ">
                      <div className=" flex font-medium  md:w-[13.1rem] max-sm:flex-row w-full ">
                                <div>
            <MultiAvatar
              primaryTitle={item.opportunityName}
              imageId={item.imageId}
              // imageURL={imageURL}
              imgWidth={"1.8rem"}
              imgHeight={"1.8rem"}
            />
</div>
                                   <div class="w-[4%]">

                                   </div>
                                   
                                        <Tooltip>
                                        <div class=" flex max-sm:w-full  flex-row md:flex-col">
                                            {/* <div class=" text-xs text-cardBody font-poppins max-sm:hidden">
                                            Name
                                            </div> */}
                                            <div class=" text-sm text-blue-500 text-cardBody font-poppins font-semibold cursor-pointer">
                                                
                                            <Link
                        toUrl={`dealDetails/${item.invOpportunityId}`}
                        title={`${item.opportunityName}`}
                      >
                        {item.opportunityName}
                      </Link>&nbsp;&nbsp;
        {/* {date === currentdate ? (
          <span
            style={{
              color: "tomato",
              fontWeight: "bold",
            }}
          >
            New
          </span>
        ) : null} */}
       
                                            </div>
</div>
                                        </Tooltip>
                              
                                </div>

                                <div className=" flex font-medium flex-col  md:w-[8.1rem] max-sm:flex-row w-full max-sm:justify-between ">
                           
                                    {/* <div class=" text-xs text-cardBody font-poppins max-sm:hidden"> Sector </div> */}
                                    <div class=" text-sm text-cardBody font-poppins">   
                                    <Link to ="/investor">
                        {item.investor}
                        </Link>
                                    </div>
                                </div>
                               
                                <div className=" flex font-medium flex-col md:w-[6.4rem] max-sm:flex-row w-full max-sm:justify-between ">
                                  

                                    {/* <div class=" text-xs text-cardBody font-poppins max-sm:hidden">Country</div> */}
                                    <div class=" text-sm text-cardBody font-poppins">
                                   
            {item.contactName === null ? "None" :
              <MultiAvatar2
                primaryTitle={item.contactName}
                imageId={item.imageId}
                 imageURL={item.imageURL}
                imgWidth={"1.8em"}
                imgHeight={"1.8em"}
              />
            }
          
                                    </div>
                                </div>
                                </div>
                                <div class="flex">
                                <div className=" flex font-medium flex-col md:w-[8.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    {/* <div class=" text-xs text-cardBody font-poppins max-sm:hidden"># Deals</div> */}

                                    <div class=" text-sm justify-center text-cardBody font-poppins">
                                    {moment(item.startDate).format("ll")}
                                    </div>
                                </div>
                             
                                <div className=" flex font-medium flex-col md:w-[9.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    {/* <div class=" text-xs text-cardBody font-poppins max-sm:hidden">Pipeline Value</div> */}

                                    <div class=" text-sm text-cardBody font-poppins text-center">
                                    <CurrencySymbol currencyType={item.currency} />
            &nbsp;
            {item.proposalAmount}

                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col md:w-[10.1rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    {/* <div class=" text-xs text-cardBody font-poppins max-sm:hidden">Pipeline Value</div> */}

                                    <div class=" text-sm text-cardBody font-poppins text-center">
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
                      
                    </Menu.Item>
                  </Menu>
                </div>
              }
              trigger={["click"]}
            >
              <Tooltip title={item.stageName}>
                {" "}
                <Progress
                  type="circle"
                  style={{ cursor: "pointer", color: "red",fontSize:"0.8rem" }}
                  percent={findProbability}
                  width={30}
                  strokeColor={"#005075"}
                />
              </Tooltip>
            </Dropdown>

                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col md:w-[8.1rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    {/* <div class=" text-xs text-cardBody font-poppins max-sm:hidden">Assigned to</div> */}

                                    <div class=" text-sm text-cardBody font-poppins">
                                    
                                    <span>
                                    <MultiAvatar2
              primaryTitle={item.assignedTo}
              imgWidth={"1.8em"}
              imgHeight={"1.8em"}
            />
            </span>
             
                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col md:w-[5.1rem] max-sm:flex-row w-full mb-1 max-sm:justify-between ">
                       
                       {/* <div class=" text-xs text-cardBody font-poppins max-sm:hidden">Owner</div> */}

              <Tooltip title={item.ownerName}>
          <span>
            <MultiAvatar2
              primaryTitle={item.ownerName}
              imageId={item.ownerImageId}
                imageURL={item.imageURL}
                imgWidth={"1.8rem"}
                imgHeight={"1.8rem"}
              />
            </span>
            </Tooltip>
                   </div>
                   </div>
                  
                   <div class="flex flex-col w-[0%] max-sm:flex-row max-sm:w-[10%]">
                    <div>
                    <Tooltip title='Click to Open'><span
          onClick={() => {
           props.LinkClosedOpportunity(
             item.opportunityId,
             {
               closeInd:false,
             }
                  
           );         
         }}         
       
         >
          <LockIcon
                style={{
                  fontSize: "0.8rem",
                  cursor: "pointer",
                }}
              />
            </span>
     </Tooltip> 
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
                    </div>
                  </div>
                  <div class="flex flex-col w-[0%] max-sm:flex-row max-sm:w-[10%]">
                   
                      <div>
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
                          <span class="cursor-pointer text-[blue]"
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
                      </div>
                    
                    
                      <div>
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
             
                    <div></div>
                  </div>   
                                <div class="flex flex-col w-[0%] max-sm:flex-row max-sm:w-[10%]">
                   <div>
                   <span
         
         style={{ cursor: "pointer" }}
         onClick={() => {
            //  props.getAllRecruitmentByOppId(item.opportunityId);
            //  props.getAllRecruitmentPositionByOppId(item.opportunityId);
            //  props.getAllRecruitmentAvgTimeByOppId(item.opportunityId);
            //  props.getAllRecruitmentPositionFilledByOppId(
            //    item.opportunityId
            //  );
            //  props.getAllRecruitmentDetailsByOppId(item.opportunityId);
            //  props.handleOpportunityDrawerModal(true);
            //  props.getOpportunitySKill(item.oppInnitiative);
            //  handleSetCurrentOpportunityId(item.opportunityName);
           }}
         >
           {user.pulseAccessInd === true && (
             <MonitorHeartIcon
               style={{ fontSize: "0.8rem", color: "#df9697" }}
             />
           )}
         </span>
                        </div>
            </div>
                      
                            </div>
                        </div>


                    )
                })}
      </InfiniteScroll>

      </div>
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


const mapStateToProps = ({ auth, deal, opportunity }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  role: auth.userDetails.role,
  opportunitySkills:opportunity.opportunitySkills,
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

    fetchingWonDeals:deal.fetchingWonDeals,
    wonDeals:deal.wonDeals,
    openupdateDealModal: deal.openupdateDealModal,
    addDrawerDealsNotesModal: deal.addDrawerDealsNotesModal,
  
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getRecruiterList,
      getOpportunitySKill,
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
         getWonDeals,
         LinklostdOpportunity,
         deleteLostOpportunity,
         handleUpdateDealModal,
         handleDealsNotesDrawerModal
    },
    dispatch
  );
export default connect(
mapStateToProps,
mapDispatchToProps
)(DealWonCard);
