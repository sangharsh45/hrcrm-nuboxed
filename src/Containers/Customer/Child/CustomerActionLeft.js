import React, { useEffect,useState } from "react";
import { FormattedMessage } from "react-intl";
import GridViewIcon from '@mui/icons-material/GridView';
import TocIcon from '@mui/icons-material/Toc';
import PeopleIcon from '@mui/icons-material/People';
import LanguageIcon from "@mui/icons-material/Language";
import {getCustomerListByUserId} from "../CustomerAction"
import { StyledSelect } from "../../../Components/UI/Antd";
import { Button, Tooltip, Badge } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { AudioOutlined } from "@ant-design/icons";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import {
  inputCustomerDataSearch,
  getRecords,
  getCategoryRecords,
} from "../CustomerAction";
import { Input } from "antd";

const Option = StyledSelect.Option;
const { Search } = Input;

const CustomerActionLeft = (props) => {
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
    props.getCustomerListByUserId(props.userId, page,data);
    setPage(page + 1);
  }

  useEffect(() => {
    if (props.viewType === "card") {
      props.getRecords(props.userId);
    } else if (props.viewType === "table") {
      props.getRecords(props.userId);
    } else if (props.viewType === "dashboard") {
      props.getCategoryRecords("blue");
    }

    if (transcript) {
      console.log(">>>>>>>", transcript);
      props.setCurrentData(transcript);
    }
  }, [props.viewType, props.userId, transcript]);
  return (
    <div class=" flex items-center"
    >
         <Tooltip title={<FormattedMessage id="app.all" defaultMessage="All" />}>
        <Badge
          size="small"
          count={(props.viewType === "table" && props.recordData.customer) || 0}
          overflowCount={999}
        >
          <span
            class=" mr-2 text-sm cursor-pointer"
            onClick={() => props.setCustomerViewType("table")}
            style={{
              color: props.viewType === "table" && "#1890ff",
            }}
          >
            <TocIcon />
          </span>
        </Badge>
      </Tooltip>
      <Tooltip>
        <Badge
          size="small"
          count={(props.viewType === "card" && props.recordData.customer) || 0}
          overflowCount={999}
        >
          <span
            class=" mr-2 text-sm cursor-pointer"
            onClick={() => props.setCustomerViewType("card")}
            style={{
              color: props.viewType === "card" && "#1890ff",
            }}
          >
            <GridViewIcon />
          </span>
        </Badge>
      </Tooltip>
      <Tooltip>
        <Badge
          size="All"
          count={(props.viewType === "all" && props.recordData.customer) || 0}
          overflowCount={999}
        >
          <span
            class=" mr-2 text-sm cursor-pointer"
            onClick={() => props.setCustomerViewType("all")}
            style={{
              color: props.viewType === "all" && "#1890ff",
            }}
          >
           ALL
          </span>
        </Badge>
      </Tooltip>
      <Tooltip>
        <Badge
          size="Teams"
          count={(props.viewType === "teams" && props.recordData.customer) || 0}
          overflowCount={999}
        >
          <span
            class=" mr-2 text-sm cursor-pointer"
            onClick={() => props.setCustomerViewType("teams")}
            style={{
              color: props.viewType === "teams" && "#1890ff",
            }}
          >
           <PeopleIcon/>
          </span>
        </Badge>
      </Tooltip>
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
            onClick={() => props.setCustomerViewType("map")}
          >
            <LanguageIcon />
          </span>
        </Badge>
      </Tooltip> */}
      <div class=" flex items-center justify-between"
      >
        <div class=" w-72 max-sm:w-32">
          <Input
            placeholder="Search by Name or Sector"
            width={"100%"}
            suffix={suffix}
            onChange={(e) => props.handleChange(e)}
            value={props.currentData}
          />
        </div>
        <Button
          type={props.currentData ? "primary" : "danger"}
          onClick={() => {
            props.inputCustomerDataSearch(props.currentData);
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
          {/* Clear */}
        </Button>
        <div class="w-[22%] mt-1">
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
const mapStateToProps = ({ customer, auth, candidate }) => ({
  user: auth.userDetails,
  recordData: customer.recordData,
  recordCategoryData: customer.recordCategoryData,
  recordCategoryDataBlue: customer.recordCategoryDataBlue,
  Candidatesort: candidate.Candidatesort,
  userId: auth.userDetails.userId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      inputCustomerDataSearch,
      getRecords,
      getCategoryRecords,
      getCustomerListByUserId
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CustomerActionLeft)
);
