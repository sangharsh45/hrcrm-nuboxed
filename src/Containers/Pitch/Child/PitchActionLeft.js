// import React from 'react'

// function PitchActionLeft() {
//   return (
//     <div>PitchActionLeft</div>
//   )
// }

// export default PitchActionLeft


import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import TableViewIcon from '@mui/icons-material/TableView';
import { AudioOutlined } from '@ant-design/icons';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Button, Input, Tooltip,Tag,Badge } from "antd";
import { FormattedMessage } from "react-intl";
import TocIcon from '@mui/icons-material/Toc';
import {getPitchRecords} from "../PitchAction";
//import {inputLeadsDataSearch,getLeadsRecords,getJunkedLeadsRecords} from "../LeadsAction";
const { Search } = Input;

const PitchActionLeft = (props) => {
  const dummy = ["cloud", "azure", "fgfdg"];
  

  useEffect(() => {
    props.getPitchRecords(props.userId)
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
  console.log(props.pitchRecord)
  return (
    <div class=" flex  items-center">
<Badge
        size="small"
        count={(props.viewType === "card" && props.pitchRecord.InvestorLeadsDetails) || 0}
        overflowCount={999}
      >

    <Tooltip
        title= "Card View"
      >
        <span   class=" mr-2 text-sm cursor-pointer"
        onClick={() => props.setLeadsViewType("card")}
          style={{
           color: props.viewType === "card" && "#1890ff",
          }}
        >
        <TocIcon />
        </span>
      </Tooltip>
      </Badge>
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
                onClick={() => props.setLeadsViewType("list")}
              >
                Junked
              </Tag>
              </Badge> */}

      <div class=" w-72 max-sm:w-28">
          <Input
            placeholder="Search by Name, Sector or Owner"
            width={"100%"}
             suffix={suffix}
            // onSearch={(value) => {
            //   props.inputLeadsDataSearch(value);
            //   props.setCurrentData(value);

            // }}
            // onChange={(e) => props.handleChange(e)}
            // value={props.currentData}
          />
        </div>
      <Button
          // type={props.currentData ? "primary" : "danger"}
          // onClick={() => {
          //   props.inputLeadsDataSearch(props.currentData);

          // }}
        >
          Submit
        </Button>
        <Button
          type={props.currentData ? "primary" : "danger"}
          // onClick={() => {
          //   props.handleClear();
          // }}
        >
          <FormattedMessage id="app.clear" defaultMessage="Clear" />
          {/* Clear */}
        </Button>
    </div>
  );
};

const mapStateToProps = ({pitch,auth}) => ({
  pitchRecord:pitch.pitchRecord,
  userId: auth.userDetails.userId,

});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  getPitchRecords
}, dispatch);
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PitchActionLeft));
