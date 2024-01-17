import React, { useEffect, useState } from 'react'
import { StyledTable } from '../../../Components/UI/Antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getNoOfTechnicianById } from "./RefurbishAction"
import QCPhoneListByTechnician from './QCPhoneListByTechnician'

const TechnicianListByOrderId = (props) => {

    useEffect(() => {
        props.getNoOfTechnicianById(props.rowData.orderPhoneId)
    }, [])
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
            width: "20%",
            title: "Technician Name",
            render: (item, text) => {
                return (
                    <>
                        <span
                            onClick={() => handleRowdata(item)}
                            style={{
                                textDecoration: "underline",
                                color: show && item.technicianId === row.technicianId ? "rgb(225 158 14)" : "#0f6ace",
                                cursor: "pointer"
                            }}
                        >
                            {item.technicianName}
                        </span>
                    </>
                )
            }
        },
        {
            dataIndex: "totalPhone",
            width: "20%",
            title: "Phone#",
        },
    ]

    return (
        <div>
            <StyledTable
                dataSource={props.technicianByID}
                pagination={false}
                columns={column}
                loading={props.fetchingNoofTecnician}
            />
            {show && <QCPhoneListByTechnician row={row} orderPhoneId={props.rowData.orderPhoneId} />}
        </div>
    )
}


const mapStateToProps = ({ auth, refurbish }) => ({
    technicianByID: refurbish.technicianByID,
    fetchingNoofTecnician: refurbish.fetchingNoofTecnician
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getNoOfTechnicianById
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TechnicianListByOrderId);

