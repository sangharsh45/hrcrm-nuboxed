import React, { useEffect, useState ,useMemo} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import InfiniteScroll from "react-infinite-scroll-component"
import { FormattedMessage } from "react-intl";
import OpportunitySelectStages from "../OpportunityTable/OpportunitySelectStages"
import styled from 'styled-components';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import SearchIcon from '@mui/icons-material/Search';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DeleteIcon from '@mui/icons-material/Delete';
import { Tooltip, Input, Button, Select, Menu, Dropdown, Progress } from "antd";
import { FlexContainer, MainWrapper, ResponsiveCard } from "../../../../Components/UI/Layout";
import { CurrencySymbol,Link } from "../../../../Components/Common";
import { CheckCircleTwoTone, StopTwoTone } from "@ant-design/icons";
import { BundleLoader } from "../../../../Components/Placeholder";
import { StyledTable, StyledPopconfirm } from "../../../../Components/UI/Antd";
import { MultiAvatar, MultiAvatar2, SubTitle,Title } from "../../../../Components/UI/Elements";
import {
  getOpportunityListByUserId,
  getRecruiterList,
  handleUpdateOpportunityModal,
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
         StatusRecruit,
         lostStatusRecruit,
         LinkStageOpportunity,
         getOpportunityForecast
} from "../../OpportunityAction";
import AddOpportunityDrawerModal from "../../Child/OpportunityTable/AddOpportunityDrawerModal"
import OpportunityDetailView from "./OpportunityDetailView";
import UpdateOpportunityModal from "../UpdateOpportunity/UpdateOpportunityModal";
import APIFailed from "../../../../Helpers/ErrorBoundary/APIFailed";
const Option =Select;

