import React, { useEffect, useState } from 'react'
import { StyledTable } from '../../../../../Components/UI/Antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment/moment';
import PaidIcon from '@mui/icons-material/Paid';
import FeedbackIcon from '@mui/icons-material/Feedback';
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import BorderColorIcon from "@mui/icons-material/BorderColor";
import {
    getDistributorOrderByDistributorId,
    handleInventoryLocationInOrder,
    handleOrderDetailsModal,
    handleNotesModalInOrder,
    handlePaidModal,
    handleStatusOfOrder,
    updateOfferPrice
} from "../../AccountAction"
import { Button, Popconfirm, Tooltip, Typography, Input, Form } from 'antd';
import AddLocationInOrder from './AddLocationInOrder';
import AccountOrderDetailsModal from './AccountOrderDetailsModal';
import StatusOfOrderModal from './StatusOfOrderModal';
import { StepForwardFilled } from '@ant-design/icons';
import AddNotesOrderModal from './AddNotesOrderModal';
import PaidButtonModal from './PaidButtonModal';
import { MultiAvatar2 } from '../../../../../Components/UI/Elements';
import { BorderAllRounded, BorderColorOutlined } from '@mui/icons-material';
import { OnlyWrapCard } from '../../../../../Components/UI/Layout';
import { Link } from '../../../../../Components/Common';
import { BundleLoader } from '../../../../../Components/Placeholder';
const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const AccountOrderTable = (props) => {
    const [page, setPage] = useState(0);
    useEffect(() => {
        setPage(page + 1);
        props.getDistributorOrderByDistributorId(props.distributorId,page)
    }, [])
    const [particularRowData, setParticularRowData] = useState({});

    function handleSetParticularOrderData(item) {
        setParticularRowData(item);
    }
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');

    useEffect(() => {
        setData(props.distributorOrder)
    }, [props.distributorOrder])

    const isEditing = (record) => record.orderId === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            offerPrice: "",
            ...record,
        });
        setEditingKey(record.orderId);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.orderId);
            if (index > -1) {
                // alert("if");
                const item = newData[index];
                console.log(item)
                newData.splice(index, 1, { ...item, ...row });
                const a = newData[index];
                console.log(props.quotationId);
                props.updateOfferPrice(
                    {
                        offerPrice: a.offerPrice,
                        orderPhoneId: a.orderId,
                        expectedPrice: 0,
                        customerPriceInd: true
                    },
                    a.orderId,
                    props.distributorId,
                );
                setEditingKey('');
            } else {
                alert("else");
                newData.push(row);
                // setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
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
    if (props.fetchingDistributorByDistributorId) {
        return <BundleLoader />;
      }

    return (
        <>
            <div className=' flex justify-end sticky top-28 z-auto'>
                <OnlyWrapCard style={{ backgroundColor: "#E3E8EE" }}>
                    <div className=" flex justify-between w-3/4 pl-9 bg-transparent font-bold sticky top-0 z-10">
                        {/* <div className=" md:w-[8.1rem]"></div> */}
                        <div className=" md:w-[6.4rem]">Order No</div>
                        <div className=" md:w-[5.1rem]">Created</div>
                        <div className=" md:w-[5.8rem] ">Location</div>
                        <div className="md:w-[4.9rem]">Phones#</div>
                        <div className="md:w-[3.8rem]">AWB</div>
                        <div className="md:w-[2.9rem]">Contact</div>
                        <div className="md:w-[6.12rem]">Expected Price </div>
                        <div className="md:w-[4.3rem]">Final Price</div>
                        <div className="w-[5.8rem]">Revised Price</div>

                    </div>
                    {/* <InfiniteScroll
        dataLength={customerByUserId.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingCustomers?<h4 style={{ textAlign: 'center' }}>Loading...</h4>:null}
        height={"75vh"}
      > */}
                    <div class="overflow-x-auto h-[64vh]">
                        {props.distributorOrder.map((item) => {
                            const currentdate = moment().format("DD/MM/YYYY");
                            const date = moment(item.creationDate).format("DD/MM/YYYY");
                            const diff = Math.abs(
                                moment().diff(moment(item.lastRequirementOn), "days")
                            );
                            const dataLoc = ` Address : ${item.address && item.address.length && item.address[0].address1
                                } 
           Street : ${item.address && item.address.length && item.address[0].street
                                }   
          State : ${item.address && item.address.length && item.address[0].state}
         Country : ${(item.address && item.address.length && item.address[0].country) || ""
                                } 
           PostalCode : ${item.address && item.address.length && item.address[0].postalCode
                                } `;
                            return (
                                <div >
                                    <div className="flex rounded-xl justify-between mt-2 bg-white h-12 items-center p-3 "
                                    // style={{
                                    //     borderBottom: "3px dotted #515050"
                                    // }}
                                    >
                                        <div class="flex w-3/4">
                                            <div className=" flex font-medium flex-col md:w-[1.56rem] max-sm:w-full  ">


                                                <Tooltip>
                                                    <div class="flex max-sm:flex-row justify-between w-full md:flex-col">
                                                        {/* <h4 class=" text-xs text-cardBody font-poppins max-sm:hidden">
                                            Name
                                            </h4> */}
                                                        <h4 class=" text-sm text-blue-500 text-cardBody font-poppins font-semibold  cursor-pointer">

                                                            {item.priority === "High" && (
                                                                <div
                                                                    style={{
                                                                        borderRadius: "50%",
                                                                        height: "1.5625em",
                                                                        width: "1.5625em",
                                                                        backgroundColor: "red",
                                                                    }}
                                                                ></div>
                                                            )}
                                                            {item.priority === "Medium" && (
                                                                <div
                                                                    style={{
                                                                        borderRadius: "50%",
                                                                        height: "1.5625em",
                                                                        width: "1.5625em",
                                                                        backgroundColor: "orange",
                                                                    }}
                                                                ></div>)}
                                                            {item.priority === "Low" && (
                                                                <div
                                                                    style={{
                                                                        borderRadius: "50%",
                                                                        height: "1.5625em",
                                                                        width: "1.5625em",
                                                                        backgroundColor: "teal",
                                                                    }}
                                                                ></div>)}

                                                        </h4>
                                                    </div>
                                                </Tooltip>

                                            </div>

                                            <div className=" flex font-medium flex-col  md:w-[5.4rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                                {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </h4> */}
                                                <h4 class=" text-xs text-cardBody font-poppins">
                                                    <span
                                                        style={{ textDecoration: "underline", cursor: "pointer", color: "#1890ff" }}
                                                    // onClick={() => {
                                                    //     handleSetParticularOrderData(item);
                                                    //     props.handleOrderDetailsModal(true);
                                                    // }}
                                                    >{item.newOrderNo}</span>
                                                    &nbsp;&nbsp;
                                                    {date === currentdate ? (
                                                        <span
                                                            style={{
                                                                color: "tomato",
                                                                fontWeight: "bold",
                                                            }}
                                                        >
                                                            New
                                                        </span>
                                                    ) : null}
                                                </h4>

                                            </div>



                                            <div className=" flex font-medium flex-col md:w-[6.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden"># Opportunity</h4> */}

                                                <div class=" text-xs text-cardBody font-poppins text-center">
                                                    <MultiAvatar2
                                                        primaryTitle={item.userName}
                                                        // imageId={item.ownerImageId}
                                                        imageURL={item.imageURL}
                                                        imgWidth={"1.8em"}
                                                        imgHeight={"1.8em"}
                                                    />

                                                </div>
                                            </div>
                                            <div className=" flex font-medium flex-col md:w-[7.1rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden">Pipeline Value</h4> */}

                                                <div class=" text-xs text-cardBody font-poppins text-center">
                                                    {item.locationDetailsViewDTO && item.locationDetailsViewDTO.name || ""}
                                                </div>
                                            </div>

                                            <div className=" flex font-medium flex-col md:w-[6.5rem] max-sm:flex-row w-full max-sm:justify-between ">
                                                {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden">Weighted Value</h4> */}

                                                <div class=" text-xs text-cardBody font-poppins text-center">
                                                    {item.count}

                                                </div>
                                            </div>



                                            <div className=" flex font-medium flex-col  md:w-[5.5rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                                {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </h4> */}
                                                <h4 class=" text-xs text-cardBody font-poppins">
                                                    {item.awbNo}
                                                </h4>

                                            </div>
                                            <div className=" flex font-medium flex-col  md:w-[4.3rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                                {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </h4> */}
                                                <h4 class=" text-xs text-cardBody font-poppins">
                                                    <MultiAvatar2
                                                        primaryTitle={item.contactPersonName}
                                                        // imageId={item.ownerImageId}
                                                        imageURL={item.imageURL}
                                                        imgWidth={"1.8em"}
                                                        imgHeight={"1.8em"}
                                                    />
                                                </h4>

                                            </div>


                                            <div className=" flex font-medium flex-col  md:w-[3.5rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                                {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </h4> */}
                                                <h4 class=" text-xs text-cardBody font-poppins">
                                                    {item.expectedPrice}
                                                </h4>

                                            </div>
                                            <div className=" flex font-medium flex-col  md:w-[7.7rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                                {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </h4> */}
                                                <h4 class=" text-xs text-cardBody font-poppins">
                                                    {item.suggestedPrice}
                                                </h4>

                                            </div>


                                            <div className=" flex font-medium flex-col  md:w-[3.9rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                                {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </h4> */}
                                                <h4 class=" text-xs text-cardBody font-poppins">
                                                    {visible && (item.orderId === particularRowData.orderId) ?
                                                        <Input
                                                            type='text'
                                                            value={price}
                                                            onChange={(e) => handleChange(e.target.value)}
                                                        />
                                                        : item.offerPrice}
                                                </h4>

                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col  md:w-[3.4rem] max-sm:flex-row w-full max-sm:justify-between  ">


                                            <h4 class=" text-xs text-cardBody font-poppins">

                                                {visible && (item.orderId === particularRowData.orderId) ? (
                                                    <>
                                                        <div className=" flex justify-between flex-col">
                                                            <Button onClick={() => {
                                                                handleSubmitPrice()
                                                            }} >Save</Button>
                                                            <Button onClick={() => handleUpdateRevisePrice(false)}>Cancel</Button>
                                                        </div>
                                                    </>
                                                ) : item.qcStartInd === 3 && item.priceConfirmInd === false ? <Tooltip title="Update Revised Price">
                                                    <BorderColorOutlined
                                                        onClick={() => {
                                                            handleUpdateRevisePrice()
                                                            handleSetParticularOrderData(item)
                                                        }}
                                                        style={{ cursor: "pointer", fontSize: "1rem", }} />
                                                </Tooltip> : null}

                                            </h4>

                                        </div>
                                        <div className=" flex font-medium flex-col  md:w-[1rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                            {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </h4> */}
                                            <h4 class=" text-xs text-cardBody font-poppins">
                                                <Tooltip title="Notes">
                                                    <NoteAltIcon
                                                        style={{ cursor: "pointer", color: "green", fontSize: "1rem" }}
                                                        onClick={() => {

                                                            props.handleNotesModalInOrder(true);
                                                            handleSetParticularOrderData(item);
                                                        }}
                                                    />

                                                </Tooltip>
                                            </h4>

                                        </div>


                                        <div className=" flex font-medium flex-col  md:w-[1rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                            {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </h4> */}
                                            <h4 class=" text-xs text-cardBody font-poppins">
                                                <Tooltip title="Status">
                                                    <EventRepeatIcon
                                                        style={{ cursor: "pointer", fontSize: "1rem", }}
                                                        onClick={() => {
                                                            props.handleStatusOfOrder(true);
                                                            handleSetParticularOrderData(item);
                                                        }}
                                                    />
                                                </Tooltip>
                                            </h4>

                                        </div>
                                        <div className=" flex font-medium flex-col  md:w-[1rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                            {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </h4> */}
                                            <h4 class=" text-xs text-cardBody font-poppins">
                                                <Tooltip title="Collection">
                                                    <PaidIcon
                                                        style={{ cursor: "pointer", fontSize: "1rem", }}
                                                        onClick={() => {
                                                            props.handlePaidModal(true);
                                                            handleSetParticularOrderData(item);
                                                        }}
                                                    // style={{ color: "blue" }}
                                                    />
                                                </Tooltip>

                                            </h4>

                                        </div>


                                        <div className=" flex font-medium flex-col  md:w-[6.7rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                            {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </h4> */}
                                            <h4 class=" text-xs text-cardBody font-poppins">
                                                {item.transferInd === 0 ? (
                                                    <Tooltip title="Add Inventory Location">
                                                        <Button
                                                            style={{ cursor: "pointer", fontSize: "13px", backgroundColor: "#3096e9", color: "white" }}
                                                            onClick={() => {
                                                                handleSetParticularOrderData(item);
                                                                props.handleInventoryLocationInOrder(true);
                                                            }}
                                                        >
                                                            Order Pickup
                                                        </Button>
                                                    </Tooltip>

                                                ) : null
                                                }
                                            </h4>

                                        </div>
                                        <div className=" flex font-medium flex-col  md:w-[1rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                            {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </h4> */}
                                            <h4 class=" text-xs text-cardBody font-poppins">
                                                <Tooltip title="Rating">
                                                    <StarBorderIcon
                                                        style={{ cursor: "pointer", fontSize: "1rem", }} />
                                                </Tooltip>

                                            </h4>

                                        </div>
                                        <div className=" flex font-medium flex-col  md:w-[1rem] max-sm:flex-row w-full max-sm:justify-between  ">

                                            {/* <h4 class=" text-sm text-cardBody font-poppins max-sm:hidden"> Sector </h4> */}
                                            <h4 class=" text-xs text-cardBody font-poppins">
                                                <Tooltip title="Feedback">
                                                    <FeedbackIcon
                                                        style={{ cursor: "pointer", fontSize: "1rem", }} />
                                                </Tooltip>

                                            </h4>

                                        </div>



                                    </div>
                                </div>


                            )
                        })}
                    </div>
                    {/* </InfiniteScroll> */}
                </OnlyWrapCard>
            </div>
            {true && (
                <Form form={form} component={false}>

                    {/* <StyledTable
                        rowKey="orderId"
                        dataSource={data}
                        scroll={{ y: 320 }}
                        pagination={false}
                        components={{
                            body: {
                                cell: EditableCell,
                            },
                        }}
                        loading={props.fetchingDistributorByDistributorId}
                        columns={mergedColumns}
                        sticky={true}
                        rowClassName="editable-row"
                    /> */}
                </Form>)}
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
        </>
    )
}
const mapStateToProps = ({ distributor }) => ({
    distributorOrder: distributor.distributorOrder,
    addNotesInOrder: distributor.addNotesInOrder,
    addInventoryInOrder: distributor.addInventoryInOrder,
    addOrderDetailsModal: distributor.addOrderDetailsModal,
    addStatusOfOrder: distributor.addStatusOfOrder,
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
    updateOfferPrice
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
//                             style={{ cursor: "pointer", fontSize: "1rem", }}
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
//                             style={{ cursor: "pointer", fontSize: "1rem", }}
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
//                             style={{ cursor: "pointer", fontSize: "1rem", }} />
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
//                             style={{ cursor: "pointer", fontSize: "1rem", }} />
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
