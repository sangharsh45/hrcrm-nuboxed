import React, { Suspense, lazy } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import InventoryHeader from "./InventoryHeader";
import { BundleLoader } from "../../../Components/Placeholder";
import { setInventoryViewType } from "./InventoryAction";
import InventoryTable from "./InventoryTable";

const InventoryCard =lazy(()=>import("./InventoryCard"));

function Inventory(props) {
  return (
    <div>
      <InventoryHeader
        setInventoryViewType={props.setInventoryViewType}
        viewType={props.viewType}
      />
      <Suspense fallback={<BundleLoader />}>
        {props.viewType === "table" ? <InventoryCard /> : null}
      </Suspense>
      {/* <Suspense fallback={<BundleLoader />}>
        {props.viewType === "table1" ? <InventoryTable /> : null}
      </Suspense>
      <Suspense fallback={<BundleLoader />}>
        {props.viewType === "table2" ? <InventoryTable /> : null}
      </Suspense> */}
    </div>
  );
}

const mapStateToProps = ({ inventory }) => ({
  viewType: inventory.viewType,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setInventoryViewType,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
