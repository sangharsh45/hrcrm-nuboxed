
import React, { useEffect, useState} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import { MultiAvatar,MultiAvatar2, SubTitle } from "../../../../../Components/UI/Elements";
import "jspdf-autotable";
import { OnlyWrapCard } from '../../../../../Components/UI/Layout'
import {
    getAllDeals
} from "../../../DealAction";
import { CurrencySymbol } from "../../../../../Components/Common"; 
import { Button, Tooltip,Dropdown ,Menu,Progress} from "antd";
import { FormattedMessage } from "react-intl";
import InfiniteScroll from "react-infinite-scroll-component";
import { BundleLoader } from "../../../../../Components/Placeholder";

const ButtonGroup = Button.Group;

const DealsAllCardList = (props) => {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    props.getAllDeals("all",page);
    setPage(page + 1);
    // props.getSectors();
    // props.getCountries();
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

  if (fetchingAllDealsData) {
    return <BundleLoader />;
  }

  return (
    <>
   <OnlyWrapCard style={{backgroundColor:"#E3E8EE"}}><div className=" flex justify-between w-[98%] p-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" md:w-[12rem]"><FormattedMessage
                  id="app.name"
                  defaultMessage="name"
                /></div>
        <div className=" md:w-20"><FormattedMessage
                  id="app.investor"
                  defaultMessage="investor"
                /></div>
        <div className=" md:w-32 "><FormattedMessage
                  id="app.sponsor"
                  defaultMessage="sponsor"
                /></div>
        <div className="md:w-32"><FormattedMessage
                  id="app.startdate"
                  defaultMessage="startdate"
                /></div>
        <div className="md:w-56"><FormattedMessage
                  id="app.proposalamt"
                  defaultMessage="proposalamt"
                /></div>
        <div className="md:w-20"><FormattedMessage
                  id="app.stages"
                  defaultMessage="stages"
                /></div> 
        <div className="md:w-24"><FormattedMessage
                  id="app.salesRep"
                  defaultMessage="salesRep"
                /></div>
        <div className="md:w-20"><FormattedMessage
                  id="app.owner"
                  defaultMessage="owner"
                /></div>
        <div className="md:w-20"></div>
        <div className="w-12"></div>

      </div>
      <InfiniteScroll
        dataLength={props.allDealsData.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingAllDealsData?<h4 style={{ textAlign: 'center' }}>Loading...</h4>:null}
        height={"75vh"}
      >
   {props.allDealsData.map((item) => { 
       var findProbability = item.probability;
       item.stageList.forEach((element) => {
         if (element.oppStage === item.oppStage) {
           findProbability = element.probability;
         }
       });
 const currentdate = moment().format("DD/MM/YYYY");
 const date = moment(item.creationDate).format("DD/MM/YYYY");
       
         const diff = Math.abs(
            moment().diff(moment(item.lastRequirementOn), "days")
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
                            <div className="flex rounded-xl justify-between mt-2 bg-white h-11 items-center p-1"
                                // style={{
                                //     borderBottom: "3px dotted #515050"
                                // }}
                                >
                                     <div class="flex justify-between">
                                <div className=" flex font-medium flex-col w-[12rem]   max-sm:w-full">
                                <div className="flex max-sm:w-full"> 
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
                                            {/* <h4 class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden">
                                            Name
                                            </h4> */}
                                            <h4 class=" text-[0.82rem] text-blue-500 text-cardBody font-poppins font-semibold  cursor-pointer">
                                                
                                                {/* <Link
                                                 toUrl={`customer/${item.customerId}`}
                                                 title={`${item.name}`} 
                                               > */}
                                              {item.opportunityName}
                                               {/* </Link> */}
                                               &nbsp;&nbsp;
                                               {date === currentdate ? (
                                                 <span
                                                   style={{
                                                     color: "tomato",
                                                     fontWeight: "bold",
                                                   }}
                                                 >
                                                   New
                                                 </span>
                                               ) : null}
                                              
                                                                                   </h4>
                                            </div>
                                        </Tooltip>
                                        </div>
                                        </div>
                                </div>
                                <div className=" flex font-medium flex-col  md:w-44 max-sm:flex-row w-full max-sm:justify-between ">

<h4 class=" text-sm text-cardBody font-poppins">   

{item.investor}

</h4>
</div>

<div className=" flex font-medium flex-col md:w-44 max-sm:flex-row w-full max-sm:justify-between ">


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
<div class="flex">
<div className=" flex font-medium flex-col md:w-36 max-sm:flex-row w-full max-sm:justify-between ">


<div class=" text-sm justify-center text-cardBody font-poppins">
{moment(item.startDate).format("ll")}
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
<MultiAvatar2
primaryTitle={item.assignedTo}
imgWidth={"1.8rem"}
imgHeight={"1.8rem"}
/>
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
                })}
                  </InfiniteScroll>
      </OnlyWrapCard>
      {/* <UpdateLPitchModal
        item={currentLeadsId}
        updatePitchModal={props.updatePitchModal}
        // updateLeadsModal={updateLeadsModal}
        handleUpdatePitchModal={props.handleUpdatePitchModal}
        // handleSetCurrentLeadsId={handleSetCurrentLeadsId}
      /> */}
      {/* <AddLeadsEmailDrawerModal
        item={currentLeadsId}
        handleSetCurrentLeadsId={handleSetCurrentLeadsId}
        addDrawerLeadsEmailModal={props.addDrawerLeadsEmailModal}
        handleLeadsEmailDrawerModal={props.handleLeadsEmailDrawerModal}
      /> */}
      {/* <OpenASSimodal 
        rowdata={rowdata}
        openASSImodal={props.openASSImodal}
      handleAssimodal={props.handleAssimodal}
      />
         <AddPitchNotesDrawerModal 
       item={currentLeadsId}
        addDrawerPitchNotesModal={props.addDrawerPitchNotesModal}
        handlePitchNotesDrawerModal={props.handlePitchNotesDrawerModal}
      /> */}
    </>
  );
};

const mapStateToProps = ({ auth, leads,deal, sector,pitch }) => ({
//   leadsAllData: leads.leadsAllData,
user: auth.userDetails,
  userId: auth.userDetails.userId,
  fetchingAllDealsData:deal.fetchingAllDealsData,
  addDrawerPitchNotesModal:pitch.addDrawerPitchNotesModal,
  updatePitchModal:pitch.updatePitchModal,
  openASSImodal:pitch.openASSImodal,
  allDealsData:deal.allDealsData
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getAllDeals,
        // deletePitchData,
        // handleUpdatePitchModal,
        // setEditPitch,
        // updateTypeForPitch,
        // handlePitchNotesDrawerModal,
        // handleAssimodal
 
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(DealsAllCardList);
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