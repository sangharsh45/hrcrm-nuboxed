
import React, { useEffect, useState} from "react";
import { StyledPopconfirm} from "../../../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import ExploreIcon from "@mui/icons-material/Explore";
import { DeleteOutlined } from "@ant-design/icons";
import { MultiAvatar, SubTitle } from "../../../../../Components/UI/Elements";
import "jspdf-autotable";
import { OnlyWrapCard } from '../../../../../Components/UI/Layout'
import {
    getAllDeals
//   deletePitchData,
//   handleUpdatePitchModal,
//   setEditPitch,
//   handlePitchNotesDrawerModal,
//   updateTypeForPitch,
//   handleAssimodal
} from "../../../DealAction";
import ReactCountryFlag from 'react-country-flag';
import AddchartIcon from '@mui/icons-material/Addchart';  
import { Button, Tooltip } from "antd";
import { FormattedMessage } from "react-intl";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import InfiniteScroll from "react-infinite-scroll-component";
// import AddPitchNotesDrawerModal from "./AddPitchNotesDrawerModal";
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
        <div className=" md:w-[12rem]">Name</div>
        <div className=" md:w-[5.5rem]"></div>
        <div className=" md:w-32 ">Phone #</div>
        <div className="md:w-32">Country</div>
        <div className="md:w-52">Company</div>
        {/* <div className="md:w-20">Sector</div>  */}
        <div className="md:w-24">Assigned to</div>
        <div className="md:w-20">Owner</div>
        <div className="md:w-20">Qualify</div>
        <div className="w-12">Action</div>

      </div>
      <InfiniteScroll
        dataLength={props.allDealsData.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingAllDealsData?<h4 style={{ textAlign: 'center' }}>Loading...</h4>:null}
        height={"75vh"}
      >
   {props.allDealsData.map((item) => { 
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
                                <div class="flex flex-row items-center md:w-3/12 max-sm:flex-row w-full max-sm:justify-between">

<div><ButtonGroup>
<RoleButton
 type="Warm"
 iconType="	fas fa-burn"
 // tooltip="Warm"
 tooltip={<FormattedMessage
   id="app.warm"
   defaultMessage="Warm"
 />}
 role={item.type}
 onClick={() =>{
 const typ="Warm"
   props.updateTypeForPitch(item.investorLeadsId,typ)
 }}
/>
</ButtonGroup></div>

  


     <div>
     <ButtonGroup>
<RoleButton
 type="Hot"
 iconType="fas fa-mug-hot"
 // tooltip="Hot"
 tooltip={<FormattedMessage
   id="app.hot"
   defaultMessage="Hot"
 />}
 role={item.type}
 onClick={() =>{
  const typ="Hot"
   props.updateTypeForPitch(item.investorLeadsId,typ)
 }}
/>
</ButtonGroup>
</div>
     <div>
<ButtonGroup>
<RoleButton
 type="Cold"
 iconType="far fa-snowflake"
 // tooltip="Cold"
 tooltip={<FormattedMessage
   id="app.cold"
   defaultMessage="Cold"
 />}
 role={item.type}
 onClick={() => {
  const typ="Cold"
   props.updateTypeForPitch(item.investorLeadsId,typ)
 }}
/>
</ButtonGroup>
</div>

</div>  
     </div>  
                                <div class="flex justify-between md:ml-4">
                                <div className=" flex font-medium flex-col  md:w-44 max-sm:flex-row w-full max-sm:justify-between ">
                           {/* <h4 class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden"> Phone # </h4> */}

                           <h4 class="text-[0.82rem] text-cardBody font-poppins">
  {item.countryDialCode && item.phoneNumber
    ? `${item.countryDialCode} ${item.phoneNumber}`
    : 'Not available'}
</h4>

                       </div>
                       <div className=" flex font-medium flex-col md:w-[7rem] max-sm:flex-row w-full max-sm:justify-between ">
                                  

                                  {/* <h4 class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden">Country</h4> */}
                                  <h4 class=" text-[0.82rem] text-cardBody font-poppins">
                                    <ReactCountryFlag
                          countryCode={item.countryAlpha2Code}
                          svg
                          style={{
                            width: '1em',
                            height: '1em',
                          }}
                        />
                        &nbsp;
                       {item.address && item.address.length && item.address[0].country}
                                    </h4>
                              </div>
                              </div>
                       <div class="flex justify-between  max-sm:mb-2 ">
                       <div className=" flex font-medium flex-col  md:w-[9rem] max-sm:flex-row w-full max-sm:justify-between ">
                           {/* <h4 class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden"> Company </h4> */}
                           <h4 className="text-[0.82rem] text-cardBody font-poppins">
                           {item.companyName || "Not Available"}
</h4>

                       </div>
                       <div class="rounded-full bg-white  h-5 cursor-pointer w-8">
                    {item.url !== null ? (
              <Tooltip title={item.url}>
                <span
                  //type="edit"
                  style={{ cursor: "pointer" }}
                  onClick={() => {}}
                >
                  {" "}
                  <a href={`item.url`} target="_blank">
                    <ExploreIcon
                      style={{ cursor: "pointer", color: "green" ,fontSize: "1rem",}}
                    />
                  </a>
                </span>
              </Tooltip>
            ) : null}
                        </div>
                                {/* <div className=" flex font-medium flex-col  md:w-[6rem] max-sm:flex-row w-full max-sm:justify-between ">
                           
                                    <h4 class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden"> Sector </h4>
                                    <h4 class=" text-[0.82rem] text-cardBody font-poppins">   
                                    {item.sector}
                                    </h4>
                                </div> */}
                                </div>
                               
          
     <div class="md:w-[1%]"></div>
     <div class="flex justify-between max-sm:mb-1 md:items-center">
     <div class="flex justify-between max-sm:w-[50%] ">
     <div className=" flex font-medium flex-col md:w-32 max-sm:flex-row w-full max-sm:justify-between ">
                                    {/* <h4 class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden">Assigned to</h4> */}

                                    <div class=" text-[0.82rem] text-cardBody font-poppins">
                                    
                                    <span>
              {item.assignedTo === null ? (
                "None"
              ) : (
                <MultiAvatar
                  primaryTitle={item.assignedTo}
                  imgWidth={"1.8em"}
                  imgHeight={"1.8em"}
                />
              )}
            </span>
             
                                    </div>
                                </div>
     <div className=" flex font-medium flex-col md:w-20  max-sm:flex-row w-full max-sm:justify-between">
                       
                       {/* <h4 class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden">Owner</h4> */}

                       <span>
              <MultiAvatar
                primaryTitle={item.ownerName}
                imageId={item.ownerImageId}
                imageURL={item.imageURL}
                imgWidth={"1.8rem"}
                imgHeight={"1.8rem"}
              />
            </span>
                   </div>
                               
              
 
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