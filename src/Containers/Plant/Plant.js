import React, { Suspense, lazy } from "react";
import PlantHeader from "./Child/PlantHeader";
import { BundleLoader } from "../../Components/Placeholder";
const PlantTable = lazy(() => import("./Child/PlantTable/PlantTable"));

function Plant() {
  return (
    <div>
      <PlantHeader />
      <Suspense fallback={<BundleLoader />}>
        {" "}
        <PlantTable />

      </Suspense>
    </div>
  );
}

export default Plant;
