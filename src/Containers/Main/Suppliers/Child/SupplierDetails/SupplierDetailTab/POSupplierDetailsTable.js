import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { getPurchaseOrderDetailsList, updatePriceOfPoItem } from "../../../SuppliersAction"
import { BorderAllRounded } from "@mui/icons-material";
import { Button, Input } from "antd";

function PoSupplierDetailsTable(props) {
    useEffect(() => {
        props.getPurchaseOrderDetailsList(props.poSupplierDetailsId);
    }, []);

    const [price, setPrice] = useState("")
    const [edit, setEdit] = useState(false)

    const handlePrice = () => {
        setEdit(!edit)
    }
    const handleInputPrice = (val) => {
        setPrice(val)
    }
    return (
        <>
            <div className=' flex justify-end sticky z-auto'>
                <div class="rounded-lg m-5 p-2 w-full overflow-auto shadow-[4px_0px_9px_3px_] shadow-[#a3abb980] bg-[#E3E8EE]">
                    <div className=" flex justify-between w-[99.5%] p-2 bg-transparent font-bold sticky top-0 z-10">
                        <div className=" md:w-[23.1rem]">
                            <FormattedMessage
                                id="app.name"
                                defaultMessage="Name"
                            /></div>
                        <div className=" md:w-[14.1rem]">
                            <FormattedMessage
                                id="app.category"
                                defaultMessage="Category" />
                        </div>
                        <div className=" md:w-[14.1rem]">
                            <FormattedMessage
                                id="app.subcategory"
                                defaultMessage="Sub Category" />
                        </div>
                        <div className=" md:w-[14.1rem]">
                            <FormattedMessage
                                id="app.attribute"
                                defaultMessage="Attribute" />
                        </div>
                        <div className=" md:w-[14.1rem]">
                            <FormattedMessage
                                id="app.subattribute"
                                defaultMessage="Sub Attribute" />
                        </div>
                        <div className=" md:w-[14.1rem]">
                            <FormattedMessage
                                id="app.unit"
                                defaultMessage="Unit" />
                        </div>
                        <div className=" md:w-[14.1rem]">
                            <FormattedMessage
                                id="app.price"
                                defaultMessage="Price" />
                        </div>

                    </div>
                    {props.poDetails.map((item) => {
                        return (
                            <>
                                <div className="flex rounded-xl justify-between mt-[0.5rem] bg-white h-[2.75rem] items-center p-3" >
                                    <div class=" flex flex-row justify-evenly w-wk max-sm:flex-col">
                                        <div className=" flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row ">
                                            <div class=" font-normal text-[0.85rem] text-cardBody font-poppins">
                                                <span>
                                                    {item.suppliesFullName}
                                                </span>

                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row ">
                                            <div class=" font-normal text-[0.85rem] text-cardBody font-poppins">
                                                <span>
                                                    {item.categoryName}
                                                </span>

                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row ">
                                            <div class=" font-normal text-[0.85rem] text-cardBody font-poppins">
                                                <span>
                                                    {item.subCategoryName}
                                                </span>

                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row ">
                                            <div class=" font-normal text-[0.85rem] text-cardBody font-poppins">
                                                <span>
                                                    {item.attributeName}
                                                </span>

                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row ">
                                            <div class=" font-normal text-[0.85rem] text-cardBody font-poppins">
                                                <span>
                                                    {item.subAttributeName}
                                                </span>

                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row ">
                                            <div class=" font-normal text-[0.85rem] text-cardBody font-poppins">
                                                <span>
                                                    {item.unit}
                                                </span>

                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row ">
                                            <div class=" font-normal text-[0.85rem] text-cardBody font-poppins">

                                                {edit ?
                                                    <>
                                                        <Input
                                                            value="price"
                                                            type="text"
                                                            placeholder="Enter Price"
                                                            onChange={(e) => handleInputPrice(e.target.value)}
                                                        />
                                                        <Button
                                                            onClick={() => props.updatePriceOfPoItem({
                                                                price: price,
                                                                poSupplierDetailsId: props.poSupplierDetailsId
                                                            })}
                                                        >Add</Button>
                                                        <Button onClick={handlePrice}>Cancel</Button>
                                                    </>
                                                    : <span>
                                                        {/* {item.price} */}
                                                    </span>
                                                }

                                            </div>
                                        </div>
                                        <div className=" flex font-medium flex-col md:w-26 max-sm:justify-between w-full max-sm:flex-row ">
                                            <div class=" font-normal text-[0.85rem] text-cardBody font-poppins">
                                                <BorderAllRounded
                                                    onClick={() => {
                                                        props.handlePrice()
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>

        </>
    )
}
const mapStateToProps = ({ suppliers, auth }) => ({
    poDetails: suppliers.poDetails
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getPurchaseOrderDetailsList,
            updatePriceOfPoItem
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(PoSupplierDetailsTable);