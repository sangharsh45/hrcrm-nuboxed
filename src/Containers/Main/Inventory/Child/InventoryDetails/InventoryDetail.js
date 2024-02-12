import React, { lazy, Suspense, useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getInventoryById, setInventoryDetailViewType } from "../../InventoryAction";
import { MainWrapper } from "../../../../../Components/UI/Layout";
import { withRouter } from "react-router";
import { BundleLoader } from "../../../../../Components/Placeholder";
const InventoryDetailHeader = lazy(() => import("./InventoryDetailHeader"));
const InventoryDetailRight = lazy(() => import("./InventoryDetailRight"));


function InventoryDetail(props) {
  const [tabData, setTabData] = useState("1");
  // state = { tabData: "1", currentId: this.props.match.params.locationDetailsId };
  useEffect(() => {
    props.getInventoryById(props.match.params.locationDetailsId);

    if (props.match.params.data === "Receive") {
      // alert("f");
      setTabData("4");
    } else if (props.match.params.data === "Dispatch") {
      setTabData("3");
    }
  }, [props.match.params.locationDetailsId]);
  function handleResetTab() {
    setTabData("1");
  }

  const {
    inventory = { inventory },
    fetchingInventoryById,
    inventoryViewType,
    setInventoryDetailViewType } = props;
  return (
    <>
      <InventoryDetailHeader
        setInventoryDetailViewType={setInventoryDetailViewType}
        inventoryViewType={inventoryViewType}
        inventory={inventory}
        handleResetTab={handleResetTab} />
      {fetchingInventoryById ? (
        <MainWrapper>
          <BundleLoader />
        </MainWrapper>
      ) : (
        <div class=" flex ">
          <Suspense fallback={"Loading..."}>
            <div class=" flex flex-no-wrap w-full" >
              {/* <div style={{ width: "22%" }}>
                <InventoryDetailLeft inventory={inventory} />
              </div> */}
              <div class=" w-full" >
                <InventoryDetailRight
                  inventoryViewType={inventoryViewType}
                  inventory={inventory}
                  tabData={tabData}
                />
              </div>
            </div>
          </Suspense>
        </div>
      )}
    </>
  );
}
const mapStateToProps = ({ inventory }) => ({
  fetchingInventoryById: inventory.fetchingInventoryById,
  inventory: inventory.inventoryDetailById,
  inventoryViewType: inventory.inventoryViewType
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getInventoryById,
      setInventoryDetailViewType
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(InventoryDetail)
);
