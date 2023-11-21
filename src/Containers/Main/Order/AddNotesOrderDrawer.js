import React, { lazy, Suspense, useEffect } from "react";
import { StyledDrawer } from "../../../Components/UI/Antd";
import { BundleLoader } from "../../../Components/Placeholder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import OrderNotesForm from "../Account/AccountDetailsTab/AccountOrderTab/OrderNotesForm";


const AddNotesOrderDrawer = (props) => {
  const { particularRowData, ...formProps } = props;
  return (
    <>
      <StyledDrawer
        title={`Notes`}
        width="64%"
        visible={props.addNotesInOrder}
        // maskClosable={false}
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(1, 30, 71,0.7)" }}
        style={{marginTop:"5rem"}}
        onClose={() => props.handleNotesModalInOrder(false)}
        footer={null}
      >
        <Suspense fallback={<BundleLoader />}>
          <OrderNotesForm particularRowData={particularRowData} />
        </Suspense>
      </StyledDrawer>
    </>
  );


}

export default AddNotesOrderDrawer;

