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
  getShipperByUserId,
  setEditShipper,
  handleUpdateShipperModal,
  handleShipperOrderModal,
  handleShipperActivityTableModal,
  deleteShipperData,
} from "./ShipperAction";
import moment from "moment";
// import AddShipperActivityModal from "./AddShipperActivityModal";
import UpdateShipperModal from "./UpdateShipperModal";
import AddShipperOrderModal from "./AddShipperOrderModal";
import Highlighter from "react-highlight-words";
import { OnlyWrapCard } from "../../../Components/UI/Layout";
import { Link } from "../../../Components/Common";

function ShipperCardList(props) {
  useEffect(() => {
    props.getShipperByUserId(props.userId);
  }, []);

  const [hasMore, setHasMore] = useState(true);

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
<div className=' flex justify-end sticky top-28 z-auto'>
<OnlyWrapCard style={{height:"80vh",backgroundColor:"#E3E8EE"}}>
<div className=" flex justify-between w-[97.5%] p-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" md:w-[8.1rem]">Name</div>
        <div className=" md:w-[5.1rem]">Phone #</div>
        <div className=" md:w-[6.8rem] ">Email</div>
        <div className="md:w-[5.9rem]">Ship By</div>
        <div className="md:w-[7.8rem]">Address</div>
        <div className="md:w-[7.9rem]">City</div>
        <div className="md:w-[5.2rem]">PinCode</div>
        <div className="w-[3.8rem]">Action</div>
        </div>
{props.shipperByUserId.map((item) => {
  return (
    <>
     <div className="flex rounded-xl justify-between mt-4 bg-white h-12 items-center p-3"
           
                  style={{
                    // borderBottom: "3px dotted #515050"
                  }}
                >
 <div class=" flex flex-row justify-evenly w-wk max-sm:flex-col">
 <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

{/* <div class=" text-sm text-cardBody font-medium font-poppins">

Name

</div>  */}


<div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
<Link
          toUrl={`shipper/${item.shipperId}`}
          title={`${item.shipperName}`}
        >{item.shipperName}</Link>
</div>

</div>
<div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

{/* <div class=" text-sm text-cardBody font-medium font-poppins">

Phone #

</div>  */}


<div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
{item.dialCode} {item.phoneNo}
</div>

</div>
<div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

{/* <div class=" text-sm text-cardBody font-medium font-poppins">

Email

</div>  */}


<div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
{item.emailId} 
</div>

</div>

<div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

{/* <div class=" text-sm text-cardBody font-medium font-poppins">

Ship By

</div>  */}


<div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
{item.shipByName} 
</div>

</div>
<div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
{/* 
<div class=" text-sm text-cardBody font-medium font-poppins">

Address

</div>  */}


<div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
{`${(item.addresses && item.addresses.length && item.addresses[0].address1) || ""}
          ${(item.addresses && item.addresses.length && item.addresses[0].state) || ""}
          ${(item.addresses && item.addresses.length && item.addresses[0].street) || ""}
          ${(item.addresses && item.addresses.length && item.addresses[0].city) || ""}
          ${(item.addresses && item.addresses.length && item.addresses[0].pinCode) || ""}`}
</div>

</div>
<div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

{/* <div class=" text-sm text-cardBody font-medium font-poppins">

City

</div>  */}


<div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
{(item.addresses &&
           item.addresses.length &&
           item.addresses[0].city) ||
          ""}
</div>

</div>
<div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

{/* <div class=" text-sm text-cardBody font-medium font-poppins">

PinCode

</div>  */}


<div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
{(item.addresses &&
          item.addresses.length &&
          item.addresses[0].pinCode) ||
          ""}
</div>

</div>
<div class="flex flex-col w-[3%] max-sm:flex-row max-sm:w-[10%]">
 <div>
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
          </div>
          <div>
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


 </div>




                </div>
    </>
  )
})}

  </OnlyWrapCard>
  </div>
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
      {/* <AddShipperActivityModal
        addShipperActivityTableModal={props.addShipperActivityTableModal}
        handleShipperActivityTableModal={props.handleShipperActivityTableModal}
        shipperId={currentShipperId}
        handleSetCurrentShipperId={handleSetCurrentShipperId}
      /> */}
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
      getShipperByUserId,
      setEditShipper,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ShipperCardList);