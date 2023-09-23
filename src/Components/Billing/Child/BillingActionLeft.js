import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { ActionIcon } from "../../../Components/Utils";
import { FlexContainer } from "../../../Components/UI/Layout";
import { StyledSelect, StyledRangePicker } from "../../../Components/UI/Antd";
import { TimeInterval } from "../../../Utils";
import ExploreIcon from '@mui/icons-material/Explore';
import PersonIcon from '@mui/icons-material/Person';
import moment from "moment";
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import { Button, Tooltip, Badge, Tag } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
// import { inputCustomerDataSearch,getRecords,getCategoryRecords } from "../PublishAction";
// import { getAccountTopicList } from "../AccountAction";
import { Input } from "antd";

const Option = StyledSelect.Option;
const { Search } = Input;

const BillingActionLeft = (props) => {
  const dummy = ["cloud", "azure", "fgfdg"];


const billableCurr = props.billingByDesignation.length && props.billingByDesignation[0].billableCurency

  return (
    <FlexContainer alignItems="center">
      {/* <Tooltip
        title={<FormattedMessage id="app.website" defaultMessage="Website" />}
      >
        <span
          onClick={() => props.setBillingViewType("table")}
          style={{
            marginRight: "0.5rem",
            color: props.viewType === "table" && "#1890ff",
            fontSize: "1.0625em",
            cursor: "pointer",
          }}
        >
          <ExploreIcon />
        </span>
      </Tooltip> */}
      <Tooltip
        title={<FormattedMessage id="app.billing" defaultMessage="Billing" />}
      // title={<FormattedMessage id="app.dollar" defaultMessage="Dollar" />}
      >
        {/* <Badge size="small" count={ props.viewType === "table" &&props.recordData.candidateDetails || 0} overflowCount={5000}> */}
        <span
          onClick={() => props.setBillingViewType("list")}
          style={{
            marginRight: "0.5rem",
            color: props.viewType === "list" && "#1890ff",
            fontSize: "1.0625em",
            cursor: "pointer",
          }}
        >
          <LocalAtmIcon />
        </span>
        {/* </Badge> */}
      </Tooltip>

      <div style={{ width: "12rem" }}>
        <Input
          placeholder="Search by Name"
          // enterButton="Search"
          width={"100%"}
          // suffix={suffix}
          // onSearch={(value) => {
          //   props.inputCandidateDataSearch(value);
          //   props.setCurrentData(value);

          // }}
          onChange={(e) => props.handleChange(e)}
          value={props.currentData}
        />
      </div>

      <Button
        type={props.currentData ? "primary" : "danger"}
        onClick={() => {
          props.inputCandidateDataSearch(props.currentData);
          props.getCandidateCountSearch(props.currentData)
        }}
      >
        Submit
      </Button>

      {/* &nbsp; */}

      <Button
        type={props.currentData ? "primary" : "danger"}
        // onClick={props.handleClear}
        onClick={() => {
          props.handleClear();
          props.getCandidateCountSearch()
        }}
      >
        <FormattedMessage id="app.clear" defaultMessage="Clear" />
        {/* Clear */}
      </Button>



    </FlexContainer>
  );
};
const mapStateToProps = ({ billings, auth }) => ({
  billingByDesignation: billings.billingByDesignation,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {

    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BillingActionLeft)
);