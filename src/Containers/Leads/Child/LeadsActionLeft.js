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
import {inputLeadsDataSearch,getLeadsRecords,getJunkedLeadsRecords} from "../LeadsAction";
const { Search } = Input;

const LeadsActionLeft = (props) => {
  const dummy = ["cloud", "azure", "fgfdg"];
  
  useEffect(() => {
    if (props.viewType === "card") {
      props.getLeadsRecords(props.userId);
    } else if (props.viewType === "list") {
      props.getJunkedLeadsRecords(props.userId);
    }
  }, [props.viewType, props.userId]);

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
<Badge
        size="small"
        count={(props.viewType === "card" && props.leadsCountData.LeadsDetails) || 0}
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
      <div class="ml-2">
      <Badge
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
              </Badge>
              </div>
      <div class=" w-72 max-sm:w-28">
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

const mapStateToProps = ({leads,auth}) => ({
  fetchingLeadsInputSearchData:leads.fetchingLeadsInputSearchData,
  leadsCountData:leads.leadsCountData,
  leadsCountJunked:leads.leadsCountJunked,
  userId: auth.userDetails.userId,

});
const mapDispatchToProps = (dispatch) => bindActionCreators({
  inputLeadsDataSearch,
  getLeadsRecords,getJunkedLeadsRecords
}, dispatch);
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LeadsActionLeft));
