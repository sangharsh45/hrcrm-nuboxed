import React,{lazy} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SubscriptionHeader from "./Child/SubscriptionHeader";

// const CreateSubscriptionDrawer =lazy(()=>import("./Child/CreateSubscriptionDrawer"));

function Subscription (props) {

    return (
        <>
        <SubscriptionHeader/>
        {/* <CreateSubscriptionDrawer
          addEmployeeModal={addEmployeeModal}
          handleEmployeeModal={handleEmployeeModal}
        /> */}

        <div class="font-bold text-lg">
            Subscription
        </div>
        </>
    )
};

const mapStateToProps = ({ subscription }) => ({

  });
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
  
      },
      dispatch
    );
  
  export default connect(mapStateToProps, mapDispatchToProps)(Subscription);