import React, { useEffect } from 'react'
import { StyledTable } from '../../../Components/UI/Antd';
import { getProductBuilderById } from "./RefurbishAction"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const BuilderWithPartIdTable = (props) => {

    useEffect(() => {
        props.getProductBuilderById(props.row.productManufacturingId)
    }, [])
    const columns = [
        {
            title: "",
            dataIndex: "",
            width: "1%",
        },
        {
            title: "Part Name",
            dataIndex: "suppliesName",
            width: "40%",
        },

        {
            title: "Part Number",
            dataIndex: "cartNo",
            width: "30%",
        },
    ];

    return (
        <>
            <StyledTable
                columns={columns}
                dataSource={props.builderByManufatureId}
                pagination={false}
                scroll={{ y: 600 }}
            />
        </>
    );
}
const mapStateToProps = ({ refurbish, auth }) => ({
    builderByManufatureId: refurbish.builderByManufatureId
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getProductBuilderById
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(BuilderWithPartIdTable);