function OpportunityCardList(props) {

  const [page, setPage] = useState(0);
  useEffect(() => {
    if(props.role==="USER"&&user.department==="Recruiter"){
      props.getRecruiterList(props.recruiterId);     
    }else{
      props.getOpportunityListByUserId(props.userId,page);
      setPage(page + 1);
    } 
    props.getAllSalesList();  
  }, []);

  const handleLoadMore = () => {
    setTimeout(() => {
     
        if(props.role==="USER"&&user.department==="Recruiter"){
          props.getRecruiterList(props.recruiterId);     
        }else{
          props.getOpportunityListByUserId(props.userId,page);
          setPage(page + 1);
        } 
        props.getAllSalesList();  
    }, 100);
  
  }


  const [currentOpportunityId, setCurrentOpportunityId] = useState("");
;
  const [currentItem, setCurrentItem] = useState("");





  function handleSetCurrentOpportunityId(item) {
    setCurrentOpportunityId(item);
    // console.log("opp",item);
  }


  function handleSetCurrentItem(item) {
    setCurrentItem(item);
  }

 



  

  const {
    user,
    opportunityByUserId,
    handleUpdateOpportunityModal,
    updateOpportunityModal,
    deleteOpportunityData,
    history,
    fetchingOpportunity
  } = props;
  if (fetchingOpportunity) {
    return <BundleLoader />;
  }

  return (
    <>
    

<InfiniteScroll
                dataLength={opportunityByUserId.length}
                next={handleLoadMore}
                hasMore={true}
                // loader={<h4 style={{ textAlign: 'center' }}>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
                height={"80vh"}
            >

    <CardWrapper>
    {opportunityByUserId.map((item) => {
                 
                 var findProbability = item.probability;
                   item.stageList.forEach((element) => {
                     if (element.oppStage === item.oppStage) {
                       findProbability = element.probability;}
                    });
                 return (
      <CardElement>
        <FlexContainer
          alignItems="center"
          flexWrap="no-wrap"
          style={{ height: "2.81em" }}
        >
          <FlexContainer style={{ flexBasis: "15%", marginRight: "0.2rem" }}>
            <MultiAvatar
              primaryTitle={item.opportunityName}
              imageId={item.imageId}
              // imageURL={imageURL}
              imgWidth={"1.8rem"}
                imgHeight={"1.8rem"}
            />
          </FlexContainer>
          &nbsp;
          <FlexContainer
            flexDirection="column"
            style={{ flexBasis: "83%", overflow: "hidden" }}
          >
            <div style={{ color: "#337df4", cursor: "pointer", fontSize: "1em" }}>
          <Link
toUrl={`opportunity/${item.opportunityId}`}
title={`${item.opportunityName}`}>
{item.opportunityName}
</Link>
          </div> 
            

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
          </FlexContainer>
        </FlexContainer>
        <div className="flex justify-around">
          <div>
          <SubTitle
            style={{
              fontWeight: 500,
              fontSize: "0.9375em",
              marginTop: "-0.37em",
              marginBottom: "-0.18em",
            }}
          >
            
            &nbsp;&nbsp;
            {<CurrencySymbol currencyType={item.currency} />}
            &nbsp;{  item.proposalAmount || ""}
          </SubTitle>
          </div>
        <div>   
{item.Customer}

        </div>
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
    <OpportunitySelectStages
      rec={item}
      oppStage={item.oppStage}
      // recruitOwner={item.recruitOwner}
      // candidateName={item.candidateName}
      // approveInd={item.approveInd}
      // rejectInd={item.rejectInd}
      stageClick={(opportunityStagesId) => {
        props.LinkStageOpportunity(
          {
            opportunityId: item.opportunityId,
            //oppStage: item.oppStage,
            opportunityStagesId:opportunityStagesId
            // recruitmentProcessId: item.recruitmentProcessId,
            // recruitmentId: item.recruitmentId,
            // profileId: item.profileId,
          },
         
        );
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
style={{ cursor: "pointer",color:"red" }}
percent={findProbability}
//disable={true}
width={30}
 strokeColor={"#005075"}

/>
  
</Tooltip>
</Dropdown>
</span>
</div>
<div>
<span>
<MultiAvatar2
primaryTitle={item.assignedTo}
imgWidth={"1.8em"}
imgHeight={"1.8em"}
/>
</span>
  </div>
        </div>
        <FlexContainer
          style={{
            width: "100%",
            paddingLeft: "0.5rem",
            justifyContent: "space-evenly",
            marginTop: "-0.62em",
            marginBottom: "0.31em",
          }}
        >

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
              style={{ cursor: "pointer", color: "blue" }}
              onClick={() => {
                props.setEditOpportunity(item);
                handleUpdateOpportunityModal(true);
                handleSetCurrentOpportunityId(item);
              }}
            >
                 <BorderColorIcon  style={{fontSize:"0.8rem" }}/>
              </span>
           )}
          </Tooltip>
         
            <>
              <div>
               
               
                <StyledPopconfirm
            title="Do you want to delete?"
            onConfirm={() => deleteOpportunityData(item.opportunityId)}
          >
           
             {user.opportunityDeleteInd ===true && (
            <DeleteIcon
            type="delete" style={{ cursor: "pointer", color: "red",fontSize:"0.8rem"  }} />
             )}
          </StyledPopconfirm>

              </div>
            </>
    

          {/* <div style={{ marginTop: "4%" }}>
           
          <Tooltip title='Click to Close'>
         
         <span
          onClick={() => {
           props.LinkClosedOpportunity(
             item.opportunityId,
             {
               closeInd:true,
             }
             //props.handleCallback           
           );         
         }}         
           style={{            
             fontSize: "0.9em",
             cursor: "pointer",
           }}
         >
           <LockOpenIcon  style={{fontSize:"0.8rem" }}/>
            </span>
     </Tooltip> 
     &nbsp;
     <span
         
            style={{ cursor: "pointer" }}
            onClick={() => {
             props.getAllRecruitmentByOppId(item.opportunityId );
                          props.getAllRecruitmentPositionByOppId(item.opportunityId );
                        props.getAllRecruitmentAvgTimeByOppId(item.opportunityId );
                        props.getAllRecruitmentPositionFilledByOppId(item.opportunityId );
                        props.getAllRecruitmentDetailsByOppId(item.opportunityId)
                        props.handleOpportunityDrawerModal(true);
                        props.getOpportunitySKill(item.oppInnitiative)
                        props.getOpportunityInitiativeSKillDetails(item.opportunityId)
                        props.getOpportunityForecast(item.opportunityId)
                        handleSetCurrentOpportunityId(item);
                        // handleSetOpportunityId(item.opportunityId)
                        handleSetCurrentItem(item);
            }}
            >{user.pulseAccessInd ===true && ( 
              <MonitorHeartIcon style={{fontSize:"0.8rem"  ,color: "#df9697"}}/>
               )}
            </span>
          </div> */}
        </FlexContainer>
        <FlexContainer
          style={{ width: "100%", paddingLeft: "0.5em", marginTop: "-0.18em" }}
        >
          
            <FlexContainer
              style={{}}
              // justifyContent={bottomBarComponent ? "space-between" : "flex-end"}
              alignSelf="flex-end"
              alignItems="center"
            >
              {/* <h4>{moment(item.startDate).format("ll")}</h4> */}
              <div>
              {item.approveInd&&item.opportunityOwner ? (
<>
  <Tooltip 
    title={<FormattedMessage
      id="app.Own"
      defaultMessage="Own"
    />}

  >
    <CheckCircleTwoTone
      type="check-circle"
      theme="twoTone"
      twoToneColor="#24D8A7"
      style={{fontSize:"0.8rem" 
     }}
    />
  </Tooltip>
</>
) : item.rejectInd&&item.opportunityOwner ? (
<>
  <Tooltip title={"Lost"}>
    {" "}
    <StopTwoTone
      type="stop"
      theme="twoTone"
      twoToneColor="red"         
      style={{ fontSize:"0.8rem" , marginLeft: "0.875em" }}
    />
  </Tooltip>
</>
) : (
<>
  <Tooltip 
    title={<FormattedMessage
      id="app.Own"
      defaultMessage="Won"
    />}

  >
    <CheckCircleTwoTone
      type="check-circle"
      theme="twoTone"
      twoToneColor="#24D8A7"
      size={140}
      style={{ fontSize:"0.8rem" 
     
     }}
      onClick={() =>                                        
        props.StatusRecruit(
          item.opportunityId,
        
          {
           wonInd:true
          },

         
        )
        
      }
    />
  </Tooltip>

  &nbsp; &nbsp;
  <Tooltip 
    title={<FormattedMessage
      id="app.drop"
      defaultMessage="Lost"
    />}

  >
    <StopTwoTone
      type="stop"
      theme="twoTone"
      twoToneColor="red"
      size={140}
      style={{fontSize:"0.8rem" 
      
     }}
     onClick={() => 
    props.lostStatusRecruit(
      item.opportunityId,
          {
           lostInd:true
          },
        )
      }
    />
  </Tooltip>
</>
)}

              </div>
            </FlexContainer>
   
           
        </FlexContainer>
      </CardElement>
                 );})}
    </CardWrapper>

      </InfiniteScroll>
      
      <UpdateOpportunityModal
        updateOpportunityModal={updateOpportunityModal}
        opportunityData={currentOpportunityId}
        handleUpdateOpportunityModal={handleUpdateOpportunityModal}
        handleSetCurrentOpportunityId={handleSetCurrentOpportunityId}
      />

<AddOpportunityDrawerModal
 opportunityData={currentOpportunityId}
opportunityForecast={props.opportunityForecast}
opportunityInitiativesSkillsDetails={props.opportunityInitiativesSkillsDetails}
 handleSetCurrentOpportunityId={handleSetCurrentOpportunityId}
//  opportunityName={currentOpportunityId}
 
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
             // candidateByUserId={props.candidateByUserId}
      />
    </>
  );
}

