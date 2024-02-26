// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { FormattedMessage } from "react-intl";
// import { bindActionCreators } from "redux";
// import { Tooltip, Button,Input} from "antd";
// import { BundleLoader } from "../../../../../../Components/Placeholder";
// import {
//   StyledTable,
//   StyledPopconfirm,
// } from "../../../../../../Components/UI/Antd";
// import { MultiAvatar, SubTitle } from "../../../../../../Components/UI/Elements";
// import { ActionIcon } from "../../../../../../Components/Utils";
// import Highlighter from "react-highlight-words";
// import {SearchOutlined}  from '@ant-design/icons';
// import {getDealContactList} from "../../../../DealAction";

// const ButtonGroup = Button.Group;
// class LinkedDealContact extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       searchText: "",
//     searchedColumn: "",
//     };
//   }

//   componentDidMount() {
//     this.props.getDealContactList(this.props.dealDetailsbyID.invOpportunityId);
//   }

//   handleAddPlusClick = (contactId) => {
   
//     let data = {
      
//       contactRole: "DecisionMaker",
     
//     };

//     this.props.setContactRoleForOpportunity(data,contactId);
//   };
//   handleAddPlusClick1 = (contactId) => {
   
//     let data = {
      
//       contactRole: "Evaluator",
     
//     };

//     this.props.setContactRoleForOpportunity(data,contactId);
//   };
//   handleAddPlusClick2 = (contactId) => {
   
//     let data = {
      
//       contactRole: "Influencer",
     
//     };

//     this.props.setContactRoleForOpportunity(data,contactId);
//   };
//   handleAddPlusClick3 = (contactId) => {
   
//     let data = {
      
//       contactRole: "Sponsor",
     
//     };

//     this.props.setContactRoleForOpportunity(data,contactId);
//   };

//   getColumnSearchProps = (dataIndex) => ({
//     filterDropdown: ({
//       setSelectedKeys,
//       selectedKeys,
//       confirm,
//       clearFilters,
//     }) => (
//       <div style={{ padding: 8 }}>
//         <Input
//           ref={(node) => {
//             this.searchInput = node;
//           }}
//           placeholder={`Search ${dataIndex}`}
//           value={selectedKeys[0]}
//           onChange={(e) =>
//             setSelectedKeys(e.target.value ? [e.target.value] : [])
//           }
//           onPressEnter={() =>
//             this.handleSearch(selectedKeys, confirm, dataIndex)
//           }
//           style={{ marginBottom: 8, display: "block" }}
//         />
        
//           <Button
//             type="primary"
//             onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
//              icon={<SearchOutlined />}
//             //icon="search"
//             size="small"
//             style={{ width: 90 }}
//           >
//             Search
//           </Button>
//           <Button
//             onClick={() => this.handleReset(clearFilters)}
//             size="small"
//             style={{ width: 90 }}
//           >
//             Reset
//           </Button>
//           <Button
//             type="link"
//             size="small"
//             onClick={() => {
//               confirm({ closeDropdown: false });
//               this.setState({
//                 searchText: selectedKeys[0],
//                 searchedColumn: dataIndex,
//               });
//             }}
//           >
//             Filter
//           </Button>
        
//       </div>
//     ),
//     filterIcon: (filtered) => (
//       <SearchOutlined type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
//     ),
//     onFilter: (value, record) =>
//       record[dataIndex]
//         ? record[dataIndex]
//           .toString()
//           .toLowerCase()
//           .includes(value.toLowerCase())
//         : "",
//     onFilterDropdownVisibleChange: (visible) => {
//       if (visible) {
//         setTimeout(() => this.searchInput.select(), 100);
//       }
//     },
//     render: (text) =>
//       this.state.searchedColumn === dataIndex ? (
//         <Highlighter
//           highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
//           searchWords={[this.state.searchText]}
//           autoEscape
//           textToHighlight={text ? text.toString() : ""}
//         />
//       ) : (
//         text
//       ),
//   });

