// import React, { useEffect, useState } from 'react'
// import { StyledTable } from '../../../Components/UI/Antd'
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import RepairPhoneListByTechnician from './RepairPhoneListByTechnician'
// import { getNoOfRepairTechnicianById } from "./RefurbishAction"

// const RepairTechnicianList = (props) => {

//     useEffect(() => {
//         props.getNoOfRepairTechnicianById(props.rowData.orderPhoneId)
//     }, [])
//     const [row, setRow] = useState({})
//     const [show, setShow] = useState(false)

//     const handleRowdata = (item) => {
//         setRow(item)
//         setShow(!show)
//     }

//     const column = [
//         {
//             width: "2%"
//         },
//         {
//             width: "20%",
//             title: "Technician Name",
//             render: (item, text) => {
//                 return (
//                     <>
//                         <span
//                             onClick={() => handleRowdata(item)}
//                             style={{
//                                 textDecoration: "underline",
//                                 color: show && item.technicianId === row.technicianId ? "rgb(225 158 14)" : "#0f6ace",
//                                 cursor: "pointer"
//                             }}
//                         >
//                             {item.technicianName}
//                         </span>
//                     </>
//                 )
//             }
//         },
//         {
//             dataIndex: "totalPhone",
//             width: "20%",
//             title: "Phone#",
//         },
//     ]

//     return (
//         <div>
//             <StyledTable
//                 dataSource={props.repairByTechnician}
//                 pagination={false}
//                 columns={column}
//                 loading={props.fetchingNoOfRepairTechnicianById}
//             />
//             {show && <RepairPhoneListByTechnician row={row} orderPhoneId={props.rowData.orderPhoneId} />}
//         </div>
//     )
// }


// const mapStateToProps = ({ auth, refurbish }) => ({
//     repairByTechnician: refurbish.repairByTechnician,
//     fetchingNoOfRepairTechnicianById: refurbish.fetchingNoOfRepairTechnicianById
// });

// const mapDispatchToProps = (dispatch) =>
//     bindActionCreators(
//         {
//             getNoOfRepairTechnicianById
//         },
//         dispatch
//     );

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(RepairTechnicianList);

import React, { useEffect, useState } from 'react'
import { StyledTable } from '../../../Components/UI/Antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import RepairPhoneListByTechnician from './RepairPhoneListByTechnician'
import { getNoOfRepairTechnicianById } from "./RefurbishAction"
import { OnlyWrapCard } from '../../../Components/UI/Layout'
import { FormattedMessage } from 'react-intl'

const RepairTechnicianList = (props) => {

    useEffect(() => {
        props.getNoOfRepairTechnicianById(props.rowData.orderPhoneId)
    }, [])
    const [row, setRow] = useState({})
    const [show, setShow] = useState(false)

    const handleRowdata = (item) => {
        setRow(item)
        setShow(!show)
    }

    return (
        <>
            <div className=' flex justify-end sticky  z-auto'>
                <OnlyWrapCard style={{ backgroundColor: "#E3E8EE" }}>
                    <div className=" flex  w-[95%] p-2 bg-transparent font-bold sticky top-0 z-10">
                        <div className=" md:w-[8.1rem]"><FormattedMessage
                        id="app.technicianname"
                        defaultMessage="technicianname"
                      /></div>
                        <div className=" md:w-[8.12rem]"><FormattedMessage
                        id="app.item"
                        defaultMessage="item"
                      /></div>
                       
                    </div>
                    {props.repairByTechnician.map((item) => {
                        return (
                            <div>
                                <div className="flex rounded-xl  mt-4 bg-white h-12 items-center p-3 " >
                                    <div class="flex">
                                        <div className=" flex font-medium  md:w-[7.6rem] max-sm:w-full  ">
                                        <span
                             onClick={() => handleRowdata(item)}
                             style={{
                                 textDecoration: "underline",
                                 color: show && item.technicianId === row.technicianId ? "rgb(225 158 14)" : "#0f6ace",
                                cursor: "pointer"
                            }}
                         >
                            {item.technicianName}
                         </span>
                                        </div>

                                        <div className=" flex font-medium   md:w-[5.7rem] max-sm:flex-row w-full max-sm:justify-between  ">
                                            <h4 class=" text-xs text-cardBody font-poppins">
                                                {item.totalPhone}
                                            </h4>

                                        </div>
                                        
                                    </div>

                                </div>
                            </div>
                        )
                    })}
                </OnlyWrapCard>
                
            </div>
            {show && <RepairPhoneListByTechnician row={row} orderPhoneId={props.rowData.orderPhoneId} />}
        </>
    )
}


const mapStateToProps = ({ auth, refurbish }) => ({
    repairByTechnician: refurbish.repairByTechnician,
    fetchingNoOfRepairTechnicianById: refurbish.fetchingNoOfRepairTechnicianById
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            getNoOfRepairTechnicianById
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RepairTechnicianList);

