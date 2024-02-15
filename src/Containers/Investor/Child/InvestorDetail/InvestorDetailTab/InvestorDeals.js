
import React, { useEffect, useState} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";
import { MultiAvatar,MultiAvatar2, SubTitle } from "../../../../../Components/UI/Elements";
import "jspdf-autotable";
import {getInvestorDeals
  } from "../../../InvestorAction";
import { CurrencySymbol } from "../../../../../Components/Common"; 
import { Button, Tooltip,Dropdown ,Menu,Progress} from "antd";
import { FormattedMessage } from "react-intl";
import InfiniteScroll from "react-infinite-scroll-component";
import { BundleLoader } from "../../../../../Components/Placeholder";
import { Link } from "react-router-dom/cjs/react-router-dom";

const ButtonGroup = Button.Group;

const InvestorDeals = (props) => {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    props.getInvestorDeals(props.investorDetails.investorId);
    
  }, []);

  const [currentLeadsId, setCurrentLeadsId] = useState("");
  const [rowdata, setrowData] = useState({});

  const handleRowData = (data) => {
    setrowData(data);
  };
  const handleLoadMore = () => {
    setPage(page + 1);
    props.getAllDeals("all",page);
      setPage(page + 1);
}
  function handleSetCurrentLeadsId(item) {
    setCurrentLeadsId(item);
  }
   const { user,deleteLeadsData, handleUpdateLeadsModal, updateLeadsModal,fetchingAllDealsData,leadsAllData  } = props;

