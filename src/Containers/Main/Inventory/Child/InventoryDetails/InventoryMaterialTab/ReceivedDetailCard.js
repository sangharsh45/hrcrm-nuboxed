import React, { useEffect, useState } from 'react'
import { StyledTable } from '../../../../../../Components/UI/Antd'
import {
    getMaterialReceivedDetailData,
    updateReceivedDamagedUnit,
    generateGrnForPo
} from "../../../InventoryAction"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BorderColorOutlined } from '@mui/icons-material';
import { Button, Checkbox, Form, Input, Modal, Popconfirm, Select, Switch, Tooltip, Typography, message } from 'antd';
import PoReceiveToggle from './PoReceiveToggle';
import { FormattedMessage } from 'react-intl';
import { trnasferGrnItemToStock } from "../../../InventoryAction"
import AllowGrnToggle from './AllowGrnToggle';

const { Option } = Select;

const ReceivedDetailCard = (props) => {
    useEffect(() => {
        props.getMaterialReceivedDetailData(props.row.poSupplierDetailsId)
    }, [])
    const [existGrn, setExistGrn] = useState(false)
    const handleChange = () => {
        setExistGrn(!existGrn)
    }

    const [grnNumber, setGrnNo] = useState("")
    const handleChangeGrnId = (val) => {
        console.log(val)
        setGrnNo(val)
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
        props.generateGrnForPo({
            createGrnNo: result,
            grnId: "",
            grnNumber: grnNumber,
            grnReceivedInd: true,
            poSupplierDetailsId: props.row.poSupplierDetailsId,
            userId: props.userId
        })
    };
    const handleCancelmodal = () => {
        setIsModalOpen(false);
    };

    const [rowData, setRowData] = useState({})
    const handleRowData = (item) => {
        setRowData(item)
    }
    const [showEdit, setShowEdit] = useState(false)
    const handleEditicon = () => {
        setShowEdit(!showEdit)
    }
    const [unitReceived, setUnitReceived] = useState("")
    const handleUnitReceived = (value) => {
        setUnitReceived(value)
    }

    const [unitDamaged, setUnitDamaged] = useState("")
    const handleUnitDamaged = (value) => {
        setUnitDamaged(value)
    }

    const [remark, setRemark] = useState("")
    const handleRemark = (value) => {
        setRemark(value)
    }

    const handleCallback = () => {
        setUnitReceived("")
        setUnitDamaged("")
        setRemark("")
        setShowEdit(false)
    }
    const handleCancel = () => {
        setShowEdit(false)
    }

    const result = props.receivedDetailData.filter((item) =>
        item.unitReceiveInd === true && item.grnReceivedInd === false).map((opt) => opt.poSupplierSuppliesId)
    const show = props.receivedDetailData.some((item) => item.unitReceiveInd === true && item.grnReceivedInd === false)
    const checkall = props.receivedDetailData.every((item) => item.grnReceivedInd === true)

    return (
        <>
            <div className=' flex justify-end sticky z-auto'>
                <div class="rounded-lg m-5 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex  w-[95%] px-2 bg-transparent font-bold sticky top-0 z-10">
                        <div className=""></div>
                        <div className=" md:w-[15.5rem]"><FormattedMessage id="app.name" defaultMessage="Name" /></div>
                        <div className=" md:w-[22.12rem]"><FormattedMessage id="app.Category" defaultMessage="Category" /></div>
                        <div className=" md:w-[15.5rem]"><FormattedMessage id="app.Attribute" defaultMessage="Attribute" /></div>
                        <div className=" md:w-[22.12rem]"><FormattedMessage id="app.Price" defaultMessage="Price" /></div>
                        <div className=" md:w-[15.5rem]"><FormattedMessage id="app.Unit" defaultMessage="Unit" /></div>
                        <div className=" md:w-[15.5rem]"><FormattedMessage id="app.Received" defaultMessage="Receive" /></div>
                        <div className=" md:w-[22.12rem]"><FormattedMessage id="app.Damaged" defaultMessage="Damaged" /></div>
                        <div className=" md:w-[15.5rem]"><FormattedMessage id="app.Remark" defaultMessage="Remark" /></div>
                        <div className=" md:w-[15.5rem]"><FormattedMessage id="app.Received" defaultMessage="Received" /></div>
                        <div className=""></div>
                        <div className=" md:w-[15.5rem]"><FormattedMessage id="app.Received" defaultMessage="Allow Grn" /></div>
                        <div className=""></div>
                    </div>

                    {props.receivedDetailData.map((item) => {

                        return (
                            <div>
                                <div className="flex rounded-xl  mt-2 bg-white h-12 items-center p-3 ">
                                    <div class="flex">
                                        <div className=" flex font-medium flex-col md:w-[15.1rem] max-sm:w-full  ">
                                            <div class="flex justify-between text-sm text-cardBody font-semibold  font-poppins ">
                                                {item.suppliesFullName}
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" flex font-medium flex-col  md:w-[8.12rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                        <div class=" text-xs text-cardBody font-poppins">
                                            {item.categoryName} {item.subCategoryName}
                                        </div>

                                    </div>
                                    <div className=" flex font-medium flex-col  md:w-[8.12rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                        <div class=" text-xs text-cardBody font-poppins">
                                            {item.attributeName} {item.subAttributeName}
                                        </div>
                                    </div>
                                    <div className=" flex font-medium flex-col  md:w-[8.12rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                        <div class=" text-xs text-cardBody font-poppins">
                                            {item.price}
                                        </div>
                                    </div>
                                    <div className=" flex font-medium flex-col  md:w-[8.12rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                        <div class=" text-xs text-cardBody font-poppins">
                                            {item.unit}
                                        </div>
                                    </div>
                                    <div className=" flex font-medium flex-col  md:w-[8.12rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                        <div class=" text-xs text-cardBody font-poppins">
                                            {showEdit && rowData.poSupplierSuppliesId === item.poSupplierSuppliesId ?
                                                <Input
                                                    value={unitReceived}
                                                    type="text"
                                                    placeholder='Received'
                                                    onChange={(e) => handleUnitReceived(e.target.value)}
                                                />
                                                : item.unitReceived}
                                        </div>
                                    </div>
                                    <div className=" flex font-medium flex-col  md:w-[8.12rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                        <div class=" text-xs text-cardBody font-poppins">
                                            {showEdit && rowData.poSupplierSuppliesId === item.poSupplierSuppliesId ?
                                                <Input
                                                    value={unitDamaged}
                                                    type="text"
                                                    placeholder='Damaged'
                                                    onChange={(e) => handleUnitDamaged(e.target.value)}
                                                />
                                                : item.unitDamaged}
                                        </div>
                                    </div>
                                    <div className=" flex font-medium flex-col  md:w-[8.12rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                        <div class=" text-xs text-cardBody font-poppins">
                                            {showEdit && rowData.poSupplierSuppliesId === item.poSupplierSuppliesId ?
                                                <Input
                                                    value={remark}
                                                    type="text"
                                                    placeholder='Remark'
                                                    onChange={(e) => handleRemark(e.target.value)}
                                                />
                                                : item.remark}
                                        </div>
                                    </div>
                                    <div className=" flex font-medium flex-col  md:w-[8.12rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                        <div class=" text-xs text-cardBody font-poppins">
                                            <PoReceiveToggle
                                                poSupplierDetailsId={props.row.poSupplierDetailsId}
                                                suppliesId={item.suppliesId}
                                                poReceivedInd={item.poReceivedInd}
                                            />
                                        </div>
                                    </div>
                                    <div className=" flex font-medium flex-col  md:w-[8.12rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                        <div class=" text-xs text-cardBody font-poppins">
                                            {showEdit && rowData.poSupplierSuppliesId === item.poSupplierSuppliesId ?
                                                <>
                                                    <Button
                                                        type="primary"
                                                        onClick={() => {
                                                            if ((unitReceived <= item.unit && unitReceived >= 0) && (unitDamaged <= item.unit && unitDamaged >= 0)) {
                                                                props.updateReceivedDamagedUnit({
                                                                    unitReceived: unitReceived,
                                                                    unitDamaged: unitDamaged,
                                                                    remark: remark,
                                                                    userId: props.userId,
                                                                    poSupplierSuppliesId: item.poSupplierSuppliesId,
                                                                    poReceivedInd: true,
                                                                    unitReceiveInd: true,

                                                                },
                                                                    props.row.poSupplierDetailsId,
                                                                    item.suppliesId,
                                                                    handleCallback())
                                                            } else {
                                                                message.error("Receive and damage unit should be less than unit !")
                                                            }
                                                        }}
                                                    >Add</Button>
                                                    <Button onClick={handleCancel}>Cancel</Button>
                                                </>
                                                : item.grnReceivedInd ? null :
                                                    item.poReceivedInd ? <BorderColorOutlined
                                                        onClick={() => {
                                                            handleRowData(item);
                                                            handleEditicon()
                                                        }}
                                                    /> : null
                                            }
                                        </div>
                                    </div>
                                    <div className=" flex font-medium flex-col  md:w-[8.12rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                        <div class=" text-xs text-cardBody font-poppins">
                                            {item.unitReceiveInd && !item.grnReceivedInd ? <Tooltip title="Check for grn">
                                                <AllowGrnToggle
                                                    allowGrnInd={item.allowGrnInd}
                                                    grnStockInd={item.grnStockInd}
                                                    poSupplierSuppliesId={item.poSupplierSuppliesId}
                                                    poSupplierDetailsId={props.row.poSupplierDetailsId}
                                                />

                                            </Tooltip> : null}
                                        </div>
                                    </div>

                                </div>

                            </div>
                        );
                    })}
                </div>
            </div>
            <div className=' flex justify-end mt-1'>
                {show && <Button
                    type='primary'
                    onClick={showModal}
                >
                    Generate Grn
                </Button>}
                <Modal
                    title="Generate Grn"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancelmodal}
                >
                    <Switch
                        checked={existGrn}
                        checkedChildren="Yes"
                        unCheckedChildren="No"
                        onChange={handleChange}
                    />
                    {existGrn ?
                        <Select
                            value={grnNumber}
                            onChange={(value) =>
                                handleChangeGrnId(value)
                            }
                        >
                            {props.receivedDetailData.map((a) => {
                                return <Option value={a.grnId}>{a.grnNumber}</Option>;
                            })}
                        </Select> : null}
                </Modal>
            </div>

        </>
    );
}


const mapStateToProps = ({ inventory, auth }) => ({
    receivedDetailData: inventory.receivedDetailData,
    userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getMaterialReceivedDetailData,
            updateReceivedDamagedUnit,
            generateGrnForPo,
            trnasferGrnItemToStock
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ReceivedDetailCard);