//   handleSearch = (selectedKeys, confirm, dataIndex) => {
//     confirm();
//     this.setState({
//       searchText: selectedKeys[0],
//       searchedColumn: dataIndex,
//     });
//   };

//   handleReset = (clearFilters) => {
//     clearFilters();
//     this.setState({ searchText: "" });
//   };


//   render() {
//     const {
//         // dealDetailsbyID: { invOpportunityId },
//         fetchingDealContactList,
//         fetchingDealContactListError,
//       dealContactList,
//       unlinkContactFromOpportunity,
//       setContactRoleForOpportunity,
//     } = this.props;
//     const columns = [
//       {
//         title: "",
//         dataIndex: "",
//         width: "2%",
//         render: (name, item, i) => {
//           console.log(item);
//           //   return (
//           //     <divn style={{ height: "2em" }}>
//           //       <MultiAvatar
//           //         primaryTitle={item.firstName}
//           //         imageId={item.imageId}
//           //         imgWidth={"auto"}
//           //         imgHeight={"2em"}
//           //       />
//           //     </divn>
//           //   );
//         },
//       },
//       {
//         title: "",
//         dataIndex: "imageId",
//         width: "3%",
//         render: (name, item, i) => {
//           return (
//             <SubTitle>
//               <MultiAvatar
//                 primaryTitle={item.firstName}
//                 // imageId={item.imageId}
//                 // imageURL={item.imageURL}
//                 imgWidth={"2.5em"}
//                 imgHeight={"2.5em"}
//               />
//             </SubTitle>
//           );
//         },
//       },
//       {
//         // title: "Name",
//         title: <FormattedMessage
//           id="app.firstName"
//           defaultMessage="Name"
//         />,
//         width: "25%",
//         dataIndex: "fullName",
//         ...this.getColumnSearchProps("fullName"),
//         // render: (name, item, i) => {
//         //   const fullName = `${item.salutation || ""} ${item.firstName ||
//         //     ""} ${item.middleName || ""} ${item.lastName || ""} `;
//         //     return (
//         //      fullName
//         //     );
//         // }
      
//       },
//       {
//         //title: "Designation",
//         title: <FormattedMessage
//           id="app.designation"
//           defaultMessage="Designation"
//         />,
//         width: "25%",
//         dataIndex: "designation",
//         onFilter: (value, record) => record.designation.indexOf(value) === 0,
//         sorter: (a, b) => {
//           const designationA = a.designation;
//           const designationB = b.designation;
//           if (designationA < designationB) {
//             return -1;
//           }
//           if (designationA > designationB) {
//             return 1;
//           }

//           // names must be equal
//           return 0;
//         },
//       },
//       {
//         // title: "Function",
//         title: <FormattedMessage
//           id="app.department"
//           defaultMessage="Function"
//         />,
//         dataIndex: "department",
//         width: "20%",
//         onFilter: (value, record) => record.department.indexOf(value) === 0,
//         sorter: (a, b) => {
//           const departmentA = a.department;
//           const departmentB = b.department;
//           if (departmentA < departmentB) {
//             return -1;
//           }
//           if (departmentA > departmentB) {
//             return 1;
//           }

//           // names must be equal
//           return 0;
//         },
//       },
     
//       {
//         //title: "Email #",
//         title: <FormattedMessage id="app.email" defaultMessage="Email #" />,
//         width: "15%",
//         dataIndex: "emailId",
//       },
//       {
//         // title: "Mobile #",
//         title: <FormattedMessage id="app.mobile" defaultMessage="Mobile #" />,
//         dataIndex: "mobileNumber",
//         width: "15%",
//         render: (name, item, i) => {
//           return (
//             <divn>
//               {item.countryDialCode} {item.mobileNumber}
//             </divn>
//           );
//         },
//       },
//       {
//         // title: "Role",
//         title: "",
//         // <FormattedMessage id="app.role" defaultMessage="Role" />,
//         dataIndex: "contactId",
//         width: "30%",
//         render: (name, item, i) => {
         
