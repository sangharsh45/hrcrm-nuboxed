import React, { useEffect, useState } from 'react'
import { StyledTable } from '../../../../Components/UI/Antd'
import { getCatalogueByTechnician } from "../RefurbishAction"
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ButtonGroup from "antd/lib/button/button-group";
import { Button, Tooltip } from 'antd'
import { updateFarGlassInProduction,handleInTagDrawer } from "../RefurbishAction"
import TagInDrawer from './TagInDrawer';
import MoveInvenToggle from './MoveInvenToggle'

const ProductionTable = (props) => {

    useEffect(() => {
        props.getCatalogueByTechnician(props.userId)
    }, [])

    const [RowData, setRowData] = useState({});
    function handleSetRowData(item) {
        setRowData(item);
    }
    const [active, setActive] = useState("To Start")
    function StatusIcon({ type, size, iconType, tooltip, indStatus, status, id, onClick, phoneId }) {
        const start = type;
        console.log(start);
        //////debugger;
        if (status === type) {
            size = "30px";
        } else {
            size = "16px";
        }
        return (
            <Tooltip title={tooltip}>
                <Button
                    ghost={status !== type}
                    style={{
                        padding: "6px",
                        borderColor: "transparent",
                        color: indStatus === type ? "orange" : "grey",
                        // color: status === type && id === phoneId ? "orange" : "grey",
                    }}
                    onClick={onClick}
                >
                    <i className={`fas ${iconType}`} style={{ fontSize: "22px" }}></i>
                </Button>
            </Tooltip>
        );
    }
    function handleInProgress(type, item) {
        setActive(type)
        console.log(type)
        console.log(item)
        const data = {
            repairStatus: type,
            productRepurbishId:item.productRepurbishId,
            repurbishStartDate:props.startDate,
            phoneId: item.phoneId,
            repairTechnicianId: props.userId,
            qcInspectionInd: type === "Complete" ? 2 : 1
        }
        props.updateFarGlassInProduction(data, item.productRepurbishId)
    }
    function handleCompleteglass(type, item) {
        setActive(type)
        console.log(type)
        console.log(item)
        const data = {
            repairStatus: type,
            productRepurbishId:item.productRepurbishId,
            repurbishStartDate:item.repurbishStartDate,
            repurbishEndDate:props.endDate,
            phoneId: item.phoneId,
            repairTechnicianId: props.userId,
            qcInspectionInd: type === "Complete" ? 2 : 1
        }
        props.updateFarGlassInProduction(data, item.productRepurbishId)
    }
    const column = [
        {
            title: "",
            width: "1%"
        },

        {
            title: "Name",
            width: "15%",
            dataIndex: 'name'
        },

        {
            title: "Category",
            width: "18%",
            dataIndex: "categoryName"
        },
        {
            title: "Sub Category",
            width: "18%",
            dataIndex: "subCategoryName"
        },
        {
            title: "Attribute",
            width: "10%",
            dataIndex: "attributeName"
        },
        {
            title: "Sub Attribute",
            width: "10%",
            dataIndex: "subAttributeName"
        },
        {
            title: "Units",
            width: "13%",
            dataIndex: "unit",
        },
        {
            render: (text, item) => {
                return (
                    <>
                        <ButtonGroup>

                            <StatusIcon
                                type="In Progress"
                                iconType="fa-hourglass-half"
                                tooltip="In Progress"
                                id={item.phoneId}
                                indStatus={item.repairStatus}
                                phoneId={RowData.phoneId}
                                status={active}
                                onClick={() => {
                                    handleInProgress("In Progress", item);
                                    handleSetRowData(item)
                                }}
                            />
                            <StatusIcon
                                type="Complete"
                                iconType="fa-hourglass"
                                tooltip="Complete"
                                status={active}
                                id={item.phoneId}
                                indStatus={item.repairStatus}
                                phoneId={RowData.phoneId}
                                onClick={() => {
                                    handleCompleteglass("Complete", item);
                                    handleSetRowData(item)
                                }}
                            />
                        </ButtonGroup>
                    </>
                )
            }
        },
        {
            width: "7%",
            render: (text, item) => {
                return (
                    <>
                    {item.repurbishStartDate===null ?null:
                        <Tooltip title="">
                            <Button
                                style={{ backgroundColor: "orange", color: "white" }}
                                onClick={() => {
                                    // handleShowBuilder()
                                    props.handleInTagDrawer(true)
                                    handleSetRowData(item)
                                }}
                            >
                                Tag Parts
                            </Button>
                        </Tooltip>
                        } 

                    </>
                )
            }
        },
        {
            width: "7%",
            render: (text, item) => {
                return (
                    <>
                    {item.repurbishEndDate===null ? null:
                   <MoveInvenToggle
                   moveToLocationId={item.moveToLocationId}
                   productRepurbishId={item.productRepurbishId}
                   repurbishStartDate={item.repurbishStartDate}
                   repurbishEndDate={item.repurbishEndDate}
                   />}

                    </>
                )
            }
        }

    ];

    return (
        <>
            <StyledTable
                dataSource={props.catalogueByTechnician}
                pagination={false}
                columns={column}
            />
<TagInDrawer
RowData={RowData}
clickTagInDrawr={props.clickTagInDrawr}
handleInTagDrawer={props.handleInTagDrawer}
/>
        </>
    )
}

const mapStateToProps = ({ refurbish, auth }) => ({
    catalogueByTechnician: refurbish.catalogueByTechnician,
    userId: auth.userDetails.userId,
    clickTagInDrawr:refurbish.clickTagInDrawr,
    startDate:refurbish.startDate,
    endDate:refurbish.endDate,
});
const mapDispatchToProps = dispatch =>
    bindActionCreators({
        getCatalogueByTechnician,
        updateFarGlassInProduction,
        handleInTagDrawer
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProductionTable);

