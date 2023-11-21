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
import DeleteIcon from "@mui/icons-material/Delete";
import { StyledTable, StyledPopconfirm } from "../../../../Components/UI/Antd";
import {
  MultiAvatar,
  SubTitle,
} from "../../../../Components/UI/Elements";
import {
  getDeletedOpportunity,
} from "../../OpportunityAction";
import AddOpportunityDrawerModal from "./AddOpportunityDrawerModal";
import UpdateOpportunityModal from "../UpdateOpportunity/UpdateOpportunityModal";
import ReinstateToggle from "../../Child/ReinstateToggle"

function OpportunityDeletedCard(props) {
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  useEffect(() => {
    props.getDeletedOpportunity(page);
    setPage(page + 1);
  }, []);


  const handleLoadMore = () => {
    setPage(page + 1); 
      props.getDeletedOpportunity(page);
  }
    const [currentOpportunityId, setCurrentOpportunityId] = useState("");
    function handleSetCurrentOpportunityId(opportunityId,opportunityName) {
      setCurrentOpportunityId(opportunityId,opportunityName);
    }
    const {
      fetchingDeletedOpportunity,
      fetchingDeletedOpportunityError,
      deletedOpportunity,
      } = props;
      return (    
  <>

      <InfiniteScroll
        dataLength={deletedOpportunity.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingDeletedOpportunity?<h4 style={{ textAlign: 'center' }}>Loading...</h4>:null}
        height={"75vh"}
      >
 <CardWrapper>      
              {deletedOpportunity.map((item) => {
                 
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
              <MultiAvatar
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
              style={{ cursor: "pointer",color:"red" }}
              percent={findProbability}
              //disable={true}
              width={30}
               strokeColor={"#005075"}
             
            />
             {/* )}  */}
          </Tooltip>
        </Dropdown>
          </span></h4>
                    </div>  
                    <div class="flex  justify-between" >
    <h4>
    Sales Rep
    </h4>
    <span>
            <MultiAvatar
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
                          
<ReinstateToggle 
            opportunityId={item.opportunityId} 
            />
              </div>           
                      
                       
                        
                    </CardElement>
                 )  
            })}
              </CardWrapper>
  

      </InfiniteScroll>
    </>
  );
}


const mapStateToProps = ({ auth, account, opportunity }) => ({
  fetchingDeletedOpportunity: opportunity.fetchingDeletedOpportunity,
  fetchingDeletedOpportunityError: opportunity.fetchingDeletedOpportunityError,
  deletedOpportunity: opportunity.deletedOpportunity,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDeletedOpportunity,
    },
    dispatch
  );
export default connect(
mapStateToProps,
mapDispatchToProps
)(OpportunityDeletedCard);

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