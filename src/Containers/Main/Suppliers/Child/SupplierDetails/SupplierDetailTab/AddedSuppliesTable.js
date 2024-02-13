import React, { useEffect } from 'react'
import { StyledTable } from '../../../../../../Components/UI/Antd'
import { getGeneratorSuppliersList } from "../../../SuppliersAction"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const AddedSuppliesTable = (props) => {
    useEffect(() => {
        props.getGeneratorSuppliersList()
    }, [])
    const columns = [
        {
            title: "Name",
            dataIndex: "suppliesFullName",
            width: "20%"
        },
        {
            title: "Category",
            dataIndex: "categoryName",
            width: "15%"
        },
        {
            title: "Sub-category",
            dataIndex: "subCategoryName",
            width: "15%"
        },
        {
            title: "Attribute",
            dataIndex: "attributeName",
            width: "15%"
        },
        {
            title: "Sub-attribute",
            dataIndex: "subAttributeName",
            width: "15%"
        },

        {
            title: "Unit",
            dataIndex: "unit",
            width: "15%"
        }
    ]
    return (
        <>
            <StyledTable
                columns={columns}
                dataSource={props.generatorSuppliers}
                pagination={false}
            />
        </>
    )
}
const mapStateToProps = ({ suppliers }) => ({
    generatorSuppliers: suppliers.generatorSuppliers
});
const mapDispatchToProps = dispatch => bindActionCreators({
    getGeneratorSuppliersList
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddedSuppliesTable);


