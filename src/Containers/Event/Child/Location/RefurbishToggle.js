import React from "react";
import { Switch, Popconfirm } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {addingLocationToggle } from "./LocationAction";

function RefurbishToggle(props) {
  const [refurbish,Setrefurbish]=React.useState(false);
  function handleRefurbishClick(item) {
    props.addingLocationToggle(
      {
        locationDetailsId:props.locationDetailsId,
        value: false,
        type: "production"
      },
      props.locationDetailsId,
      
    );
  }

  return (
    <>
      <div>
        <Popconfirm
          title=" Do you wish to reinstate?"
          onConfirm={() => handleRefurbishClick()}
          onCancel={null}
          okText="Ok"
          cancelText="Cancel"
        >
          <Switch
            // checked={props.paymentCollection || paymentCollection}
            isLoading={true}
            checkedChildren="Yes"
            unCheckedChildren="No"
          />
        </Popconfirm>
      </div>
    </>
  );
}

const mapStateToProps = ({ auth }) => ({
  userId: auth.userDetails.userId,
  orgId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        addingLocationToggle,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RefurbishToggle);
