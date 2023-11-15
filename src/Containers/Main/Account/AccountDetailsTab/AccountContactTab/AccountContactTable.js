import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    StyledTable,
} from "../../../../../Components/UI/Antd";
import {
    getContactDistributorList,
    setEditDistributorContact,
    applyForLoginInContact,
    handleUpdateDistributorContactModal
} from "../../AccountAction";
import UpdateAccountContactModal from "./UpdateAccountContactModal";
import { Button, Tooltip } from "antd";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import moment from "moment";
import { OnlyWrapCard } from "../../../../../Components/UI/Layout";
class AccountContactTable extends Component {

    componentDidMount() {
        this.props.getContactDistributorList(this.props.distributorId);
    }

    render() {
        const {


        } = this.props;
      
        const tab = document.querySelector(".ant-layout-sider-children");
        const tableHeight = tab && tab.offsetHeight * 1.2;
        return (
            <>
             <div className=' flex justify-end sticky top-28 z-auto'>
        <OnlyWrapCard style={{backgroundColor:"#E3E8EE"}}>
        <div className=" flex justify-between w-[97.5%] px-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" md:w-[0.1rem]">Name</div>
        <div className=" md:w-[0.1rem]">Email</div>
        <div className=" md:w-[6.8rem] ">Mobile No</div>
        <div className="md:w-[5.9rem]">Designation</div>
        <div className="md:w-[7.8rem]">Department</div>
        

      </div>
        {/* <InfiniteScroll
        dataLength={customerByUserId.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingCustomers?<h4 style={{ textAlign: 'center' }}>Loading...</h4>:null}
        height={"70vh"}
      > */}
      
      {this.props.contactDistributor.map((item) => { 
         const currentdate = moment().format("DD/MM/YYYY");
         const data = {}
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
                            <div className="flex rounded-xl justify-between mt-2 bg-white h-12 items-center p-3 "
                                // style={{
                                //     borderBottom: "3px dotted #515050"
                                // }}
                                >
                                   <div class="flex">
                                    
                                <div className=" flex font-medium flex-col  md:w-[10rem] max-sm:flex-row w-full max-sm:justify-between  ">
                           
                           {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </h4> */}
                           <h4 class=" text-xs text-cardBody font-poppins">   
                           {`${item.salutation || ""} ${item.firstName || ""} ${
                              item.middleName || ""
                            } ${item.lastName || ""}`}
                           </h4>
                       
                       </div> 
                               

                                <div className=" flex font-medium flex-col  md:w-28 max-sm:flex-row w-full max-sm:justify-between  ">
                           
                                    {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </h4> */}
                                    <h4 class=" text-xs text-cardBody font-poppins">   
                                    {item.emailId} 
                                    </h4>
                                
                                </div> 
                             
                                </div>
                              
                                <div className=" flex font-medium flex-col md:w-[16rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden"># Opportunity</h4> */}

                                    <div class=" text-xs text-cardBody font-poppins text-center">
                                    {` ${item.dialCode1 || ""} ${item.mobileNo || ""} `}

                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col md:w-0 max-sm:flex-row w-full max-sm:justify-between ">
                                    {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden">Pipeline Value</h4> */}

                                    <div class=" text-xs text-cardBody font-poppins text-center">
                                    {item.designationName}

                                    </div>
                                </div>
                               
                                <div className=" flex font-medium flex-col md:w-96 max-sm:flex-row w-full max-sm:justify-between ">
                                    {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden">Weighted Value</h4> */}

                                    <div class=" text-xs text-cardBody font-poppins text-center">
                                    {item.departmentName}

                                    </div>
                                </div>
                             
                                <div class="flex md:items-center"> 
                                <div class="flex">
                                <div className=" flex font-medium flex-col  md:w-28 max-sm:flex-row w-full max-sm:justify-between  ">
                           
                           {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </h4> */}
                           <h4 class=" text-xs text-cardBody font-poppins">   
                           <Button
                        onClick={() =>
                            this.props.applyForLoginInContact(
                                data,
                                item.contactPersonId,
                                this.props.distributorId,
                                this.props.userId
                            )}
                        style={{ backgroundColor: "blue", color: "white" }}
                    >Apply For Login</Button>
                           </h4>
                       
                       </div> 
                       <div className=" flex font-medium flex-col  md:w-28 max-sm:flex-row w-full max-sm:justify-between  ">
                           
                           {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </h4> */}
                           <h4 class=" text-xs text-cardBody font-poppins">   
                           <Tooltip title="Edit">
                    <BorderColorIcon
                         style={{ cursor: "pointer",fontSize: "1rem",color: "grey", }}
                        onClick={() => {
                            this.props.setEditDistributorContact(item);
                            this.props.handleUpdateDistributorContactModal(true);
                        }}
                    />
                </Tooltip>
                           </h4>
                       
                       </div> 
                       </div>

                      </div>
                            </div>
                        </div>


                    )
                })}
                {/* </InfiniteScroll> */}
      </OnlyWrapCard>
      </div>
                {/* {true && (
                    <StyledTable
                        rowKey="contactPersonId"
                        columns={columns}
                        dataSource={this.props.contactDistributor}
                        Loading={this.props.fetchingContactDistributorsById}
                        onChange={console.log("task onChangeHere...")}
                        scroll={{ y: tableHeight }}
                        pagination={false}

                    />
                )} */}
                <UpdateAccountContactModal
                    handleUpdateDistributorContactModal={this.props.handleUpdateDistributorContactModal}
                    updateDistributorContactModal={this.props.updateDistributorContactModal}
                />
            </>
        );
    }
}

const mapStateToProps = ({ distributor, auth }) => ({
    contactDistributor: distributor.contactDistributor,
    updateDistributorContactModal: distributor.updateDistributorContactModal,
    fetchingContactDistributorsById: distributor.fetchingContactDistributorsById,
    userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            setEditDistributorContact,
            getContactDistributorList,
            applyForLoginInContact,
            handleUpdateDistributorContactModal
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(AccountContactTable);

// const columns = [
//     {
//         title: "",
//         width: "2%",
//     },

//     {
//         title: "Name",
//         width: "15%",
//         render: (name, item, i) => {
//             return ` ${item.salutation || ""} ${item.firstName ||
//                 ""} ${item.middleName || ""} ${item.lastName || ""}`
//         }

//     },
//     {
//         title: "Email",
//         width: "15%",
//         dataIndex: "emailId",
//     },
//     {
//         title: "Mobile No",
//         width: "15%",
//         render: (name, item, i) => {
//             return ` ${item.dialCode1 || ""} ${item.mobileNo || ""} `
//         }
//     },
//     {
//         title: "Designation",
//         dataIndex: "designationName",
//         width: "15%",
//     },
//     {
//         title: "Department",
//         dataIndex: "departmentName",
//         width: "15%",
//     },
//     {
//         title: "",
//         width: "12%",
//         render: (name, item, i) => {
//             const data = {}
//             return (

//                 <>
//                     {/* {!item.accessInd && */}
//                     <Button
//                         onClick={() =>
//                             this.props.applyForLoginInContact(
//                                 data,
//                                 item.contactPersonId,
//                                 this.props.distributorId,
//                                 this.props.userId
//                             )}
//                         style={{ backgroundColor: "blue", color: "white" }}
//                     >Apply For Login</Button>
//                     {/* } */}
//                 </>
//             )
//         }
//     },
//     {
//         title: "",
//         width: "3%",
//         render: (name, item, i) => {
//             return (
//                 <Tooltip title="Edit">
//                     <BorderColorOutlined
//                         style={{ cursor: "pointer" }}
//                         onClick={() => {
//                             this.props.setEditDistributorContact(item);
//                             this.props.handleUpdateDistributorContactModal(true);
//                         }}
//                     />
//                 </Tooltip>
//             );
//         },
//     },
// ];


