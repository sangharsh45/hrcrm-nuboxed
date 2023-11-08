import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledTable } from "../../../../../../Components/UI/Antd";
import moment from "moment";
import { Tooltip, Button } from "antd";
import {
  getInventoryConsumptionList,
  setEditInventory,
  setEditInventoryConsumption,
  handleConsumptionReasonModal,
} from "../../../InventoryAction";
import ConsumptionReasonModal from "./ConsumptionReasonModal";
import APIFailed from "../../../../../../Helpers/ErrorBoundary/APIFailed";

function InventoryConsumptionTable(props) {
  useEffect(() => {
    props.getInventoryConsumptionList(props.locationDetailsId);
  }, [props.locationDetailsId]);

  const columns = [
    {
      title: "Supplies ID",
      dataIndex: "suppliesId",
      width: "14%",
    },
    {
      title: "Category",
      width: "9%",
      dataIndex: "categoryName",
      onFilter: (value, record) => record.categoryName.indexOf(value) === 0,
      sorter: (a, b) => {
        const categoryNameA = a.categoryName && a.categoryName.toLowerCase();
        const categoryNameB = a.categoryName && a.categoryName.toLowerCase();
        if (categoryNameA < categoryNameB) {
          return -1;
        }
        if (categoryNameA > categoryNameB) {
          return 1;
        }
        //names must be equal
        return 0;
      },
    },

    {
      title: "Sub Category",
      dataIndex: "subCategoryName",
      width: "9%",
    },
    {
      title: "Attribute",

      render: (name, item, i) => {
        return `${item.attributeName || ""} ${item.subAttributeName} `;
      },
      width: "11%",
    },

    {
      title: "Name",
      dataIndex: "name",
      width: "15%",
    },
    // {
    //   title: "Mfg ID",
    //   dataIndex: "",
    //   width: "14%",
    // },
    {
      title: "Batch No",
      dataIndex: "batchNumber",
      width: "8%",
    },
    {
      title: "Opening",
      dataIndex: "openingInventory",
      width: "5%",
    },
    {
      title: "Closing",
      dataIndex: "quantity",
      width: "5%",
    },
    {
      title: " Mfg",
      dataIndex: "deliveryDate",
      render: (name, item, i) => {
        return moment(item.deliveryDate).format("l");
      },
      sorter: (a, b) => {
        var nameA = a.deliveryDate; // ignore upper and lowercase
        var nameB = b.deliveryDate; // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        return 0;
      },
      width: "8%",
    },
    {
      title: "",
      dataIndex: "",
      width: "2%",
      render: (name, item, i) => {
        return (
          <Tooltip title="Reason">
            <span
              style={{
                cursor: "pointer",
                fontSize: "12px",
                color: "green",
              }}
              onClick={() => {
                props.setEditInventoryConsumption(item);
                props.handleConsumptionReasonModal(true);
              }}
            >
              <i class="fas fa-cart-plus"></i>
            </span>
          </Tooltip>
        );
      },
    },
  ];

  // if (props.fetchingAllInventoryConsumptionError) {
  //   return <APIFailed />;
  // }
  return (
    <>
      <StyledTable
        columns={columns}
        dataSource={props.allInventoryConsumption}
        loading={
          props.fetchingAllInventoryConsumption ||
          props.fetchingAllInventoryConsumptionError
        }
        pagination={false}
        scroll={{ y: 240 }}
        onChange={console.log("task onChangeHere...")}
      />
      <ConsumptionReasonModal
        handleConsumptionReasonModal={props.handleConsumptionReasonModal}
        consumptionReasonModal={props.consumptionReasonModal}
      />
    </>
  );
}

const mapStateToProps = ({ inventory, auth }) => ({
  userId: auth.userDetails.userId,
  allInventoryConsumption: inventory.allInventoryConsumption,
  role: auth.userDetails.role,
  department: auth.userDetails.department,
  user: auth.userDetails,
  fetchingAllInventoryConsumption: inventory.fetchingAllInventoryConsumption,
  fetchingAllInventoryConsumptionError:
    inventory.fetchingAllInventoryConsumptionError,
  locationDetailsId: inventory.inventoryDetailById.locationDetailsId,
  consumptionReasonModal: inventory.consumptionReasonModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getInventoryConsumptionList,
      setEditInventory,
      setEditInventoryConsumption,
      handleConsumptionReasonModal,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InventoryConsumptionTable);

function RoleButton({ type, iconType, tooltip, role, size, onClick }) {
  console.log(role);
  console.log(type);
  if (role === type) {
    size = "22px";
  } else {
    size = "16px";
  }
  return (
    <Tooltip title={tooltip}>
      <Button
        style={{
          padding: "6px",
          borderColor: "transparent",
          color: role === type ? "#1890ff" : "grey",
        }}
        ghost={role !== type}
        onClick={onClick}
      >
        <i className={`${iconType}`} style={{ fontSize: "20px" }}></i>
      </Button>
    </Tooltip>
  );
}
