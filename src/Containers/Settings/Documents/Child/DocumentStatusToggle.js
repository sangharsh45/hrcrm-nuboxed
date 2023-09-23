import React, { Component } from "react";
import { Switch, Checkbox, Popconfirm, message, Select } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { linkDocumentToggle } from "../../Documents/DocumentsAction";

function DocumentStatusToggle(props) {
  
  const [toggle, setToggle] = React.useState(props.editInd);
  console.log(props.editInd)

  function handleToggleCollection(item) {
    if (props.editInd) {
      props.linkDocumentToggle({
        documentTypeId: props.documentTypeId,
        editInd: props.editInd ? false : true,
         
      });
 
    } else {
      props.linkDocumentToggle({
        documentTypeId: props.documentTypeId,
        editInd: props.editInd ? false : true,
      });
    }
  }

  function handleCancel() {
    if (props.editInd) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }
  return (
    <>
      
        <Popconfirm
          title="Confirm status change?"
          onConfirm={() => handleToggleCollection()}
          onCancel={handleCancel}
          okText="Yes"
          cancelText="No"
        >
          <Switch
            className="toggle-clr"
            checked={props.editInd || toggle}
            // disabled={props.status}
            isLoading={true}
            style={{width: "9em"}}
            checkedChildren="Not Mandatory"
            unCheckedChildren="Mandatory"
          />
        </Popconfirm>
      
    </>
  );
}

const mapStateToProps = ({ auth, candidate }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      linkDocumentToggle,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentStatusToggle);
