import React, { useEffect, useState, useMemo, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExploreIcon from "@mui/icons-material/Explore";
import { getSectors } from "../../../Settings/Sectors/SectorsAction";
import moment from "moment";
import { OnlyWrapCard } from '../../../../Components/UI/Layout'
import { getCountries } from "../../../Auth/AuthAction";
import InfiniteScroll from "react-infinite-scroll-component";
import { Tooltip, Select,Button } from "antd";

import {
  MultiAvatar,
  MultiAvatar2,
  SubTitle,
} from "../../../../Components/UI/Elements";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Link } from "../../../../Components/Common";
import {
  updateOwnercustomerById,
  handleCustomerDrawerModal,
  getCustomerDetailsById,
  getCustomerKeySkill,
  handleCustomerEmailDrawerModal,
  getCustomerById,
} from "../../../Customer/CustomerAction";
// import AddCustomerDrawerModal from "../../AddCustomerDrawerModal";
import { getAllCustomerEmployeelist } from "../../../Employees/EmployeeAction";
import APIFailed from "../../../../Helpers/ErrorBoundary/APIFailed";
// import AddCustomerEmailDrawerModal from "../UpdateCustomer/AddCustomerEmailDrawerModal";
import ReactCountryFlag from 'react-country-flag';
import { BundleLoader } from "../../../../Components/Placeholder";
import {getInvestorsbyId,emptyInvestor,handleUpdateInvestorModal} from "../../InvestorAction";
const UpdateInvestorModal = lazy(() =>
  import("../UpdateInvestor/UpdateInvestorModal")
);
const Option = Select;
function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function InvestorCardList(props) {
  const [page, setPage] = useState(0);

  useEffect(() => {
    window.addEventListener('error', e => {
      if (e.message === 'ResizeObserver loop limit exceeded' || e.message === 'Script error.') {
        const resizeObserverErrDiv = document.getElementById(
          'webpack-dev-server-client-overlay-div'
        )
        const resizeObserverErr = document.getElementById(
          'webpack-dev-server-client-overlay'
        )
        if (resizeObserverErr) {
          resizeObserverErr.setAttribute('style', 'display: none');
        }
        if (resizeObserverErrDiv) {
          resizeObserverErrDiv.setAttribute('style', 'display: none');
        }
      }
    })
    props.getInvestorsbyId(props.userId, page);
    setPage(page + 1);
    props.getSectors();
    props.getCountries();
    props.getAllCustomerEmployeelist();
  }, []);

  useEffect(() => {
    return () => props.emptyInvestor();
  }, []);

  const [RowData, setRowData] = useState("");

  function handleCurrentRowData(datas) {
    setRowData(datas);
  }

  const handleLoadMore = () => {
    setTimeout(() => {
      setPage(page + 1);
      props.getInvestorsbyId(
        props.currentUser ? props.currentUser : props.userId,
        page
      );
    }, 100);
  };

  const {
    fetchingInvestors,
    investorsbyId,
    handleUpdateInvestorModal,
    updateInvestorModal,
    fetchingInvestorsError,
    fetchingAllCustomers,
    user,
    IconShowhover,
  } = props;
  console.log("ee");
 
  if (fetchingInvestors) {
    return <BundleLoader />;
  }

  return (
    <>
  <InfiniteScroll
        dataLength={investorsbyId.length}
        next={handleLoadMore}
        hasMore={true}
        // loader={<h4 style={{ textAlign: 'center' }}>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        height={600}
      >
        <OnlyWrapCard>
      {investorsbyId.map((item) => { 
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
          State : ${item.address && item.address.length && item.address[0].state}
         Country : ${
           (item.address && item.address.length && item.address[0].country) || ""
         } 
           PostalCode : ${
             item.address && item.address.length && item.address[0].postalCode
           } `;
                    return (
                        <div>
                            <div className="flex justify-between mt-4 max-sm:flex-col"
                                style={{
                                    borderBottom: "3px dotted #515050"
                                }}>
                                     <div class="flex">
                                <div className=" flex font-medium flex-col md:w-52 max-sm:flex-row w-full ">

                                   
                                        <Tooltip>
                                        <div class=" flex max-sm:w-full justify-between flex-row md:flex-col">
                                            <h4 class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden">
                                            Name
                                            </h4>
                                            <h4 class=" text-[0.75rem] text-blue-500 text-cardBody font-poppins font-semibold cursor-pointer">
                                                
         <Link
          toUrl={`investor/${item.investorId}`}
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
        ) : null}
       
                                            </h4>
</div>
                                        </Tooltip>
                              
                                </div>

                                <div className=" flex font-medium flex-col  md:w-52 max-sm:flex-row w-full max-sm:justify-between ">
                           
                                    <h4 class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden"> Sector </h4>
                                    <h4 class=" text-[0.75rem] text-cardBody font-poppins">   
                                    {item.sector}
                                    </h4>
                                </div>
                               
                                <div className=" flex font-medium flex-col md:w-36 max-sm:flex-row w-full max-sm:justify-between ">
                                  

                                    <h4 class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden">Country</h4>
                                    <h4 class=" text-[0.75rem] text-cardBody font-poppins">
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
                                <div class="flex">
                                <div className=" flex font-medium flex-col md:w-36 max-sm:flex-row w-full max-sm:justify-between ">
                                    <h4 class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden"># Deals</h4>

                                    <div class=" text-[0.75rem] text-cardBody font-poppins">

                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col md:w-24 max-sm:flex-row w-full max-sm:justify-between ">
                                    <h4 class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden">Assigned to</h4>

                                    <div class=" text-[0.75rem] text-cardBody font-poppins">
                                    
                                    <span>
              {item.assignedTo === null ? (
                "Not available"
              ) : (
                <MultiAvatar2
                  primaryTitle={item.assignedTo}
                  imgWidth={"1.8rem"}
                  imgHeight={"1.8rem"}
                />
              )}
            </span>
             
                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col md:w-20 max-sm:flex-row w-full mb-1 max-sm:justify-between ">
                       
                       <h4 class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden">Owner</h4>

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
                   <div class="flex max-sm:justify-between">
                   <div className=" flex font-medium flex-col md:w-36 max-sm:flex-row w-full max-sm:justify-between ">
                                    <h4 class=" text-[0.875rem] text-cardBody font-poppins max-sm:hidden">Source</h4>

                                    <div class=" text-[0.75rem] text-cardBody font-poppins">
                                    {item.source}
                                    </div>
                                </div>
                                <div class="flex flex-col md:w-24 ">
                    <div class="rounded-full bg-white w-5 h-5 cursor-pointer">
                    <Tooltip title={item.url}>
              {item.url !== "" && (
                <span
                  //type="edit"
                  style={{ cursor: "pointer" }}
                  onClick={() => {}}
                >
                  {" "}
                  <a href={`https://${item.url}`} target="_blank">
                    <ExploreIcon
                      style={{ cursor: "pointer", color: "green" }}
                    />
                  </a>
                </span>
              )}
            </Tooltip>
                        </div>
                      &nbsp;&nbsp;
                        <div>
                        <span
              style={{ cursor: "pointer" ,fontSize: "0.8rem"}}
            //   onClick={() => {
            //     props.getCustomerDetailsById(item.customerId);
            //     props.getCustomerKeySkill(item.customerId);
            //     //   this.props.getCustomerDocument(item.customerId );

            //     props.handleCustomerDrawerModal(item, true);
            //   }}
            >
              {" "}
              {user.pulseAccessInd === true && <MonitorHeartIcon  style={{
                cursor: "pointer",
                fontSize: "0.8rem",
                color: "#df9697"}}/>}
            </span> 
                        </div>
                        <div>
            

                    </div>
                    </div>
                    <div class="flex flex-col md:w-[2%] max-sm:flex-row">
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
          {/* <div><Tooltip title={item.email}>
              <MailOutlineIcon
                type="mail"
                style={{ cursor: "pointer",fontSize: "0.8rem" }}
                onClick={() => {
                  props.getCustomerById(item.customerId);
                  props.handleCustomerEmailDrawerModal(true);
                }}
              />
            </Tooltip> </div> */}
            <div>
            {props.user.customerUpdateInd === true && (
            <Tooltip title="Edit">
              <BorderColorIcon
                style={{ cursor: "pointer",fontSize: "0.8rem" }}
                onClick={() => {
                    handleUpdateInvestorModal(true);
                    handleCurrentRowData(item);
                  
                }}
              />
            </Tooltip>
            )}
            </div>
                      </div> 
                      </div>   
                            </div>
                        </div>


                    )
                })}
      </OnlyWrapCard>
      </InfiniteScroll>

      <UpdateInvestorModal
        RowData={RowData}
        updateInvestorModal={updateInvestorModal}
        handleUpdateInvestorModal={handleUpdateInvestorModal}
        handleCurrentRowData={handleCurrentRowData}
      />
      {/* <AddCustomerDrawerModal
        addDrawerCustomerModal={props.addDrawerCustomerModal}
        handleCustomerDrawerModal={props.handleCustomerDrawerModal}
      />
          <AddCustomerEmailDrawerModal
        // contactById={props.contactById}
        addDrawerCustomerEmailModal={props.addDrawerCustomerEmailModal}
        handleCustomerEmailDrawerModal={props.handleCustomerEmailDrawerModal}
      /> */}
    </>
  );
}
// }
const mapStateToProps = ({
  auth,
  customer,
  sector,
  opportunity,
  employee,
  investor
}) => ({
  userId: auth.userDetails.userId,
  investorsbyId:investor.investorsbyId,
  sales: opportunity.sales,
  recruiterName: opportunity.recruiterName,
  fetchingAllCustomers: customer.fetchingAllCustomers,
  sectors: sector.sectors,
  fetchingInvestors: investor.fetchingInvestors,
  fetchingInvestorsError: investor.fetchingInvestorsError,
  updateInvestorModal: investor.updateInvestorModal,
  user: auth.userDetails,
  employees: employee.employees,
  countries: auth.countries,
  allCustomerEmployeeList: employee.allCustomerEmployeeList,
  addDrawerCustomerEmailModal: customer.addDrawerCustomerEmailModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getInvestorsbyId,
      handleUpdateInvestorModal,
      getSectors,
      emptyInvestor,
      updateOwnercustomerById,
      handleCustomerDrawerModal,
      getCustomerDetailsById,
      getCustomerKeySkill,
      handleCustomerEmailDrawerModal,
      getCustomerById,
      getCountries,
      getAllCustomerEmployeelist,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(InvestorCardList);

