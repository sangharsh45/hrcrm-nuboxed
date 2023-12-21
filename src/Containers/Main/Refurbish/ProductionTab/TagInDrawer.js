import React, { Suspense, lazy } from "react";
import { StyledDrawer } from "../../../../Components/UI/Antd";
import { BundleLoader } from "../../../../Components/Placeholder";
import TagInList from "./TagInList";

const TagInDrawer = (props) => {
    const { clickTagInDrawr, handleInTagDrawer,RowData, ...formProps } = props;
    return (
        <>
            <StyledDrawer
                title="TagIn"
                width="60%"
                visible={clickTagInDrawr}
                closable
                destroyOnClose
                maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
                style={{ marginTop: "3rem" }}
                onClose={() => handleInTagDrawer(false)}
                footer={null}
            >
                <Suspense fallback={<BundleLoader />}>
                        <TagInList RowData={RowData} /> 
                </Suspense>
            </StyledDrawer>
        </>
    );
};

export default TagInDrawer;