//   if (fetchingAllDealsData) {
//     return <BundleLoader />;
//   }

  return (
    <>
  <div class="rounded-lg m-5 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
    <div className=" flex  w-[98%] justify-between p-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" md:w-[12rem]"><FormattedMessage
                  id="app.name"
                  defaultMessage="name"
                /></div>
        <div className=" md:w-[6.1rem]"><FormattedMessage
                  id="app.investor"
                  defaultMessage="investor"
                /></div>
        <div className=" md:w-[17.2rem] "><FormattedMessage
                  id="app.sponsor"
                  defaultMessage="sponsor"
                /></div>
        <div className="md:w-[10.1rem]"><FormattedMessage
                  id="app.startdate"
                  defaultMessage="startdate"
                /></div>
        <div className="md:w-[7.5rem]"><FormattedMessage
                  id="app.value"
                  defaultMessage="Value"
                /></div>
        <div className="md:w-[4.2rem]"><FormattedMessage
                  id="app.stages"
                  defaultMessage="stages"
                /></div> 
        <div className="md:w-[7.1rem]"><FormattedMessage
                  id="app.assignto"
                  defaultMessage="Assign To"
                /></div>
        <div className="md:w-[]"><FormattedMessage
                  id="app.owner"
                  defaultMessage="owner"
                /></div>

      </div>
      {/* <InfiniteScroll
        dataLength={props.allDealsData.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingAllDealsData?<div  class="flex justify-center">Loading...</div>:null}
        height={"75vh"}
      > */}
   {/* {props.investorDealsData.map((item) => { 
       var findProbability = item.probability;
       item.stageList.forEach((element) => {
         if (element.oppStage === item.oppStage) {
           findProbability = element.probability;
         }
       });
 const currentdate = dayjs().format("DD/MM/YYYY");
 const date = dayjs(item.creationDate).format("DD/MM/YYYY");
       
         const diff = Math.abs(
          dayjs().diff(dayjs(item.lastRequirementOn), "days")
          );
          const dataLoc = ` Address : ${
            item.address && item.address.length && item.address[0].address1
          } 
               Street : ${
                 item.address && item.address.length && item.address[0].street
               }   
              State : ${
                item.address && item.address.length && item.address[0].state
              }
             Country : ${
               (item.address && item.address.length && item.address[0].country) ||
               ""
             } 
               PostalCode : ${
                 item.address && item.address.length && item.address[0].postalCode
               } `;
                    return (
                        <div>
                            <div className="flex justify-between rounded-xl  mt-2 bg-white h-11 items-center p-1"
                                // style={{
                                //     borderBottom: "3px dotted #515050"
                                // }}
                                >
                                     <div class="flex justify-between">
                                <div className=" flex font-medium flex-col w-[12rem]   max-sm:w-full">
                                <div className="flex max-sm:w-full items-center"> 
<div>
<SubTitle>
            <MultiAvatar
              primaryTitle={item.opportunityName}
              imageId={item.imageId}
              imageURL={item.imageURL}
              imgWidth={"1.8em"}
              imgHeight={"1.8em"}
            />
          </SubTitle>
</div>
                                   <div class="w-[4%]">

                                   </div>

                                        <div class="max-sm:w-full" >
                                        <Tooltip>
                                          <div class="max-sm:w-full max-sm:justify-between flex md:flex-col">
                                            
                                            <div class=" text-[0.82rem] text-blue-500 text-cardBody font-poppins font-semibold  cursor-pointer">
                                                
                                                
                                              {item.opportunityName}
                                              
                                               &nbsp;&nbsp;
                                               {date === currentdate ? (
                                                 <span class="text-[tomato] font-bold"
                                            
                                                 >
                                                   New
                                                 </span>
                                               ) : null}
                                              
                                                                                   </div>
                                            </div>
                                        </Tooltip>
                                        </div>
                                        </div>
                                </div>
                                <div className=" flex font-medium flex-col  md:w-44 max-sm:flex-row w-full max-sm:justify-between ">

<div class=" text-sm text-cardBody font-poppins">   
<Link to ="/investor">
{item.investor}
</Link>
</div>
</div>

<div className=" flex font-medium flex-col md:w-44 max-sm:flex-row w-full max-sm:justify-between ">


<div class=" text-sm text-cardBody font-poppins">
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
</div>
<div class="flex">
<div className=" flex font-medium flex-col md:w-36 max-sm:flex-row w-full max-sm:justify-between ">


<div class=" text-sm justify-center text-cardBody font-poppins">
{dayjs(item.startDate).format("DD/MM/YYYY")}
</div>
</div>

<div className=" flex font-medium flex-col md:w-36 max-sm:flex-row w-full max-sm:justify-between ">


<div class=" text-sm text-cardBody font-poppins text-center">
<CurrencySymbol currencyType={item.currency} />
&nbsp;
{item.proposalAmount}

</div>
</div>
<div className=" flex font-medium flex-col md:w-36 max-sm:flex-row w-full max-sm:justify-between ">


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
<div className=" flex font-medium flex-col md:w-32 max-sm:flex-row w-full max-sm:justify-between ">


<div class=" text-sm text-cardBody font-poppins">

<span>
{item.assignedTo === null ? (
                "Not available"
              ) : (
                <>
                {item.assignedTo === item.ownerName ? (
                  
                  null
                ) : (
<MultiAvatar2
primaryTitle={item.assignedTo}
imgWidth={"1.8rem"}
imgHeight={"1.8rem"}
/>
  )}
  </>
              )}
</span>

</div>
</div>
<div className=" flex font-medium flex-col md:w-20 max-sm:flex-row w-full mb-1 max-sm:justify-between ">



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
                      </div>
                            </div>
                         


                    )
                })} */}
                  {/* </InfiniteScroll> */}
      </div>
      
    </>
  );
};

const mapStateToProps = ({ auth, leads,deal, sector,pitch }) => ({
    investorDealsData:deal.investorDealsData,
user: auth.userDetails,
userId: auth.userDetails.userId,
  
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getInvestorDeals,
       
 
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(InvestorDeals);
function RoleButton({ type, iconType, tooltip, role, size, onClick }) {
  console.log(role);
  console.log(type);
  if (role === type) {
    size = "1.37em";
  } else {
    size = "1em";
  }
  return (
    <Tooltip title={tooltip}>
      <Button
        style={{
          padding: "0.37em",
          borderColor: "transparent",
          color: role === type ? "#1890ff" : "grey",
        }}
        ghost={role !== type}
        onClick={onClick}
      >
        <i className={`${iconType}`} style={{ fontSize: "1.1rem" }}></i>
      </Button>
    </Tooltip>
  );
}