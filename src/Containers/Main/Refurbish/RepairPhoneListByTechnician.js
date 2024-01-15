import React, { useEffect, useState } from 'react'
import { StyledTable } from '../../../Components/UI/Antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import { getNoOfTechnicianById } from "./RefurbishAction"

const RepairPhoneListByTechnician = (props) => {

    // useEffect(() => {
    //     props.getNoOfTechnicianById(props.rowData.orderPhoneId)
    // }, [])
    const [row, setRow] = useState({})
    const [show, setShow] = useState(false)

    const handleRowdata = (item) => {
        setRow(item)
        setShow(!show)
    }

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
                // dataSource={props.repairByTechnician}
                pagination={false}
                columns={column}
            />
            {/* {show && <PhoneListByTechnician row={row} />} */}
        </div>
    )
}


const mapStateToProps = ({ auth, refurbish }) => ({
    // repairByTechnician: refurbish.repairByTechnician
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            // getNoOfTechnicianById
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RepairPhoneListByTechnician);

