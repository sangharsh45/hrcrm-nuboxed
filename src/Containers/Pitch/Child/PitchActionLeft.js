
import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import { StyledSelect } from "../../../Components/UI/Antd";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import PeopleIcon from '@mui/icons-material/People';
import { AudioOutlined } from '@ant-design/icons';
import SpeechRecognition, { } from 'react-speech-recognition';
import { Input, Tooltip,Badge } from "antd";
import TocIcon from '@mui/icons-material/Toc';
import {getPitchRecords,getPitch,ClearReducerDataOfPitch,getPitchCount,searchPitchName} from "../PitchAction";
import { FormattedMessage } from "react-intl";
const { Search } = Input;
const Option = StyledSelect.Option;

const PitchActionLeft = (props) => {
  const [currentData, setCurrentData] = useState("");
  const [pageNo, setPage] = useState(0);
  const handleChange = (e) => {
    setCurrentData(e.target.value);

    if (e.target.value.trim() === "") {
      setPage(pageNo + 1);
      props.getPitch(props.userId,pageNo,"creationdate");
      props.ClearReducerDataOfPitch()
    }
  };
  const handleSearch = () => {
    if (currentData.trim() !== "") {
      // Perform the search
      props.searchPitchName(currentData);
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };
  const dummy = ["cloud", "azure", "fgfdg"];
  // useEffect(() => {
  //   if (props.viewType === "card") {
  //     props.getPitchRecords(props.userId);
  //   } else if (props.viewType === "all") {
  //     props.getPitchRecords(props.userId);
  //   }
  // }, [props.viewType, props.userId]);
  useEffect(() => {
    props.getPitchCount(props.userId)
    }, [props.userId]);
 
 
  const suffix = (
    <AudioOutlined
      onClick={SpeechRecognition.startListening}
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}

    />
  );
  console.log( props.pitchCount.InvestorLeadsDetails)
  return (
    <div class=" flex  items-center">


    <Tooltip
        title= "Card View"
      >
  <Badge
        size="small"
        count={(props.viewType === "card" && props.pitchCount.InvestorLeadsDetails) || 0}
        
        overflowCount={999}
      >
        <span   class=" mr-2 text-sm cursor-pointer"
        onClick={() => props.setPitchViewType("card")}
          style={{
           color: props.viewType === "card" && "#1890ff",
          }}
        >
        <TocIcon />
        </span>
        </Badge>
      </Tooltip>
    
     

   
      <Tooltip
        title= "Teams"
      >
          <Badge
        size="small"
        // count={(props.viewType === "card" && props.pitchCount.InvestorLeadsDetails) || 0}
        
        overflowCount={999}
      >
        <span   class=" mr-2 text-sm cursor-pointer"
        onClick={() => props.setPitchViewType("teams")}
          style={{
           color: props.viewType === "teams" && "#1890ff",
          }}
        >
         <PeopleIcon/>
        </span>
        </Badge>
      </Tooltip>
      <Tooltip
        title= "All"
      >
             <Badge
        size="small"
        count={(props.viewType === "all" && props.pitchCount.InvestorLeadsDetails) || 0}
        overflowCount={999}
      >
        <span   class=" mr-2 text-sm cursor-pointer"
        onClick={() => props.setPitchViewType("all")}
          style={{
           color: props.viewType === "all" && "#1890ff",
          }}
        >
            <FormattedMessage
                        id="app.all"
                        defaultMessage="ALL"
                      />
        
        </span>
        </Badge>
      </Tooltip>
      {/* <Badge
        size="small"
        count={(props.viewType === "list" && props.leadsCountJunked.junkedList) || 0}
        overflowCount={999}
      >
      <Tag
                color={props.viewType === "list" ? "#FFA500" : "orange"}
                style={{
                  cursor: "pointer",                  
                  fontWeight: props.viewType === "list" ? "bold" : null,
                  textAlign: "center",
                  fontFamily:"poppins",
                  borderColor: "orange",
                }}
                onClick={() => props.setPitchViewType("list")}
              >
                Junked
              </Tag>
              </Badge> */}

      <div class=" w-72 ml-4 max-sm:w-28">
          <Input
            placeholder="Search by Name or Company"
            width={"100%"}
            suffix={suffix}
            onPressEnter={handleSearch}  
            onChange={handleChange}
            // value={currentData}
        
          />
        </div>
      {/* <Button
          type={props.currentData ? "primary" : "danger"}
          onClick={() => {
            props.searchPitchName(props.currentData);

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
      
        </Button> */}
        <div class="w-[22%] mt-1">
          <StyledSelect placeholder="Sort"  onChange={(e)  => props.handleFilterChange(e)}>
           <Option value="CreationDate">Creation Date</Option> 
            <Option value="ascending">A To Z</Option>
            <Option value="descending">Z To A</Option>
          </StyledSelect>
        </div>
    </div>
  );
};

const mapStateToProps = ({pitch,auth}) => ({
  pitchRecord:pitch.pitchRecord,
  pitchCount:pitch.pitchCount,
  userId: auth.userDetails.userId,

});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  getPitchRecords,
  ClearReducerDataOfPitch,
  getPitch,
  getPitchCount,
  searchPitchName
}, dispatch);
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PitchActionLeft));
