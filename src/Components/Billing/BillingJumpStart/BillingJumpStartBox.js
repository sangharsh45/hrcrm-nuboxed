import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { JumpStartBox, Spacer } from "../../../Components/UI/Elements";
import { FlexContainer } from "../../../Components/UI/Layout";

function BillingJumpStartBox(props) {

  const Actual = props.billingByDesignation.reduce((acc, item) => {
    acc = acc + item.finalBillableAmount;
    return acc;
  }, 0);
  var actualAmount = `${Number(Actual).toFixed(2)}`;
 console.log("test",actualAmount)

  const Projected = props.billingByDesignation.reduce((acc, item) => {
    acc = acc + item.actualBillableAmount;
    return acc;
  }, 0);

  var projectedAmount = `${Number(Projected).toFixed(2)}`;

  // const result = props.billingByDesignation.map((item) => {
  //   return item.actualBillableAmount - item.finalBillableAmount;
  // });
  // console.log("new", result);

  const Deviation = props.billingByDesignation.reduce((acc, item) => {
    acc = acc + item.deviationBillableAmount;
    return acc;
  }, 0);
  console.log("deviations",Deviation)
  var deviationAmount = `${Number(Deviation).toFixed(2)}`;

  const billableCurr =
    props.billingByDesignation.length &&
    props.billingByDesignation[0].billableCurency;
  return (
    <FlexContainer flexDirection="row" style={{ width: "100%" }}>
      <FlexContainer style={{ width: "100%" }}>
        <JumpStartBox
          noProgress
          title="Actual Amount"
           bgColor="linear-gradient(270deg, #3066BE 0%, #005075 100%);"
          currencyType={billableCurr}
          value={Actual.toFixed(2) }
        />

        <JumpStartBox
          noProgress
          title=" Projected Amount"
          bgColor="linear-gradient(270deg, #3066BE 0%, #005075 100%);"
          currencyType={billableCurr}
          value={` ${projectedAmount || ""}`}
        />

        <JumpStartBox
          noProgress
          title=" Deviation Amount"
          bgColor="linear-gradient(270deg, #3066BE 0%, #005075 100%);"
          currencyType={billableCurr}
          value={` ${deviationAmount || ""}`}
        />
        <JumpStartBox
          noProgress
          title="Amount"
          bgColor="linear-gradient(270deg, #3066BE 0%, #005075 100%);"
          currencyType={billableCurr}
        />
      </FlexContainer>
      <Spacer />
    </FlexContainer>
  );
}
const mapStateToProps = ({ billings, auth }) => ({
  billingByDesignation: billings.billingByDesignation,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BillingJumpStartBox)
);
