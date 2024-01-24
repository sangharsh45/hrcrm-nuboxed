// import React, { useEffect, useState } from 'react'
// import { StyledTable } from '../../../Components/UI/Antd'
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import { getNoOfPhoneInQCById } from "./RefurbishAction"
// import QRCodeModal from '../../../Components/UI/Elements/QRCodeModal'
// import { SubTitle } from '../../../Components/UI/Elements'

// const QCPhoneListByTechnician = (props) => {

//     useEffect(() => {
//         props.getNoOfPhoneInQCById(props.orderPhoneId, props.row.technicianId)
//     }, [])
//     const column = [
//         {
//             title: "",
//             dataIndex: "",
//             width: "1%",
//         },
//         {
//             title: "Company",
//             dataIndex: "company",
//             width: "15%",

//         },
//         {
//             title: "Model",
//             dataIndex: "model",
//             width: "10%",
//         },
//         {
//             title: "IMEI",
//             dataIndex: "imei",
//             width: "12%",
//         },
//         {
//             title: "OS",
//             dataIndex: "os",
//             width: "12%",

//         },
//         {
//             title: "GB",
//             dataIndex: "gb",
//             width: "12%",
//         },
//         {
//             title: "Color",
//             dataIndex: "color",
//             width: "12%",
//         },
//         {
//             title: "Condition",
//             dataIndex: "conditions",
//             width: "12%",
//         },
//         {
//             title: "QR",
//             width: "8%",
//             render: (name, item, i) => {
//                 return (
//                     <SubTitle>
//                         {item.qrCodeId ? (
//                             <QRCodeModal
//                                 qrCodeId={item.qrCodeId ? item.qrCodeId : ''}
//                                 imgHeight={"2.8em"}
//                                 imgWidth={"2.8em"}
//                                 imgRadius={20}
//                             />
//                         ) : (
//                             <span style={{ fontSize: "0.6em", fontWeight: "bold" }}>
//                                 No QR
//                             </span>
//                         )}
//                     </SubTitle>
//                 );
//             },
//         },


//     ];
//     return (
//         <div>
//             <h2>
//                 <b>  Phone List</b>
//             </h2>
//             <StyledTable
//                 dataSource={props.phoneByTechId}
//                 pagination={false}
//                 columns={column}
//                 loading={props.fetchingNoOfPhoneInQcById}
//             />
//         </div>
//     )
// }


// const mapStateToProps = ({ auth, refurbish }) => ({
//     phoneByTechId: refurbish.phoneByTechId,
//     fetchingNoOfPhoneInQcById: refurbish.fetchingNoOfPhoneInQcById
// });

// const mapDispatchToProps = (dispatch) =>
//     bindActionCreators(
//         {
//             getNoOfPhoneInQCById
//         },
//         dispatch
//     );

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(QCPhoneListByTechnician);

import React, { useEffect,lazy } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getNoOfPhoneInQCById } from "./RefurbishAction";
import { SubTitle } from '../../../Components/UI/Elements';
import { FormattedMessage } from 'react-intl';
import { OnlyWrapCard } from '../../../Components/UI/Layout';
const QRCodeModal =lazy(()=>import('../../../Components/UI/Elements/QRCodeModal'));

const QCPhoneListByTechnician = (props) => {

    useEffect(() => {
        props.getNoOfPhoneInQCById(props.orderPhoneId, props.row.technicianId)
    }, [])
    return (
        <>
            <div className=' flex justify-end sticky z-10 h-60'>
                <OnlyWrapCard style={{ backgroundColor: "#E3E8EE" }}>
                    <div className=" flex  w-[95%] p-2 bg-transparent font-bold sticky top-0 z-10">
                        <div className=" md:w-[8.1rem]"><FormattedMessage
                        id="app.oem"
                        defaultMessage="OEM"
                      /></div>
                        <div className=" md:w-[8.1rem]"><FormattedMessage
                        id="app.model"
                        defaultMessage="model"
                      /></div>
                        <div className=" md:w-[7.8rem] "><FormattedMessage
                        id="app.imei"
                        defaultMessage="imei"
                      /></div>
                        <div className="md:w-[4.6rem]"><FormattedMessage
                        id="app.os"
                        defaultMessage="os"
                      /> </div>
                        <div className="md:w-[5.8rem]"><FormattedMessage
                        id="app.gb"
                        defaultMessage="gb"
                      /></div>
                        <div className="md:w-[7.7rem]"><FormattedMessage
                        id="app.color"
                        defaultMessage="color"
                      /></div>
                        <div className="md:w-[5.9rem]"><FormattedMessage
                        id="app.conditions"
                        defaultMessage="conditions"
                      /></div>
                        <div className="md:w-[7.2rem]"></div>
                    </div>
                    {props.phoneByTechId.map((item) => {
                        return (
                            <div>
                                <div className="flex rounded-xl  mt-4 bg-white h-12 items-center p-3 " >
                                    <div class="flex">
                                        <div className=" flex font-medium  md:w-[7.6rem] max-sm:w-full  ">
                                           {item.company}
                                        </div>

                                        <div className=" flex font-medium   md:w-[5.7rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <h4 class=" text-xs text-cardBody font-poppins">
                                                {item.model}
                                            </h4>

                                        </div>
                                        <div className=" flex font-medium  md:w-[7.2rem] max-sm:flex-row w-full max-sm:justify-between ">



                                            <h4 class=" text-sm text-cardBody font-poppins">
                                                
                                            {item.imei}
                                            </h4>
                                        </div>
                                    </div>

                                    <div className=" flex font-medium  md:w-[4.52rem] max-sm:flex-row w-full max-sm:justify-between ">
                                        <div class=" text-xs text-cardBody font-poppins text-center">
                                           
                                            {item.os}
                                           

                                        </div>
                                    </div>

                                    <div className=" flex font-medium  md:w-[5.21rem] max-sm:flex-row w-full max-sm:justify-between ">
                                        <div class=" text-xs text-cardBody font-poppins text-center">
                                            {item.gb}
                                        </div>
                                    </div>
                                    <div className=" flex font-medium  md:w-[8.12rem] max-sm:flex-row w-full max-sm:justify-between ">
                                        <div class=" text-xs text-cardBody font-poppins text-center">
                                            {item.color}
                                        </div>
                                    </div>
                                    <div className=" flex font-medium  md:w-[5.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                        <div class=" text-xs text-cardBody font-poppins text-center">
                                        {item.conditions}
                                        </div>
                                    </div>
                                    <div className=" flex font-medium  md:w-[8.2rem] max-sm:flex-row w-full max-sm:justify-between ">
                                        <div class=" text-xs text-cardBody font-poppins text-center">
                                        <SubTitle>
                        {item.qrCodeId ? (
                             <QRCodeModal
                                 qrCodeId={item.qrCodeId ? item.qrCodeId : ''}
                                 imgHeight={"2.8rem"}
                                 imgWidth={"2.8rem"}
                                 imgRadius={20}
                            />
                         ) : (
                             <span class="text-[0.6em] font-bold">
                                No QR
                            </span>
                        )}
                    </SubTitle>
                                        </div>
                                    </div>
                                   

                                </div>
                            </div>
                        )
                    })}
                </OnlyWrapCard>
                
            </div>
        </>
    )
}


const mapStateToProps = ({ auth, refurbish }) => ({
    phoneByTechId: refurbish.phoneByTechId,
    fetchingNoOfPhoneInQcById: refurbish.fetchingNoOfPhoneInQcById
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getNoOfPhoneInQCById
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QCPhoneListByTechnician);

