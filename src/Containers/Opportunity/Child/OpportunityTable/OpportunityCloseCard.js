import React, { useEffect, useState } from "react";
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
  MultiAvatar2,
  SubTitle,
} from "../../../../Components/UI/Elements";
import {
  getRecruiterList,
  handleUpdateOpportunityModal,
  setEditOpportunity,
  deleteCloseOpportunity,
  updateOwneroppById,
  getAllSalesList,
  handleOpportunityDrawerModal,
  getAllRecruitmentByOppId,
  getAllRecruitmentPositionByOppId,
  getAllRecruitmentAvgTimeByOppId,
  getAllRecruitmentPositionFilledByOppId,
  getAllRecruitmentDetailsByOppId,
  getOpportunitySKill,
  getCloseOpportunity,
  LinkClosedOpportunity,
} from "../../OpportunityAction";
import AddOpportunityDrawerModal from "./AddOpportunityDrawerModal";
import UpdateOpportunityModal from "../UpdateOpportunity/UpdateOpportunityModal";

function OpportunityCloseCard(props) {
  const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    useEffect(() => {
      if (props.role === "USER" && user.department === "Recruiter") {
        props.getRecruiterList(props.recruiterId);
      } else {
      }
      props.getAllSalesList();
      props.getCloseOpportunity(props.userId, page);
      setPage(page + 1);
    }, []);
  
    const handleLoadMore = () => {
      setPage(page + 1);
        props.getCloseOpportunity(props.userId, page);
    };
    const [currentOpportunityId, setCurrentOpportunityId] = useState("");
    function handleSetCurrentOpportunityId(opportunityId, opportunityName) {
        setCurrentOpportunityId(opportunityId, opportunityName);
        
      }
    const {
        user,
        closeOpportunity,
        handleUpdateOpportunityModal,
        updateOpportunityModal,
        fetchingCloseOpportunity
      } = props;
      return (    
  <>

      <InfiniteScroll
        dataLength={closeOpportunity.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingCloseOpportunity?<h4 style={{ textAlign: 'center' }}>Loading...</h4> :null}
        height={"75vh"}
      >
 <CardWrapper>      
              {closeOpportunity.map((item) => {
                 
                 var findProbability = 0;
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
          </span></h4>
                    </div>  
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
            <MultiAvatar2
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
     &nbsp;
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
              style={{ cursor: "pointer", color: "grey" }}
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
            onConfirm={() => deleteCloseOpportunity(item.opportunityId)}
          >
             {/* {user.userType !== "USER" && user.department !== "Recruiter" && (  */}
             {user.opportunityDeleteInd ===true && (
            <DeleteOutlined
            type="delete" style={{ cursor: "pointer", color: "red",fontSize:"0.8rem"  }} />
             )}
          </StyledPopconfirm>
                           </div>
              </div>           
                      
                       
                        
                    </CardElement>
                 )  
            })}
              </CardWrapper>
  

      </InfiniteScroll>
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
      allRecruitmentPositionFilledByOppId={
        props.allRecruitmentPositionFilledByOppId
      }
      allRecruitmentAvgTimeByOppId={props.allRecruitmentAvgTimeByOppId}
      allRecruitmentPositionByOppId={props.allRecruitmentPositionByOppId}
      handleOpportunityDrawerModal={props.handleOpportunityDrawerModal}
      addDrawerOpportunityModal={props.addDrawerOpportunityModal}
    />
  </>
);
}


const mapStateToProps = ({ auth, account, opportunity }) => ({
userId: auth.userDetails.userId,
user: auth.userDetails,
role: auth.userDetails.role,
opportunitySkills: opportunity.opportunitySkills,
sales: opportunity.sales,
recruiterName: opportunity.recruiterName,
recruiterList: opportunity.recruiterList,
fetchingRecruiterList: opportunity.fetchingRecruiterList,
fetchingRecruiterListError: opportunity.fetchingRecruiterListError,
fetchingOpportunity: opportunity.fetchingOpportunity,
fetchingOpportunityError: opportunity.fetchingOpportunityError,
fetchingAllOpportunities: opportunity.fetchingAllOpportunities,
closeOpportunity: opportunity.closeOpportunity,
updateOpportunityModal: opportunity.updateOpportunityModal,
recruiterId: auth.userDetails.userId,
fetchingCloseOpportunity: opportunity.fetchingCloseOpportunity,
fetchingCloseOpportunityError: opportunity.fetchingCloseOpportunityError,
closeOpportunity: opportunity.closeOpportunity,
opportunityByUserId: opportunity.opportunityByUserId,
opportunityId: opportunity.opportunityId,
addDrawerOpportunityModal: opportunity.addDrawerOpportunityModal,
allRecruitmentPositionByOppId: opportunity.allRecruitmentPositionByOppId,
allRecruitmentAvgTimeByOppId: opportunity.allRecruitmentAvgTimeByOppId,
allRecruitmentPositionFilledByOppId:
  opportunity.allRecruitmentPositionFilledByOppId,
allRecruitmentByOppId: opportunity.allRecruitmentByOppId,
allRecruitmentDetailsByOppId: opportunity.allRecruitmentDetailsByOppId,
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
    deleteCloseOpportunity,
    updateOwneroppById,
    getAllRecruitmentByOppId,
    getAllRecruitmentPositionByOppId,
    getAllRecruitmentAvgTimeByOppId,
    getAllRecruitmentPositionFilledByOppId,
    getAllRecruitmentDetailsByOppId,
    getCloseOpportunity,
    LinkClosedOpportunity,
  },
  dispatch
);
export default connect(
mapStateToProps,
mapDispatchToProps
)(OpportunityCloseCard);

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
    width:  -webkit-fill-available;
    
  }
`