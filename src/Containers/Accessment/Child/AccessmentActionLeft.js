import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { ActionIcon } from "../../../Components/Utils";
import { FlexContainer } from "../../../Components/UI/Layout";
import TableViewIcon from '@mui/icons-material/TableView';
import { AudioOutlined } from '@ant-design/icons';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

// import { inputEmployeeDataSearch } from "../EmployeeAction";
import { Badge, Button, Input, Tooltip } from "antd";
import { FormattedMessage } from "react-intl";
import {getRecords,inputAssessmentDataSearch} from "../AccessmentAction";
const { Search } = Input;

const AccessmentActionLeft = (props) => {
  const suffix = (
    <AudioOutlined
      onClick={SpeechRecognition.startListening}
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}

    />
  );
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  useEffect(() => {
    props.getRecords();
    if (transcript) {
      console.log(">>>>>>>", transcript)
      props.setCurrentData(transcript)
    }
  },[transcript]);
  return (
    <FlexContainer alignItems="center">

<Tooltip
        title= "Table View"
      >
<Badge size="small" 
 count={ props.viewType === "table" && props.recordData.assessment || 0} overflowCount={999}
>
        <span
          // onClick={() => props.setRequirementViewType("table")}
          style={{
            marginRight: "0.5rem",
           color: props.viewType === "table" && "#1890ff",
            fontSize: "17px",
            cursor: "pointer",
          }}
        >
        {/* <FontAwesomeIcon icon={solid('table-list')} /> */}
        <TableViewIcon/>
        </span>
        </Badge>
      </Tooltip>
         
    
      

      <div style={ {width: "15vw"}} >
          <Input
            placeholder="Search by Name"
            enterButton="Search"
            width={"100%"}
            suffix={suffix}
            // onSearch={(value) => {
            //   props.inputAssessmentDataSearch(value);
            //   props.setCurrentData(value);

            // }}
            onChange={(e) => props.handleChange(e)}
            value={props.currentData}
          />
        </div>
      &nbsp; &nbsp;
      <Button
          type={props.currentData ? "primary" : "danger"}
          onClick={() => {
            props.inputAssessmentDataSearch(props.currentData);

          }}
        >
          Submit
        </Button>
        &nbsp;
        <Button
          //type={props.currentData ? "primary" : "danger"}
          // onClick={props.handleClear}
          onClick={() => {
            props.handleClear();
            //props.getCandidateCountSearch()
          }}
        >
          <FormattedMessage id="app.clear" defaultMessage="Clear" />
          {/* Clear */}
        </Button>
    </FlexContainer>
  );
};

const mapStateToProps = ({assessment}) => ({
  recordData:assessment.recordData,
  assessment:assessment.assessment,
  fetchingAssessmentInputSearchData:assessment.fetchingAssessmentInputSearchData,
});
const mapDispatchToProps = (dispatch) => bindActionCreators({
//   inputEmployeeDataSearch,
getRecords,
inputAssessmentDataSearch
}, dispatch);
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AccessmentActionLeft));
