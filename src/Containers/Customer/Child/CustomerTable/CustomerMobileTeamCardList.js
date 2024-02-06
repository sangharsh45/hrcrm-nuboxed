import React, { useEffect, useState, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExploreIcon from "@mui/icons-material/Explore";
import { getSectors } from "../../../Settings/Sectors/SectorsAction";
import moment from "moment";
import { OnlyWrapCard } from '../../../../Components/UI/Layout'
import { getCountries } from "../../../Auth/AuthAction";
import InfiniteScroll from "react-infinite-scroll-component";
import { Tooltip, Select,Button ,Popconfirm} from "antd";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import {
  MultiAvatar,
  MultiAvatar2,
  SubTitle,
} from "../../../../Components/UI/Elements";
import { Link } from "../../../../Components/Common";
import {
    getTeamCustomer,
  handleUpdateCustomerModal,
  setEditCustomer,
  updateOwnercustomerById,
  handleCustomerDrawerModal,
  getCustomerDetailsById,
  getCustomerKeySkill,
  handleCustomerEmailDrawerModal,
  handleCustomerNotesDrawerModal,
  getCustomerById,
  emptyCustomer,
  customerToAccount,
  handleCustomerPulseDrawerModal,
} from "../../CustomerAction";
import { getAllCustomerEmployeelist } from "../../../Employees/EmployeeAction";
import ReactCountryFlag from 'react-country-flag';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
const AddCustomerDrawerModal = lazy(() =>
  import("../../AddCustomerDrawerModal")
);
const AddCustomerEmailDrawerModal = lazy(() =>
  import("../UpdateCustomer/AddCustomerEmailDrawerModal")
);
const AddCustomerNotesDrawerModal = lazy(() =>
  import("../CustomerDetail/AddCustomerNotesDrawerModal")
);
const CustomerPulseDrawerModal = lazy(() =>
  import("./CustomerPulseDrawerModal")
);
const UpdateCustomerModal = lazy(() =>
  import("../UpdateCustomer/UpdateCustomerModal")
);
const Option = Select;
function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function CustomerMobileTeamCardList(props) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [hasMore, setHasMore] = useState(true);
 
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
    setPage(page + 1);
    props.getTeamCustomer(props.userId, page,"creationdate");
      props.getSectors();
    props.getCountries();
    props.getAllCustomerEmployeelist();
  }, []);

  useEffect(() => {
    return () => props.emptyCustomer();
  }, []);



