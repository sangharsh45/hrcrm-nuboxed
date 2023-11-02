import React, { useEffect,useState } from "react";
import { FormattedMessage } from "react-intl";
import GridViewIcon from '@mui/icons-material/GridView';
import TocIcon from '@mui/icons-material/Toc';
import LanguageIcon from "@mui/icons-material/Language";
import { StyledSelect } from "../../../Components/UI/Antd";
import { Button, Tooltip, Badge } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { AudioOutlined } from "@ant-design/icons";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
// import {
//   inputCustomerDataSearch,
//   getRecords,
//   getCategoryRecords,
// } from "../CustomerAction";
import {getInvestor,searchInvestorName} from "../InvestorAction";
import { Input } from "antd";

const Option = StyledSelect.Option;
const { Search } = Input;

const InvestorActionLeft = (props) => {
  const[filter,setFilter]=useState("creationdate")
  const [page, setPage] = useState(0);
  const dummy = ["cloud", "azure", "fgfdg"];
  function handleChange(data) {}
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
  function  handleFilterChange(data){
    setFilter(data)
    props.getInvestorsbyId(props.userId, page,data);
    setPage(page + 1);
  }
//   useEffect(() => {
//     if (props.viewType === "card") {
//       props.getRecords(props.userId);
//     } else if (props.viewType === "list") {
//       props.getCategoryRecords("White");
//     } else if (props.viewType === "dashboard") {
//       props.getCategoryRecords("blue");
//     }

//     if (transcript) {
//       console.log(">>>>>>>", transcript);
//       props.setCurrentData(transcript);
//     }
//   }, [props.viewType, props.userId, transcript]);
useEffect(() => {
  props.getInvestor(props.userId)
  }, [props.userId]);

  return (
    <div class=" flex items-center"
    >
      <Tooltip title={<FormattedMessage id="app.all" defaultMessage="All" />}>
        <Badge
          size="small"
        count={(props.viewType === "list" && props.investorRecord.investor) || 0}
          overflowCount={999}
        >
          <span
            class=" mr-2 text-sm cursor-pointer"
            onClick={() => props.setInvestorViewType("list")}
            style={{
              color: props.viewType === "list" && "#1890ff",
            }}
          >
            <TocIcon />
          </span>
        </Badge>
      </Tooltip>
      {/* <Tooltip>
        <Badge
          size="small"
          count={(props.viewType === "card" && props.recordData.customer) || 0}
          overflowCount={999}
        >
          <span
            class=" mr-2 text-sm cursor-pointer"
            onClick={() => props.setInvestorViewType("card")}
            style={{
              color: props.viewType === "card" && "#1890ff",
            }}
          >
            <GridViewIcon />
          </span>
        </Badge>
      </Tooltip> */}

      
      {/* <Tooltip
        title={<FormattedMessage id="app.mapview" defaultMessage="Map View" />}
      >
        <Badge
          size="small"
          count={(props.viewType === "map" && props.recordData.customer) || 0}
        >
          <span
            class=" mr-2 text-sm cursor-pointer"
            style={{
              color: props.viewType === "map" && "#1890ff",
            }}
            onClick={() => props.setInvestorViewType("map")}
          >
            <LanguageIcon />
          </span>
        </Badge>
      </Tooltip> */}
      <div class=" flex items-center justify-between"
      >
       <div class=" w-72 md:ml-4 max-sm:w-16 ml-0">
       <Input
          placeholder="Search by Name, Company"
          class="w-96"
          suffix={suffix}
          // allowClear
          // enterButton
          onChange={(e) => props.handleChange(e)}
          value={props.currentData}
        />
        </div>
        <Button
          type={props.currentData ? "primary" : "danger"}
          onClick={() => {
             props.searchInvestorName(props.currentData);
          }}
        >
          Submit
        </Button>
        <Button
          type={props.currentData ? "primary" : "danger"}
          onClick={() => {
            props.handleClear();
          }}
        >
          <FormattedMessage id="app.clear" defaultMessage="Clear" />
        </Button>
        <div style={{ width: "30%",marginTop:"0.5rem" }}>
          <StyledSelect placeholder="Sort"  onChange={(e)  => props.handleFilterChange(e)}>
          <Option value="CreationDate">Creation Date</Option>
            <Option value="ascending">A To Z</Option>
            <Option value="descending">Z To A</Option>
          </StyledSelect>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = ({ investor, auth, candidate }) => ({
  user: auth.userDetails,
  investorRecord:investor.investorRecord,
//   recordData: customer.recordData,
//   recordCategoryData: customer.recordCategoryData,
//   recordCategoryDataBlue: customer.recordCategoryDataBlue,
  Candidatesort: candidate.Candidatesort,
  userId: auth.userDetails.userId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getInvestor,
      searchInvestorName
    },
    dispatch
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InvestorActionLeft));
