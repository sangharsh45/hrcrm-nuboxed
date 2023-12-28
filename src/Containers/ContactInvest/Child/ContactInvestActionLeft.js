import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { AudioOutlined } from "@ant-design/icons";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import PeopleIcon from '@mui/icons-material/People';
import { Input,Tooltip, } from "antd";
import { StyledSelect } from "../../../Components/UI/Antd";
import { Badge } from "antd";
import {
  getContactInvest,
  getTeamContactInvest,
  searchInvestorContactName,
  getContactInvestByUserId,
  ClearReducerDataOfContactInvest
} from "../ContactInvestAction";

const Option = StyledSelect.Option;
const item = [{ type: "Hot" }, { type: "Warm" }, { type: "Cold" }];
const { Search } = Input;
const ContactInvestActionLeft = (props) => {
  const[filter,setFilter]=useState("creationdate")
  const [page, setPage] = useState(0);
  const [currentData, setCurrentData] = useState("");
  const handleChange = (e) => {
    setCurrentData(e.target.value);

    if (e.target.value.trim() === "") {
      setPage(page + 1);
      props.getContactInvestByUserId(props.userId,page,"creationdate");
      props.ClearReducerDataOfContactInvest()
    }
  };
  const handleSearch = () => {
    if (currentData.trim() !== "") {
      // Perform the search
      props.searchInvestorContactName(currentData);
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };

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
    props.getContactInvestByUserId(props.userId, page,data);
    setPage(page + 1);
  }
  // useEffect(() => {
  // props.getContactInvest(props.userId)
  // }, [props.userId]);

  useEffect(() => {
    if (props.viewType === "card") {
      props.getContactInvest(props.userId);
    } else if (props.viewType === "teams") {
      props.getTeamContactInvest(props.userId);
    } 
   
    if (transcript) {
      console.log(">>>>>>>", transcript);
      props.setCurrentData(transcript);
    }
  }, [props.viewType, props.userId, transcript]);
   
 
  const { user } = props;
  
  return (
    <div class=" flex  items-center">
      <Tooltip
        title={<FormattedMessage id="app.customer" defaultMessage="Customer" />}
      >
        <Badge
          size="small"
          count={
            (props.viewType === "card" &&
              props.contactInvest.contactDetails) ||
            0
          }
          overflowCount={5000}
        >
          <span
            class=" mr-2 text-sm cursor-pointer"
            onClick={() => props.setContactInvetViewType("card")}
            style={{
              color: props.viewType === "card" && "#1890ff",
            }}
          >
            <AccountBalanceIcon />
          </span>
        </Badge>
      </Tooltip>
      <Tooltip
       title={<FormattedMessage id="app.all" defaultMessage="All" />}
      >
        <Badge
          size="small"
          count={
            (props.viewType === "all" &&
              props.contactInvest.contactDetails) ||
            0
          }
          overflowCount={5000}
        >
          <span
            class=" mr-2 text-sm cursor-pointer"
            onClick={() => props.setContactInvetViewType("all")}
            style={{
              color: props.viewType === "all" && "#1890ff",
            }}
          >
   <FormattedMessage id="app.all" defaultMessage="All" />
          </span>
        </Badge>
      </Tooltip>
      <Tooltip
       title={<FormattedMessage id="app.teams" defaultMessage="Teams" />}
      >
      <Badge
          size="small"
          count={
            (props.viewType === "teams" &&
              props.teamContactInvest.InvestorContactTeam
              ) ||
            0
          }
          overflowCount={5000}
        >
          <span
            class=" mr-2 text-sm cursor-pointer"
            onClick={() => props.setContactInvetViewType("teams")}
            style={{
              color: props.viewType === "teams" && "#1890ff",
            }}
          >
           <PeopleIcon/>
          </span>
        </Badge>
      </Tooltip>
   
      <div class=" w-72 md:ml-4 max-sm:w-16 ml-0">
   
          <Input
       placeholder="Search by Name or Company"
       class="w-96"
            suffix={suffix}
            onPressEnter={handleSearch}  
            onChange={handleChange}
            // value={currentData}
          />
      </div>
      {/* <Button
        type={props.currentData ? "primary" : "danger"}
        onClick={() => {
          props.searchInvestorContactName(props.currentData);
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
      </Button> */}
      <div style={{ width: "15%" }}>
          <StyledSelect placeholder="Sort"  onChange={(e)  => props.handleFilterChange(e)}>
          <Option value="CreationDate">CreationDate</Option>
            <Option value="ascending">A To Z</Option>
            <Option value="descending">Z To A</Option>
          </StyledSelect>
        </div>
    </div>
  );
};

const mapStateToProps = ({ auth, contactinvest }) => ({
  userId: auth.userDetails.userId,
  contactInvest:contactinvest.contactInvest,
  teamContactInvest:contactinvest.teamContactInvest,
  
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getContactInvest,
      getContactInvestByUserId,
      ClearReducerDataOfContactInvest,
      getTeamContactInvest,
      searchInvestorContactName
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ContactInvestActionLeft);
