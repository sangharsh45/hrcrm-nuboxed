import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Select, message } from "antd";
import { getShift } from "../../../../Shift/ShiftAction";
import { addShiftsInPlant } from "../../../PlantAction";

const { Option } = Select;
function cancel(e) {
  console.log(e);
  // message.error('Click on No');
}

class AllShift extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: undefined,
    };
  }
  onChange = (value) => {
    //debugger;
    this.setState({ value });
    this.props.addShiftsInPlant(value);
  };
  componentDidMount() {
    this.props.getShift(this.props.locationDetailsId);
  }
  render() {
    return (
      <div>
        <Select
          // dropdownStyle={{ backgroundColor: "green", width: "9.37em" }}
          value={undefined}
          showSearch
          // disabled={!this.props.disabled}
          style={{ width: 100 }}
          placeholder="Select"
          onChange={(value) => this.onChange(value)}
          // onSelect={this.onChange}
        >
          {this.props.shift.map((item) => {
            return <Option value={item.shiftName}>{item.shiftName} </Option>;
          })}
        </Select>
      </div>
    );
  }
}

const mapStateToProps = ({ shift, auth, plant }) => ({
  userId: auth.userDetails.userId,
  fetchingShift: shift.fetchingShift,
  shift: shift.shift,
  //   locationDetailsId: plant.plantDetailById.locationDetailsId,
  //   plant: plant.plant,
  shiftName: shift.dropdownShift.shiftName,
  locationDetailsId: plant.plantDetailById.locationDetailsId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getShift,
      addShiftsInPlant,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(AllShift);
