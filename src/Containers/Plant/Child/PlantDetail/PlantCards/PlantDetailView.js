import React, { Component } from "react";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import { SubTitle } from "../../../../../Components/UI/Elements";

class PlantDetailView extends Component {
  render() {
    const {
      plant: { management, productionManager },
    } = this.props;
    return (
      <>
        <PlantItemRow label="Management" value={management} />
        <PlantItemRow label="Production Manager" value={productionManager} />
      </>
    );
  }
}
export default PlantDetailView;

const PlantItemRow = ({ label, value }) => {
  return (
    <FlexContainer
      alignItems="center"
      flexWrap="nowrap"
      style={{ margin: "0.4rem" }}
    >
      <SubTitle style={{ color: "#444", fontWeight: 600 }}>{label}</SubTitle>
      <SubTitle style={{ marginLeft: "-30px", textOverflow: "ellipsis" }}>
        {value}
      </SubTitle>
    </FlexContainer>
  );
};
