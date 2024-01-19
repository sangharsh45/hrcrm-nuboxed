import React, { Component, lazy, Suspense } from "react";
const PermissionsDetailsLeft = lazy(() => import("./PermissionsDetailsLeft"));

class PermissionsDetails extends Component {
  render() {
    return (
      <>
        <div class=" flex">
          <Suspense fallback={"Loading..."}>
            <div class=" flex flex-no-wrap w-full" >
              <div class=" w-[40%]" >
                <PermissionsDetailsLeft />
              </div>
            </div>
          </Suspense>
        </div>
      </>
    );
  }
}

export default PermissionsDetails;
