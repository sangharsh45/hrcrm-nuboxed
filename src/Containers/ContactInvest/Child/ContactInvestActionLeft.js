import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { AudioOutlined } from "@ant-design/icons";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import HandshakeIcon from "@mui/icons-material/Handshake";
import { Input, Menu, Tooltip, Radio } from "antd";
import { StyledSelect } from "../../../Components/UI/Antd";
import { Button, Badge } from "antd";
// import {
//   inputContactDataSearch,
//   getRecords,
//   getCustomerRecords,
// } from "../ContactAction";

const Option = StyledSelect.Option;
const item = [{ type: "Hot" }, { type: "Warm" }, { type: "Cold" }];
const { Search } = Input;
const ContactInvestActionLeft = (props) => {
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

//   useEffect(() => {
//     if (props.viewType === "dashboard") {
//       props.getCustomerRecords(props.userId);
//     } else if (props.viewType === "table") {
//       props.getRecords(props.userId, "partner");
//     }
//     if (transcript) {
//       console.log(">>>>>>>", transcript);
//       props.setCurrentData(transcript);
//     }
//   }, [props.userId, props.viewType, props.name, transcript]);
 
  const { user } = props;
  
  return (
    <div class=" flex  items-center">
      <Tooltip
        title={<FormattedMessage id="app.customer" defaultMessage="Customer" />}
      >
        <Badge
          size="small"
        //   count={
        //     (props.viewType === "table" &&
        //       props.customerRecordData.customerDetails) ||
        //     0
        //   }
          overflowCount={5000}
        >
          <span
            class=" mr-2 text-sm cursor-pointer"
            // onClick={() => props.setContactsViewType("table")}
            style={{
              color: props.viewType === "table" && "#1890ff",
            }}
          >
            <AccountBalanceIcon />
          </span>
        </Badge>
      </Tooltip>
   
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

    </div>
  );
};

const mapStateToProps = ({ auth, contact }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  recordData: contact.recordData,
  customerRecordData: contact.customerRecordData,
  contactByUserId: contact.contactByUserId,
  fetchingContactInputSearchData: contact.fetchingContactInputSearchData,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    //   inputContactDataSearch,
    //   getRecords,
    //   getCustomerRecords,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ContactInvestActionLeft);
