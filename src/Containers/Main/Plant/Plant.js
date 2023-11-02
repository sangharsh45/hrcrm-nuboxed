import React, { Suspense, lazy } from "react";
import { BundleLoader } from "../../../Components/Placeholder";
import PlantTable from "./PlantTable";
import PlantHeader from "./PlantHeader";
function Plant() {
  return (
    <div>
      <PlantHeader />
      <Suspense fallback={<BundleLoader />}>
        {" "}
        {/* <PlantTable /> */}hello
      </Suspense>
    </div>
  );
}

export default Plant;
