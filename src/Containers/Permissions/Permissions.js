import React,{lazy} from "react";
const PermissionsDetails = lazy(() => import("./PermissionsDetails"));
function Permissions(props) {
  return (              
    <div>
            <PermissionsDetails />
    </div>
  );
}
export default Permissions;