// }
const mapStateToProps = ({ auth, account, opportunity }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  role: auth.userDetails.role,
  opportunitySkills:opportunity.opportunitySkills,
  sales: opportunity.sales,
  recruiterName: opportunity.recruiterName,
  recruiterList:opportunity.recruiterList,
  fetchingRecruiterList:opportunity.fetchingRecruiterList,
  fetchingRecruiterListError:opportunity.fetchingRecruiterListError,
  fetchingOpportunity: opportunity.fetchingOpportunity,
  fetchingOpportunityError: opportunity.fetchingOpportunityError,
  fetchingAllOpportunities:opportunity.fetchingAllOpportunities,
  opportunityByUserId: opportunity.opportunityByUserId,
  opportunityId :opportunity.opportunityId,
  updateOpportunityModal: opportunity.updateOpportunityModal,
  recruiterId:auth.userDetails.userId,
  addDrawerOpportunityModal:opportunity.addDrawerOpportunityModal,
  allRecruitmentPositionByOppId: opportunity.allRecruitmentPositionByOppId,
  allRecruitmentAvgTimeByOppId: opportunity.allRecruitmentAvgTimeByOppId,
  opportunityInitiativesSkillsDetails:opportunity.opportunityInitiativesSkillsDetails,
  allRecruitmentPositionFilledByOppId:
    opportunity.allRecruitmentPositionFilledByOppId,
    opportunityForecast:opportunity.opportunityForecast,
    allRecruitmentByOppId: opportunity.allRecruitmentByOppId,
    allRecruitmentDetailsByOppId:opportunity.allRecruitmentDetailsByOppId,
    fetchingOpportunitySkills:opportunity.fetchingOpportunitySkills
  
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getOpportunityListByUserId,
      getOpportunityInitiativeSKillDetails,
      getRecruiterList,
      getOpportunitySKill,
      getOpportunityForecast,
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
         LinkClosedOpportunity,
         StatusRecruit,
         lostStatusRecruit,
         LinkStageOpportunity,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(OpportunityCardList);

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
 
border-radius: 0.35rem;
border: 3px solid #EEEEEE;
background-color: rgb(255,255,255);
box-shadow: 0 0.25em 0.62em #aaa;
height: 7rem;
color: rgb(68,68,68);
margin: 1em;
padding: 0.2rem;
width: 20vw;
display: flex;
flex-direction: column;
  @media only screen and (max-width: 600px) {
    width: 100%;
    
  }
`
{/* <CardWrapper>      
{opportunityByUserId.map((item) => {
   
   var findProbability = item.probability;
     item.stageList.forEach((element) => {
       if (element.oppStage === item.oppStage) {
         findProbability = element.probability;}
      });
   return (
      <CardElement>

        <div class="flex items-center justify-between ">
        <h4>Name</h4>
          <Header>
          <Link
toUrl={`opportunity/${item.opportunityId}`}
title={`${item.opportunityName}`}>
{item.opportunityName}
</Link>
          </Header> 
         
 

            

</div>                  
   
       

          <div class="flex  justify-between">
              <h3>Customer</h3>
              <h4>{item.customer}</h4>
          </div>
          <div class="flex justify-between">
              <div>
      <h4>Sponsor</h4> 
      </div>
      <div>
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
</div>
      </div>
      <div class="flex justify-between">
      <h4>Start Date</h4> 
<h4>{moment(item.startDate).format("ll")}</h4>
      </div>
      <div class="flex justify-between">
      <h4>Proposal Amount</h4> 
<h4><span>
<CurrencySymbol currencyType={item.currency} />
&nbsp;
{item.proposalAmount}
</span></h4>
      </div>
      <div class="flex justify-between">
      <h4>Stages</h4> 
<h4><span>
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
    <OpportunitySelectStages
      rec={item}
      oppStage={item.oppStage}
      // recruitOwner={item.recruitOwner}
      // candidateName={item.candidateName}
      // approveInd={item.approveInd}
      // rejectInd={item.rejectInd}
      stageClick={(opportunityStagesId) => {
        props.LinkStageOpportunity(
          {
            opportunityId: item.opportunityId,
            //oppStage: item.oppStage,
            opportunityStagesId:opportunityStagesId
            // recruitmentProcessId: item.recruitmentProcessId,
            // recruitmentId: item.recruitmentId,
            // profileId: item.profileId,
          },
         
        );
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
style={{ cursor: "pointer",color:"red" }}
percent={findProbability}
//disable={true}
width={30}
 strokeColor={"#005075"}

/>
)}  
</Tooltip>
</Dropdown>
</span></h4>
      </div>  
      <div class="flex justify-between">
      {item.approveInd&&item.opportunityOwner ? (
<>
  <Tooltip 
    title={<FormattedMessage
      id="app.Own"
      defaultMessage="Own"
    />}

  >
    <CheckCircleTwoTone
      type="check-circle"
      theme="twoTone"
      twoToneColor="#24D8A7"
      style={{fontSize:"0.8rem" 
     }}
    />
  </Tooltip>
</>
) : item.rejectInd&&item.opportunityOwner ? (
<>
  <Tooltip title={"Lost"}>
    {" "}
    <StopTwoTone
      type="stop"
      theme="twoTone"
      twoToneColor="red"         
      style={{ fontSize:"0.8rem" , marginLeft: "0.875em" }}
    />
  </Tooltip>
</>
) : (
<>
  <Tooltip 
    title={<FormattedMessage
      id="app.Own"
      defaultMessage="Won"
    />}

  >
    <CheckCircleTwoTone
      type="check-circle"
      theme="twoTone"
      twoToneColor="#24D8A7"
      size={140}
      style={{ fontSize:"0.8rem" 
     
     }}
      onClick={() =>                                        
        props.StatusRecruit(
          item.opportunityId,
        
          {
           wonInd:true
          },

         
        )
        
      }
    />
  </Tooltip>

  &nbsp; &nbsp;
  <Tooltip 
    title={<FormattedMessage
      id="app.drop"
      defaultMessage="Lost"
    />}

  >
    <StopTwoTone
      type="stop"
      theme="twoTone"
      twoToneColor="red"
      size={140}
      style={{fontSize:"0.8rem" 
      
     }}
     onClick={() => 
    props.lostStatusRecruit(
      item.opportunityId,
          {
           lostInd:true
          },
        )
      }
    />
  </Tooltip>
</>
)}</div>

<div class="flex  justify-between" >
<h4>
Sales Rep
</h4>
<span>
<MultiAvatar2
primaryTitle={item.assignedTo}
imgWidth={"1.8em"}
imgHeight={"1.8em"}
/>
</span>
</div>
<div class="flex  justify-between" >
<h4>
Owner
</h4>
<Tooltip title={item.ownerName}>
<span>
<MultiAvatar
primaryTitle={item.ownerName}
imageId={item.ownerImageId}
 imageURL={item.imageURL}
imgWidth={"2.1em"}
imgHeight={"2.1em"}
/>
</span>
</Tooltip>
</div>
      <div class="flex  justify-between" >
             <div>
             <Tooltip title='Click to Close'>

<span
onClick={() => {
props.LinkClosedOpportunity(
item.opportunityId,
{
 closeInd:true,
}        
);         
}}         
style={{            
fontSize: "0.9em",
cursor: "pointer",
}}
>
<LockOpenIcon  style={{fontSize:"0.8rem" }}/>
</span>
</Tooltip> 
&nbsp;
<span

style={{ cursor: "pointer" }}
onClick={() => {
props.getAllRecruitmentByOppId(item.opportunityId );
            props.getAllRecruitmentPositionByOppId(item.opportunityId );
          props.getAllRecruitmentAvgTimeByOppId(item.opportunityId );
          props.getAllRecruitmentPositionFilledByOppId(item.opportunityId );
          props.getAllRecruitmentDetailsByOppId(item.opportunityId)
          props.handleOpportunityDrawerModal(true);
          props.getOpportunitySKill(item.oppInnitiative)
          props.getOpportunityInitiativeSKillDetails(item.opportunityId)
          props.getOpportunityForecast(item.opportunityId)
          handleSetCurrentOpportunityId(item);
        
          handleSetCurrentItem(item);
}}
>{user.pulseAccessInd ===true && ( 
<MonitorHeartIcon style={{fontSize:"0.8rem"  ,color: "#df9697"}}/>
 )}
</span>
             </div>
             <div>
             <Tooltip
title={
<FormattedMessage
id="app.edit"
defaultMessage="Edit"
/>
}
>
{user.opportunityUpdateInd ===true && (

<span
style={{ cursor: "pointer", color: "blue" }}
onClick={() => {
  props.setEditOpportunity(item);
  handleUpdateOpportunityModal(true);
  handleSetCurrentOpportunityId(item);
}}
>
   <BorderColorIcon  style={{fontSize:"0.8rem" }}/>
</span>
)}
</Tooltip>
&nbsp;
<StyledPopconfirm
title="Do you want to delete?"
onConfirm={() => deleteOpportunityData(item.opportunityId)}
>

{user.opportunityDeleteInd ===true && (
<DeleteIcon
type="delete" style={{ cursor: "pointer", color: "red",fontSize:"0.8rem"  }} />
)}
</StyledPopconfirm>
             </div>
</div>           
        
         
          
      </CardElement>
   )  
})}
</CardWrapper> */}