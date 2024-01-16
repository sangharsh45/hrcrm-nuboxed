import React, { useEffect, useState } from 'react'
import { StyledTable } from '../../../Components/UI/Antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getNoOfPhoneInQCById } from "./RefurbishAction"

const QCPhoneListByTechnician = (props) => {

    useEffect(() => {
        props.getNoOfPhoneInQCById(props.rowData.orderPhoneId, props.rowData.technicianByID)
    }, [])

    const column = [
        {
            width: "2%"
        },
        {
            width: "25%",
            dataIndex: "company",
            title: "Phone"
        },
        {
            dataIndex: "model",
            width: "25%",
            title: "Model",
        },
        {
            dataIndex: "imei",
            width: "25%",
            title: "IMEI",
        },
    ]

    return (
        <div>
            <StyledTable
                dataSource={props.phoneByTechId}
                pagination={false}
                columns={column}
            />
            {/* {show && <PhoneListByTechnician row={row} />} */}
        </div>
    )
}


const mapStateToProps = ({ auth, refurbish }) => ({
    phoneByTechId: refurbish.phoneByTechId
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getNoOfPhoneInQCById
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QCPhoneListByTechnician);

