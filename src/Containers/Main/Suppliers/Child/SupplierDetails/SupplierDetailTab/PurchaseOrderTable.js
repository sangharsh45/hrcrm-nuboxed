import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { getPurchaseSuppliersList, handlePoLocationModal } from "../../../SuppliersAction"
import { Button } from 'antd';
import PoLocationModal from "./PoLocationModal";
import { MultiAvatar } from "../../../../../../Components/UI/Elements";

function PurchaseOrderTable(props) {
    useEffect(() => {
        props.getPurchaseSuppliersList(props.supplier.supplierId);
    }, []);
    const [rowData, setRowData] = useState({})
    const handleRowData = (item) => {
        setRowData(item)
    }
    return (
        <>
            <div className=' flex justify-end sticky top-28 z-auto'>
                <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex justify-between w-[56.5%] p-2 bg-transparent font-bold sticky top-0 z-10">
                        <div className=" md:w-[23.1rem]">
                            <FormattedMessage
                                id="app.po"
                                defaultMessage="PO#"
                            /></div>
                        <div className=" md:w-[14.1rem]">
                            <FormattedMessage
                                id="app.created"
                                defaultMessage="Created" />
                        </div>
                        <div className=" md:w-[14.1rem]">
                            <FormattedMessage
                                id="app.location"
                                defaultMessage="Location" />
                        </div>

                    </div>
                    {props.purchaseList.map((item) => {
                        return (
                            <>
                                <div className="flex rounded-xl justify-between mt-[0.5rem] bg-white h-[2.75rem] items-center p-3" >
                                    <div class=" flex flex-row justify-evenly w-wk max-sm:flex-col">
                                        <div className=" flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row ">
                                            <div class=" font-normal text-[0.85rem] text-cardBody font-poppins">
                                                {/* <Link class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 text-[#042E8A] cursor-pointer"
                                                    to={`supplier/${item.poSupplierDetailsId}`}
                                                    title={`${item.shipperName}`}
                                                >{item.poSupplierDetailsId}</Link> */}
                                                {item.poSupplierDetailsId}
                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row ">
                                            <div class=" font-normal text-[0.85rem] text-cardBody font-poppins">
                                                <MultiAvatar
                                                    primaryTitle={item.userName}
                                                    imgWidth={"1.8rem"}
                                                    imgHeight={"1.8rem"}
                                                />
                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row ">
                                            <div class=" font-normal text-[0.85rem] text-cardBody font-poppins">

                                                {item.locationName}
                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row ">
                                            <div class=" font-normal text-[0.85rem] text-cardBody font-poppins">
                                                {item.locationName === null ? <Button
                                                    type="primary"
                                                    onClick={() => {
                                                        handleRowData(item)
                                                        props.handlePoLocationModal(true)
                                                    }}
                                                >
                                                    <FormattedMessage
                                                        id="app.movetoinventory"
                                                        defaultMessage="Move To Inventory"
                                                    />
                                                </Button> : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
            <PoLocationModal
                supplierId={props.supplier.supplierId}
                rowData={rowData}
                addlocationInPo={props.addlocationInPo}
                handlePoLocationModal={props.handlePoLocationModal}
            />
        </>
    )
}
const mapStateToProps = ({ suppliers, auth }) => ({
    purchaseList: suppliers.purchaseList,
    userId: auth.userDetails.userId,
    addlocationInPo: suppliers.addlocationInPo
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getPurchaseSuppliersList,
            handlePoLocationModal
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseOrderTable);