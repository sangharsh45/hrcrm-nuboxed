
import React, { useState, useEffect, useMemo,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { StyledModal, StyledTable } from "../../../../Components/UI/Antd";
import { getProductbuilder } from "../../ProductAction";
import { MultiAvatar, SubTitle } from "../../../../Components/UI/Elements";
import { Empty, Icon, Tooltip, Button, Popconfirm, Switch } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { elipsize } from "../../../../Helpers/Function/Functions";

function ProductbuilderTable (props) {

useEffect(()=> {
  props.getProductbuilder();
},[]);

const columns = [
    {
        title: "",
        dataIndex: "",
        width: "2%",
      },
      {
        title: "HSN",
        dataIndex: "hsn",
        width: "15%",

      },
      {
        title: "NAME",
        dataIndex: "name",
        width: "15%",
      },

      {
        title: "DESCRIPTION",
        dataIndex: "description",
        width: "20%",
        render: (name, item, i) => {
          return (
            <span style={{ cursor: "pointer" }}>
              <Tooltip title={item.description}>
                {elipsize(item.description || "", 70)}
              </Tooltip>
            </span>
          );
        },
      },
      {
        title: "UNIT",
        dataIndex: "unit",
        width: "10%",
      },
     
      {
        title: "",
        dataIndex: "documentId",
        width: "2%",
        render: (name, item, i) => {
          //debugger
          return (
            <>
              
                <Tooltip title="Edit">
                  <EditOutlined
                    style={{ cursor: "pointer", fontSize: "12px" }}
                    onClick={() => {
                    //   props.setEditSupplies(item);
                    //   handleUpdateSuppliesModal(true);
                      // handleSetCurrentLeadsId(item.leadsId);
                    }}
                  />
                </Tooltip>
            
            </>
          );
        },
      },
    ];
const tab = document.querySelector(".ant-layout-sider-children");
const tableHeight = tab && tab.offsetHeight - 200;
return (
    <>
        <StyledTable
            rowKey="suppliesId"
            columns={columns}
            dataSource={props.productBuilder}
            loading={props.fetchingProductBuilder}
            pagination={false}
            scroll={{ y: tableHeight }}
        />

 
    </>
);
}

const mapStateToProps = ({product }) => ({
    productBuilder: product.productBuilder,
    fetchingProductBuilder: product.fetchingProductBuilder
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getProductbuilder
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ProductbuilderTable);