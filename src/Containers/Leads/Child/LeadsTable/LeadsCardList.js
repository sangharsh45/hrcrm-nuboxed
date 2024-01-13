import React, { useEffect, useState } from "react";
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import OpenInBrowserIcon from "@mui/icons-material/OpenInBrowser";
import { getSectors } from "../../../Settings/Sectors/SectorsAction";
import { MultiAvatar, SubTitle } from "../../../../Components/UI/Elements";
import "jspdf-autotable";
import { OnlyWrapCard } from "../../../../Components/UI/Layout";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { DeleteOutlined } from "@ant-design/icons";
import { getCountries } from "../../../Auth/AuthAction";
import {
  getLeads,
  deleteLeadsData,
  setEditLeads,
  handleLeadsNotesDrawerModal,
  handleUpdateLeadsModal,
  handleLeadsEmailDrawerModal,
  getLeadDetailsById,
  updateTypeForLead,
  handleCETmodal,
  emptyLeads,
  handleLeadsConfirmationModal
} from "../../../Leads/LeadsAction";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactCountryFlag from "react-country-flag";
import AddchartIcon from "@mui/icons-material/Addchart";
import { Button, Tooltip } from "antd";
import { FormattedMessage } from "react-intl";
import UpdateLeadsModal from "../UpdateLeads/UpdateLeadsModal";
import AddLeadsEmailDrawerModal from "../UpdateLeads/AddLeadsEmailDrawerModal";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import OpenCETmodal from "./OpenCETmodal";
import AddLeadsNotesDrawerModal from "../AddLeadsNotesDrawerModal";
import AddConfirmLedsStatusModal from "./AddConfirmLedsStatusModal";

const ButtonGroup = Button.Group;

const LeadsCardList = (props) => {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    setPage(page + 1);
    props.getLeads(props.userId, page,"creationdate");
    props.getSectors();
    props.getCountries();
  }, []);

  useEffect(() => {
    return () => props.emptyLeads();
  }, []);

  const [currentLeadsId, setCurrentLeadsId] = useState("");
  const [rowdata, setrowData] = useState("");

  const handleRowData = (data) => {
    setrowData(data);
  };
  const handleLoadMore = () => {
   
    setPage(page + 1);
    props.getLeads(
      props.currentUser ? props.currentUser : props.userId,
      page,
      props.filter?props.filter:"creationdate"
    );
};
  function handleSetCurrentLeadsId(item) {
    setCurrentLeadsId(item);
  }
  const handleToggleCollection=(checked)=>{
    if(checked ){
        props.handleLeadsConfirmationModal(true)
    }
    }
  const {
    deleteLeadsData,
    handleUpdateLeadsModal,
    handleLeadsNotesDrawerModal,
    updateLeadsModal,
    fetchingLeads,
    leadsAllData,
    user,
  } = props;

   return (
    <>
     <div className=' flex justify-end sticky top-28 z-auto'>
      <OnlyWrapCard style={{backgroundColor:"#E3E8EE"}}>
      <div className=" flex justify-between w-[99%] p-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" md:w-[8.1rem]">Name</div>
        <div className=" md:w-[6.1rem]"></div>
        <div className=" md:w-[4.2rem] ">Phone #</div>
        <div className="md:w-[5.8rem]">Country</div>
        <div className="md:w-[8.5rem]">Company</div>
        <div className="md:w-[3.8rem]">Sector</div> 
        <div className="md:w-[5.2rem]">Assigned to</div>
        <div className="md:w-[1.5rem]">Owner</div>
        <div className="md:w-[3.3rem]">Qualify</div>
        <div className="w-12"></div>

      </div>
      <InfiniteScroll
        dataLength={leadsAllData.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingLeads?<h4 style={{ textAlign: 'center' }}>Loading...</h4>:null}
        height={"75vh"}
      >
        {leadsAllData.map((item) => {
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
               (item.address &&
                 item.address.length &&
                 item.address[0].country) ||
               ""
             } 
               PostalCode : ${
                 item.address &&
                 item.address.length &&
                 item.address[0].postalCode
               } `;
          return (
            <div>
              <div
                className="flex rounded-xl justify-between bg-white mt-[0.5rem] h-[2.75rem] items-center p-3"
              >
                <div class="flex ">
                  <div className=" flex font-medium flex-col w-[14rem]   max-sm:w-full">
                    <div className="flex max-sm:w-full ">
                      <div>
                        <SubTitle>
                          <MultiAvatar
                            primaryTitle={item.name}
                            imageId={item.imageId}
                            imageURL={item.imageURL}
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
                              {item.name}
                              &nbsp;&nbsp;
                              {date === currentdate ? (
                                <span class="text-xs"
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

                  <div class="flex flex-row items-center md:w-[11%] max-sm:flex-row w-full max-sm:justify-between">
                    <div>
                      <ButtonGroup>
                        <RoleButton
                          type="Warm"
                          iconType="	fas fa-burn"
                          // tooltip="Warm"
                          tooltip={
                            <FormattedMessage
                              id="app.warm"
                              defaultMessage="Warm"
                            />
                          }
                          role={item.type}
                          onClick={() => {
                            const typ = "Warm";
                            props.updateTypeForLead(item.leadsId, typ);
                          }}
                        />
                      </ButtonGroup>
                    </div>

                    <div>
                      <ButtonGroup>
                        <RoleButton
                          type="Hot"
                          iconType="fas fa-mug-hot"
                          // tooltip="Hot"
                          tooltip={
                            <FormattedMessage
                              id="app.hot"
                              defaultMessage="Hot"
                            />
                          }
                          role={item.type}
                          onClick={() => {
                            const typ = "Hot";
                            props.updateTypeForLead(item.leadsId, typ);
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
                          tooltip={
                            <FormattedMessage
                              id="app.cold"
                              defaultMessage="Cold"
                            />
                          }
                          role={item.type}
                          onClick={() => {
                            const typ = "Cold";
                            props.updateTypeForLead(item.leadsId, typ);
                          }}
                        />
                      </ButtonGroup>
                    </div>
                  </div>
                </div>
                <div class="flex">
                  <div className=" flex font-medium flex-col  md:w-32 max-sm:flex-row w-full max-sm:justify-between ">
                    {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden">
                      {" "}
                      Phone #{" "}
                    </h4> */}
                    <h4 class=" text-xs text-cardBody font-poppins">
                      {item.countryDialCode && item.phoneNumber
                        ? `${item.countryDialCode} ${item.phoneNumber}`
                        : "Not Available"}
                      {/* {`${item.countryDialCode} ${item.phoneNumber}`} */}
                    </h4>
                  </div>
                  <div className=" flex font-medium flex-col md:w-36 max-sm:flex-row w-full max-sm:justify-between ">
                    {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden">
                      Country
                    </h4> */}
                    <h4 class=" text-xs text-cardBody font-poppins">
                      <ReactCountryFlag
                        countryCode={item.countryAlpha2Code}
                        svg
                        style={{
                          width: "1em",
                          height: "1em",
                        }}
                        title={item.country}
                      />
                      &nbsp;
                      {item.address &&
                        item.address.length &&
                        item.address[0].country}
                    </h4>
                  </div>
                </div>
                <div class="flex">
                  <div className=" flex font-medium flex-col  md:w-[10rem] max-sm:flex-row w-full max-sm:justify-between ">
                    {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden">
                      {" "}
                      Company{" "}
                    </h4> */}
                    <h4 class=" text-xs text-cardBody font-semibold  font-poppins">
                      {item.companyName || "Not Available"}
                    </h4>
                  </div>
                  <div class="rounded-full bg-white  h-5 cursor-pointer w-8 justify-cente">
                    {item.url !== null ? (
                      <Tooltip title={item.url}>
                        <span
                          //type="edit"
                          style={{ cursor: "pointer" }}
                          onClick={() => {}}
                        >
                          {" "}
                          <a href={`https://www.${item.url}`} target="_blank">
                            <OpenInBrowserIcon
                              style={{
                                cursor: "pointer",
                                color: "green",
                                fontSize: "1rem",
                              }}
                            />
                          </a>
                        </span>
                      </Tooltip>
                    ) : null}
                  </div>

                  <div className=" flex font-medium flex-col  md:w-32 max-sm:flex-row w-full max-sm:justify-between ">
                    {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden">
                      {" "}
                      Sector{" "}
                    </h4> */}
                    <h4 class=" text-xs text-cardBody font-poppins">
                      {item.sector}
                    </h4>
                  </div>
                </div>
                <div class="flex md:items-center ">
                  <div className=" flex font-medium flex-col md:w-32 max-sm:flex-row w-full max-sm:justify-between ">
                    {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden">
                      Assigned to
                    </h4> */}

                    <div class=" text-xs text-cardBody font-poppins">
                      <span>
                        {item.assignedTo === null ? (
                          "None"
                        ) : (
                          <MultiAvatar
                            primaryTitle={item.assignedTo}
                            imgWidth={"1.8rem"}
                            imgHeight={"1.8rem"}
                          />
                        )}
                      </span>
                    </div>
                  </div>
                  <div className=" flex font-medium flex-col md:w-20  max-sm:flex-row w-full max-sm:justify-between">
                    {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden">
                      Owner
                    </h4> */}

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
                  <div className=" flex font-medium flex-col md:w-[6rem] max-sm:flex-row w-full max-sm:justify-between ">
                    {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden">
                      Qualify
                    </h4> */}

                    <div class=" text-xs text-cardBody font-poppins"></div>
                    <div>
                    <Tooltip title="Qualify? Lead will move to Customer section!">
                        <ConnectWithoutContactIcon
                          onClick={() => {
                            handleRowData(item);
                            props.handleLeadsConfirmationModal(true);
                         
                          }}
                          style={{
                            // color: "green",
                            cursor: "pointer",
                            fontSize: "1.5rem",
                          }}
                        />
                      </Tooltip>
                      {/* <StatusCustomerToggle
                        rowdata={rowdata}
                        handleToggleCollection={handleToggleCollection}
                        // handleLeadsConfirmationModal={props.handleLeadsConfirmationModal}
                        type={props.convertInd ? "primary" : "danger"}
                        leadsId={item.leadsId}
                        convertInd={item.convertInd}
                      /> */}
                    </div>
                  </div>
                  <div class="flex flex-col w-[10%] max-sm:flex-row max-sm:w-[10%]">
                    <div>
                      <Tooltip title="Notes">
                        <NoteAltIcon
                          onClick={() => {
                            handleRowData(item);
                            handleLeadsNotesDrawerModal(true);
                         
                          }}
                          style={{
                            color: "green",
                            cursor: "pointer",
                            fontSize: "1rem",
                          }}
                        />
                      </Tooltip>
                    </div>
                    <div>
                      <Tooltip
                        title={
                          <FormattedMessage
                            id="app.activity"
                            defaultMessage="Activity"
                          />
                        }
                      >
                        <AddchartIcon
                          style={{ fontSize: "1rem", cursor: "pointer" }}
                          onClick={() => {
                                handleRowData(item);
                            props.handleCETmodal(true);
                        
                          }}
                        />
                      </Tooltip>
                    </div>
                  </div>

                  <div class="flex flex-col w-[10%] max-sm:flex-row max-sm:w-[10%]">
                    {user.leadsUpdateInd === true && user.crmInd === true && (
                      <div>
                        <Tooltip title="Edit">
                          <BorderColorIcon
                            style={{
                              color: "grey",
                              cursor: "pointer",
                              fontSize: "1rem",
                            }}
                            onClick={() => {
                              props.setEditLeads(item);
                              handleUpdateLeadsModal(true);
                              handleSetCurrentLeadsId(item);
                            }}
                          />
                        </Tooltip>
                      </div>
                    )}
                    {user.leadsDeleteInd === true && user.crmInd === true && (
                      <div>
                        <StyledPopconfirm
                          title="Do you want to delete?"
                          onConfirm={() => deleteLeadsData(item.leadsId)}
                        >
                          {/* {user.opportunityDeleteInd ===true && ( */}
                          <DeleteOutlined
                            type="delete"
                            style={{
                              cursor: "pointer",
                              color: "red",
                              fontSize: "1rem",
                            }}
                          />
                          {/* )} */}
                        </StyledPopconfirm>
                      </div>
                    )}
                    <div></div>
                  </div>
                  <div class="flex flex-col w-[2%] max-sm:flex-row max-sm:w-[10%]">
                    <div>
                      <Tooltip
                        overlayStyle={{ maxWidth: "300px" }}
                        title={dataLoc}
                      >
                        <span
                          style={{
                            // color:
                            //   showRes && item.orderId === orderId ? "orange" : "#1890ff",
                            cursor: "pointer",
                          }}
                        >
                          <LocationOnIcon
                            style={{
                              cursor: "pointer",
                              fontSize: "1rem",
                            }}
                          />
                        </span>
                      </Tooltip>
                    </div>
                    <div>
                      <Tooltip title={item.email}>
                        <MailOutlineIcon
                          type="mail"
                          style={{ cursor: "pointer", fontSize: "1rem" }}
                          onClick={() => {
                            handleSetCurrentLeadsId(item);
                            props.handleLeadsEmailDrawerModal(true);
                          }}
                        />
                      </Tooltip>{" "}
                    </div>
                  </div>
                  <div class="w-[2%]"></div>
                </div>
              </div>
            </div>
            // </div>
          );
        })}
         </InfiniteScroll>
      </OnlyWrapCard>
      </div>
      <UpdateLeadsModal
        item={currentLeadsId}
        updateLeadsModal={updateLeadsModal}
        handleUpdateLeadsModal={handleUpdateLeadsModal}
        handleSetCurrentLeadsId={handleSetCurrentLeadsId}
      />
      <AddLeadsEmailDrawerModal
        item={currentLeadsId}
        handleSetCurrentLeadsId={handleSetCurrentLeadsId}
        addDrawerLeadsEmailModal={props.addDrawerLeadsEmailModal}
        handleLeadsEmailDrawerModal={props.handleLeadsEmailDrawerModal}
      />
      <OpenCETmodal
        rowdata={rowdata}
        // item={currentLeadsId}
        // handleSetCurrentLeadsId={handleSetCurrentLeadsId}
        openCETmodal={props.openCETmodal}
        handleCETmodal={props.handleCETmodal}
      />
      <AddLeadsNotesDrawerModal
        rowdata={rowdata}
        addDrawerLeadsNotesModal={props.addDrawerLeadsNotesModal}
        handleLeadsNotesDrawerModal={props.handleLeadsNotesDrawerModal}
      />
          <AddConfirmLedsStatusModal
           rowdata={rowdata}
           handleRowData={handleRowData}
           addLeadsConfirmationModal={props.addLeadsConfirmationModal}
           handleLeadsConfirmationModal={props.handleLeadsConfirmationModal}
           />
    </>
  );
};

const mapStateToProps = ({ auth, leads, sector }) => ({
  leadsAllData: leads.leadsAllData,
  userId: auth.userDetails.userId,
  lead: leads.lead,
  user: auth.userDetails,
  countries: auth.countries,
  sectors: sector.sectors,
  updateLeadsModal: leads.updateLeadsModal,
  addDrawerLeadsEmailModal: leads.addDrawerLeadsEmailModal,
  fetchingLeads: leads.fetchingLeads,
  openCETmodal: leads.openCETmodal,
  addLeadsConfirmationModal:leads.addLeadsConfirmationModal,
  addDrawerLeadsNotesModal: leads.addDrawerLeadsNotesModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getLeads,
      emptyLeads,
      handleLeadsConfirmationModal,
      getSectors,
      deleteLeadsData,
      setEditLeads,
      handleUpdateLeadsModal,
      handleLeadsNotesDrawerModal,
      handleLeadsEmailDrawerModal,
      getLeadDetailsById,
      getCountries,
      updateTypeForLead,
      handleCETmodal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LeadsCardList);
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
