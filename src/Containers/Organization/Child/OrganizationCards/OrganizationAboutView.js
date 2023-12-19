import React, { Component } from "react";
import {
  SubTitle,
} from "../../../../Components/UI/Elements";
import BorderColorIcon from '@mui/icons-material/Edit';
import { FlexContainer } from "../../../../Components/UI/Layout";
class OrganizationAboutView extends Component {
  render() {
    const {
      organization: { industryType,vat,fiscalStartDate,fiscalStartMonth, tradeCurrency, companySize },
      toggleViewType,
    } = this.props;
    // console.log(highestLevel);
    return (
      <>
        <FlexContainer justifyContent="flex-end">
          <BorderColorIcon
            // tooltipTitle="Edit"
            // iconType="edit"
            onClick={toggleViewType}
            size="1em"
          />
        </FlexContainer>
        <OrganizationItemRow
          label="Fiscal Year"
          value={`${fiscalStartDate} ${fiscalStartMonth}`}
        />
        <OrganizationItemRow label="Reporting currency" value={tradeCurrency} />
        <OrganizationItemRow label="Company Size" value={companySize} />
        <OrganizationItemRow label="Industry type" value={industryType} />
        <OrganizationItemRow label="VAT(In %)" value={vat} />
       
      </>
    );
  }
}

export default OrganizationAboutView;

const OrganizationItemRow = ({ label, value }) => {
  return (
    <FlexContainer
      alignItems="center"
      flexWrap="nowrap"
      style={{ margin: "0.4rem" }}
    >
      <SubTitle style={{ color: "#444", fontWeight: 600, width: 300 }}>
        {label}
      </SubTitle>
      <SubTitle
        overflow="hidden"
        textOverflow="ellipsis"
        style={{ marginLeft: "0.2rem" }}
      >
        {value}
      </SubTitle>
    </FlexContainer>
  );
};
