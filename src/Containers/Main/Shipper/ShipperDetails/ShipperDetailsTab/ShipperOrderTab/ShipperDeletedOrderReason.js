import React, { Component } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class ShipperDeletedOrderReason extends Component {
    render() {
        const { customerDeletedOrder: { reason }
        } = this.props
        return (
            <div>
                <h1>Reason</h1>
                <h2>{reason}</h2>
            </div>
        )
    }
}

const mapStateToProps = ({ shipper }) => ({
    shipperDeletedOrder: shipper.shipperDeletedOrder,
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(ShipperDeletedOrderReason);