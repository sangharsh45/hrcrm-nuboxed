import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { AudioOutlined } from "@ant-design/icons";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import PeopleIcon from '@mui/icons-material/People';
import { Input, Tooltip, } from "antd";
import { StyledSelect } from "../../../Components/UI/Antd";
import { Button, Badge } from "antd";
import {
  inputContactDataSearch,
  getRecords,
  getCustomerRecords,
  getContactRecord,
} from "../ContactAction";
import {getDepartments} from "../../Settings/Department/DepartmentAction";

const Option = StyledSelect.Option;
const item = [{ type: "Hot" }, { type: "Warm" }, { type: "Cold" }];
const { Search } = Input;
const ContactActionLeft = (props) => {
  const suffix = (
    <AudioOutlined
      onClick={SpeechRecognition.startListening}
      style={{
        fontSize: 16,
        color: "#1890ff",
      }}
    />
  );
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  console.log(transcript);
  useEffect(() => {
    props.getContactRecord(props.userId);
    props.getDepartments();
    }, [props.userId]);
  // useEffect(() => {
  //   if (props.viewType === "table") {
  //     props.getContactRecord(props.userId);
  //   } else if (props.viewType === "dashboard") {
  //     props.getRecords(props.userId, "partner");
  //   }
  //   if (transcript) {
  //     console.log(">>>>>>>", transcript);
  //     props.setCurrentData(transcript);
  //   }
  // }, [props.userId, props.viewType, props.name, transcript]);
  console.log(props.customerRecordData);
  const { user } = props;
  const countryNameOption = props.departments.map((item)=>{
  return {
    label: `${item.departmentName || ""}`,
    value: item.departmentId,
  };});
  

  return (
    <div class=" flex  items-center">
      <Tooltip
        title={<FormattedMessage id="app.customer" defaultMessage="Customer" />}
      >
        <Badge
          size="small"
          count={
            (props.viewType === "table" &&
              props.contactRecord.customerContactCount) ||
            0
          }
          overflowCount={5000}
        >
          <span
            class=" mr-2 text-sm cursor-pointer"
            onClick={() => props.setContactsViewType("table")}
            style={{
              color: props.viewType === "table" && "#1890ff",
            }}
          >
            <AccountBalanceIcon />
          </span>
        </Badge>
      </Tooltip>
      {user.teamsAccessInd === true && (
      <Tooltip
        title="Teams"
      >
        <Badge
          size="small"
          count={
            (props.viewType === "teams" &&
              props.contactRecord.customerContactCount) ||
            0
          }
          overflowCount={5000}
        >
          <span
            class=" mr-2 text-sm cursor-pointer"
            onClick={() => props.setContactsViewType("teams")}
            style={{
              color: props.viewType === "teams" && "#1890ff",
            }}
          >
         <PeopleIcon/>
          </span>
        </Badge>
      </Tooltip>
      )}
      {user.crmInd=== true && user.contactFullListInd===true && ( 
      <Tooltip
        title="All"
      >
        <Badge
          size="small"
          // count={
          //   (props.viewType === "all" &&
          //     props.contactRecord.customerContactCount) ||
          //   0
          // }
          overflowCount={5000}
        >
          <span
            class=" mr-2 text-sm cursor-pointer"
            onClick={() => props.setContactsViewType("all")}
            style={{
              color: props.viewType === "all" && "#1890ff",
            }}
          >
           ALL
          </span>
        </Badge>
      </Tooltip>
      )}
      {/* <Tooltip
        title={<FormattedMessage id="app.vendor" defaultMessage="Vendor" />}
      >
        <Badge
          size="small"
          count={(props.viewType === "dashboard" && props.recordData.record) || 0}
          overflowCount={999}
        >
          <span
            class=" mr-2 text-sm cursor-pointer"
            onClick={() => props.setContactsViewType("dashboard")}
            style={{
              color: props.viewType === "dashboard" && "#1890ff",
            }}
          >
            <HandshakeIcon />
          </span>
        </Badge>
      </Tooltip> */}
      <div class=" w-72 md:ml-4 max-sm:w-16 ml-0">
        <Input
          placeholder="Search by Name, Company"
          class="w-96"
          suffix={suffix}
          allowClear
          enterButton
          onChange={(e) => props.handleChange(e)}
          value={props.currentData}
        />
      </div>
      <Button
        type={props.currentData ? "primary" : "danger"}
        onClick={() => {
          props.inputContactDataSearch(props.currentData);
        }}
      >
        Submit
      </Button>
      &nbsp;
      <Button
        type={props.currentData ? "primary" : "danger"}
        onClick={() => {
          props.handleClear();
        }}
      >
        <FormattedMessage id="app.clear" defaultMessage="Clear" />
      </Button>
<div class="w-32 max-sm:w-12">
      <select value={props.selectedCountry} onChange={props.handleCountryChange} >
        <option value="" disabled>Department</option>
        <option value="">All</option>
        {countryNameOption.map((countryOption, index) => (
          <option key={index} value={countryOption.value}>
            {countryOption.label}
          </option>
        ))}
      </select>
      </div>

      <div style={{ width: "22%" }}>
          <StyledSelect placeholder="Sort"  onChange={(e)  => props.handleFilterChange(e)}>
          <Option value="CreationDate">Creation Date</Option>
            <Option value="ascending">A To Z</Option>
            <Option value="descending">Z To A</Option>
          </StyledSelect>
        </div>
    </div>
  );
};

const mapStateToProps = ({ auth, contact,departments }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  recordData: contact.recordData,
  contactRecord:contact.contactRecord,
  customerRecordData: contact.customerRecordData,
  contactByUserId: contact.contactByUserId,
  fetchingContactInputSearchData: contact.fetchingContactInputSearchData,
  departments: departments.departments,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      inputContactDataSearch,
      getRecords,
      getCustomerRecords,
      getContactRecord,
      getDepartments
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ContactActionLeft);
