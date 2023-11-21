import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../Components/UI/Antd";
import { Tooltip, Input, Button, Space, Popconfirm } from "antd";
import { OnlyWrapCard } from '../../../Components/UI/Layout'
import { Spacer } from "../../../Components/UI/Elements";
import { Link } from "../../../Components/Common";
import {
  getAllDistributorsList,
  setEditDistributor,
  handleUpdateDistributorModal,
  handleDistributorOrderModal,
  handleDistributorActivityTableModal,
  deleteDistributorData,
  handleBillingAddressModal
} from "./AccountAction";
import Highlighter from "react-highlight-words";
import moment from "moment";
import AccountDetailsView from "./AccountDetailsView";


function AccountTable(props) {
  useEffect(() => {
    props.getAllDistributorsList();
  }, []);

 
  const tab = document.querySelector(".ant-layout-sider-children");
  const tableHeight = tab && tab.offsetHeight * 1.2;
  return (
    <>
       <div className=' flex justify-end sticky top-28 z-auto'>
        <OnlyWrapCard style={{backgroundColor:"#E3E8EE"}}>
        <div className=" flex justify-between w-[97.5%] px-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" md:w-[10.1rem]">Name</div>
        <div className=" md:w-[9.1rem]">Work</div>
        <div className=" md:w-[6.8rem] ">Website</div>
        <div className="md:w-[4.9rem]">Type</div>
        <div className="md:w-[7.8rem]">Payment</div>
        <div className="md:w-[6.9rem]">VAT</div>
        <div className="md:w-[8.2rem]">Billing Address </div>
        <div className="md:w-[4.3rem]">Pin Code</div>
        {/* <div className="w-[3.8rem]">Action</div> */}

      </div>
        {/* <InfiniteScroll
        dataLength={customerByUserId.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingCustomers?<h4 style={{ textAlign: 'center' }}>Loading...</h4>:null}
        height={"75vh"}
      > */}
      
      {props.allDistributors.map((item) => { 
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
                            <div className="flex rounded-xl justify-between mt-2 bg-white h-12 items-center p-3 "
                                // style={{
                                //     borderBottom: "3px dotted #515050"
                                // }}
                                >
                                   <div class="flex">
                                <div className=" flex font-medium flex-col md:w-[10.1rem] max-sm:w-full  ">

                                   
                                        <Tooltip>
                                          <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                                            {/* <h4 class=" text-xs text-cardBody font-poppins max-sm:hidden">
                                            Name
                                            </h4> */}
                                            <h4 class=" text-sm text-blue-500 text-cardBody font-poppins font-semibold  cursor-pointer">
                                                
         <Link
          toUrl={`distributor/${item.distributorId}`}
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

                                <div className=" flex font-medium flex-col  md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between  ">
                           
                                    {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </h4> */}
                                    <h4 class=" text-xs text-cardBody font-poppins">   
                                    {item.dialCode} {item.phoneNo}
                                    </h4>
                                
                                </div> 
                             
                                </div>
                                
                                <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden"># Opportunity</h4> */}

                                    <div class=" text-xs text-cardBody font-poppins text-center">
                                    {item.url}

                                    </div>
                                </div>
                                <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden">Pipeline Value</h4> */}

                                    <div class=" text-xs text-cardBody font-poppins text-center">
                                    {item.clientName}

                                    </div>
                                </div>
                                
                                <div className=" flex font-medium flex-col md:w-[11.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                    {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden">Weighted Value</h4> */}

                                    <div class=" text-xs text-cardBody font-poppins text-center">
                                    {item.payment}

                                    </div>
                                </div>
                             
                                <div class="flex md:items-center"> 
                                
                                <div className=" flex font-medium flex-col  md:w-[7.2rem] max-sm:flex-row w-full max-sm:justify-between  ">
                           
                           {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </h4> */}
                           <h4 class=" text-xs text-cardBody font-poppins">   
                           {item.countryName}
                           </h4>
                       
                       </div> 
                       <div className=" flex font-medium flex-col  md:w-[6.9rem] max-sm:flex-row w-full max-sm:justify-between  ">
                           
                           {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </h4> */}
                           <h4 class=" text-xs text-cardBody font-poppins">   
                           {/* {item.countryName} */}
                           </h4>
                       
                       </div> 
                       

                      </div>
                            </div>
                        </div>


                    )
                })}
                {/* </InfiniteScroll> */}
      </OnlyWrapCard>
      </div>
      {/* <StyledTable
        rowKey=""
        columns={columns}
        dataSource={props.allDistributors}
        loading={
          props.fetchingAllDistributors
        }
        scroll={{ y: tableHeight }}
        pagination={false}
      /> */}
      {/* <UpdateAccountModal
        distributorId={currentDistributorId}
        updateDistributorModal={updateDistributorModal}
        handleSetCurrentDistributorId={handleSetCurrentDistributorId}
        handleUpdateDistributorModal={handleUpdateDistributorModal}
      />
      <AddAccountOrderModal
        addDistributorOrderModal={props.addDistributorOrderModal}
        handleDistributorOrderModal={props.handleDistributorOrderModal}
        distributorId={currentDistributorId}
        handleSetCurrentDistributorId={handleSetCurrentDistributorId}
      />
      <AddAccountActivityModal
        addDistributorActivityTableModal={
          props.addDistributorActivityTableModal
        }
        handleDistributorActivityTableModal={
          props.handleDistributorActivityTableModal
        }
        distributorId={currentDistributorId}
        handleSetCurrentDistributorId={handleSetCurrentDistributorId}
      /> */}
      {/* <BillingAddressModal
        handleBillingAddressModal={handleBillingAddressModal}
        addBillToAddress={addBillToAddress}
        distributorId={currentDistributorId}
      /> */}
      {/* {show && <BillingAddressLocation distributorId={currentDistributorId} />} */}
      <Spacer />
    </>
  );
}
const mapStateToProps = ({ distributor, auth }) => ({
  allDistributors: distributor.allDistributors,
  fetchingAllDistributors: distributor.fetchingAllDistributors,
  fetchingDistributorsByUserIdError:
    distributor.fetchingDistributorsByUserIdError,
  userId: auth.userDetails.userId,
  updateDistributorModal: distributor.updateDistributorModal,
  addDistributorOrderModal: distributor.addDistributorOrderModal,
  addDistributorActivityTableModal:
    distributor.addDistributorActivityTableModal,
  addBillToAddress: distributor.addBillToAddress
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleUpdateDistributorModal,
      getAllDistributorsList,
      setEditDistributor,
      handleDistributorOrderModal,
      handleDistributorActivityTableModal,
      deleteDistributorData,
      handleBillingAddressModal
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AccountTable);


// const columns = [
//   {
//     title: "",
//     width: "1%",
//   },
//   {
//     title: "Name",
//     width: "12%",
//     defaultSortOrder: "descend",
//     dataIndex: "name",
//     sorter: (a, b) => {
//       var nameA = a.name.toLowerCase(); // ignore upper and lowercase
//       var nameB = b.name.toLowerCase(); // ignore upper and lowercase
//       if (nameA < nameB) {
//         return -1;
//       }
//       if (nameA > nameB) {
//         return 1;
//       }

//       return 0;
//     },
//     render: (name, item, i) => {
//       const currentdate = moment().format("DD/MM/YYYY");
//       const date = moment(item.creationDate).format("DD/MM/YYYY");
//       return (
//         <>
//           <AccountDetailsView
//             distributorId={item.distributorId}
//             name={item.name}
//           />
//           &nbsp;&nbsp;
//           {date === currentdate ? (
//             <span
//               style={{
//                 color: "tomato",
//                 fontWeight: "bold",
//               }}
//             >
//               New
//             </span>
//           ) : null}
//         </>
//       );
//     },
//   },

//   {
//     title: "Work",
//     dataIndex: "phoneNo",
//     render: (name, item, i) => {
//       return (
//         <>
//           {item.dialCode} {item.phoneNo}
//         </>
//       );
//     },
//     width: "10%",
//   },
//   {
//     title: "Website",
//     dataIndex: "url",
//     width: "15%",
//   },
//   {
//     title: "Type",
//     dataIndex: "clientName",
//     width: "10%",
//     textAlign: "center"
//   },
//   {
//     title: "Payment",
//     dataIndex: "payment",
//     width: "10%",
//     textAlign: "center"
//   },
//   {
//     title: "VAT",
//     dataIndex: "",
//     textAlign: "center",
//     width: "8%",

//     render: (text, item) => {
//       return (
//         <>
//           {item.countryName}
//         </>
//       )
//     }
//   },

//   {
//     title: "Billing Address",
//     // render: (name, item, i) => {
//     //   return `${item.addresses[0].address1 || ""} ${item.addresses[0]
//     //     .address2 || ""} ${item.addresses[0].street || ""} ${item.addresses[0].city || ""}`;
//     // },
//     width: "22%",
//   },

//   {
//     title: "Pin Code",
//     // render: (name, item, i) => {
//     //   return `${item.addresses[0].pinCode || ""}`;
//     // },
//     width: "6%",
//   },
//   // {
//   //   title: "",
//   //   dataIndex: "",
//   //   render: (name, item, i) => {
//   //     return (
//   //       <Tooltip title="Add Shipping Address">
//   //         <PlusOutlined
//   //           onClick={() => {
//   //             handleBillingAddressModal(true)
//   //             handleSetCurrentDistributorId(item.distributorId);
//   //           }}
//   //         />
//   //       </Tooltip>
//   //     );
//   //   },
//   //   width: "4%",
//   // },
//   {
//     title: "",
//     width: "3%",
//     render: (name, item, i) => {
//       return (
//         <Tooltip title="Contacts">
//           <div
//           // onClick={() => {
//           //   handleBillingAddressModal(true)
//           //   handleSetCurrentDistributorId(item.distributorId);
//           // }}
//           >
//           </div>
//         </Tooltip>
//       );
//     },
//   },
//   {
//     title: "",
//     width: "2%",
//     dataIndex: "documentId",
//     render: (name, item, i) => {
//       return (
//         <Tooltip title="Order">

//           <div
//           // onClick={() => {
//           //   props.handleDistributorOrderModal(true);
//           //   handleSetCurrentDistributorId(item.distributorId);
//           // }}
//           />
//         </Tooltip>
//       );
//     },
//   },
//   {
//     title: "",
//     dataIndex: "documentId",
//     width: "2%",
//     render: (name, item, i) => {
//       return (
//         <Tooltip title="Activity">
//           <span>
//             <i
//               class="fab fa-connectdevelop"
//               style={{ cursor: "pointer" }}
//             // onClick={() => {
//             //   props.handleDistributorActivityTableModal(true);
//             //   handleSetCurrentDistributorId(item.distributorId);
//             // }}
//             ></i>
//           </span>
//         </Tooltip>
//       );
//     },
//   },
//   {
//     title: "",
//     dataIndex: "documentId",
//     width: "2%",
//     render: (name, item, i) => {
//       //debugger
//       return (
//         <Tooltip title="Edit">
//           <div
//             style={{ cursor: "pointer" }}
//           // onClick={() => {
//           //   props.setEditDistributor(item);
//           //   handleUpdateDistributorModal(true);
//           //   handleSetCurrentDistributorId(item.distributorId);
//           // }}
//           />
//         </Tooltip>
//       );
//     },
//   },
//   {
//     title: "",
//     width: "3%",
//     render: (name, item, i) => {
//       //debugger
//       return (
//         <>
//           <Tooltip title="Delete Client">
//             <Popconfirm
//               title="Do you want to delete?"
//             // onConfirm={() => props.deleteDistributorData(item.distributorId)}
//             >
//               <DeleteOutlined

//                 style={{ cursor: "pointer", color: "red" }}
//               />
//             </Popconfirm>
//           </Tooltip>

//         </>
//       );
//     },
//   },
// ];
