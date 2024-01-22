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

  return (
    <>
      
        <Popconfirm
          title="Confirm status change?"
          onConfirm={() => handleToggleCollection()}
          okText="Yes"
          cancelText="No"
        >
          <Switch
            className="toggle-clr"
            checked={props.moveToLocationId || toggle}
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
