import { Button, Steps } from 'antd';
import React from 'react';
import { startQCStatus, startRepairInStatus } from "../../AccountAction"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
const StatusOfOrder = (props) => (
    <div style={{ backgroundColor: "white" }}>
        <Steps
            direction="vertical"
            current={1}
            items={[
                {
                    title: 'Order Created',
                    status: 'progress',
                    // order craeted enabled after order create on date and by user
                    description: <>
                        <b>On {moment(props.particularRowData.creationDate).format("DD-MM-YYYY")} By {props.particularRowData.userName}</b>
                    </>
                },
                {
                    title: 'Advance Payment',
                    status: <>
                        {props.particularRowData.qcStartInd === 0 ? 'wait'
                            : props.particularRowData.qcStartInd === 1 &&
                                props.particularRowData.qcStartInd === 2 ? 'progress' : null
                        }</>,
                    description:
                        <>
                            {
                                props.particularRowData.qcStartInd === 0 ?
                                    <Button
                                        type='primary'
                                        onClick={() => props.startQCStatus({
                                            orderPhoneId: props.particularRowData.orderId || "",
                                            qcStartInd: 1,
                                            qcStartUserId: props.userId
                                        },
                                            props.distributorId
                                        )}
                                    >
                                        Approve QC</Button>
                                    : <b>QC approved on {moment(props.particularRowData.qcStartDate).format("DD-MM-YYYY")} By {props.particularRowData.qcStartUser}</b>
                            }
                        </>
                },
                {
                    title: 'Order Pick Up',
                    status: 'progress',
                    description: <>
                        {props.particularRowData.transferInd !== 0 &&
                            <b>On {moment(props.particularRowData.orderPickUpDate).format("DD-MM-YYYY")} By {props.particularRowData.orderPickUpUser}</b>
                        }
                    </>
                },

                {
                    title: 'Warehouse',
                    status: 'progress',
                    description: <>
                        {props.particularRowData.transferInd === 2 &&
                            <b>Arrived at {props.particularRowData.locationDetailsViewDTO
                                && props.particularRowData.locationDetailsViewDTO.name || ""} |
                                Inspected by {props.particularRowData.stopInspectionUserName} on
                                &nbsp;{moment(props.particularRowData.stopInspectionDate).format("DD-MM-YYYY")}
                            </b>
                        }
                    </>
                },
                {
                    title: 'QC',
                    status: 'progress',
                    // status: <>
                    //     {
                    //         props.particularRowData.qcStartInd === 3 && 'finish'
                    //     }</>,
                    //qc completed msg on date and user who assign technician                   
                    description:
                        <>
                            <b>{(props.particularRowData.qcStartInd === 2 || props.particularRowData.qcStartInd === 3) &&
                                (
                                    <>
                                        Assigned by {props.particularRowData.orderAssignUser} on {moment(props.particularRowData.orderAssignDate).format("DD-MM-YYYY")}
                                    </>
                                )}
                                &nbsp;{props.particularRowData.qcStartInd === 3 && (
                                    <>
                                        | Started on {moment(props.particularRowData.orderQcStartTime).format("DD-MM-YYYY")} | Completed on {moment(props.particularRowData.orderQcEndTime).format("DD-MM-YYYY")}
                                    </>
                                )}
                            </b>
                        </>
                },

                {
                    title: 'Order Commercial Confirmation',
                    // start repair button after click show repair started
                    status: <>
                        {props.particularRowData.qcRepairInd === 0 ? 'wait'
                            : props.particularRowData.qcRepairInd === 1 ||
                                props.particularRowData.qcRepairInd === 2 ? 'progress' : null
                        }</>,
                    description:
                        <>
                            {props.particularRowData.priceConfirmInd && <b>
                                Confirmed on {moment(props.particularRowData.orderConfirmedDate).format("DD-MM-YYYY")} by {props.particularRowData.orderConfirmedUser || " "}
                            </b>
                            }
                            {/* props.particularRowData.qcRepairInd === 1 && props.particularRowData.qcRepairInd === 2 ?
                                        <b>Qc Repair Started</b> : props.particularRowData.qcRepairInd === 3 ? <b>Qc Repair Completed</b> : null */}
                        </>
                },
                {
                    title: 'Repair',
                    // after complete show repair completed on date and user
                    status: <>
                        {
                            props.particularRowData.qcRepairInd === 3 && 'progress'
                        }</>,
                    description:
                        <>
                            {
                                props.particularRowData.priceConfirmInd && props.particularRowData.qcRepairInd === 0 ?
                                    (<Button
                                        type='primary'
                                        onClick={() => props.startRepairInStatus({
                                            qcRepairInd: 1,
                                            orderPhoneId: props.particularRowData.orderId || "",
                                            qcRepairUserId: props.userId
                                        }, props.distributorId)}
                                    >
                                        Start Repair</Button>)
                                    :
                                    <b>{(props.particularRowData.qcRepairInd === 2 || props.particularRowData.qcRepairInd === 3) &&
                                        (<>
                                            Assigned by {props.particularRowData.orderRepairAssignUser} on {moment(props.particularRowData.orderRepairAssignDate).format("DD-MM-YYYY")}
                                        </>)}
                                        &nbsp;   {props.particularRowData.qcRepairInd === 3 &&
                                            (<> | Started on {moment(props.particularRowData.orderRepairStartTime).format("DD-MM-YYYY")} | Completed on {moment(props.particularRowData.orderRepairEndTime).format("DD-MM-YYYY")}
                                            </>)}
                                    </b>
                            }

                        </>
                },

                {
                    title: 'Packing',
                    // after packed button on enabled level
                    status: 'progress',
                    description: <>
                        {props.particularRowData.dispatchInspectionInd === 3 &&
                            <b>Packed By {props.particularRowData.packedBy} On {moment(props.particularRowData.packedDate).format("DD-MM-YYYY")}</b>
                        }
                    </>
                },
                {
                    title: 'Schedule PickUp',
                    // after customer pickup order (after delivery address)
                    status: <>
                        {props.particularRowData.pickupInd === false ? 'wait' : 'finish'}</>,
                    description: <>
                        {props.particularRowData.pickupInd && <b>Scheduled for {props.particularRowData.unloadingAddresses && props.particularRowData.unloadingAddresses[0].city || ""} On {moment(props.particularRowData.unloadingDate).format("DD-MM-YYYY")} by {props.particularRowData.unloadingUser}</b>}
                    </>
                },
                {
                    title: 'Order Dispatch',
                    status: 'progress',
                    // description: <Button type='primary'>Add</Button>
                },
                {
                    title: 'Customer Feedback',
                    status: 'progress',
                    // email when sent and after getting response
                    // description: <Button type='primary'>Add</Button>
                },
            ]}
        />
    </div>
);
const mapStateToProps = ({ distributor, auth }) => ({
    userId: auth.userDetails.userId,
    distributorId: distributor.distributorDetailsByDistributorId.distributorId,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            startQCStatus,
            startRepairInStatus
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(StatusOfOrder);