const [rowdata, setrowdata] = useState("");
  const [currentCustomerId, setCurrentCustomerId] = useState("");
  const [currentCustomer, setCurrentCustomer] = useState("");
  function handleSetCurrentCustomerId(customerId) {
    setCurrentCustomerId(customerId);
    console.log(customerId);
  }
  function handleSetCurrentCustomer(item) {
    setCurrentCustomer(item);
  }
  const handleRowData = (data) => {
    setrowdata(data);
  };
  const handleConfirm = (customerId) => {
    // Call the function to change the status to "Lost" here
    props.customerToAccount(customerId);
  };
  const handleLoadMore = () => {
   
      setPage(page + 1);
      props.getTeamCustomer(
        props.currentUser ? props.currentUser : props.userId,
        page,
        props.filter?props.filter:"creationdate"
      );
  };

  const {
    fetchingTeamCustomer,
    teamCustomer,
    handleUpdateCustomerModal,
    addDrawerCustomerPulseModal,
    handleCustomerPulseDrawerModal,
    updateCustomerModal,
    fetchingCustomersError,
    fetchingAllCustomers,
    user,
    addDrawerCustomerNotesModal,
    handleCustomerNotesDrawerModal,
    IconShowhover,
  } = props;
  console.log("ee");
 
  // if (fetchingTeamCustomer) {
  //   return <BundleLoader />;
  // }

  return (
    <>
    
 
         <div className=' flex justify-end sticky top-28 z-auto'>
        <OnlyWrapCard style={{backgroundColor:"#E3E8EE"}}>     
        <InfiniteScroll
        dataLength={teamCustomer.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingTeamCustomer?<h4 style={{ textAlign: 'center' }}>Loading...</h4>:null}
        height={"75vh"}
      >
      
      {teamCustomer.map((item) => { 
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
                            <div
                className="flex flex-col rounded-xl justify-between bg-white mt-[0.5rem] h-[9rem] items-center p-3"
              >
                                      <div class="flex justify-between items-center w-wk ">
                                   <div className=" flex font-medium ">
                                   <div className="flex max-sm:w-full">
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

                      <div class="flex items-center" >
                      <Tooltip>
                                          <div >
                                            <h4 class=" text-sm text-blue-500 text-cardBody font-poppins font-semibold  cursor-pointer">
                                                
         <Link
          toUrl={`customer/${item.customerId}`}
          title={`${item.name}`}
        >{item.name}</Link>&nbsp;&nbsp;
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
                                    
                                <div className=" flex font-medium   ">
                           
                                    {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </h4> */}
                                    <h4 class=" text-xs text-cardBody font-poppins">   
                                    {item.sector}
                                    </h4>
                                
                                </div> 
                                <div className=" flex font-medium  ">
                                  

                                    {/* <h4 class=" text-xs text-cardBody font-poppins max-sm:hidden">Country</h4> */}
                                    <h4 class=" text-sm text-cardBody font-poppins">
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
                                <div class="flex justify-between items-center w-wk ">
                                <div className=" flex font-medium ">
                                    {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden"># Opportunity</h4> */}

                                    <div class=" text-xs text-cardBody font-poppins text-center">
                                    {item.oppNo}

                                    </div>
                                </div>
                                <div className=" flex font-medium  ">
                                    {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden">Pipeline Value</h4> */}

                                    <div class=" text-xs text-cardBody font-poppins text-center">
                                    {item.totalProposalValue}

                                    </div>
                                </div>
                                <div className=" flex font-medium ">
                                    {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden">Weighted Value</h4> */}

                                    <div class=" text-xs text-cardBody font-poppins text-center">
                                    {item.weight}

                                    </div>
                                </div>
                                <div className=" flex font-medium  ">
                                    {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden">Assigned to</h4> */}

                                    <div class=" text-xs text-cardBody font-poppins">
                                    
                                    <span>
              {item.assignedTo === null ? (
                "None"
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
                                <div className=" flex font-medium ">
                       
                       {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden">Owner</h4> */}

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
                                <div class="flex justify-between items-center w-wk ">
                              
                  
                       
                       <h4 class=" text-sm text-cardBody font-poppins"></h4>
                       <Popconfirm
  title="Change status to Account?"
  onConfirm={() => handleConfirm(item.customerId)}
  okText="Yes"
  cancelText="No"
>
                       <Button type="primary">
                     <span class="text-sm" >Convert as Customer</span>
                        </Button>
                        </Popconfirm>
                 
                   
                  
                                <div>
                                <Tooltip title={item.url}>
              {item.url !== "" ? (
                <span
                  //type="edit"
                  style={{ cursor: "pointer" }}
                  onClick={() => {}}
                >
                  {" "}
                  <a href={`https://${item.url}`} target="_blank">
                    <ExploreIcon
                      style={{ cursor: "pointer", color: "green",fontSize: "1rem", }}
                    />
                  </a>
                </span>
              )
              :<div class=" w-3">
                      
              </div>
              }
            </Tooltip>
        
            </div>
                        <div>
                        <span
              style={{ cursor: "pointer" ,fontSize: "0.8rem"}}
              onClick={() => {
                props.getCustomerDetailsById(item.customerId);
                props.getCustomerKeySkill(item.customerId);
                //   this.props.getCustomerDocument(item.customerId );

                props.handleCustomerDrawerModal(item, true);
              }}
            >
              {" "}
              {user.pulseAccessInd === true && <MonitorHeartIcon  style={{
                cursor: "pointer",
                fontSize: "1rem",
                color: "#df9697"}}/>}
            </span> 
                        </div>
                        <div>
            

                    </div>
                   
                   
                        <div>
                        <Tooltip title="Pulse">
       <MonitorHeartIcon
                onClick={() => {
                  handleCustomerPulseDrawerModal(true);
                  handleSetCurrentCustomer(item);
                }}
                style={{ fontSize: "1rem", color: "#df9697" }}
              />
           </Tooltip>
                        </div>
                        <div>
                        <Tooltip title="Notes">
       <NoteAltIcon
                onClick={() => {
                  handleCustomerNotesDrawerModal(true);
                  handleSetCurrentCustomer(item);
                  handleRowData(item);
                }}
                style={{ color: "green", cursor: "pointer", fontSize: "1rem" }}
              />
           </Tooltip>

                    </div>
                    
              
                   
                    <div >
                    <Tooltip overlayStyle={{ maxWidth: "300px" }} title={dataLoc}>

<LocationOnIcon   style={{
    cursor: "pointer",
    fontSize: "1rem"
  }}/>

</Tooltip>
</div>
<div>
{props.user.customerUpdateInd === true && user.crmInd === true && (
            <Tooltip title="Edit">
              <BorderColorIcon
                style={{ cursor: "pointer",fontSize: "1rem",color: "grey", }}
                onClick={() => {
                    props.setEditCustomer(item);
                    handleUpdateCustomerModal(true);
                    handleSetCurrentCustomerId(item.customerId);
                  
                }}
              />
            </Tooltip>
            )}
{/* <Tooltip title={item.email}>
              <MailOutlineIcon
                type="mail"
                style={{ cursor: "pointer",fontSize: "1rem" }}
                onClick={() => {
                  props.getCustomerById(item.customerId);
                  props.handleCustomerEmailDrawerModal(true);
                }}
              />
            </Tooltip> */}
</div>
          

                      </div>
                            </div>
                        </div>


                    )
                })}
                </InfiniteScroll>
      </OnlyWrapCard>
      </div>
      
  
      <AddCustomerDrawerModal
        addDrawerCustomerModal={props.addDrawerCustomerModal}
        handleCustomerDrawerModal={props.handleCustomerDrawerModal}
      />

      <UpdateCustomerModal
        customerId={currentCustomerId}
        updateCustomerModal={updateCustomerModal}
        handleUpdateCustomerModal={handleUpdateCustomerModal}
        handleSetCurrentCustomerId={handleSetCurrentCustomerId}
      />
         <CustomerPulseDrawerModal
    customer={currentCustomer}
        addDrawerCustomerPulseModal={addDrawerCustomerPulseModal}
        handleCustomerPulseDrawerModal={handleCustomerPulseDrawerModal}
        handleSetCurrentCustomer={handleSetCurrentCustomer}
      />
      <AddCustomerEmailDrawerModal
        // contactById={props.contactById}
        addDrawerCustomerEmailModal={props.addDrawerCustomerEmailModal}
        handleCustomerEmailDrawerModal={props.handleCustomerEmailDrawerModal}
      />

      
<AddCustomerNotesDrawerModal
        customer={currentCustomer}
        rowdata={rowdata}
        addDrawerCustomerNotesModal={addDrawerCustomerNotesModal}
        handleCustomerNotesDrawerModal={handleCustomerNotesDrawerModal}
        handleSetCurrentCustomer={handleSetCurrentCustomer}
      />
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
}) => ({
  userId: auth.userDetails.userId,
  addDrawerCustomerNotesModal:customer.addDrawerCustomerNotesModal,
  teamCustomer: customer.teamCustomer,
  sales: opportunity.sales,
  addDrawerCustomerPulseModal:customer.addDrawerCustomerPulseModal,
  recruiterName: opportunity.recruiterName,
  fetchingAllCustomers: customer.fetchingAllCustomers,
  sectors: sector.sectors,
  fetchingTeamCustomer: customer.fetchingTeamCustomer,
  fetchingCustomersError: customer.fetchingCustomersError,
  updateCustomerModal: customer.updateCustomerModal,
  user: auth.userDetails,
  employees: employee.employees,
  countries: auth.countries,
  allCustomerEmployeeList: employee.allCustomerEmployeeList,
  addDrawerCustomerEmailModal: customer.addDrawerCustomerEmailModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getTeamCustomer,
      handleUpdateCustomerModal,
      handleCustomerPulseDrawerModal,
      setEditCustomer,
      getSectors,
      customerToAccount,
      emptyCustomer,
      updateOwnercustomerById,
      handleCustomerDrawerModal,
      getCustomerDetailsById,
      getCustomerKeySkill,
      handleCustomerEmailDrawerModal,
      handleCustomerNotesDrawerModal,
      getCustomerById,
      getCountries,
      getAllCustomerEmployeelist,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(CustomerMobileTeamCardList);

