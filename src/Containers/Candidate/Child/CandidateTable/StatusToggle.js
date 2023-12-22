import React, {  } from "react";
import { Switch, Popconfirm } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  linkCandidateStatus,
  getCandidateListByUserId,
} from "../../CandidateAction";

function StatusToggle(props) {
  const [toggle, setToggle] = React.useState(props.active);

  function handleToggleCollection(item) {
    if (props.active) {
      props.linkCandidateStatus(
        {
          candidateId: props.candidateId,
          userId: props.userId,
          active: props.active ? false : true,
        },
        props.candidateId,
        props.userId
      );
    } else {
      props.linkCandidateStatus(
        {
          candidateId: props.candidateId,
          userId: props.userId,
          active: props.active ? false : true,
        },
        props.candidateId,
        props.userId
      );
    }
  }

  function handleCancel() {
    if (props.active) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }
  return (
    <>
      <div>
        <Popconfirm
          title="Confirm status change?"
          onConfirm={() => handleToggleCollection()}
          onCancel={handleCancel}
          okText="Ok"
          cancelText="Cancel"
        >
          <Switch
            className="toggle-clr"
            checked={props.active || toggle}
            isLoading={true}
            checkedChildren="Yes"
            unCheckedChildren="No"
          />
        </Popconfirm>
      </div>
    </>
  );
}

const mapStateToProps = ({ auth, candidate }) => ({
  userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      linkCandidateStatus,
      getCandidateListByUserId,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(StatusToggle);
