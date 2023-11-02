import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../Components/UI/Antd";
import { MultiAvatar, SubTitle } from "../../../Components/UI/Elements";
import { BundleLoader } from "../../../Components/Placeholder";
import {
  getSuppliesList,
  handleUpdateSuppliesModal,
  setEditSupplies,
  deletePurchaseData,
  handleCurrencyPriceModal,
  handleBrandModel
} from "./SuppliesAction";
import { Empty, Icon, Tooltip, Button, Popconfirm, Switch } from "antd";
import { DeleteFilled, DeleteOutlined, EditOutlined, MoneyCollectOutlined, PhoneFilled, } from "@ant-design/icons";
import moment from "moment";
import TagBrandModel from "./TagBrandModel";

function onChange(pagination, filters, sorter) {
  console.log("params", pagination, filters, sorter);
}

function SuppliesTable(props) {
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
    handleUpdateSuppliesModal,
  } = props;
  const columns = [
    {
      title: "",
      dataIndex: "",
      width: "2%",
    },
    {
      title: "Hsn",
      dataIndex: "hsn",
      width: "8%",
    },

    {
      title: "Name",
      dataIndex: "name",
      width: "10%",
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      sorter: (a, b) => {
        var nameA = a.categoryName.toLowerCase(); // ignore upper and lowercase
        var nameB = b.categoryName.toLowerCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      },
      width: "8%",
    },
    {
      title: "Sub Category",
      dataIndex: "subCategoryName",
      width: "10%",
    },
    {
      title: "Attribute",
      // dataIndex: "attributeName",
      width: "7%",
      render: (text, item) => {
        return (
          <>
            {item.attributeName} {item.subAttributeName}
          </>
        )
      }
    },
    {
      title: "Cost",
      dataIndex: "cost",
      width: "7%",
      render: (text, item) => {
        return (
          <>{item.cost} {item.currencyName}</>
        )
      }
    },

    {
      title: "Re-order level",
      width: "7%",
      dataIndex: "reorder",
    },

    {
      title: "Created",
      width: "7%",
      dataIndex: "transfer",
      render: (text, item) => {
        return (
          <>
            <b>{item.transfer}</b>
          </>
        )
      }
    },
    {
      title: "",
      width: "5%",
      render: (text, item) => {
        return (
          <>
            <PhoneFilled
              onClick={() => {
                props.handleBrandModel(true);
                handleParticularRowData(item)
              }}
              style={{ color: "blue" }} />
          </>
        )
      }
    },
    {
      title: "",
      width: "5%",
      render: (text, item) => {
        return (
          <>
            <span
              style={{ color: "red" }}
              onClick={() => {
                // props.deletePurchaseData(item.suppliesId)
              }}>
              <DeleteFilled />
            </span>
          </>
        )
      }
    },

  ];

  return (
    <>
      {true && (
        <StyledTable
          // rowSelection={rowSelection}
          rowKey=""
          columns={columns}
          loading={props.fetchingPurchaseList}
          dataSource={props.purchaseList}
          pagination={false}
          scroll={{ y: 320 }}
        />
      )}
      <TagBrandModel
        addBrandModel={props.addBrandModel}
        handleBrandModel={props.handleBrandModel}
        particularDiscountData={particularDiscountData}
      />
      {/* {showHistory && <SuppliesHistoryTable suppliesId={suppliesId} />} */}
      {/* 
      <UpdateSuppliesModal
        suppliesId={currentSuppliesId}
        updateSuppliesModal={updateSuppliesModal}
        handleUpdateSuppliesModal={handleUpdateSuppliesModal}
        handleSetCurrentSuppliesId={handleSetCurrentSuppliesId}
      />
      <CurrencyPriceModal
        handleCurrencyPriceModal={props.handleCurrencyPriceModal}
        addCurrencyValue={props.addCurrencyValue}
        suppliesId={currentSuppliesId}
      /> */}
    </>
  );
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
      handleUpdateSuppliesModal,
      setEditSupplies,
      deletePurchaseData,
      handleCurrencyPriceModal,
      handleBrandModel
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SuppliesTable);
