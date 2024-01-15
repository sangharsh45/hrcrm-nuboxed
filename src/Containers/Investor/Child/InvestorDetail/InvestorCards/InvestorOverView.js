import React, { } from "react";
import { Title, MultiAvatar } from "../../../../../Components/UI/Elements";

function InvestorOverView (props) {

    const {
        investorDetails: { name },
      toggleViewType,
      investorDetails,
    } = props;

    return (
      <>
        <div class=" flex justify-between">
          <div class=" flex justify-start flex-nowrap w-4/6"
          >
            <div class=" w-[15%]" >
              <MultiAvatar
                primaryTitle={investorDetails.name}
                imageId={investorDetails.imageId}
                imageURL={investorDetails.imageURL}
              />
            </div>
            <div class=" flex flex-col w-wk">
              <Title
                overflow="hidden"
                textOverflow="ellipsis"
                fontSize={"1.375em"}
              >
                {`${name || ""}`}
              </Title>
            </div>
          </div>
        </div>
      </>
    );
}
export default InvestorOverView;
