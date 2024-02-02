import React, { useState, useEffect,Suspense,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import QrCode from "./QrCode"
import {
  getSuppliesList,
  handleUpdateSupplieDrawer,
  setEditSupplies,
  deletePurchaseData,
  handleCurrencyPriceModal,
  handleBrandModel,
} from "./SuppliesAction";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Tooltip, Popconfirm } from "antd";
import {
  DeleteFilled,
  PhoneFilled,
} from "@ant-design/icons";
import moment from "moment";
import InventoryIcon from '@mui/icons-material/Inventory';
import { BundleLoader } from "../../../Components/Placeholder";

const UpdateSuppliesFormDrawer =lazy(()=>import("./UpdateSuppliesFormDrawer"));
const TagBrandModel =lazy(()=>import("./TagBrandModel"));


function SuppliesTable(props) {
  useEffect(() => {
    props.getSuppliesList();
  }, []);

  const [particularDiscountData, setParticularDiscountData] = useState({});

  function handleParticularRowData(item) {
    setParticularDiscountData(item);
  }

  const { updateSuppliesDrawer, handleUpdateSupplieDrawer } = props;

  return (
    <>
      <div className=" flex justify-end sticky top-28 z-auto">
      <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
          <div className=" flex justify-between w-[97.5%] p-2 bg-transparent font-bold sticky top-0 z-10">
            <div className=" md:w-[6.1rem]">HSN</div>
            <div className=" md:w-[5.1rem]">Name</div>
            <div className=" md:w-[6.2rem] ">Category</div>
            <div className="md:w-[6.1rem]">Sub Category</div>
            <div className="md:w-[4.8rem]">Attribute</div>
            <div className="md:w-[6.1rem]">Re-order level</div>
            <div className="md:w-[4.2rem]">Created</div>
            <div className="md:w-[4.2rem]">Scan</div>
            <div className="w-[3.8rem]"></div>
          </div>
          {props.purchaseList.map((item) => {
            return (
              <>
                <div
                  className="flex rounded-xl justify-center bg-white mt-[0.5rem]  h-[2.75rem]  p-3">
                  <div class=" flex flex-row justify-evenly w-wk max-sm:flex-col">
                    <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
                      <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                        {item.hsn}
                      </div>
                    </div>
                    <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
                      <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                        {item.name}
                      </div>
                    </div>
                    <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
                      <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                        {item.categoryName}
                      </div>
                    </div>

                    <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
                      <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                        {item.subCategoryName}
                      </div>
                    </div>
                    <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
                      <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                        {item.attributeName} {item.subAttributeName}
                      </div>
                    </div>
                    <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
                      <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                        {item.reorder}
                      </div>
                    </div>
                    <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
                      <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                      {`${moment(item.creationDate).format("ll")}`}
                      </div>
                    </div>
                    <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
                      <div class=" font-normal text-[0.82rem] text-cardBody font-poppins">
                    <QrCode/>
                      </div>
                    </div>
                    <div class="flex flex-col w-[3%] justify-center max-sm:flex-row max-sm:w-[10%]">
                      <div>
                        <Tooltip>
                          <PhoneFilled
                            onClick={() => {
                              props.handleBrandModel(true);
                              handleParticularRowData(item);
                            }}
                            style={{ color: "blue", cursor: "pointer" }}
                          />
                        </Tooltip>
                      </div>
                      <div>
                       
                          <InventoryIcon
                            style={{ cursor: "pointer", fontSize: "1rem",}}
                          />
                      
                      </div>
                    </div>
                    <div class="flex flex-col justify-center w-[3%] max-sm:flex-row max-sm:w-[10%]">
                      <div>
                      <Tooltip title="Edit">
                          <BorderColorIcon
                            onClick={() => {
                              handleUpdateSupplieDrawer(true);
                              handleParticularRowData(item);
                            }}
                            style={{
                              color: "grey",
                              cursor: "pointer",
                              fontSize: "1rem",
                            }}
                          />
                        </Tooltip>
                      </div>
                      <div>
                        <Popconfirm
                          title="Do you want to delete?"
                          //  onConfirm={() => props.deleteShipperData(item.shipperId)}
                        >
                          <DeleteFilled
                            style={{ cursor: "pointer", color: "red" }}
                          />
                        </Popconfirm>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>

<Suspense fallback={<BundleLoader/>}>
<TagBrandModel
        addBrandModel={props.addBrandModel}
        handleBrandModel={props.handleBrandModel}
        particularDiscountData={particularDiscountData}
      />
      <UpdateSuppliesFormDrawer
       particularDiscountData={particularDiscountData}
      updateSuppliesDrawer={updateSuppliesDrawer}
      handleUpdateSupplieDrawer={handleUpdateSupplieDrawer}
      />
</Suspense>
     
    </>
  );
}

const mapStateToProps = ({ supplies, auth }) => ({
  fetchingPurchaseList: supplies.fetchingPurchaseList,
  purchaseList: supplies.purchaseList,
  updateSuppliesDrawer: supplies.updateSuppliesDrawer,
  addCurrencyValue: supplies.addCurrencyValue,
  addBrandModel: supplies.addBrandModel,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getSuppliesList,
      handleUpdateSupplieDrawer,
      setEditSupplies,
      deletePurchaseData,
      handleCurrencyPriceModal,
      handleBrandModel,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SuppliesTable);
