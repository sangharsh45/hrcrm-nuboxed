import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { getPurchaseSuppliersList } from "../../../SuppliersAction"
// import { Link } from 'react-router-dom';

function PurchaseOrderTable(props) {
    useEffect(() => {
        props.getPurchaseSuppliersList(props.supplier.supplierId);
    }, []);

    return (
        <>
            <div className=' flex justify-end sticky top-28 z-auto'>
                <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex justify-between w-[97.5%] p-2 bg-transparent font-bold sticky top-0 z-10">
                        <div className=" md:w-[8.1rem]">
                            <FormattedMessage
                                id="app.po"
                                defaultMessage="PO#"
                            /></div>
                        <div className=" md:w-[5.1rem]">
                            <FormattedMessage
                                id="app.unit"
                                defaultMessage="Created" />
                        </div>

                    </div>
                    {/* {props.purchaseList.map((item) => {
                        return (
                            <>
                                <div className="flex rounded-xl justify-between mt-[0.5rem] bg-white h-[2.75rem] items-center p-3" >
                                    <div class=" flex flex-row justify-evenly w-wk max-sm:flex-col">
                                        <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
                                            <div class=" font-normal text-[0.85rem] text-cardBody font-poppins">
                                                <Link class="overflow-ellipsis whitespace-nowrap h-8 text-sm p-1 text-[#042E8A] cursor-pointer"
                                                    to={`supplier/${item.supplierId}`}
                                                    title={`${item.shipperName}`}
                                                >{item.name}</Link>
                                          </div>
                                       </div>
                                        <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">
                                          <div class=" font-normal text-[0.85rem] text-cardBody font-poppins">
                                                {item.dialCode} {item.phoneNo}
                                            </div>
                                      </div>
                                   </div>
                               </div>
                            </>
                        )
                    })} */}
                </div>
            </div>
        </>
    )
}
const mapStateToProps = ({ suppliers, auth }) => ({
    purchaseList: suppliers.purchaseList,
    userId: auth.userDetails.userId,

});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getPurchaseSuppliersList
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseOrderTable);