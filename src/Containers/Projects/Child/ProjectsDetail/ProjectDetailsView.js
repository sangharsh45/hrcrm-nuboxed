import React, { Component } from "react";
import { FlexContainer } from "../../../../Components/UI/Layout";
import { SubTitle } from "../../../../Components/UI/Elements";
import { FormattedMessage } from "react-intl";

class ProjectDetailsView extends Component {
  render() {
    console.log("name",this.props.projectsById.projectName)
    const {
      projectsById: { creatorName,customerName },
      toggleViewType,
       projectsById,
    } = this.props;

    return (
      <>
        <ProjectItemRow // label="URL"
          label={<FormattedMessage id="app.owner" defaultMessage="Owner" />}
          value={creatorName}
        />


        <ProjectItemRow //label="Phone Number"
          label={
            <FormattedMessage
              id="app.customerName"
              defaultMessage="Customer "
            />
          }
          value={customerName}
        />

      
  
      </>
    );
  }
}
export default ProjectDetailsView;

const ProjectItemRow = ({ label, value }) => {
  return (
    <FlexContainer
      alignItems="center"
      flexWrap="nowrap"
      style={{ margin: "0.4rem" }}
    >
      <SubTitle style={{ color: "#444", fontWeight: 600 }}>{label}</SubTitle>
      <SubTitle>{value}</SubTitle>
    </FlexContainer>
  );
};
