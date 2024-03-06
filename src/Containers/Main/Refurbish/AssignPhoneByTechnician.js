import React, { useEffect, useState, lazy } from 'react'
import { Button, DatePicker, Select } from 'antd'
import { StyledTable } from '../../../Components/UI/Antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getDepartments } from "../../Settings/Department/DepartmentAction"
import { getProductionUsersById, UpdateTechnicianByPhone, getNoOfPhoneById, closeRepairModal } from "./RefurbishAction"
import { SubTitle } from '../../../Components/UI/Elements';

const QRCodeModal = lazy(() => import('../../../Components/UI/Elements/QRCodeModal'));

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
    const handleCallback = () => {
        if (!props.noOfPhoneById.length) {
            props.closeRepairModal()
        }
    }
    const column = [
        {
            title: "",
            dataIndex: "",
            width: "1%",
        },
        {
            title: "OEM",
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
            <div class="mt-[10px] flex justify-between">
                <div>
                    <label class="text-[15px] font-semibold m-[10px]">Department</label>
                    <Select
                        className="w-[350px]"
                        value={department}
                        onChange={(value) => handleDepartment(value)}
                    >
                        {props.departments.map((a) => {
                            return <Option value={a.departmentId}>{a.departmentName}</Option>;
                        })}
                    </Select>
                </div>
                <div>
                    <label class="text-[15px] font-semibold m-[10px]">Technician</label>
                    <Select
                        className="w-[350px]"
                        value={technician}
                        onChange={(value) => handleTechnician(value)}
                    >
                        {props.productionUser.map((a) => {
                            return <Option value={a.employeeId}>{a.empName}</Option>;
                        })}
                    </Select>
                </div>
                <div>
                    <label class="text-[15px] font-semibold m-[10px]">Due Date</label>
                    <DatePicker
                        className="w-[250px]"
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
            <div class="flex justify-end mt-1">
                <Button
                    loading={props.updatingtechnicianByPhone}
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
                        props.locationId,
                        handleCallback()
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
    assignOrderById: refurbish.assignOrderById,
    updatingtechnicianByPhone: refurbish.updatingtechnicianByPhone
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getProductionUsersById,
            UpdateTechnicianByPhone,
            getNoOfPhoneById,
            getDepartments,
            closeRepairModal
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AssignPhoneByTechnician);

