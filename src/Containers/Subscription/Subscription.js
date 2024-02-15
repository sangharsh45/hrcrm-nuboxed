import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

function Subscription (props) {

    return (
        <>
        <div class="font-bold text-lg">
            Subscription
        </div>
        </>
    )
};

const mapStateToProps = ({  }) => ({

  });
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
  
      },
      dispatch
    );
  
  export default connect(mapStateToProps, mapDispatchToProps)(Subscription);