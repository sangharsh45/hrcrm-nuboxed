
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip } from "antd";
import { StyledTable } from "../../../../Components/UI/Antd";
import { getBuilderByProId } from "../../ProductAction";
import { elipsize } from "../../../../Helpers/Function/Functions";

function ProductbuilderTable2 (props) {

  useEffect(()=> {
    props.getBuilderByProId(props.particularDiscountData.productId);
  },[]);


const columns = [
      {
        title: "Name",
        dataIndex: "suppliesName",
        width: "15%",
      },

      {
        title: "Description",
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
            title: "Category",
            dataIndex: "categoryName",

        },
        {
            title: "Sub Category",
            dataIndex: "subCategoryName",
            width: "10%"
        },
      {
        title: "Unit",
        dataIndex: "quantity",
        width: "10%",

      },
     
  
    ];
const tab = document.querySelector(".ant-layout-sider-children");
const tableHeight = tab && tab.offsetHeight - 200;

return (
    <>
  
        <StyledTable
            rowKey="suppliesId"
            columns={columns}
            dataSource={props.builderbyProductId}
            loading={props.fetchingBuilderByProductId}
            pagination={false}
            scroll={{ y: tableHeight }}
        
        />
 
    </>
);
}

const mapStateToProps = ({product }) => ({
    builderbyProductId: product.builderbyProductId,
    fetchingBuilderByProductId: product.fetchingBuilderByProductId
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getBuilderByProId,
            
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ProductbuilderTable2);