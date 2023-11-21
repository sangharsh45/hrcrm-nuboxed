import React, { useEffect, useState } from "react";
import { StyledPopconfirm } from "../../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import OpenInBrowserIcon from "@mui/icons-material/OpenInBrowser";
import { getSectors } from "../../../Settings/Sectors/SectorsAction";
import { MultiAvatar, SubTitle } from "../../../../Components/UI/Elements";
import "jspdf-autotable";
import { OnlyWrapCard } from "../../../../Components/UI/Layout";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DeleteIcon from "@mui/icons-material/Delete";
import { DeleteOutlined } from "@ant-design/icons";
import { getCountries } from "../../../Auth/AuthAction";
import { Link } from "../../../../Components/Common";
import {
  getAllLeads,
  deleteLeadsData,
  setEditLeads,
  handleLeadsNotesDrawerModal,
  handleUpdateLeadsModal,
  handleLeadsEmailDrawerModal,
  getLeadDetailsById,
  updateTypeForLead,
  handleCETmodal,
} from "../../../Leads/LeadsAction";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactCountryFlag from "react-country-flag";
import AddchartIcon from "@mui/icons-material/Addchart";
import { Button, Tooltip } from "antd";
import StatusCustomerToggle from "./StatusCustomerToggle";
import { FormattedMessage } from "react-intl";
import UpdateLeadsModal from "../UpdateLeads/UpdateLeadsModal";
import AddLeadsEmailDrawerModal from "../UpdateLeads/AddLeadsEmailDrawerModal";
import { BundleLoader } from "../../../../Components/Placeholder";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import OpenCETmodal from "./OpenCETmodal";
import AddLeadsNotesDrawerModal from "../AddLeadsNotesDrawerModal";

const ButtonGroup = Button.Group;

const LeadsAllCardList = (props) => {
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    setPage(page + 1);
    props.getAllLeads(page,"creationdate");
    props.getSectors();
    props.getCountries();
  }, []);

  const [currentLeadsId, setCurrentLeadsId] = useState("");
  const [rowdata, setrowData] = useState({});

  const handleRowData = (data) => {
    setrowData(data);
  };
  const handleLoadMore = () => {
    setPage(page + 1);
    props.getAllLeads(page,props.filter?props.filter:"creationdate");
};
  function handleSetCurrentLeadsId(item) {
    setCurrentLeadsId(item);
  }
  const {
    deleteLeadsData,
    handleUpdateLeadsModal,
    handleLeadsNotesDrawerModal,
    updateLeadsModal,
    fetchingAllLeads,
    allleadsInfo,
    user,
  } = props;

  return (
    <>
     <div className=' flex justify-end sticky top-28 z-auto'>
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
        <div className="w-12"></div>

      </div>
      <InfiniteScroll
        dataLength={allleadsInfo.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingAllLeads?<h4 style={{ textAlign: 'center' }}>Loading...</h4>:null}
        height={"75vh"}
      >
        {allleadsInfo.map((item) => {
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
           
                    <h4 class=" text-xs text-cardBody font-poppins">
                      {item.countryDialCode && item.phoneNumber
                        ? `${item.countryDialCode} ${item.phoneNumber}`
                        : "Not Available"}
                     
                    </h4>
                  </div>
                  <div className=" flex font-medium flex-col md:w-36 max-sm:flex-row w-full max-sm:justify-between ">
                   
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
                  
                    <h4 class=" text-xs text-cardBody font-semibold  font-poppins">
                      {item.companyName || "Not Available"}
                    </h4>
                  </div>
                  <div class="rounded-full bg-white  h-5 cursor-pointer w-8 justify-cente">
                    {item.url !== null ? (
                      <Tooltip title={item.url}>
                        <span
                       
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
                   
                    <h4 class=" text-xs text-cardBody font-poppins">
                      {item.sector}
                    </h4>
                  </div>
                </div>
                <div class="flex md:items-center ">
                  <div className=" flex font-medium flex-col md:w-32 max-sm:flex-row w-full max-sm:justify-between ">
                  

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
                   

                    <div class=" text-xs text-cardBody font-poppins"></div>
                    <div>
                      <StatusCustomerToggle
                        type={props.convertInd ? "primary" : "danger"}
                        leadsId={item.leadsId}
                        convertInd={item.convertInd}
                      />
                    </div>
                  </div>
                  <div class="flex flex-col w-[6%] max-sm:flex-row max-sm:w-[10%]">
                    <div>
                      <Tooltip title="Notes">
                        <NoteAltIcon
                          onClick={() => {
                            handleLeadsNotesDrawerModal(true);
                            handleRowData(item);
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
                            props.handleCETmodal(true);
                            handleRowData(item);
                          }}
                        />
                      </Tooltip>
                    </div>
                  </div>

                  <div class="flex flex-col w-[6%] max-sm:flex-row max-sm:w-[10%]">
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
                        
                          <DeleteOutlined
                            type="delete"
                            style={{
                              cursor: "pointer",
                              color: "red",
                              fontSize: "1rem",
                            }}
                          />
                     
                        </StyledPopconfirm>
                      </div>
                    )}
                    <div></div>
                  </div>
                  <div class="flex flex-col w-[4%] max-sm:flex-row max-sm:w-[10%]">
                    <div>
                      <Tooltip
                        overlayStyle={{ maxWidth: "300px" }}
                        title={dataLoc}
                      >
                        <span
                          style={{
                          
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
    </>
  );
};

const mapStateToProps = ({ auth, leads, sector }) => ({
  allleadsInfo: leads.allleadsInfo,
  userId: auth.userDetails.userId,
  lead: leads.lead,
  user: auth.userDetails,
  countries: auth.countries,
  sectors: sector.sectors,
  updateLeadsModal: leads.updateLeadsModal,
  addDrawerLeadsEmailModal: leads.addDrawerLeadsEmailModal,
  fetchingAllLeads: leads.fetchingAllLeads,
  openCETmodal: leads.openCETmodal,
  addDrawerLeadsNotesModal: leads.addDrawerLeadsNotesModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAllLeads,
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

export default connect(mapStateToProps, mapDispatchToProps)(LeadsAllCardList);
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
