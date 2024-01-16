import { Button, DatePicker, Form, Input, Popconfirm, Select, Typography, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { StyledTable } from '../../../Components/UI/Antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getDepartments } from "../../Settings/Department/DepartmentAction"
import { getProductionUsersById, UpdateTechnicianByPhone, getNoOfPhoneById } from "./RefurbishAction"
import QRCodeModal from '../../../Components/UI/Elements/QRCodeModal'
import { SubTitle } from '../../../Components/UI/Elements'
const { Option } = Select;

const AssignPhoneByTechnician = (props) => {
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
        props.getNoOfPhoneById(props.rowData.orderPhoneId);
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
            width: "15%",

        },
        {
            title: "Model",
            dataIndex: "model",
            width: "10%",
        },
        {
            title: "IMEI",
            dataIndex: "imei",
            width: "12%",
        },
        {
            title: "OS",
            dataIndex: "os",
            width: "12%",

        },
        {
            title: "GB",
            dataIndex: "gb",
            width: "12%",
        },
        {
            title: "Color",
            dataIndex: "color",
            width: "12%",
        },
        {
            title: "Condition",
            dataIndex: "conditions",
            width: "12%",
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
    noOfPhoneById: refurbish.noOfPhoneById,
    fetchingNoOfPhonesById: refurbish.fetchingNoOfPhonesById,
    userId: auth.userDetails.userId,
    departments: departments.departments,
    locationId: auth.userDetails.locationId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getProductionUsersById,
            UpdateTechnicianByPhone,
            getNoOfPhoneById,
            getDepartments
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AssignPhoneByTechnician);

