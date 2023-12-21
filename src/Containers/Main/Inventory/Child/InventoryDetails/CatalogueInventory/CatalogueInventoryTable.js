import React, { useEffect, useState } from 'react'
import { StyledTable } from '../../../../../../Components/UI/Antd'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getProductRepurbish } from "../../../InventoryAction";


const CatalogueInventoryTable = (props) => {

    useEffect(() => {
        props.getProductRepurbish(props.locationDetailsId);
    }, [])

    const [RowData, setRowData] = useState({});
    function handleSetRowData(item) {
        setRowData(item);
    }
  
    const column = [
        {
            title: "",
            width: "1%"
        },

        {
            title: "Name",
            width: "15%",
            dataIndex: 'name'
        },

        {
            title: "Category",
            width: "18%",
            dataIndex: "categoryName"
        },
        {
            title: "Sub Category",
            width: "18%",
            dataIndex: "subCategoryName"
        },
        {
            title: "Attribute",
            width: "10%",
            dataIndex: "attributeName"
        },
        {
            title: "Sub Attribute",
            width: "10%",
            dataIndex: "subAttributeName"
        },
        {
            title: "Units",
            width: "13%",
            dataIndex: "unit",
        },
        

    ];

    return (
        <>
            <StyledTable
                dataSource={props.refurbishProduct}
                pagination={false}
                columns={column}
            />
        </>
    )
}

const mapStateToProps = ({ inventory, auth }) => ({
    refurbishProduct: inventory.refurbishProduct,
    userId: auth.userDetails.userId,
    locationDetailsId: inventory.inventoryDetailById.locationDetailsId,
});
const mapDispatchToProps = dispatch =>
    bindActionCreators({
        getProductRepurbish
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CatalogueInventoryTable);

