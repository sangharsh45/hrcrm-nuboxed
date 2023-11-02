import React, {} from "react";
import { ActionHeader } from "../../../../Components/Utils";
import ContactInvestDetailActionLeft from "./ContactInvestDetailActionLeft";

function ContactInvestDetailHeader(props) {

    return (
      <div>
        <ActionHeader
          leftComponent={<ContactInvestDetailActionLeft />}
          rightComponent={<></>}
        />
      </div>
    );
}

export default ContactInvestDetailHeader;