import React, { useEffect, useState } from 'react'
import { Button } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getAllSpareList } from "./RefurbishAction"
import { OnlyWrapCard } from "../../../Components/UI/Layout";
import moment from "moment";
import { FormattedMessage } from "react-intl";

const ApproveSpareTable = (props) => {

    useEffect(() => {
        props.getAllSpareList(props.rowData.orderPhoneId)
    }, [])
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

    return (
        <>
         <div className='flex justify-end sticky top-0 z-auto'>
                <OnlyWrapCard style={{ backgroundColor: "#E3E8EE" }}>
                    <div className=" flex  w-[95%] p-2 bg-transparent font-bold sticky top-0 z-10">
                        <div className=" md:w-[8.1rem]"><FormattedMessage
                        id="app.sparename"
                        defaultMessage="Spare Name"
                      /></div>
                        <div className=" md:w-[10.1rem]"><FormattedMessage
                        id="app.phoneimei"
                        defaultMessage="Phone imei"
                      /></div>
                        <div className=" md:w-[5.8rem] "><FormattedMessage
                        id="app.phonemodel"
                        defaultMessage="Phone Model"
                      /></div>
                        <div className="md:w-[4.6rem]"><FormattedMessage
                        id="app.oem"
                        defaultMessage="OEM"
                      /></div>
                       
                        <div className="md:w-[7.2rem]"></div>
                    </div>
                    {props.allSpareById.map((item) => {
                        const currentdate = moment().format("DD/MM/YYYY");
                        const date = moment(item.createAt).format("DD/MM/YYYY");
                        return (
                            <div>
                                <div className="flex rounded-xl  mt-4 bg-white h-12 items-center p-3 " >
                                    <div class="flex">
                                        <div className=" flex font-medium  md:w-[7.6rem] max-sm:w-full  ">
                                           
                                                {item.newOrderNo}
                                        </div>

                                        <div className=" flex font-medium   md:w-[10.7rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <h4 class=" text-xs text-cardBody font-poppins">
                                                {item.distributorName}
                                            </h4>

                                        </div>
                                        <div className=" flex font-medium  md:w-[5.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                            <h4 class=" text-sm text-cardBody font-poppins">

                                            </h4>
                                        </div>
                                    </div>

                                    <div className=" flex font-medium  md:w-[5.21rem] max-sm:flex-row w-full max-sm:justify-between ">
                                        <div class=" text-xs text-cardBody font-poppins text-center">
                                            
                                        </div>
                                    </div>
                                   

                                </div>
                            </div>
                        )
                    })}
                </OnlyWrapCard>
            </div>
            {/* <StyledTable
                rowKey="sparePhoneId"
                rowSelection={rowSelection}
                columns={columns}
                pagination={false}
                dataSource={props.allSpareById}
                loading={props.fetchingALlSPareList}
            /> */}
            <div class="flex justify-end">
                <Button type='primary'>Approve</Button>
            </div>
        </>
    )
}
const mapStateToProps = ({ refurbish, auth }) => ({
    allSpareById: refurbish.allSpareById,
    fetchingALlSPareList: refurbish.fetchingALlSPareList
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getAllSpareList
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ApproveSpareTable);
