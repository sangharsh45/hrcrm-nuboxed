
import React, { useEffect, useState, Suspense, lazy } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment/moment';
import {
    getProductionOrder,
    handleProductOrderDetailsModal,
    handleOrderGenerateModal
} from "../../AccountAction";
import { FormattedMessage } from 'react-intl';
import { Button, Input, Tooltip } from 'antd';
import { MultiAvatar2 } from '../../../../../Components/UI/Elements';
import { BundleLoader } from '../../../../../Components/Placeholder';
import OrderGenerateModal from './OrderGenerateModal';
import OrderDetailModal from './OrderDetailModal';


const AccountOrder1Table = (props) => {
    const [page, setPage] = useState(0);
    useEffect(() => {
        setPage(page + 1);
        props.getProductionOrder(props.distributorId, page)
    }, [])
    const [particularRowData, setParticularRowData] = useState({});

    function handleSetParticularOrderData(item) {
        setParticularRowData(item);
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

                    </div>
                    {/* <InfiniteScroll
        dataLength={customerByUserId.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={fetchingCustomers?<div style={{ textAlign: 'center' }}>Loading...</div>:null}
        height={"75vh"}
      > */}
                    <div class="overflow-x-auto h-[64vh]">
                        {props.productionOrder.map((item) => {
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
                                                                props.handleProductOrderDetailsModal(true);
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
                                            <div className=" flex font-medium flex-col md:w-[11.5rem] max-sm:flex-row w-full max-sm:justify-between ">

                                                <div class=" text-xs text-cardBody font-poppins text-center">
                                                    <Button
                                                        type='primary'
                                                        onClick={() => { props.handleOrderGenerateModal(true) }}
                                                    >
                                                        Check In Inventory
                                                    </Button>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            )
                        })}
                    </div>
                </div>
            </div>
            <OrderGenerateModal
                particularRowData={particularRowData}
                handleOrderGenerateModal={props.handleOrderGenerateModal}
                generateOrderModal={props.generateOrderModal}
            />
            <OrderDetailModal
                particularRowData={particularRowData}
                showProductList={props.showProductList}
                handleProductOrderDetailsModal={props.handleProductOrderDetailsModal} />
        </>
    )
}
const mapStateToProps = ({ distributor, auth, inventory }) => ({
    accountOrderProduction: distributor.accountOrderProduction,
    productionOrder: distributor.productionOrder,
    showProductList: distributor.showProductList,
    generateOrderModal: distributor.generateOrderModal,
    fetchingDistributorByDistributorId: distributor.fetchingDistributorByDistributorId,
});
const mapDispatchToProps = dispatch => bindActionCreators({
    getProductionOrder,
    handleOrderGenerateModal,
    handleProductOrderDetailsModal
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AccountOrder1Table);
