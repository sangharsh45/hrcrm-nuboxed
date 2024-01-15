import React, {  } from "react";
import { Switch,  Popconfirm, } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateFarGlassInProduction } from "../RefurbishAction"

function MoveInvenToggle(props) {
  
  const [toggle, setToggle] = React.useState(props.moveToLocationId);

  function handleToggleCollection(item) {
    if (props.moveToLocationId!==props.locationId) {
      props.updateFarGlassInProduction({
        moveToLocationId: props.locationId,
        moverUserId:props.userId,
        repurbishStartDate:props.repurbishStartDate,
        repurbishEndDate:props.repurbishEndDate
      },
      props.productRepurbishId
      );
     } 
  }

  function handleCancel() {
    // if (props.editInd) {
    //   setToggle(true);
    // } else {
    //   setToggle(false);
    // }
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
            checked={props.moveToLocationId || toggle}
            // disabled={props.status}
            // isLoading={true}
            // style={{
            //   width: "9em",
            //   backgroundColor: props.editInd || toggle ? "rgb(119, 221, 119)" : "#E6E6E6",
            // }}
            checkedChildren="On"
            unCheckedChildren="Off"
          />
        </Popconfirm>
      
    </>
  );
}

const mapStateToProps = ({ auth }) => ({
  userId: auth.userDetails.userId,
  locationId: auth.userDetails.locationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateFarGlassInProduction,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoveInvenToggle);
