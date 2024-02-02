import React, { Component ,lazy} from "react";
import { ActionHeader } from "../../../../../Components/Utils";
const EmployeeDetailActionLeft = lazy(() => import("./EmployeeDetailActionLeft"));

class EmployeeDetailHeader extends Component {
  render() {
    return (
      <div>
        <ActionHeader
          leftComponent={<EmployeeDetailActionLeft />}
          rightComponent={<></>}
        />
      </div>
    );
  }
}

export default EmployeeDetailHeader;
