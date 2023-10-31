import { Button, DatePicker, Form, Input, Popconfirm, Select, Typography, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { StyledTable } from '../../../Components/UI/Antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getProductionUsersById, UpdateTechnicianByPhone, getNoOfPhoneById } from "./RefurbishAction"
const { Option } = Select;

const AssignPhoneByTechnician = (props) => {
    const [user, setUser] = useState("")
    const [technician, setTechnician] = useState("")
    const [selectedRow, setselectedRow] = useState([]);


    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setselectedRow(selectedRows);
            console.log(
                `selectedRowKeys: ${selectedRowKeys}`,
                "selectedRows: ",
                selectedRows
            );
        },
    };
    const checkedValue = selectedRow.map(function (item) {
        return item['phoneId'];
    });

    const handleTechnician = (val) => {
        setTechnician(val)
    }
    console.log(user)

    useEffect(() => {
        props.getProductionUsersById(props.locationDetailsId);
        props.getNoOfPhoneById(props.rowData.orderPhoneId)
    }, [])

    const [dueDate, setDueDate] = useState("")

    const hanldeOnChange = (value) => {
        setDueDate(value)
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
            title: "model",
        },
        {
            dataIndex: "imei",
            width: "25%",
            title: "IMEI",
        },


    ]

    return (
        <div>
            <div style={{ margin: "10px 0", display: "flex", justifyContent: "space-between" }}>
                <div>
                    <label style={{
                        fontSize: "15px",
                        fontWeight: "600",
                        margin: "10px",
                    }}>Technician</label>
                    <Select
                        style={{
                            width: 250,
                        }}
                        value={technician}
                        onChange={(value) => handleTechnician(value)}
                    >
                        {props.productionUser.map((a) => {
                            return <Option value={a.userId}>{a.productionManagerName}</Option>;
                        })}
                    </Select>
                </div>
                <div>
                    <label style={{
                        fontSize: "15px",
                        fontWeight: "600",
                        margin: "10px",
                    }}>Due Date</label>
                    <DatePicker
                        style={{
                            width: 250,
                        }}
                        value={dueDate}
                        onChange={(value) => hanldeOnChange(value)}
                    />
                </div>
            </div>
            {true && (
                <StyledTable
                    rowKey="phoneId"
                    dataSource={props.noOfPhoneById}
                    pagination={false}
                    rowSelection={rowSelection}
                    columns={column}
                    loading={props.fetchingNoOfPhonesById}

                />
            )}
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "5px" }}>
                <Button
                    type='primary'
                    onClick={() => props.UpdateTechnicianByPhone({
                        phoneDetailsList: checkedValue,
                        orderPhoneId: props.rowData.orderPhoneId,
                        productionDispatchId: "",
                        technicianId: technician,
                        userId: props.userId,
                        dueDate: dueDate
                    },
                        props.rowData.orderPhoneId,
                        props.locationDetailsId
                    )}>
                    Submit
                </Button>
            </div>
        </div>
    )
}


const mapStateToProps = ({ auth, production }) => ({
    productionUser: production.productionUser,
    noOfPhoneById: production.noOfPhoneById,
    locationDetailsId: auth.userDetails.locationDetailsId,
    fetchingNoOfPhonesById: production.fetchingNoOfPhonesById,
    userId: auth.userDetails.userId,

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getProductionUsersById,
            UpdateTechnicianByPhone,
            getNoOfPhoneById,

        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AssignPhoneByTechnician);

