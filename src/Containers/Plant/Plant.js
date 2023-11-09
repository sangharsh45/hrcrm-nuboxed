import React, { Suspense, lazy } from "react";
// import PlantHeader from "./child/PlantHeader";
import { BundleLoader } from "../../Components/Placeholder";
// const PlantTable = lazy(() => import("./child/PlantTable/PlantTable"));

function Plant() {
  return (
    <div>
      {/* <PlantHeader /> */}
      <Suspense fallback={<BundleLoader />}>
        {" "}
        {/* <PlantTable /> */}
        Hello
      </Suspense>
    </div>
  );
}

export default Plant;
