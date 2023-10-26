import React, { Component } from 'react';
import { connect } from "react-redux";
import { StyledPopconfirm} from "../../Components/UI/Antd";
import { bindActionCreators } from "redux";
import { getRepositoryDocuments ,deleteOrgDocata,LinkOrgDocPublish} from "../Auth/AuthAction";
import styled from 'styled-components';
import { base_url } from "../../Config/Auth";
import { Switch ,Button} from "antd";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";

class OrganizationDocumentList extends Component {
    constructor(props) {
        super(props);
        this.formRef = null;
        this.state = {
          fields: {},
          currentProcess: [],
       
          publish: false,
        };
      }
  componentDidMount() {
    this.props.getRepositoryDocuments(this.props.orgId);
  }
  handleCallBack1 = (status, data) => {
    if (status === "Success") {
       this.props.getRepositoryDocuments(this.props.orgId);
      this.setState({ currentProcess: data });
    } else {
      alert("error");
    }
  };

  handlePublishClick = () => {
    const { currentProcess, publish } = this.state;
    console.log(currentProcess);

    const Id = currentProcess.investorOppWorkflowId;
    let data = {
      investorOppWorkflowId: Id,
      publishInd: currentProcess.publishInd ? false : true,
    };

     this.props.LinkOrgDocPublish(data, this.handleCallBack1);
  };

  render() {
    return (
      <div className="overflow-y-auto max-h-[39rem]">
        <CardWrapper>
          {this.props.repositoryData.map((item) => (
            <CardElement key={item.id}>
              <div className="flex flex-row justify-between w-wk max-sm:flex-col">
                <div className="flex">
                  <div className="flex font-medium flex-col md:w-40 max-sm:flex-row w-full max-sm:justify-between">
                    <div className="text-sm text-cardBody font-semibold font-poppins max-sm:hidden">
                      Name
                    </div>
                    <div className="font-normal text-sm text-cardBody font-poppins">
                      {item.name}
                    </div>
                  </div>
                  <div className="flex font-medium flex-col md:w-40 max-sm:flex-row w-full mt-1 max-sm:justify-between">
                    <div className="text-sm text-cardBody font-semibold font-poppins max-sm:hidden">
                      Category
                    </div>
                    <div className="font-normal text-sm text-cardBody font-poppins">
                      {item.catagory}
                    </div>
                  </div>
                  <div className="flex font-medium flex-col md:w-40 max-sm:flex-row w-full mt-1 max-sm:justify-between">
                    <div className="text-sm text-cardBody font-semibold font-poppins max-sm:hidden">
                      Department
                    </div>
                    <div className="font-normal text-sm text-cardBody font-poppins">
                      {item.department}
                    </div>
                  </div>
                  <div className="flex font-medium flex-col md:w-40 max-sm:flex-row w-full mt-1 max-sm:justify-between">
                    <div className="text-sm text-cardBody font-semibold font-poppins max-sm:hidden">
                      Description
                    </div>
                    <div className="font-normal text-sm text-cardBody font-poppins">
                      {item.description}
                    </div>
                  </div>
                  <div className="flex font-medium flex-col md:w-40 max-sm:flex-row w-full mt-1 max-sm:justify-between">
                    <div className="text-sm text-cardBody font-semibold font-poppins max-sm:hidden">
                 
                    </div>
                    {/* {this.state.currentProcess.workflowName && ( */}
                      <Button
                        onClick={this.handlePublishClick}
                      >
                        {/* {this.state.change?"Publish":"Unpublish"}  */}
                        {this.state.currentProcess.publishInd
                          ? "Unpublish"
                          : "Publish"}
                      </Button>
                    {/* )} */}
                  </div>
                  <div>
                        <StyledPopconfirm
            title="Do you want to delete?"
             onConfirm={() => this.props.deleteOrgDocata(item.documentId)}
          >
            {/* {user.opportunityDeleteInd ===true && ( */}
            <DeleteIcon
              type="delete"
              style={{ cursor: "pointer", color: "red" ,fontSize: "1rem",}}
            />
            {/* )} */}
          </StyledPopconfirm>
                        </div>
                        <div>
                        <a
                href={`${base_url}/document/${item.documentId}`}
                target="_blank"
              >
            {/* {user.opportunityDeleteInd ===true && ( */}
            <DownloadIcon
              type="download"

              style={{ cursor: "pointer",fontSize: "1rem",}}
            />
                </a>
            {/* )} */}
       
                        </div>
                </div>
              </div>
            </CardElement>
          ))}
        </CardWrapper>
      </div>
    );
  }
}

const mapStateToProps = ({ location, auth }) => ({
  repositoryData: auth.repositoryData,
  orgId: auth.userDetails.organizationId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getRepositoryDocuments,
      deleteOrgDocata,
      LinkOrgDocPublish
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationDocumentList);

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

const CardElement = styled.div`
  border-radius: 0.75rem;
  border: 3px solid #EEEEEE;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 0.25em 0.62em #aaa;
  height: 4rem;
  color: rgb(68, 68, 68);
  margin: 1em;
  padding: 0.2rem;
  width: -webkit-fill-available;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 600px) {
    width: 100%;
    margin: 0.25em;
    height: 7rem;
  }
`;