//           console.log(name);
//           console.log(item);
//           return (
//             <div class=" flex justify-evenly" >
//               <ButtonGroup>
//                 <RoleButton
//                   type="DecisionMaker"
//                   iconType="fa-vote-yea"
//                   tooltip="Decision Maker"
//                   role={item.contactRole}
//                     onClick={() =>
//                      this.handleAddPlusClick(
                       
//                         item.contactId,
                        
//                       )
//                     }
//                 />
//                 <RoleButton
//                   type="Evaluator"
//                   iconType="fa-address-card"
//                   tooltip="Evaluator"
//                   role={item.contactRole}
//                     onClick={() =>
//                       this.handleAddPlusClick1(
                     
//                         item.contactId,
                      
//                       )
//                     }
//                 />
//                 <RoleButton
//                   type="Influencer"
//                   iconType="fa-hands-helping"
//                   tooltip="Influencer"
//                   role={item.contactRole}
//                     onClick={() =>
//                       this.handleAddPlusClick2(
                      
//                         item.contactId,
                       
//                       )
//                     }
//                 />
//                 <RoleButton
//                   type="Sponsor"
//                   iconType="fa-user"
//                   tooltip="Sponsor"
//                   role={item.contactRole}
//                     onClick={() =>
//                       this.handleAddPlusClick3(
                      
//                         item.contactId,
                       
//                       )
//                     }
//                 />
//               </ButtonGroup>
            
//             </div>
//           );
//         },
//         onFilter: (value, record) => record.department.indexOf(value) === 0,
//       }, 
//       {
//         title: "",
//         dataIndex: "contactId",
//         width: "5%",
//         render: (name, item, i) => {
//           console.log(name);
//           console.log(item);
//           return (
//             <StyledPopconfirm
//               placement="bottom"
//               //title="Do you wish to detach?"
//               title={<FormattedMessage
//                 id="app.doyouwishtodetach"
//                 defaultMessage="Do you wish to detach?"
//               />}
//             //   onConfirm={() =>
//             //     unlinkContactFromOpportunity(opportunityId, name)
//             //   }
//             >
//               <ActionIcon
//                 tooltipTitle="Detach Contact"
//                 iconType="api"
//                 onClick={null}
//                 size="1em"
//                 style={{ color: "#fb8500" }}
//               />
//             </StyledPopconfirm>
//           );
//         },
//       },


//     ];

//     if (fetchingDealContactList) {
//       return <BundleLoader />;
//     }
//     const tab = document.querySelector(".ant-layout-sider-children");
//     const tableHeight = tab && tab.offsetHeight * 0.75;
//     return (
//       <>
//         <StyledTable
//           // rowSelection={rowSelection}
//           rowKey="contactId"
//           columns={columns}
//            pagination={false}
//           scroll={{ y: tableHeight }}
//           dataSource={dealContactList}
//           onChange={console.log("contact onChangeHere...")}
//         />
//       </>
//     );
//   }
// }

// const mapStateToProps = ({ deal }) => ({
//   dealContactList: deal.dealContactList,
//   fetchingDealContactList: deal.fetchingDealContactList,
// });

// const mapDidivtchToProps = (didivtch) =>
//   bindActionCreators(
//     {
//         getDealContactList
//     },
//     didivtch
//   );

// export default connect(mapStateToProps, mapDidivtchToProps)(LinkedDealContact);

// function RoleButton({ type, iconType, tooltip, role, size, onClick }) {
//   if (role === type) {
//     size = "1.375em";
//   } else {
//     size = "1em";
//   }
//   return (
//     <Tooltip title={tooltip}>
//       <Button
//         style={{
//           padding: "0.375em",
//           borderColor: "trandivrent",
//           color: role === type ? "#1890ff" : "grey",
//         }}
//         ghost={role !== type}
//         onClick={onClick}
//       >
//         <i className={`fas ${iconType}`} style={{ fontSize: "1.25em" }}></i>
//       </Button>
//     </Tooltip>
//   );
// }


