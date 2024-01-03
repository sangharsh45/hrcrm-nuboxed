import React, { useEffect, useState, } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import { Tooltip, Menu, Dropdown, Progress } from "antd";
import { CurrencySymbol,Link } from "../../../../Components/Common";
import moment from "moment";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import LockIcon from "@mui/icons-material/Lock";
import { DeleteOutlined } from "@ant-design/icons";
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
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
      handleOpportunityDrawerModal,
      getAllRecruitmentByOppId,
        getAllRecruitmentPositionByOppId,
          getAllRecruitmentAvgTimeByOppId,
         getAllRecruitmentPositionFilledByOppId,
         getAllRecruitmentDetailsByOppId,
         getOpportunitySKill,
         getFullOpportunity,
} from "../../OpportunityAction";
import AddOpportunityDrawerModal from "./AddOpportunityDrawerModal";
import UpdateOpportunityModal from "../UpdateOpportunity/UpdateOpportunityModal";
import ReinstateToggleForLost from "../../Child/OpportunityTable/ReinstateToggleForLost"

function OpportunityAllMobileCardList(props) {
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  useEffect(() => {
    if(props.role==="USER"&&user.department==="Recruiter"){
      props.getRecruiterList(props.recruiterId);     
    }else{
     
    } 
    props. getFullOpportunity(page);
    setPage(page + 1);
  },[]);

  const handleLoadMore = () => {
    setPage(page + 1);
      props. getFullOpportunity(page);
  }
    const [currentOpportunityId, setCurrentOpportunityId] = useState("");
    function handleSetCurrentOpportunityId(opportunityId,opportunityName) {
      setCurrentOpportunityId(opportunityId,opportunityName);
    }
    const {
        user,
        fetchinglostOpportunity,
    fetchinglostOpportunityError,
    deleteLostOpportunity,
    handleUpdateOpportunityModal,
    updateOpportunityModal,
    deleteOpportunityData,
    fetchingAllOpportunity,
    allOpportunity,
     
      } = props;
      return (    
  <>
 <OnlyWrapCard style={{backgroundColor:"#E3E8EE"}}>
 
 
      <InfiniteScroll
        dataLength={allOpportunity.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingAllOpportunity?<h4 style={{ textAlign: 'center' }}>Loading...</h4> :null}
        height={"75vh"}
      >
      
              {allOpportunity.map((item) => {
                 
                 var findProbability = item.probability;
                 item.stageList.forEach((element) => {
                   if (element.oppStage === item.oppStage) {
                     findProbability = element.probability;
                   }
                 });
                 return (

                  <div>
                  <div
                className="flex flex-col rounded-xl justify-between bg-white mt-[0.5rem] h-[9rem] items-center p-3"
              >
                     <div class="flex justify-between items-center w-wk ">
                    <div className=" flex font-medium  ">
                              <div>
<SubTitle>
          <MultiAvatar
            primaryTitle={item.opportunityName}
            imageId={item.imageId}
            imgWidth={"1.8rem"}
            imgHeight={"1.8rem"}
          />
        </SubTitle>
</div>
                                
                                 
                                      <Tooltip>
                                      <div class=" flex max-sm:w-full  flex-row md:flex-col">
        
                                          <h4 class=" text-sm text-blue-500 text-cardBody font-poppins font-semibold cursor-pointer flex items-center w-max ">
                                              
                                          <Link
        toUrl={`opportunity/${item.opportunityId}`}
        title={`${item.opportunityName}`}>
       {item.opportunityName}
       </Link>&nbsp;&nbsp;
     
                                          </h4>
</div>
                                      </Tooltip>
                            
                              </div>

                              <div className=" flex font-medium  ">

                                  <h4 class=" text-sm text-cardBody font-poppins">   
                                  
                                  {item.customer}
                  
                                  </h4>
                              </div>
                             
                              <div className=" flex font-medium  ">
                                

                                  <h4 class=" text-sm text-cardBody font-poppins">
                                  <SubTitle>
                                  {item.contactName === null ? "None" :
            <MultiAvatar2
              primaryTitle={item.contactName}
              imageId={item.imageId}
               imageURL={item.imageURL}
              imgWidth={"1.8em"}
              imgHeight={"1.8em"}
            />
          }
          </SubTitle>
                                  </h4>
                              </div>
                              </div>
                              <div class="flex justify-between items-center w-wk ">
                              <div className=" flex font-medium  ">


                                  <div class=" text-sm justify-center text-cardBody font-poppins">
                                  {moment(item.startDate).format("ll")}
                                  </div>
                              </div>
                           
                              <div className=" flex font-medium  ">
   

                                  <div class=" text-sm text-cardBody font-poppins text-center">
                                  <CurrencySymbol currencyType={item.currency} />
          &nbsp;
          {item.proposalAmount}

                                  </div>
                              </div>
                              <div className=" flex font-medium  ">
           

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
                              <div className=" flex font-medium  ">
                    

                                  <div class=" text-sm text-cardBody font-poppins">
                                  
                                  <span>
                                  <MultiAvatar2
            primaryTitle={item.assignedTo}
            imgWidth={"1.8rem"}
            imgHeight={"1.8rem"}
          />
          </span>
           
                                  </div>
                              </div>
                              <div className=" flex font-medium  ">
                     


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
                 <div class="flex justify-between items-center w-wk ">
                 <div>
                 <span
       
       style={{ cursor: "pointer" }}
onClick={() => {
props.getAllRecruitmentByOppId(item.opportunityId);
props.getAllRecruitmentPositionByOppId(item.opportunityId);
props.getAllRecruitmentAvgTimeByOppId(item.opportunityId);
props.getAllRecruitmentPositionFilledByOppId(
item.opportunityId
);
props.getAllRecruitmentDetailsByOppId(item.opportunityId);
props.handleOpportunityDrawerModal(true);
props.getOpportunitySKill(item.oppInnitiative);
handleSetCurrentOpportunityId(item.opportunityName);
}}
>
         {user.pulseAccessInd === true && (
           <MonitorHeartIcon
             style={{ fontSize: "0.8rem", color: "#df9697" }}
           />
         )}
       </span>
                      </div>
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
                  <ReinstateToggleForLost 
          opportunityId={item.opportunityId} 
          
          
          />
                  </div>
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
                      {user.opportunityUpdateInd ===true && (
            
            <span
              style={{ cursor: "pointer", color: "grey" }}
              onClick={() => {
                props.setEditOpportunity(item);
                handleUpdateOpportunityModal(true);
                handleSetCurrentOpportunityId(item);
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
                        deleteLostOpportunity(item.opportunityId)
                      }
                    >
                        {user.opportunityDeleteInd ===true && (
                      
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
                      </div>

                 )  
            })}
             
  

      </InfiniteScroll>
      </OnlyWrapCard>
      <UpdateOpportunityModal
        opportunityId={currentOpportunityId}
        opportunityName={currentOpportunityId}
        opportunityData={currentOpportunityId}
        updateOpportunityModal={updateOpportunityModal}
        handleUpdateOpportunityModal={handleUpdateOpportunityModal}
        handleSetCurrentOpportunityId={handleSetCurrentOpportunityId}
      />

<AddOpportunityDrawerModal
 handleSetCurrentOpportunityId={handleSetCurrentOpportunityId}
 opportunityName={currentOpportunityId}
 opportunitySkills={props.opportunitySkills}
allRecruitmentDetailsByOppId={props.allRecruitmentDetailsByOppId}
             allRecruitmentByOppId={props.allRecruitmentByOppId}
             allRecruitmentPositionFilledByOppId={props.allRecruitmentPositionFilledByOppId}
             allRecruitmentAvgTimeByOppId={props.allRecruitmentAvgTimeByOppId}
             allRecruitmentPositionByOppId={props.allRecruitmentPositionByOppId}
               handleOpportunityDrawerModal={props.handleOpportunityDrawerModal}
               addDrawerOpportunityModal={props.addDrawerOpportunityModal}
             // candidateByUserId={this.props.candidateByUserId}
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
  fetchingAllOpportunity:opportunity.fetchingAllOpportunity,
  fetchingAllOpportunityError:opportunity.fetchingAllOpportunityError,
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
    allOpportunity:opportunity.allOpportunity
  
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
         getFullOpportunity,
    //      LinklostdOpportunity,
    //      deleteLostOpportunity,
    },
    dispatch
  );
export default connect(
mapStateToProps,
mapDispatchToProps
)(OpportunityAllMobileCardList);

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
display: flex;
    justify-content: flex-end;
white-space: nowrap;
overflow: hidden;
height: 2em;
font-size: 1.3em;
font-family: Poppins;
font-weight: 700;
width:100%

text-align:center
  }
`
const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  
  @media only screen and (max-width: 600px) {
    -webkit-justify-content: space-between;
    flex-direction: column;
    align-items: center;
  }
`
const CardElement = styled.div`
 
border-radius: 0.75rem;
    border: 3px solid #EEEEEE;
    background-color: rgb(255,255,255);
    box-shadow: 0 0.25em 0.62em #aaa;
    height: 17rem;
    color: rgb(68,68,68);
    margin: 1em;
    padding: 0.2rem;
    width: 20vw;
    display: flex;
    flex-direction: column;
  @media only screen and (max-width: 600px) {
    width: -webkit-fill-available;
    
  }
`