import React, { Component ,lazy} from "react";
import { ViewEditCard } from "../../../../Components/UI/Elements";
const ReportTimeView =lazy(()=>import("./ReportTimeView"));

class ReportTimeCard extends Component {
  render() {
    const { customer } = this.props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <ReportTimeView
                customer={customer}
                toggleViewType={toggleViewType}
              />
            ) : null
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default ReportTimeCard;
