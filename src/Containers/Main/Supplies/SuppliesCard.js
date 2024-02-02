
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getSuppliesList,
  handleUpdateSupplieDrawer,
  setEditSupplies,
  deletePurchaseData,
  handleCurrencyPriceModal,
  handleBrandModel
} from "./SuppliesAction";
import {Tooltip} from "antd";
import { DeleteFilled,PhoneFilled, } from "@ant-design/icons";
import moment from "moment";
import TagBrandModel from "./TagBrandModel";
import QrCode from "./QrCode";


function SuppliesCard(props) {
  useEffect(() => {
    props.getSuppliesList();
  }, []);

  const [particularDiscountData, setParticularDiscountData] = useState({});

  function handleParticularRowData(item) {
    setParticularDiscountData(item);
  }

  return(
    <>
   <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
    {props.purchaseList.map((item) => {
      return (
        <>
         <div className="flex justify-between mt-2 "
                     
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
    <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
    
    <div class=" text-sm text-cardBody font-medium font-poppins">
    Scan
    </div> 
    
    <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
    <QrCode/>
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
    
      </div>
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
  