import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { Tooltip, Button,Input} from "antd";
import { BundleLoader } from "../../../../../../Components/Placeholder";
import {
  StyledTable,
  StyledPopconfirm,
} from "../../../../../../Components/UI/Antd";
import { MultiAvatar, SubTitle } from "../../../../../../Components/UI/Elements";
import { ActionIcon } from "../../../../../../Components/Utils";
import Highlighter from "react-highlight-words";
import {SearchOutlined}  from '@ant-design/icons';
import {getDealContactList} from "../../../../DealAction";

const ButtonGroup = Button.Group;
class LinkedDealContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
    searchedColumn: "",
    };
  }

  componentDidMount() {
    this.props.getDealContactList(this.props.dealDetailsbyID.invOpportunityId);
  }

  handleAddPlusClick = (contactId) => {
   
    let data = {
      
      contactRole: "DecisionMaker",
     
    };

    this.props.setContactRoleForOpportunity(data,contactId);
  };
  handleAddPlusClick1 = (contactId) => {
   
    let data = {
      
      contactRole: "Evaluator",
     
    };

    this.props.setContactRoleForOpportunity(data,contactId);
  };
  handleAddPlusClick2 = (contactId) => {
   
    let data = {
      
      contactRole: "Influencer",
     
    };

    this.props.setContactRoleForOpportunity(data,contactId);
  };
  handleAddPlusClick3 = (contactId) => {
   
    let data = {
      
      contactRole: "Sponsor",
     
    };

    this.props.setContactRoleForOpportunity(data,contactId);
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
             icon={<SearchOutlined />}
            //icon="search"
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };


  render() {
    console.log(this.props.dealDetailsbyID.invOpportunityId)
    return (
      <>
          <div className=' flex justify-end sticky top-28 z-auto'>          
<div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                  <div className=" flex  w-[97.5%] p-2 bg-trandivrent font-bold sticky top-0 z-10">
                  <div className=" md:w-[5.12rem]"></div>
                      <div className=" md:w-[11.12rem]">Name</div>
                      <div className=" md:w-[9.5rem]">Designation</div>
                      <div className=" md:w-[9.8rem] ">Function</div>
                      <div className="md:w-[9.7rem]">Email #"</div>
                      <div className="md:w-[6.8rem]">Mobile #"</div>
                     
                  </div>
                  <div class="overflow-y-auto h-[67vh]">
                  {this.props.dealContactList.map((item) => {
                      
                      return (
                          <div >
                              <div className="flex rounded-xl  mt-4 bg-white h-12 items-center p-3 "

                              >
                                  <div class="flex">
                                      <div className=" flex font-medium  md:w-[2.8rem] max-sm:w-full  ">
                                      <MultiAvatar
                primaryTitle={item.firstName}
                // imageId={item.imageId}
                // imageURL={item.imageURL}
                imgWidth={"2.5em"}
                imgHeight={"2.5em"}
              />
                                      </div>

                                      <div className=" flex font-medium   md:w-[12.2rem] max-sm:flex-row w-full max-sm:justify-between items-center  ">
                                          <div class=" text-xs text-cardBody font-poppins">
                                             {item.fullName}
                                          </div>

                                      </div>
                                      <div className=" flex font-medium  md:w-[10.2rem] max-sm:flex-row w-full max-sm:justify-between items-center ">
                                          <div class=" text-xs text-cardBody font-poppins">
                                              {item.designation}
                                          </div>
                                      </div>
                                  </div>
                                  <div className=" flex font-medium  md:w-[8.5rem] max-sm:flex-row w-full max-sm:justify-between ">


                                      <div class=" text-xs text-cardBody font-poppins text-center">
                                      {item.department}

                                      </div>
                                  </div>
                                  <div className=" flex font-medium  md:w-[10.21rem] max-sm:flex-row w-full max-sm:justify-between ">
                                      <div class=" text-xs text-cardBody font-poppins text-center">
                                        {item.emailId}

                                      </div>
                                  </div>
                                  <div className=" flex font-medium  md:w-[10.22rem] max-sm:flex-row w-full max-sm:justify-between ">
                                      <div class=" text-xs text-cardBody font-poppins text-center">
                                      {item.countryDialCode} {item.mobileNumber}

                                      </div>
                                  </div>
                                  <div className=" flex font-medium  md:w-[10.23rem] max-sm:flex-row w-full max-sm:justify-between ">
                                      <div class=" text-xs text-cardBody font-poppins text-center">
                                      <div class=" flex justify-evenly" >
              <ButtonGroup>
                <RoleButton
                  type="DecisionMaker"
                  iconType="fa-vote-yea"
                  tooltip="Decision Maker"
                  role={item.contactRole}
                    onClick={() =>
                     this.handleAddPlusClick(
                       
                        item.contactId,
                        
                      )
                    }
                />
                <RoleButton
                  type="Evaluator"
                  iconType="fa-address-card"
                  tooltip="Evaluator"
                  role={item.contactRole}
                    onClick={() =>
                      this.handleAddPlusClick1(
                     
                        item.contactId,
                      
                      )
                    }
                />
                <RoleButton
                  type="Influencer"
                  iconType="fa-hands-helping"
                  tooltip="Influencer"
                  role={item.contactRole}
                    onClick={() =>
                      this.handleAddPlusClick2(
                      
                        item.contactId,
                       
                      )
                    }
                />
                <RoleButton
                  type="Sponsor"
                  iconType="fa-user"
                  tooltip="Sponsor"
                  role={item.contactRole}
                    onClick={() =>
                      this.handleAddPlusClick3(
                      
                        item.contactId,
                       
                      )
                    }
                />
              </ButtonGroup>
            
            </div>

                                      </div>
                                  </div>
                                  <div className=" flex font-medium  md:w-[10.24rem] max-sm:flex-row w-full max-sm:justify-between ">
                                      <div class=" text-xs text-cardBody font-poppins text-center">
                                      <StyledPopconfirm
              placement="bottom"
              //title="Do you wish to detach?"
              title={<FormattedMessage
                id="app.doyouwishtodetach"
                defaultMessage="Do you wish to detach?"
              />}
            //   onConfirm={() =>
            //     unlinkContactFromOpportunity(opportunityId, name)
            //   }
            >
              <ActionIcon
                tooltipTitle="Detach Contact"
                iconType="api"
                onClick={null}
                size="1em"
                style={{ color: "#fb8500" }}
              />
            </StyledPopconfirm>

                                      </div>
                                  </div>

                              </div>
                          </div>
                      )
                  })}
                  </div>
              </div>
             
              
          </div>
      </>
  )
    

   
    
   
    
  }
}

const mapStateToProps = ({ deal }) => ({
  dealContactList: deal.dealContactList,
  fetchingDealContactList: deal.fetchingDealContactList,
});

const mapDidivtchToProps = (didivtch) =>
  bindActionCreators(
    {
        getDealContactList
    },
    didivtch
  );

export default connect(mapStateToProps, mapDidivtchToProps)(LinkedDealContact);

function RoleButton({ type, iconType, tooltip, role, size, onClick }) {
  if (role === type) {
    size = "1.375em";
  } else {
    size = "1em";
  }
  return (
    <Tooltip title={tooltip}>
      <Button
        style={{
          padding: "0.375em",
          borderColor: "trandivrent",
          color: role === type ? "#1890ff" : "grey",
        }}
        ghost={role !== type}
        onClick={onClick}
      >
        <i className={`fas ${iconType}`} style={{ fontSize: "1.25em" }}></i>
      </Button>
    </Tooltip>
  );
}
