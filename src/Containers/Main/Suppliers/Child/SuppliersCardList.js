import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { DeleteOutlined,EditOutlined } from "@ant-design/icons";
import { Tooltip, Popconfirm } from "antd";
import {getSuppliersList } from "../SuppliersAction"
import { OnlyWrapCard } from "../../../../Components/UI/Layout";
import { Link } from "../../../../Components/Common";
import InfiniteScroll from "react-infinite-scroll-component";
import { FormattedMessage } from "react-intl";

function SuppliersCardList(props) {
  useEffect(() => {
    props.getSuppliersList(props.userId);
  }, []);

  const [hasMore, setHasMore] = useState(true);
 
  const [page, setPage] = useState(0);

  const { handleUpdateShipperModal, updateShipperModal } = props;

  const [currentShipperId, setCurrentShipperId] = useState("");
  const [rowdata, setrowData] = useState({});
    
  const handleRowData = (data) => {
    setrowData(data);
  };

  function handleSetCurrentShipperId(shipperId) {
    setCurrentShipperId(shipperId);
  }
  const handleLoadMore = () => {
      setPage(page + 1);
  };

  
return(
<>
<div className=' flex justify-end sticky top-28 z-auto'>
<OnlyWrapCard style={{backgroundColor:"#E3E8EE"}}>
<div className=" flex justify-between w-[97.5%] p-2 bg-transparent font-bold sticky top-0 z-10">
        <div className=" md:w-[8.1rem]">  <FormattedMessage
                        id="app.name"
                        defaultMessage="Name"
                      /></div>
        <div className=" md:w-[5.1rem]">
        <FormattedMessage id="app.phoneNo" defaultMessage="Phone #" />
          </div>
        <div className=" md:w-[6.8rem] ">  <FormattedMessage id="app.email" defaultMessage="Email" /></div>
        <div className="md:w-[7.8rem]">
        <FormattedMessage id="app.address" defaultMessage="Address" />
          
          </div>
        <div className="md:w-[7.9rem]">
        <FormattedMessage id="app.city" defaultMessage="City" />
          
          </div>
        <div className="md:w-[5.2rem]">
        <FormattedMessage id="app.pinCode" defaultMessage="PinCode" />
          
          </div>
        <div className="w-[3.8rem]">
            <FormattedMessage id="app.action" defaultMessage="Action" />
          
          </div>
        </div>
        <InfiniteScroll
        dataLength={props.supplierList.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={props.fetchingSupplierList?<h4 style={{ textAlign: 'center' }}>Loading...</h4>:null}
        height={"75vh"}
      >
{props.supplierList.map((item) => {
  return (
    <>
     <div className="flex rounded-xl justify-between mt-[0.5rem] bg-white h-[2.75rem] items-center p-3"    
      
                >
 <div class=" flex flex-row justify-evenly w-wk max-sm:flex-col">
 <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
<div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
<Link
          toUrl={`supplier/${item.supplierId}`}
          title={`${item.name}`}
        >{item.name}</Link>
</div>

</div>
<div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">



<div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
{item.dialCode} {item.phoneNo}
</div>

</div>
<div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

<div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
{item.emailId} 
</div>

</div>


<div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
<div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
{`${(item.addresses && item.addresses.length && item.addresses[0].address1) || ""}
          ${(item.addresses && item.addresses.length && item.addresses[0].state) || ""}
          ${(item.addresses && item.addresses.length && item.addresses[0].street) || ""}
          ${(item.addresses && item.addresses.length && item.addresses[0].city) || ""}
          ${(item.addresses && item.addresses.length && item.addresses[0].pinCode) || ""}`}
</div>

</div>
<div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

<div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
{(item.addresses &&
           item.addresses.length &&
           item.addresses[0].city) ||
          ""}
</div>

</div>
<div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
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
</InfiniteScroll>
  </OnlyWrapCard>
  </div>

 
</>
)
}
const mapStateToProps = ({ shipper, suppliers,auth }) => ({
  supplierList: suppliers.supplierList,
  userId: auth.userDetails.userId,
  fetchingSupplierList: suppliers.fetchingSupplierList,
  fetchingSupplierListError: suppliers.fetchingSupplierListError,
  updateShipperModal: shipper.updateShipperModal,
  addShipperActivityTableModal: shipper.addShipperActivityTableModal,
  addShipperOrderModal: shipper.addShipperOrderModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getSuppliersList
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SuppliersCardList);