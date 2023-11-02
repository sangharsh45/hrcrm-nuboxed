import React, { Component } from "react";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import { SubTitle } from "../../../../../Components/UI/Elements";
import { Tooltip} from "antd";
import { ActionIcon } from "../../../../../Components/Utils";
class DealReportDetails extends Component {
  render() {
    const {
        dealDetailsbyID: { customer }
    } = this.props;

    return (
      <>
        <DealItemRow label="Customer"
         value={customer} 
        />
      </>
    );
  }
}
export default DealReportDetails;

const DealItemRow = ({ label, value }) => {
  return (
    <FlexContainer
      alignItems="center"
      flexWrap="nowrap"
      // style={{ margin: "5px" }}
    >
      <SubTitle style={{ color: "#444", fontWeight: 600 }}>{label}</SubTitle>
      <SubTitle style={{ marginLeft: "-30px" ,overflow:"hidden",textOverflow:"ellipsis"}}>{value}</SubTitle>
    </FlexContainer>
  );
};
