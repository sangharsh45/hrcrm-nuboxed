import { Button, DatePicker, Form, Input, Popconfirm, Select, Typography, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { StyledTable } from '../../../Components/UI/Antd'
import { getDepartments } from "../../Settings/Department/DepartmentAction"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getProductionUsersById, getRepairPhoneById, UpdateTechnicianForRepairPhone } from "./RefurbishAction"
import QRCodeModal from '../../../Components/UI/Elements/QRCodeModal'
import { SubTitle } from '../../../Components/UI/Elements'
const { Option } = Select;
const AssignRepairForm = (props) => {
    const [user, setUser] = useState("")
    const [technician, setTechnician] = useState("")
    const [department, setDepartment] = useState("")
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
    const handleDepartment = (val) => {
        setDepartment(val)
        props.getProductionUsersById(val, props.locationId);
    }
    console.log(user)


    useEffect(() => {
        props.getProductionUsersById(props.rowData.departmentId, props.locationId);
        props.getRepairPhoneById(props.rowData.orderPhoneId)
        props.getDepartments()
    }, [])

    const [dueDate, setDueDate] = useState("")

    const hanldeOnChange = (value) => {
        setDueDate(value)
    }
    const column = [
        {
            title: "",
            dataIndex: "",
            width: "1%",
        },
        {
            title: "Company",
            dataIndex: "company",
            width: "10%",

        },
        {
            title: "Model",
            dataIndex: "model",
            width: "9%",
        },
        {
            title: "IMEI",
            dataIndex: "imei",
            width: "8%",
        },
        {
            title: "OS",
            dataIndex: "os",
            width: "8%",

        },
        {
            title: "GB",
            dataIndex: "gb",
            width: "8%",
        },
        {
            title: "Color",
            dataIndex: "color",
            width: "10%",
        },
        {
            title: "Condition",
            dataIndex: "conditions",
            width: "10%",
        },
        {
            title: "QR",
            width: "8%",
            render: (name, item, i) => {
                return (
                    <SubTitle>
                        {item.qrCodeId ? (
                            <QRCodeModal
                                qrCodeId={item.qrCodeId ? item.qrCodeId : ''}
                                imgHeight={"2.8em"}
                                imgWidth={"2.8em"}
                                imgRadius={20}
                            />
                        ) : (
                            <span style={{ fontSize: "0.6em", fontWeight: "bold" }}>
                                No QR
                            </span>
                        )}
                    </SubTitle>
                );
            },
        },

        {
            title: "Received by",
            width: "9%",
            dataIndex: "receivePhoneUserName"
        },


    ];


    return (
        <div>

            <div style={{ margin: "10px 0", display: "flex", justifyContent: "space-between" }}>
                <div>
                    <label style={{
                        fontSize: "15px",
                        fontWeight: "600",
                        margin: "10px",
                    }}>Department</label>
                    <Select
                        style={{
                            width: 250,
                        }}
                        value={department}
                        onChange={(value) => handleDepartment(value)}
                    >
                        {props.departments.map((a) => {
                            return <Option value={a.departmentId}>{a.departmentName}</Option>;
                        })}
                    </Select>
                </div>
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
                            return <Option value={a.employeeId}>{a.empName}</Option>;
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
            <StyledTable
                rowKey="phoneId"
                dataSource={props.repairPhoneByOrder}
                pagination={false}
                columns={column}
                rowSelection={rowSelection}
                loading={props.fetchingNoOfPhonesById}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "5px" }}>
                <Button
                    type='primary'
                    onClick={() => props.UpdateTechnicianForRepairPhone({
                        phoneDetailsList: checkedValue,
                        orderPhoneId: props.rowData.orderPhoneId,
                        productionRepairDispatchId: "",
                        technicianId: technician,
                        userId: props.userId,
                        repairDueDate: dueDate
                    },
                        props.rowData.orderPhoneId,
                        props.locationId
                    )}>
                    Submit
                </Button>
            </div>
        </div>
    )
}


const mapStateToProps = ({ auth, refurbish, departments }) => ({
    productionUser: refurbish.productionUser,
    repairPhoneByOrder: refurbish.repairPhoneByOrder,
    noOfPhoneById: refurbish.noOfPhoneById,
    locationId: auth.userDetails.locationId,
    fetchingNoOfPhonesById: refurbish.fetchingNoOfPhonesById,
    userId: auth.userDetails.userId,
    departments: departments.departments,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getProductionUsersById,
            getRepairPhoneById,
            UpdateTechnicianForRepairPhone,
            getDepartments
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AssignRepairForm);

