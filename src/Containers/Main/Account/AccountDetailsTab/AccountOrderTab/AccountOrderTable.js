import React, { useEffect, useState, Suspense, lazy } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment/moment';
import PaidIcon from '@mui/icons-material/Paid';
import FeedbackIcon from '@mui/icons-material/Feedback';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import BorderColorOutlined from "@mui/icons-material/BorderColor";
import DeleteIcon from '@mui/icons-material/Delete';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import {
    getDistributorOrderByDistributorId,
    handleInventoryLocationInOrder,
    handleOrderDetailsModal,
    handleNotesModalInOrder,
    handlePaidModal,
    handleStatusOfOrder,
    updateOfferPrice,
    handleAccountProduction,
    handleUpdateOrder,
    setEditOrder,
    removeOrderAcc,
    deleteDistributorData
} from "../../AccountAction";
import { FormattedMessage } from 'react-intl';
import { Button, Input, Tooltip } from 'antd';
import { MultiAvatar2 } from '../../../../../Components/UI/Elements';
import { BundleLoader } from '../../../../../Components/Placeholder';
import { CurrencySymbol } from '../../../../../Components/Common';
import InfiniteScroll from 'react-infinite-scroll-component';

const AddLocationInOrder = lazy(() => import('./AddLocationInOrder'));
const AccountOrderDetailsModal = lazy(() => import('./AccountOrderDetailsModal'));
const StatusOfOrderModal = lazy(() => import('./StatusOfOrderModal'));
const AddNotesOrderModal = lazy(() => import('./AddNotesOrderModal'));
const PaidButtonModal = lazy(() => import('./PaidButtonModal'));
const AccountproductionModal = lazy(() => import('./AccountProductionModal'));
const UpdateOrderModal = lazy(() => import('./UpdateAccountOrder/UpdateOrderModal'));


const AccountOrderTable = (props) => {
    const [page, setPage] = useState(0);
    useEffect(() => {
        setPage(page + 1);
        props.getDistributorOrderByDistributorId(props.distributorId, page)
    }, [])
    const [particularRowData, setParticularRowData] = useState({});

    function handleSetParticularOrderData(item) {
        setParticularRowData(item);
    }
    const [hasMore, setHasMore] = useState(true);
    const handleLoadMore = () => {
        setPage(page + 1);
        props.getDistributorOrderByDistributorId(props.distributorId, page)
    };
    const [visible, setVisible] = useState(false)
    const handleUpdateRevisePrice = () => {
        setVisible(!visible)
    }
    const [price, setPrice] = useState(particularRowData.offerPrice)

    const handleChange = (val) => {
        setPrice(val)
    }
    const handleSubmitPrice = () => {
        props.updateOfferPrice(
            {
                offerPrice: price,
                orderPhoneId: particularRowData.orderId,
                customerPriceInd: true
            },
            particularRowData.orderId,
            props.distributorId,
        );
        setVisible(false)
    }

    return (
        <>
            <div className=' flex justify-end sticky top-28 z-auto'>
                <div class="rounded-lg m-5 p-2 w-[96%] overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex  w-[80%] pl-9 bg-transparent font-bold sticky top-0 z-10">
                        <div className=" md:w-[9.41rem]">
                            <FormattedMessage
                                id="app.orderno"
                                defaultMessage="Order No"
                            />
                        </div>
                        <div className=" md:w-[8.1rem]">
                            <FormattedMessage
                                id="app.created"
                                defaultMessage="Created"
                            />
                        </div>
                        <div className=" md:w-[11.2rem]">
                            <FormattedMessage
                                id="app.location"
                                defaultMessage="Location"
                            />
                        </div>
                        <div className="md:w-[5.8rem]">
                            <FormattedMessage
                                id="app.units"
                                defaultMessage="Units"
                            />
                        </div>
                        <div className="md:w-[5.9rem]">
                            <FormattedMessage
                                id="app.contact"
                                defaultMessage="Contact"
                            />
                        </div>
                        <div className="md:w-[9.12rem]">
                            <FormattedMessage
                                id="app.expectedprice"
                                defaultMessage="Expected Price"
                            />
                        </div>
                        <div className="md:w-[4.31rem]">
                            <FormattedMessage
                                id="app.finalprice"
                                defaultMessage="Final"
                            />
                        </div>
                        <div className="w-[5.8rem]">
                            <FormattedMessage
                                id="app.revisedprice"
                                defaultMessage="Revised"
                            />
                        </div>

                    </div>

                    <div class="overflow-x-auto h-[64vh]">
                        <InfiniteScroll
                            dataLength={props.distributorOrder.length}
                            next={handleLoadMore}
                            hasMore={hasMore}
                            loader={props.fetchingDistributorByDistributorId ? <div style={{ textAlign: 'center' }}>Loading...</div> : null}
                            height={"75vh"}
                        >
                            {props.distributorOrder.map((item) => {
                                const currentdate = moment().format("DD/MM/YYYY");
                                const date = moment(item.creationDate).format("DD/MM/YYYY");


                                return (
                                    <div >
                                        <div className="flex rounded-xl  mt-2 bg-white h-12 items-center p-3">
                                            <div class="flex w-3/4">
                                                <div className=" flex font-medium flex-col md:w-[1.56rem] max-sm:w-full  ">
                                                    <Tooltip>
                                                        <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                                                            <div class=" text-sm text-blue-500 text-cardBody font-poppins font-semibold  cursor-pointer">

                                                                {item.priority === "High" && (
                                                                    <div
                                                                        class="border rounded-[50%] h-[1.5625rem] w-[1.5625rem] bg-[red]"></div>
                                                                )}
                                                                {item.priority === "Medium" && (
                                                                    <div
                                                                        class="border rounded-[50%] h-[1.5625rem] w-[1.5625rem] bg-[orange]"></div>)}
                                                                {item.priority === "Low" && (
                                                                    <div class="border rounded-[50%] h-[1.5625rem] w-[1.5625rem] bg-[teal]"></div>)}
                                                            </div>
                                                        </div>
                                                    </Tooltip>
                                                </div>

                                                <div class="flex">
                                                    <div className="ml-1 font-medium flex-col md:w-[7.4rem] max-sm:flex-row w-full max-sm:justify-between">
                                                        <div class=" text-xs text-cardBody font-poppins">
                                                            <span
                                                                class="underline cursor-pointer text-[#1890ff]"
                                                                onClick={() => {
                                                                    handleSetParticularOrderData(item);
                                                                    props.handleOrderDetailsModal(true);
                                                                }}
                                                            >{item.newOrderNo}</span>
                                                            &nbsp;&nbsp;
                                                            {date === currentdate ? (
                                                                <span
                                                                    class="text-[tomato] font-bold">
                                                                    {<FormattedMessage
                                                                        id="app.new"
                                                                        defaultMessage="New"
                                                                    />}
                                                                </span>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                </div>



                                                <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                    <div class=" text-xs text-cardBody font-poppins text-center">
                                                        <MultiAvatar2
                                                            primaryTitle={item.userName}
                                                            imageURL={item.imageURL}
                                                            imgWidth={"1.8rem"}
                                                            imgHeight={"1.8rem"}
                                                        />

                                                    </div>
                                                </div>
                                                <div className=" flex font-medium flex-col md:w-[10.1rem] max-sm:flex-row w-full max-sm:justify-between ">


                                                    <div class=" text-xs text-cardBody font-poppins text-center">
                                                        {item.type === "Catalogue" ?
                                                            item.productionLocationDetailsViewDTO && item.productionLocationDetailsViewDTO.name || "" :
                                                            item.locationDetailsViewDTO && item.locationDetailsViewDTO.name || ""}
                                                    </div>
                                                </div>

                                                <div className=" flex font-medium flex-col md:w-[11.5rem] max-sm:flex-row w-full max-sm:justify-between ">

                                                    <div class=" text-xs text-cardBody font-poppins text-center">
                                                        {item.count}

                                                    </div>
                                                </div>
                                                <div className=" flex font-medium flex-col  md:w-[7.3rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                    <div class=" text-xs text-cardBody font-poppins">
                                                        <MultiAvatar2
                                                            primaryTitle={item.contactPersonName}
                                                            imageURL={item.imageURL}
                                                            imgWidth={"1.8em"}
                                                            imgHeight={"1.8em"}
                                                        />
                                                    </div>

                                                </div>


                                                <div className=" flex font-medium flex-col  md:w-[3.5rem] max-sm:flex-row w-full max-sm:justify-between  ">


                                                    <div class=" text-xs text-cardBody font-poppins">
                                                        <CurrencySymbol currencyType={item.orderCurrencyName} />{item.expectedPrice}
                                                    </div>

                                                </div>
                                                <div className=" flex font-medium flex-col  md:w-[4.7rem] max-sm:flex-row w-full max-sm:justify-between  ">


                                                    <div class=" text-xs text-cardBody font-poppins">
                                                        <CurrencySymbol currencyType={item.orderCurrencyName} />{item.finalPrice}
                                                    </div>

                                                </div>


                                                <div className=" flex font-medium flex-col  md:w-[3.9rem] max-sm:flex-row w-full max-sm:justify-between  ">


                                                    <div class=" text-xs text-cardBody font-poppins">
                                                        <CurrencySymbol currencyType={item.orderCurrencyName} />{visible && (item.orderId === particularRowData.orderId) ?
                                                            <Input
                                                                type='text'
                                                                value={price}
                                                                onChange={(e) => handleChange(e.target.value)}
                                                            />
                                                            : item.offerPrice}
                                                    </div>

                                                </div>
                                            </div>
                                            <div className=" flex font-medium flex-col  md:w-[5.4rem] max-sm:flex-row w-full max-sm:justify-between  ">


                                                <div class=" text-xs text-cardBody font-poppins">

                                                    {visible && (item.orderId === particularRowData.orderId) ? (
                                                        <>
                                                            <div className=" flex justify-between flex-col">
                                                                <Button onClick={() => {
                                                                    handleSubmitPrice()
                                                                }} >
                                                                    <FormattedMessage
                                                                        id="app.save"
                                                                        defaultMessage="Save"
                                                                    />
                                                                </Button>
                                                                <Button onClick={() => handleUpdateRevisePrice(false)}><FormattedMessage
                                                                    id="app.cancel"
                                                                    defaultMessage="Cancel"
                                                                /></Button>
                                                            </div>
                                                        </>
                                                    ) : item.qcStartInd === 3 && item.priceConfirmInd === false ? <Tooltip title={<FormattedMessage
                                                        id="app.updaterevisedprice"
                                                        defaultMessage="Update Revised Price"
                                                    />}>
                                                        <PublishedWithChangesIcon
                                                            onClick={() => {
                                                                handleUpdateRevisePrice()
                                                                handleSetParticularOrderData(item)
                                                            }}
                                                            className="!text-base cursor-pointer"
                                                        />
                                                    </Tooltip> : null}

                                                </div>

                                            </div>
                                            <div className=" flex font-medium flex-col  md:w-[6.7rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                                {props.inspectionRequiredInd ?
                                                    <div class=" text-xs text-cardBody font-poppins">
                                                        {item.transferInd === 0 ? (
                                                            <Tooltip title="Send To Refurbish">
                                                                <Button
                                                                    class="cursor-pointer bg-[#3096e9] text-white text-base"
                                                                    onClick={() => {
                                                                        handleSetParticularOrderData(item);
                                                                        props.handleAccountProduction(true);
                                                                    }}
                                                                >
                                                                    <FormattedMessage
                                                                        id="app.sendtostore"
                                                                        defaultMessage="Send To Store"
                                                                    />

                                                                </Button>
                                                            </Tooltip>

                                                        ) : null
                                                        }
                                                    </div>
                                                    :
                                                    <div class=" text-xs text-cardBody font-poppins">
                                                        {item.transferInd === 0 ? (
                                                            <Tooltip title={<FormattedMessage
                                                                id="app.selectinventorylocation"
                                                                defaultMessage="Select Inventory Location"
                                                            />}>
                                                                <Button
                                                                    type='primary'
                                                                    className="cursor-pointer text-sm bg-[#3096e9] text-white"
                                                                    onClick={() => {
                                                                        handleSetParticularOrderData(item);
                                                                        props.handleInventoryLocationInOrder(true);
                                                                    }}
                                                                >
                                                                    <FormattedMessage
                                                                        id="app.orderpickup"
                                                                        defaultMessage="Pickup"
                                                                    />

                                                                </Button>
                                                            </Tooltip>

                                                        ) : null
                                                        }
                                                    </div>}


                                            </div>
                                            <div class="flex justify-end">
                                                <div class="flex flex-col w-6 max-sm:flex-row max-sm:w-[10%]">
                                                    <div>
                                                        <Tooltip title={<FormattedMessage
                                                            id="app.notes"
                                                            defaultMessage="Notes"
                                                        />}>
                                                            <NoteAltIcon
                                                                className="!text-base cursor-pointer text-[green]"
                                                                onClick={() => {
                                                                    props.handleNotesModalInOrder(true);
                                                                    handleSetParticularOrderData(item);
                                                                }}
                                                            />

                                                        </Tooltip>
                                                    </div>

                                                    <div>
                                                        <Tooltip title={<FormattedMessage
                                                            id="app.status"
                                                            defaultMessage="Status"
                                                        />}>
                                                            <EventRepeatIcon

                                                                className="!text-base cursor-pointer"
                                                                onClick={() => {
                                                                    props.handleStatusOfOrder(true);
                                                                    handleSetParticularOrderData(item);
                                                                }}
                                                            />
                                                        </Tooltip>
                                                    </div>

                                                </div>
                                                <div class="flex flex-col w-6 max-sm:flex-row max-sm:w-[10%]">

                                                    <div>
                                                        <Tooltip title="Collection">
                                                            <PaidIcon
                                                                className="!text-base cursor-pointer"
                                                                onClick={() => {
                                                                    props.handlePaidModal(true);
                                                                    handleSetParticularOrderData(item);
                                                                }}

                                                            />
                                                        </Tooltip>

                                                    </div>
                                                    <div>
                                                        <Tooltip title={<FormattedMessage
                                                            id="app.updateorder"
                                                            defaultMessage="Update Order"
                                                        />}>
                                                            <BorderColorOutlined
                                                                onClick={() => {
                                                                    props.setEditOrder(item)
                                                                    props.handleUpdateOrder(true)
                                                                    handleSetParticularOrderData(item)
                                                                }}
                                                                className="!text-base cursor-pointer" />
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                                <div class="flex flex-col w-6 max-sm:flex-row max-sm:w-[10%]">
                                                    <div>
                                                        <Tooltip title={<FormattedMessage
                                                            id="app.rating"
                                                            defaultMessage="Rating"
                                                        />}>
                                                            <StarBorderIcon

                                                                className="!text-base cursor-pointer" />
                                                        </Tooltip>

                                                    </div>
                                                    <div>
                                                        <Tooltip title={<FormattedMessage
                                                            id="app.feedback"
                                                            defaultMessage="Feedback"
                                                        />}>
                                                            <FeedbackIcon
                                                                className="!text-base cursor-pointer"
                                                            />
                                                        </Tooltip>

                                                    </div>
                                                </div>
                                                <div class="flex flex-col w-6 max-sm:flex-row max-sm:w-[10%]">
                                                    <div>
                                                        <Tooltip title={<FormattedMessage
                                                            id="app.delete"
                                                            defaultMessage="Detele"
                                                        />}>
                                                            <DeleteIcon
                                                                className="!text-base cursor-pointer text-[red]"
                                                                onClick={() => { props.removeOrderAcc(item.orderId) }}
                                                            />
                                                        </Tooltip>

                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>


                                )
                            })}
                        </InfiniteScroll>
                    </div>
                </div>
            </div>
            <Suspense fallback={<BundleLoader />}>
                <AddLocationInOrder
                    particularRowData={particularRowData}
                    addInventoryInOrder={props.addInventoryInOrder}
                    handleInventoryLocationInOrder={props.handleInventoryLocationInOrder}
                />
                <AddNotesOrderModal
                    particularRowData={particularRowData}
                    addNotesInOrder={props.addNotesInOrder}
                    handleNotesModalInOrder={props.handleNotesModalInOrder}
                />
                <AccountOrderDetailsModal
                    particularRowData={particularRowData}
                    handleOrderDetailsModal={props.handleOrderDetailsModal}
                    addOrderDetailsModal={props.addOrderDetailsModal} />
                <StatusOfOrderModal
                    handleStatusOfOrder={props.handleStatusOfOrder}
                    addStatusOfOrder={props.addStatusOfOrder}
                    particularRowData={particularRowData}
                />
                <PaidButtonModal
                    addPaidButtonModal={props.addPaidButtonModal}
                    handlePaidModal={props.handlePaidModal}
                    particularRowData={particularRowData}
                />
                <AccountproductionModal
                    particularRowData={particularRowData}
                    accountOrderProduction={props.accountOrderProduction}
                    handleAccountProduction={props.handleAccountProduction}
                />
                <UpdateOrderModal
                    handleUpdateOrder={props.handleUpdateOrder}
                    updateOrderModal={props.updateOrderModal}
                />
            </Suspense>
        </>
    )
}
const mapStateToProps = ({ distributor, auth, inventory }) => ({
    accountOrderProduction: distributor.accountOrderProduction,
    distributorOrder: distributor.distributorOrder,
    addNotesInOrder: distributor.addNotesInOrder,
    inspectionRequiredInd: auth.userDetails.inspectionRequiredInd,
    addInventoryInOrder: distributor.addInventoryInOrder,
    addOrderDetailsModal: distributor.addOrderDetailsModal,
    addStatusOfOrder: distributor.addStatusOfOrder,
    updateOrderModal: distributor.updateOrderModal,
    addPaidButtonModal: distributor.addPaidButtonModal,
    fetchingDistributorByDistributorId: distributor.fetchingDistributorByDistributorId,
});
const mapDispatchToProps = dispatch => bindActionCreators({
    getDistributorOrderByDistributorId,
    handleInventoryLocationInOrder,
    handleOrderDetailsModal,
    handleStatusOfOrder,
    handlePaidModal,
    handleNotesModalInOrder,
    updateOfferPrice,
    handleAccountProduction,
    handleUpdateOrder,
    setEditOrder,
    removeOrderAcc,
    deleteDistributorData
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AccountOrderTable);

// const columns = [
//     {
//         width: "1%"
//     },
//     {
//         // title: "Priority",
//         dataIndex: "priority",
//         width: "4%",
//         render: (name, item, i) => {
//             //debugger;
//             return (
//                 <div>
//                     {item.priority === "High" && (
//                         <div
//                             style={{
//                                 borderRadius: "50%",
//                                 height: "1.5625em",
//                                 width: "1.5625em",
//                                 backgroundColor: "red",
//                             }}
//                         ></div>
//                     )}
//                     {item.priority === "Medium" && (
//                         <div
//                             style={{
//                                 borderRadius: "50%",
//                                 height: "1.5625em",
//                                 width: "1.5625em",
//                                 backgroundColor: "orange",
//                             }}
//                         ></div>)}
//                     {item.priority === "Low" && (
//                         <div
//                             style={{
//                                 borderRadius: "50%",
//                                 height: "1.5625em",
//                                 width: "1.5625em",
//                                 backgroundColor: "teal",
//                             }}
//                         ></div>)}
//                 </div>
//             )
//         }
//     },
//     {
//         title: "Order No",
//         dataIndex: "newOrderNo",
//         width: "12%",
//         render: (name, item, i) => {
//             const currentdate = moment().format("DD/MM/YYYY");
//             const date = moment(item.creationDate).format("DD/MM/YYYY");
//             return (
//                 <>
//                     <span
//                         style={{ textDecoration: "underline", cursor: "pointer", color: "#1890ff" }}
//                         onClick={() => {
//                             handleSetParticularOrderData(item);
//                             props.handleOrderDetailsModal(true);
//                         }}
//                     >{item.newOrderNo}</span>
//                     &nbsp;&nbsp;
//                     {date === currentdate ? (
//                         <span
//                             style={{
//                                 color: "tomato",
//                                 fontWeight: "bold",
//                             }}
//                         >
//                             New
//                         </span>
//                     ) : null}
//                 </>
//             );
//         },

//     },
//     {
//         title: "Created",
//         dataIndex: "creationDate",
//         width: "18%",
//         sorter: (a, b) => {
//             var nameA = a.creationDate; // ignore upper and lowercase
//             var nameB = b.creationDate; // ignore upper and lowercase
//             if (nameA < nameB) {
//                 return -1;
//             }
//             if (nameA > nameB) {
//                 return 1;
//             }

//             return 0;
//         },
//         render: (name, item, i) => {
//             return {
//                 props: {
//                     style: {
//                         color: item.orderStatus === "Completed" ? "#08b0b0" : "black",
//                         fontWeight: item.orderStatus === "Completed" ? "bold" : null,
//                     },
//                 },
//                 children: <MultiAvatar2
//                     primaryTitle={item.userName}
//                     // imageId={item.ownerImageId}
//                     imageURL={item.imageURL}
//                     imgWidth={"1.8em"}
//                     imgHeight={"1.8em"}
//                 />
//                 // children: `${item.userName} on ${moment(item.creationDate).format("DD-MM-YY")}`,
//             };
//         },
//     },
//     {
//         title: "Location",
//         width: "12%",
//         render: (text, item) => {
//             return (
//                 <>{item.locationDetailsViewDTO && item.locationDetailsViewDTO.name || ""}</>
//             )
//         }
//     },
//     {
//         title: "Phones#",
//         dataIndex: "count",
//         width: "8%",

//     },
//     {
//         title: "Awb",
//         dataIndex: "awbNo",
//         width: "8%",
//     },
//     {
//         title: "Contact",
//         dataIndex: "contactPersonName",
//         width: "10%",
//         render: (text, item) => {
//             return (
//                 <>
//                     <MultiAvatar2
//                         primaryTitle={item.contactPersonName}
//                         // imageId={item.ownerImageId}
//                         imageURL={item.imageURL}
//                         imgWidth={"1.8em"}
//                         imgHeight={"1.8em"}
//                     />
//                 </>
//             )
//         }
//     },
//     {
//         title: "Expected Price",
//         dataIndex: "expectedPrice",
//         width: "9%",
//     },
//     {
//         title: "Final Price",
//         dataIndex: "suggestedPrice",
//         width: "9%",
//     },
//     {
//         title: "Revised Price",
//         dataIndex: "offerPrice",
//         editable: true,
//         width: "12%",
//     },
//     {
//         title: '',
//         width: "6%",
//         dataIndex: 'operation',
//         render: (_, record) => {
//             const editable = isEditing(record);
//             return editable ? (
//                 <span>
//                     <Typography.Link
//                         onClick={() =>
//                             save(record.orderId)

//                         }
//                         style={{
//                             marginRight: 8,
//                         }}
//                     >
//                         Save
//                     </Typography.Link>
//                     <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
//                         <a>Cancel</a>
//                     </Popconfirm>
//                 </span>
//             ) : record.qcStartInd === 3 && record.priceConfirmInd === false ?
//                 (<Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
//                     <BorderColorOutlined
//                         style={{ cursor: "pointer", color: "blue" }}
//                     />
//                 </Typography.Link>)
//                 : null
//         },
//     },
//     {
//         title: "",
//         width: "3%",
//         render: (name, item, i) => {
//             //debugger
//             return (
//                 <Tooltip title="Notes">
//                     <NoteAltIcon
//                         style={{ cursor: "pointer",color:"green", fontSize: "1rem" }}
//                         onClick={() => {

//                             props.handleNotesModalInOrder(true);
//                             handleSetParticularOrderData(item);
//                         }}
//                     />

//                 </Tooltip>
//             );
//         },
//     },
//     {
//         title: "",
//         width: "3%",
//         render: (text, item) => {
//             return (
//                 <>
//                     {/* <FontAwesomeIcon icon="fas fa-stream" /> */}
//                     <Tooltip title="Status">
//                         <EventRepeatIcon
//                             className="!text-base cursor-pointer"
//                             onClick={() => {
//                                 props.handleStatusOfOrder(true);
//                                 handleSetParticularOrderData(item);
//                             }}
//                         />
//                     </Tooltip>
//                 </>
//             )
//         }
//     },
//     {
//         title: "",
//         width: "3%",
//         render: (text, item) => {
//             return (
//                 <>
//                     <Tooltip title="Collection">
//                         <PaidIcon
//                             className="!text-base cursor-pointer"
//                             onClick={() => {
//                                 props.handlePaidModal(true);
//                                 handleSetParticularOrderData(item);
//                             }}
//                         // style={{ color: "blue" }}
//                         />
//                     </Tooltip>
//                 </>
//             )
//         }
//     },
//     {
//         title: "",
//         width: "16%",
//         render: (name, item, i) => {
//             //debugger
//             return (
//                 <>
//                     {item.transferInd === 0 ? (
//                         <Tooltip title="Add Inventory Location">
//                             <Button
//                                 style={{ cursor: "pointer", fontSize: "13px", backgroundColor: "#3096e9", color: "white" }}
//                                 onClick={() => {
//                                     handleSetParticularOrderData(item);
//                                     props.handleInventoryLocationInOrder(true);
//                                 }}
//                             >
//                                 Order Pickup
//                             </Button>
//                         </Tooltip>

//                     ) : null
//                     }
//                 </>
//             );
//         },
//     },
//     {
//         width: "5%",
//         render: (text, item) => {
//             return (
//                 <>
//                     <Tooltip title="Rating">
//                         <StarBorderIcon
//                             className="!text-base cursor-pointer" />
//                     </Tooltip>
//                 </>
//             )
//         }
//     },
//     {
//         width: "5%",
//         render: (text, item) => {
//             return (
//                 <>
//                     <Tooltip title="Feedback">
//                         <FeedbackIcon
//                             className="!text-base cursor-pointer" />
//                     </Tooltip>
//                 </>
//             )
//         }
//     },
// ];
// const mergedColumns = columns.map((col) => {
//     if (!col.editable) {
//         return col;
//     }

//     return {
//         ...col,
//         onCell: (record) => ({
//             record,
//             inputType: col.dataIndex === 'remark' ? 'text' : 'number',
//             dataIndex: col.dataIndex,
//             title: col.title,
//             editing: isEditing(record),
//         }),
//     };
// });
