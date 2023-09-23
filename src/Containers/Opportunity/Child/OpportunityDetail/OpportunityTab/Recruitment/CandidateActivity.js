import React, { Component, useState } from "react";
import { Checkbox, Popconfirm, message, Radio, Select } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { LinkCandidateRecruit } from "../../../../OpportunityAction";

function CandidateActivity(props) {
  const [completionIndicator, setCompletionIndicator] = React.useState(false);
  //  const [selectedRow, setselectedRow] = useState([]);
  // const rowSelection = {
  //   onChange: (selectedRowKeys, selectedRows) => {
  //     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  //   },
  //   const rowSelection = {
  //     onChange: (selectedRowKeys, selectedRows) => {
  //         setselectedRow(selectedRows);
  //         console.log(
  //             `selectedRowKeys: ${selectedRowKeys}`,
  //             "selectedRows: ",
  //             selectedRows
  //         );
  //     },
  // };

  function onClick(checked) {
    // setCompletionIndicator(!completionIndicator);
    console.log(props.item)
    props.LinkCandidateRecruit(
      {
        opportunityId: props.opportunityId,
        stageId: props.candidatePostData.stageId,
        recruitmentProcessId: props.candidatePostData.recruitmentProcessId,

        recruitmentId: props.candidatePostData.recruitmentId,
        profileId: props.candidatePostData.profileId,
        candidateId: props.item.candidateId
      },
      //   props.userId,
      //   handleCallback
    );
  }

  return (
    <>
      <div>
        <Popconfirm
          title="Selected?"
          onConfirm={onClick}
          onCancel={null}
          okText="Ok"
          cancelText="Cancel"
        >
          <Checkbox
            checked={props.completionInd || completionIndicator}
            defaultChecked={props.fullName}


          />



        </Popconfirm>

      </div>
    </>
  );
}

const mapStateToProps = ({ auth, todos }) => ({
  //   linkingOrderToToDo: todos.linkingOrderToToDo,
  //   userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      //   completeActivity,
      LinkCandidateRecruit
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(CandidateActivity);
