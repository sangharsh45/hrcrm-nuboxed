
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../Components/UI/Antd";
import { MultiAvatar, SubTitle } from "../../../Components/UI/Elements";
import { BundleLoader } from "../../../Components/Placeholder";
import {
  getSuppliesList,
  handleUpdateSupplieDrawer,
  setEditSupplies,
  deletePurchaseData,
  handleCurrencyPriceModal,
  handleBrandModel
} from "./SuppliesAction";
import { Empty, Icon, Tooltip, Button, Popconfirm, Switch } from "antd";
import { DeleteFilled, DeleteOutlined, EditOutlined, MoneyCollectOutlined, PhoneFilled, } from "@ant-design/icons";
import moment from "moment";
import TagBrandModel from "./TagBrandModel";
import { OnlyWrapCard } from "../../../Components/UI/Layout";

function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function SuppliesCard(props) {
  useEffect(() => {
    props.getSuppliesList();
  }, []);

  const [showHistory, setshowHistory] = useState(false);
  const [suppliesId, setSuppliesId] = useState("");
  const [currentSuppliesId, setCurrentSuppliesId] = useState("");
  const [particularDiscountData, setParticularDiscountData] = useState({});

  function handleSetCurrentSuppliesId(suppliesId) {
    setCurrentSuppliesId(suppliesId);
    console.log(suppliesId);
  }
  function handleParticularRowData(item) {
    setParticularDiscountData(item);
  }
  function handleSuppliesHistory(suppliesId) {
    setshowHistory(!showHistory);
    setSuppliesId(suppliesId);
  }

  const {
    updateSuppliesModal,
    handleUpdateSupplieDrawer,
  } = props;
  return(
    <>
    <OnlyWrapCard style={{height:"80vh"}}>
    {props.purchaseList.map((item) => {
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
    
    Hsn
    
    </div> 
    
    
    <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
    {item.hsn}
    </div>
    
    </div>
    <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
    
    <div class=" text-sm text-cardBody font-medium font-poppins">
    
    Name
    
    </div> 
    
    
    <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
    {item.name} 
    </div>
    
    </div>
    <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
    
    <div class=" text-sm text-cardBody font-medium font-poppins">
    
    Category
    
    </div> 
    
    
    <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
    {item.categoryName} 
    </div>
    
    </div>
    
    <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
    
    <div class=" text-sm text-cardBody font-medium font-poppins">
    
    Sub Category
    
    </div> 
    
    
    <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
    {item.subCategoryName} 
    </div>
    
    </div>
    <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
    
    <div class=" text-sm text-cardBody font-medium font-poppins">
    
    Attribute
    
    </div> 
    
    
    <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
    {item.attributeName} {item.subAttributeName}
    </div>
    
    </div>
    <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
    
    <div class=" text-sm text-cardBody font-medium font-poppins">
    
    Re-order level
    
    </div> 
    
    
    <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
    {item.reorder}
    </div>
    
    </div>
    <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
    
    <div class=" text-sm text-cardBody font-medium font-poppins">
    Created
    </div> 
    
    <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
    {`${moment(item.creationDate).format("ll")}`}
    </div>
    
    </div>
    <div class="flex flex-col">
    <Tooltip title="Edit">
                <PhoneFilled
                  onClick={() => {
                    props.handleBrandModel(true);
                    handleParticularRowData(item)
                  }}
                  style={{ color: "blue" }} />
                
              </Tooltip>
              <span
              style={{ color: "red" }}
              onClick={() => {
                // props.deletePurchaseData(item.suppliesId)
              }}>
              <DeleteFilled />
            </span>
    
            </div>
    
     </div>
    
    
    
    
                    </div>
        </>
      )
    })}
    
      </OnlyWrapCard>
      <TagBrandModel
        addBrandModel={props.addBrandModel}
        handleBrandModel={props.handleBrandModel}
        particularDiscountData={particularDiscountData}
      />
    </>
    )
  }

  const mapStateToProps = ({ supplies, auth }) => ({
    fetchingPurchaseList: supplies.fetchingPurchaseList,
    purchaseList: supplies.purchaseList,
    updateSuppliesModal: supplies.updateSuppliesModal,
    addCurrencyValue: supplies.addCurrencyValue,
    addBrandModel: supplies.addBrandModel
  });
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
  
        getSuppliesList,
        handleUpdateSupplieDrawer,
        setEditSupplies,
        deletePurchaseData,
        handleCurrencyPriceModal,
        handleBrandModel
      },
      dispatch
    );
  
  export default connect(mapStateToProps, mapDispatchToProps)(SuppliesCard);
  