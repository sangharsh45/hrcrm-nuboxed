import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'; 
import React from 'react'
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import AddUploadOrganizationModal from "./AddUploadOrganizationModal"
import {handleRepositoryOrganizationModal} from "../Auth/AuthAction"
import RepositoryOrganizationModal from './RepositoryOrganizationModal';
import { Tooltip } from 'antd';

function RepositoryData(props) {
  return (
    <>
    <div>
    <Tooltip title="Repository">
        <LibraryBooksIcon
        style={{fontSize:"1.2rem",marginLeft:"0.5rem"}}
          onClick={() => {
          
            props.handleRepositoryOrganizationModal(true);
          }}
        />
           </Tooltip>
        </div>

        <RepositoryOrganizationModal
        repositoryOrganizationModal={props.repositoryOrganizationModal}
        handleRepositoryOrganizationModal={props.handleRepositoryOrganizationModal}
        />
    </>
  )
}
const mapStateToProps = ({ auth, customer,employee }) => ({
    repositoryOrganizationModal:auth.repositoryOrganizationModal
  });
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
         handleRepositoryOrganizationModal
      
      },
      dispatch
    );
  
  export default connect(mapStateToProps, mapDispatchToProps)(RepositoryData);

