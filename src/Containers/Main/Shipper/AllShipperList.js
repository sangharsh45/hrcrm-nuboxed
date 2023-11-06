// import React, { useEffect, useState } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { StyledTable } from "../../../Components/UI/Antd";
// import { Tooltip, Input, Button, Space } from "antd";
// import { Spacer } from "../../../Components/UI/Elements";


// function AllShipperList(props) {
//   useEffect(() => {
  
//   }, []);

//   const columns = [
//     {
//       title: "",
//       width: "2%",
//     },
//     {
//       title: "Name",
//       width: "15%",
//       // ...getColumnSearchProps("name"),
//       defaultSortOrder: "descend",
//       // sorter: (a, b) => a.name - b.name,
//       // render: (name, item, i) => (
//       //   <ShipperDetailsView shipperId={item.shipperId} name={item.name} />
//       // ),
//     },
//     {
//       title: "Phone #",
//       width: "8%",
//       dataIndex: "phoneNo",
//       render: (name, item, i) => {
//         return (
//           <>
//             {item.dialCode} {item.phoneNo}
//           </>
//         );
//       },
//     },
//     {
//       title: "Email",
//       dataIndex: "emailId",
//       width: "15%",
//     },

//     {
//       title: "Mobile #",
//       dataIndex: "mobileNo",

//     },

//     {
//       title: "Ship By",
//       dataIndex: "shipBy",
//     },
//     {
//       title: "Address",
//       width: "18%",
//       //  dataIndex: "addressId",
//       render: (name, item, i) => {
//         return `${(item.addresses &&
//           item.addresses.length &&
//           item.addresses[0].address1) ||
//           ""},
//                       ${(item.addresses &&
//             item.addresses.length &&
//             item.addresses[0].state) ||
//           ""},
//                       ${(item.addresses &&
//             item.addresses.length &&
//             item.addresses[0].street) ||
//           ""},
//                       ${(item.addresses &&
//             item.addresses.length &&
//             item.addresses[0].city) ||
//           ""},
//                       ${(item.addresses &&
//             item.addresses.length &&
//             item.addresses[0].pinCode) ||
//           ""}`;
//       },
//     },

//     {
//       title: "Pin Code",
//       width: "6%",
//       render: (name, item, i) => {
//         return `${(item.addresses &&
//           item.addresses.length &&
//           item.addresses[0].pinCode) ||
//           ""}`;
//       },
//     },
//     {
//       title: "City",
//       width: "6%",
//       render: (name, item, i) => {
//         return `${(item.addresses &&
//           item.addresses.length &&
//           item.addresses[0].city) ||
//           ""}`;
//       },
//     },
//     {
//       title: "Owner",
//       width: "15%",
//       dataIndex: "salesExecutive",
//       //   filters: salesOption,
//       //   onFilter: (value, record) => {
//       //     console.log(value, record);
//       //     return record.type === value;
//       //   },
//       // render: (name, item, i) => {

//       //     return (
//       //     <Tooltip title= {item.salesExecutiveEmail} >
//       //      <Tooltip placement="bottom" title= {item.salesExecutiveMobileNo} >
//       //      {item.salesExecutive || ""}</Tooltip>
//       //     </Tooltip>
//       //     )
//       // },
//     },

//     {
//       title: "",
//       width: "2%",
//       render: (name, item, i) => {
//         return (
//           <>
//             <Tooltip title={item.salesExecutiveMobileNo}>
//               <span>
//                 <i class="fas fa-phone"></i>
//               </span>
//             </Tooltip>
//           </>
//         );
//       },
//     },

//     {
//       title: "",
//       width: "2%",
//       render: (name, item, i) => {
//         return (
//           <>
//             <Tooltip title={item.salesExecutiveEmail}>
//               <span>
//                 <i class="far fa-envelope"></i>
//               </span>
//             </Tooltip>
//           </>
//         );
//       },
//     },

//     {
//       title: props.recriutmentInd ? "Status" : "",
//       width: props.recriutmentInd ? "10%" : "",
//     },
//   ];
//   // if (props.fetchingAllShipperError) {
//   //   return <APIFailed />;
//   // }

//   return (
//     <>
//       <StyledTable
//         rowKey=""
//         columns={columns}
//         // dataSource={props.allShipper}
//         // loading={props.fetchingAllShipper || props.fetchingAllShipperError}
//         pagination={false}
//         scroll={{ y: 320 }}
//       />
//       <Spacer />
//     </>
//   );
// }
// const mapStateToProps = ({ shipper, auth, leads }) => ({
//   // allShipper: shipper.allDistributors,
//   // fetchingAllShipper: shipper.fetchingAllShipper,
//   // fetchingAllShipperError: shipper.fetchingAllShipperError,
//   // userId: auth.userDetails.userId,
//   //   onlySalesUsers: leads.onlySalesUsers,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       // getAllShipperList,
//       //   getOnlySalesUser,
//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(AllShipperList);


import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../Components/UI/Antd";
import { DeleteOutlined,EditOutlined } from "@ant-design/icons";
import { Tooltip, Input, Button, Space, Popconfirm } from "antd";
import {
  ShoppingCartOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Spacer } from "../../../Components/UI/Elements";
import {
  getAllShipperList,
  setEditShipper,
  handleUpdateShipperModal,
  handleShipperOrderModal,
  handleShipperActivityTableModal,
  deleteShipperData,
} from "./ShipperAction";
import moment from "moment";
import AddShipperActivityModal from "./AddShipperActivityModal";
import UpdateShipperModal from "./UpdateShipperModal";
import AddShipperOrderModal from "./AddShipperOrderModal";
import Highlighter from "react-highlight-words";
import { OnlyWrapCard } from "../../../Components/UI/Layout";
import { Link } from "../../../Components/Common";

