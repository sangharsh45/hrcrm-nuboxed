// import React from 'react'

// function PitchActionLeft() {
//   return (
//     <div>PitchActionLeft</div>
//   )
// }

// export default PitchActionLeft


import React, { useEffect } from "react";
import { connect } from "react-redux";
import { StyledSelect } from "../../../Components/UI/Antd";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import PeopleIcon from '@mui/icons-material/People';
import TableViewIcon from '@mui/icons-material/TableView';
import { AudioOutlined } from '@ant-design/icons';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Button, Input, Tooltip,Tag,Badge } from "antd";
import { FormattedMessage } from "react-intl";
import TocIcon from '@mui/icons-material/Toc';
import {getPitchRecords,getPitchCount,searchPitchName} from "../PitchAction";
//import {inputLeadsDataSearch,getLeadsRecords,getJunkedLeadsRecords} from "../LeadsAction";
const { Search } = Input;
const Option = StyledSelect.Option;

const PitchActionLeft = (props) => {
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
 
  function handleChange(data) {
    
  }
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
        <span   class=" mr-2 text-sm cursor-pointer"
        onClick={() => props.setPitchViewType("teams")}
          style={{
           color: props.viewType === "teams" && "#1890ff",
          }}
        >
         <PeopleIcon/>
        </span>
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
        ALL
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

      <div class=" w-72 max-sm:w-28">
          <Input
            placeholder="Search by Name or Company"
            width={"100%"}
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
  );
};

const mapStateToProps = ({pitch,auth}) => ({
  pitchRecord:pitch.pitchRecord,
  pitchCount:pitch.pitchCount,
  userId: auth.userDetails.userId,

});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  getPitchRecords,
  getPitchCount,
  searchPitchName
}, dispatch);
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PitchActionLeft));
