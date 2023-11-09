import React, { Component, lazy, Suspense, useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getInventoryById } from "../../InventoryAction";
import { FlexContainer, MainWrapper } from "../../../../../Components/UI/Layout";
import { withRouter } from "react-router";
import { BundleLoader } from "../../../../../Components/Placeholder";
import InventoryDetailHeader from "./InventoryDetailHeader";
import InventoryDetailLeft from "./InventoryDetailLeft";
import InventoryDetailRight from "./InventoryDetailRight";

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

  const { inventory = { inventory }, fetchingInventoryById } = props;
  return (
    <>
      <InventoryDetailHeader inventory={inventory} handleResetTab={handleResetTab} />
      {fetchingInventoryById ? (
        <MainWrapper>
          <BundleLoader />
        </MainWrapper>
      ) : (
        <FlexContainer>
          <Suspense fallback={"Loading..."}>
            <FlexContainer flexWrap="no-wrap" style={{ width: "100%" }}>
              {/* <div style={{ width: "22%" }}>
                <InventoryDetailLeft inventory={inventory} />
              </div> */}
              <div style={{ width: "100%" }}>
                <InventoryDetailRight inventory={inventory} 
                tabData={tabData}
                 />
              </div>
            </FlexContainer>
          </Suspense>
        </FlexContainer>
      )}
    </>
  );
}
const mapStateToProps = ({ inventory }) => ({
  fetchingInventoryById: inventory.fetchingInventoryById,
  inventory: inventory.inventoryDetailById,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getInventoryById,
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(InventoryDetail)
);