function AllShipperList(props) {
  useEffect(() => {
    props.getAllShipperList();
  }, []);

  const { handleUpdateShipperModal, updateShipperModal } = props;

  const [currentShipperId, setCurrentShipperId] = useState("");
  const [rowdata, setrowData] = useState({});
    
  const handleRowData = (data) => {
    setrowData(data);
  };



  function handleSetCurrentShipperId(shipperId) {
    setCurrentShipperId(shipperId);
  }

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  function getColumnSearchProps(dataIndex) {
    return {
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            // ref={node => {
            //   this.searchInput = node;
            // }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 240, marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => handleReset(clearFilters)}
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
                setSearchText(selectedKeys[0]);
                setSearchedColumn(dataIndex);
              }}
            >
              Filter
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          // setTimeout(() => this.searchInput.select());
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ) : (
          text
        ),
    };
  }

  function handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  }

  function handleReset(clearFilters) {
    clearFilters();
    setSearchText("");
  }
return(
<>
<OnlyWrapCard style={{height:"70vh"}}>
{props.shipperByUserId.map((item) => {
  return (
    <>
     <div className="flex justify-between mt-2 "
                  // style={hrStyle}
                  style={{
                    borderBottom: "3px dotted #515050"
                  }}
                >
 <div class=" flex flex-row justify-evenly w-wk max-sm:flex-col">
 <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

<div class=" text-sm text-cardBody font-medium font-poppins">

Name

</div> 


<div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
{/* {item.shipperName} */}
<Link
          toUrl={`shipper/${item.shipperId}`}
          title={`${item.shipperName}`}
        >{item.shipperName}</Link>&
</div>

</div>
<div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

<div class=" text-sm text-cardBody font-medium font-poppins">

Phone #

</div> 


<div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
{item.dialCode} {item.phoneNo}
</div>

</div>
<div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

<div class=" text-sm text-cardBody font-medium font-poppins">

Email

</div> 


<div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
{item.emailId} 
</div>

</div>

<div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

<div class=" text-sm text-cardBody font-medium font-poppins">

Ship By

</div> 


<div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
{item.shipByName} 
</div>

</div>
<div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

<div class=" text-sm text-cardBody font-medium font-poppins">

Address

</div> 


<div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
{`${(item.addresses && item.addresses.length && item.addresses[0].address1) || ""}
          ${(item.addresses && item.addresses.length && item.addresses[0].state) || ""}
          ${(item.addresses && item.addresses.length && item.addresses[0].street) || ""}
          ${(item.addresses && item.addresses.length && item.addresses[0].city) || ""}
          ${(item.addresses && item.addresses.length && item.addresses[0].pinCode) || ""}`}
</div>

</div>
<div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

<div class=" text-sm text-cardBody font-medium font-poppins">

City

</div> 


<div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
{(item.addresses &&
           item.addresses.length &&
           item.addresses[0].city) ||
          ""}
</div>

</div>
<div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

<div class=" text-sm text-cardBody font-medium font-poppins">

PinCode

</div> 


<div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
{(item.addresses &&
          item.addresses.length &&
          item.addresses[0].pinCode) ||
          ""}
</div>

</div>
<div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

<div class=" text-sm text-cardBody font-medium font-poppins">

Owner

</div> 


<div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
{item.salesExecutive}
</div>

</div>

<Tooltip title="Edit">
            <EditOutlined
              style={{ cursor: "pointer" }}
              onClick={() => {
                props.setEditShipper(item);
                handleRowData(item);
                handleUpdateShipperModal(true);
                handleSetCurrentShipperId(item.shipperId);
              }}
            />
          </Tooltip>
          <Popconfirm
              title="Do you want to delete?"
             onConfirm={() => props.deleteShipperData(item.shipperId)}
            >
              <DeleteOutlined

                style={{ cursor: "pointer", color: "red" }}
              />
            </Popconfirm>



 </div>




                </div>
    </>
  )
})}

  </OnlyWrapCard>
  <UpdateShipperModal
      rowdata={rowdata}
        shipperId={currentShipperId}
        updateShipperModal={updateShipperModal}
        handleSetCurrentShipperId={handleSetCurrentShipperId}
        handleUpdateShipperModal={handleUpdateShipperModal}
      />
      <AddShipperOrderModal
        addShipperOrderModal={props.addShipperOrderModal}
        handleShipperOrderModal={props.handleShipperOrderModal}
        shipperId={currentShipperId}
        handleSetCurrentShipperId={handleSetCurrentShipperId}
      />
      <AddShipperActivityModal
        addShipperActivityTableModal={props.addShipperActivityTableModal}
        handleShipperActivityTableModal={props.handleShipperActivityTableModal}
        shipperId={currentShipperId}
        handleSetCurrentShipperId={handleSetCurrentShipperId}
      />
</>
)
}
const mapStateToProps = ({ shipper, auth }) => ({
  shipperByUserId: shipper.shipperByUserId,
  userId: auth.userDetails.userId,
  fetchingShipperByUserId: shipper.fetchingShipperByUserId,
  fetchingShipperByUserIdError: shipper.fetchingShipperByUserIdError,
  updateShipperModal: shipper.updateShipperModal,
  addShipperActivityTableModal: shipper.addShipperActivityTableModal,
  addShipperOrderModal: shipper.addShipperOrderModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleUpdateShipperModal,
      handleShipperActivityTableModal,
      handleShipperOrderModal,
      deleteShipperData,
      getAllShipperList,
      setEditShipper,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AllShipperList);