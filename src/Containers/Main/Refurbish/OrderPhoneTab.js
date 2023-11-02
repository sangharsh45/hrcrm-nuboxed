import React, { useState } from 'react'
import { StyledTabs } from '../../../Components/UI/Antd'
import TabPane from 'antd/lib/tabs/TabPane'
import ProductionOrderListById from './ProductionOrderListById'
import ProductionRepairOrder from './ProductionRepairOrder'
import OpenQcTable from './OpenQcTable'
import { FolderOpenFilled, FolderOpenTwoTone } from '@ant-design/icons'
import OpenRepairTable from './OpenRepairTable'
import BorderColorIcon from '@mui/icons-material/BorderColor';

const OrderPhoneTab = (props) => {

    const [qcMain, setQcMain] = useState(true);
    const [openQc, setOpenQc] = useState(false);

    const handleMainQc = () => {
        setQcMain(true)
        setOpenQc(false)
    }
    const handleOpenQc = () => {
        setQcMain(false)
        setOpenQc(true)
    }

    const [repairMain, setRepairMain] = useState(true);
    const [openRepair, setOpenRepair] = useState(false);

    const handleMainRepair = () => {
        setRepairMain(true)
        setOpenRepair(false)
    }
    const handleOpenRepair = () => {
        setRepairMain(false)
        setOpenRepair(true)
    }
    return (
        <div>
            <StyledTabs>
                <TabPane
                    tab={
                        <>
                            <span onClick={handleMainQc}>
                                <BorderColorIcon />&nbsp; QC
                            </span>
                            &nbsp;&nbsp;
                            <span onClick={handleOpenQc}>
                                <FolderOpenTwoTone />
                            </span>

                        </>
                    }
                    key="1">
                    {openQc ? <OpenQcTable /> : qcMain ? <ProductionOrderListById /> : null}
                </TabPane>
                <TabPane
                    tab={
                        <>
                            <span onClick={handleMainRepair}>
                                <BorderColorIcon/>&nbsp; Repair
                            </span>
                            &nbsp;&nbsp;
                            <span onClick={handleOpenRepair}> <FolderOpenTwoTone /></span>

                        </>
                    }
                    key="2">
                    {repairMain ? <ProductionRepairOrder /> :
                        openRepair ? <OpenRepairTable /> : null}

                </TabPane>
            </StyledTabs>
        </div>
    )
}

export default OrderPhoneTab

