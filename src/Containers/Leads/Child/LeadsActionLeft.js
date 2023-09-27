import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import TableViewIcon from '@mui/icons-material/TableView';
import { AudioOutlined } from '@ant-design/icons';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Button, Input, Tooltip } from "antd";
import { FormattedMessage } from "react-intl";
import TocIcon from '@mui/icons-material/Toc';
import {inputLeadsDataSearch} from "../LeadsAction";
const { Search } = Input;

const LeadsActionLeft = (props) => {
  const dummy = ["cloud", "azure", "fgfdg"];
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
  return (
    <div class=" flex  items-center">

<Tooltip
        title= "Card View"
      >
        <span   class=" mr-2 text-sm cursor-pointer"
          style={{
           color: props.viewType === "table" && "#1890ff",
          }}
        >
        <TocIcon/>
        </span>
      </Tooltip>
      

      <div class=" w-72">
          <Input
            placeholder="Search by Name, Sector or Owner"
            width={"100%"}
             suffix={suffix}
            onSearch={(value) => {
              props.inputLeadsDataSearch(value);
              props.setCurrentData(value);

            }}
            onChange={(e) => props.handleChange(e)}
            value={props.currentData}
          />
        </div>
      <Button
          type={props.currentData ? "primary" : "danger"}
          onClick={() => {
            props.inputLeadsDataSearch(props.currentData);

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
    </div>
  );
};

const mapStateToProps = ({leads}) => ({
  fetchingLeadsInputSearchData:leads.fetchingLeadsInputSearchData,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  inputLeadsDataSearch
}, dispatch);
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LeadsActionLeft));
