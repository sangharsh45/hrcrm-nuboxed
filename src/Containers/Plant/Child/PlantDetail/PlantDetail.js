import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getPlantById } from "../../PlantAction";
import { FlexContainer, MainWrapper } from "../../../../Components/UI/Layout";
import { withRouter } from "react-router";
import { BundleLoader } from "../../../../Components/Placeholder";
import PlantDetailHeader from "./PlantDetailHeader";
const PlantDetailRight = lazy(() => import("./PlantDetailRight"));
const PlantDetailLeft = lazy(() => import("./PlantDetailLeft"));

class PlantDetail extends Component {
  componentDidMount() {
    this.props.getPlantById(this.props.match.params.plantId);

  }
  render() {
    const { plant = { plant }, fetchingPlantById } = this.props;
    return (
      <>
        <>
          <PlantDetailHeader />
          {fetchingPlantById ? (
            <MainWrapper>
              <BundleLoader />
            </MainWrapper>
          ) : (
            <FlexContainer>
              <Suspense fallback={"Loading..."}>
                <FlexContainer flexWrap="no-wrap" style={{ width: "100%" }}>
                  <div style={{ width: "22%" }}>
                    <PlantDetailLeft plant={plant} /> 
                  </div>
                  <div style={{ width: "78%" }}>
                    <PlantDetailRight plant={plant} />
                  </div>
                </FlexContainer>
              </Suspense>
            </FlexContainer>
          )}
        </>
      </>
    );
  }
}
const mapStateToProps = ({ plant }) => ({
  fetchingPlantById: plant.fetchingPlantById,
  plant: plant.plantDetailById,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getPlantById,
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PlantDetail)
);
