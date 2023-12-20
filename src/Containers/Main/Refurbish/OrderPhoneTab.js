import React, { useState } from 'react'
import { StyledTabs } from '../../../Components/UI/Antd'
import TabPane from 'antd/lib/tabs/TabPane'
import ProductionOrderListById from './ProductionOrderListById'
import ProductionRepairOrder from './ProductionRepairOrder'
import OpenQcTable from './OpenQcTable'
import { FolderOpenFilled, FolderOpenTwoTone } from '@ant-design/icons'
import OpenRepairTable from './OpenRepairTable'
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AddCatalogueInProduction from './ProductionTab/AddCatalogueInProduction'

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
                {!props.inspectionRequiredInd &&
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
                    </TabPane>}
                <TabPane
                    tab={
                        <>
                            <span onClick={handleMainRepair}>
                                {/* <BorderColorIcon />&nbsp; */}
                                Process
                            </span>
                            &nbsp;&nbsp;
                            <span onClick={handleOpenRepair}>
                                {/* <FolderOpenTwoTone /> */}
                            </span>

                        </>
                    }
                    key="2">
                    {repairMain ? <ProductionRepairOrder inspectionRequiredInd={props.inspectionRequiredInd} /> :
                        openRepair ? <OpenRepairTable /> : null}

                </TabPane>
                <TabPane
                    tab={
                        <>
                            <span>
                                {/* <BorderColorIcon />&nbsp; */}
                                Production
                            </span>
                        </>
                    }
                    key="3">
                    <AddCatalogueInProduction />

                </TabPane>
            </StyledTabs>
        </div>
    )
}

const mapStateToProps = ({ auth }) => ({
    inspectionRequiredInd: auth.userDetails.inspectionRequiredInd,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {

        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(OrderPhoneTab);

