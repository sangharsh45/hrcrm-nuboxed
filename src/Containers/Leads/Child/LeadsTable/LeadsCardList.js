import React, { useEffect, useState, useMemo } from "react";
import { StyledPopconfirm, StyledTable } from "../../../../Components/UI/Antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import ExploreIcon from "@mui/icons-material/Explore";
import { getSectors } from "../../../Settings/Sectors/SectorsAction";
import { MultiAvatar, SubTitle } from "../../../../Components/UI/Elements";
import "jspdf-autotable";
import { OnlyWrapCard } from '../../../../Components/UI/Layout'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Highlighter from "react-highlight-words";
import DeleteIcon from "@mui/icons-material/Delete";
import { getCountries } from "../../../Auth/AuthAction";
import { Link } from "../../../../Components/Common";
import {
  getLeads,
  deleteLeadsData,
  setEditLeads,
  handleUpdateLeadsModal,
  handleLeadsEmailDrawerModal,
  getLeadDetailsById,
} from "../../../Leads/LeadsAction";
import { MailOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Tooltip, Input } from "antd";
import StatusCustomerToggle from "./StatusCustomerToggle";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import LeadsDetailView from "./LeadsDetailView";
import UpdateLeadsModal from "../UpdateLeads/UpdateLeadsModal";
import AddLeadsEmailDrawerModal from "../UpdateLeads/AddLeadsEmailDrawerModal";
import { BundleLoader } from "../../../../Components/Placeholder";
import BorderColorIcon from "@mui/icons-material/BorderColor";

