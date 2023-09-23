import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import TableViewIcon from '@mui/icons-material/TableView';
import { AudioOutlined } from '@ant-design/icons';
import SpeechRecognition, { } from 'react-speech-recognition';
import { Input, Tooltip } from "antd";

const { Search } = Input;

const InvoiceActionLeft = (props) => {
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
    <div class=" flex items-center"
    >

<Tooltip
        title= "Table View"
      >
        <span class=" mr-2 text-sm cursor-pointer"
          onClick={() => props.setInvoiceViewType("table")}
          style={{
           color: props.viewType === "table" && "#1890ff",
          }}
        >
        <TableViewIcon  />
        </span>
      </Tooltip>
      
    </div>
  );
};

const mapStateToProps = ({leads}) => ({
});
const mapDispatchToProps = (dispatch) => bindActionCreators({

}, dispatch);
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(InvoiceActionLeft));
