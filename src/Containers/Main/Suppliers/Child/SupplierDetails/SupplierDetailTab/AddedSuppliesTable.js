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
            title: "Name"
        },
        {
            title: "Unit"
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


