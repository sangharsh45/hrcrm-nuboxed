import React, { Component } from "react";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import { SubTitle } from "../../../../../Components/UI/Elements";
import { Tooltip} from "antd";
import { ActionIcon } from "../../../../../Components/Utils";

class DealRecruiterDetails extends Component {
  render() {
    console.log(this.props.dealDetailsbyID);
    const {
      dealDetailsbyID: { recruiterDetails,assignedTo },
} = this.props;
  
   
    return (
      <>
        <DealItemRow label="Assigned To"
        value={assignedTo} 
        />
         
      </>
    );
  }
}
export default DealRecruiterDetails;

const DealItemRow = ({ label, value }) => {
  return (
    <FlexContainer
      alignItems="center"
      flexWrap="nowrap"
      // style={{ margin: "5px" }}
    >
      <SubTitle style={{ color: "#444", fontWeight: 600 }}>{label}</SubTitle>
      <SubTitle style={{ textAlign: "end" }}>{value}</SubTitle>
    </FlexContainer>
  );
};
