import React, { Component, Suspense, lazy } from "react";
import { Tabs, Icon, Button } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SuppliesForm from "./SuppliesForm";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { StyledTabs } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
const TaggedBrandTable = lazy(() => import("./TaggedBrandTable"))
const BrandModelTable = lazy(() => import("./BrandModelTable"))

const TabPane = StyledTabs.TabPane;
function TagBrandModel(props) {
    const { addBrandModel, handleBrandModel } = props;
    return (
        <div>
            <StyledDrawer
                title="Tag Brand"
                width="55vw"
                visible={addBrandModel}
                destroyOnClose
                maskClosable={false}
                // maskStyle={{transition: '0.5s filter linear', filter: 'blur(20px)', width: '100%', height: '100%', padding: '50px', backgroundColor: 'rgba(49, 56, 66,0.7)'}}
                maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                style={{marginTop:"5rem" }}
                onClose={() => handleBrandModel(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                    {props.particularDiscountData.mainInd ?
                        <TaggedBrandTable particularDiscountData={props.particularDiscountData} />
                        : <BrandModelTable particularDiscountData={props.particularDiscountData} />}
                </Suspense>

            </StyledDrawer>
        </div>
    );
}

const mapStateToProps = ({ auth }) => ({});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(TagBrandModel);