const LeadsCardList = (props) => {

  useEffect(() => {
    props.getLeads(props.userId);
    props.getSectors();
    props.getCountries();
  }, []);

  const [currentLeadsId, setCurrentLeadsId] = useState("");

  function handleSetCurrentLeadsId(item) {
    setCurrentLeadsId(item);
    console.log(item);
  }
  const { deleteLeadsData, handleUpdateLeadsModal, updateLeadsModal } = props;

  const sectorsNameOption = props.sectors.map((item) => {
    return {
      text: item.sectorName,
      value: item.sectorName,
    };
  });

  const CountryTypeOption = props.countries.map((item) => {
    return {
      text: item.countryAlpha3Code || "",
      value: item.countryAlpha3Code,
    };
  });

  const ownerlistType = useMemo(() => {
    if (!props.sales) return [];
    return (
      props.sales.length &&
      props.sales.map((sales) => {
        return {
          text: sales.fullName || "",
          value: sales.fullName,
        };
      })
    );
  }, [props.sales]);

  const { fetchingLeads,leadsAllData } = props;
  if (fetchingLeads) {
    return <BundleLoader />;
  }


  return (
    <>
   <OnlyWrapCard>
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
               (item.address && item.address.length && item.address[0].country) ||
               ""
             } 
               PostalCode : ${
                 item.address && item.address.length && item.address[0].postalCode
               } `;
                    return (
                        <div>
                            <div className="flex justify-between mt-4"
                                style={{
                                    borderBottom: "3px dotted #515050"
                                }}>
                                     
                                <div className=" flex font-medium flex-col w-52 ">
                                <div className="flex"> 
<div>
<SubTitle>
            <MultiAvatar
              primaryTitle={item.name}
              imageId={item.imageId}
              imageURL={item.imageURL}
              imgWidth={"1.8em"}
              imgHeight={"1.8em"}
            />
          </SubTitle>
</div>
                                   &nbsp;
                                        <div>
                                        <Tooltip>
                                            <h4 class=" text-base text-cardBody font-poppins">
                                            Name
                                            </h4>
                                            <h4 class="text-base text-blue-500 text-cardBody font-poppins cursor-pointer">
                                                
         {/* <Link
           toUrl={`leads/${item.leadsId}`}
          title={`${item.name}`}
        >{item.name}</Link>&nbsp;&nbsp;
        {date === currentdate ? (
          <span
            style={{
              color: "tomato",
              fontWeight: "bold",
            }}
          >
            New
          </span>
        ) : null} */}
       
                                            </h4>

                                        </Tooltip>
                                        </div>
                                        </div>
                                </div>
                                <div className=" flex font-medium flex-col  w-52 ">
                           <h4 class=" text-base text-cardBody font-poppins"> Phone # </h4>
                           <h4 class=" text-base text-cardBody font-poppins">   
                           {/* {item.phone} */}
                           </h4>
                       </div>
                       <div className=" flex font-medium flex-col  w-52 ">
                           <h4 class=" text-base text-cardBody font-poppins"> Company </h4>
                           <h4 class=" text-base text-cardBody font-poppins">   
                           <Link
           toUrl={`leads/${item.leadsId}`}
          title={`${item.name}`}
        >{item.name}</Link>
                           </h4>
                       </div>
                                <div className=" flex font-medium flex-col  w-52 ">
                           
                                    <h4 class=" text-base text-cardBody font-poppins"> Sector </h4>
                                    <h4 class=" text-base text-cardBody font-poppins">   
                                    {item.sector}
                                    </h4>
                                </div>
                                <div className=" flex font-medium flex-col w-36 ">
                                  

                                    <h4 class=" text-base text-cardBody font-poppins">Country</h4>
                                    <h4 class=" text-base text-cardBody font-poppins">
                                    {/* <ReactCountryFlag countryCode="NL" svg /> */}
                                    {/* <ReactCountryFlag
                          countryCode={item.country}
                          svg
                          style={{
                            width: '1em',
                            height: '1em',
                          }}
                          title={item.country}
                        /> */}
                        &nbsp;
                       {item.country}
                                    </h4>
                                </div>
    
                                <div className=" flex font-medium flex-col w-32 ">
                                    <h4 class=" text-base text-cardBody font-poppins">Assigned to</h4>

                                    <div class=" text-base text-cardBody font-poppins">
                                    
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
                                <div className=" flex font-medium flex-col w-20 ">
                       
                       <h4 class=" text-base text-cardBody font-poppins">Owner</h4>

                       <span>
              <MultiAvatar
                primaryTitle={item.ownerName}
                imageId={item.ownerImageId}
                imageURL={item.imageURL}
                imgWidth={"2.1em"}
                imgHeight={"2.1em"}
              />
            </span>
                   </div>
                   <div className=" flex font-medium flex-col w-32 ">
                                    <h4 class=" text-base text-cardBody font-poppins">Qualified</h4>

                                    <div class=" text-base text-cardBody font-poppins">
                {/* qual */}
                                    </div>
                                </div>
                                <div class="flex flex-col w-[5%]">
                    <div class="rounded-full bg-white w-5 h-5 cursor-pointer">
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
                      style={{ cursor: "pointer", color: "green" ,fontSize: "0.8rem",}}
                    />
                  </a>
                </span>
              </Tooltip>
            ) : null}
                        </div>
                        <div>
                        <StyledPopconfirm
            title="Do you want to delete?"
            onConfirm={() => deleteLeadsData(item.leadsId)}
          >
            {/* {user.opportunityDeleteInd ===true && ( */}
            <DeleteIcon
              type="delete"
              style={{ cursor: "pointer", color: "red" ,fontSize: "0.8rem",}}
            />
            {/* )} */}
          </StyledPopconfirm>
                        </div>
                        <div>
            
<div>
<StatusCustomerToggle
            type={props.convertInd ? "primary" : "danger"}
            leadsId={item.leadsId}
            convertInd={item.convertInd}
          />
</div>
                    </div>
                    </div>
                    <div class="flex flex-col w-[2%]">
                      <div>
                    <Tooltip overlayStyle={{ maxWidth: "300px" }} title={dataLoc}>
            <span
              style={{
                // color:
                //   showRes && item.orderId === orderId ? "orange" : "#1890ff",
                cursor: "pointer",
              }}
            >
            <LocationOnIcon   style={{
                cursor: "pointer",
                fontSize: "0.8rem"
              }}/>
            </span>
          </Tooltip>
          </div>
          <div>
          <Tooltip title={item.email}>
              <MailOutlineIcon
                type="mail"
                style={{ cursor: "pointer",fontSize:"0.8rem"  }}
                onClick={() => {
                  handleSetCurrentLeadsId(item);
                  props.handleLeadsEmailDrawerModal(true);
                }}
              />
            </Tooltip> </div>
            <div>
            <Tooltip title="Edit">
              <BorderColorIcon
                style={{ cursor: "pointer",fontSize: "0.8rem" }}
                onClick={() => {
                   props.setEditLeads(item);
                handleUpdateLeadsModal(true);
                handleSetCurrentLeadsId(item);
                  
                }}
              />
            </Tooltip>
        
            </div>
                      </div>    
                            </div>
                        </div>


                    )
                })}
      </OnlyWrapCard>
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
    </>
  );
};

const mapStateToProps = ({ auth, leads, sector }) => ({
  leadsAllData: leads.leadsAllData,
  userId: auth.userDetails.userId,
  lead: leads.lead,
  countries: auth.countries,
  sectors: sector.sectors,
  updateLeadsModal: leads.updateLeadsModal,
  addDrawerLeadsEmailModal: leads.addDrawerLeadsEmailModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getLeads,
      getSectors,
      deleteLeadsData,
      setEditLeads,
      handleUpdateLeadsModal,
      handleLeadsEmailDrawerModal,
      getLeadDetailsById,
      getCountries,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LeadsCardList);
