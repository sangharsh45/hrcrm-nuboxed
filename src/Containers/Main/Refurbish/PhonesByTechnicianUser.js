import React, { useEffect, useState } from 'react'
import { StyledTable } from '../../../Components/UI/Antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getphoneListByUser } from "./RefurbishAction";

const PhoneByTechnicianUser = (props) => {

    useEffect(() => {
        props.getphoneListByUser(props.rowData.orderPhoneId, props.userId)
    }, [])


    const column = [
        {
            width: "2%"
        },
        {
            width: "20%",
            dataIndex: "company",
            title: "OEM"
        },
        {
            dataIndex: "technicianEntryQuantity",
            width: "20%",
            title: "Phone#",
        },

    ]

    return (
        <div>
            <StyledTable
                dataSource={props.phoneByUser}
                pagination={false}
                columns={column}
            />
        </div>
    )
}


const mapStateToProps = ({ auth, production }) => ({
    phoneByUser: production.phoneByUser,
    userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getphoneListByUser
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PhoneByTechnicianUser);

