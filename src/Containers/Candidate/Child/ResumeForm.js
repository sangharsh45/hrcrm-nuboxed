// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import axios from "axios";
// import {
//   handleCandidateModal,
//   handleCandidateResumeModal,
// } from "../CandidateAction";
// import { getLibrarys } from "../../../Containers/Settings/Library/LibraryAction";
// import { Button } from "antd";
// import { Spacer } from "../../../Components/UI/Elements";
// import { addResumeForm,addParsingForm } from "../CandidateAction";

// class ResumeForm extends Component {
//   constructor(props) {
//     super(props);
//     this.handleSubmission = this.handleSubmission.bind(this);
//   this.state = {
//     fileData: null,
//     selectedFile: null,
//      responseData: null,
//   };
// }
//   handleSetFileData = (file) => {
//     this.setState({ fileData: file });
//   };
//   handleReset = (resetForm) => {
//     resetForm();
//   };

//   handleResumeUpload = () => {
//     let formData = new FormData();
//     formData.append("file", this.state.selectedFile);
//     console.log(this.props.resumeForm.length && this.props.resumeForm);
//     this.props.addResumeForm(formData);
//   };

//   changeHandler = (event) => {
//     this.setState({
//       selectedFile: event.target.files[0],
//     });
//   };

//   handleSubmission = () => {
//     console.log(this.state.selectedFile);
//     console.log(this.props.librarys);
//     const convertedArray = this.props.librarys.map((item) => item.name);
//     const convertedString = convertedArray.toString();
//     console.log(convertedString);
//     let formData = new FormData();
//     formData.append("file", this.state.selectedFile);
//     formData.append("skills", convertedString);
//     console.log(formData);
//     axios
//       .post(`https://develop.tekorero.com/HrAnalytics/pdf/read`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       })
//       .then((res) => {
//         ////debugger;
//          console.log("data45",res.data);
//         //  this.props.handleResponseData(res.data);
//         this.props.handleResponseData(res.data);
//         this.props.handleCandidateModal(true);
       
//         this.props.handleCandidateResumeModal(false);
 
     
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//     // this.props.addParsingForm(formData);
//   };
//   componentDidMount() {
//     const { getLibrarys, organizationId } = this.props;
//     console.log();
//     getLibrarys(organizationId);
//   }
//   render() {
//     console.log("formch",this.props)
//     console.log("FormRender", this.state.fileData);
//     console.log("parsing",this.props.parsingForm)
//     const {
//       // user:{userId},
//       addingResumeForm,
//       handleCandidateModal,
//       addCandidateModal,
//     } = this.props;
//     return (
//       <>
//         <input type="file" name="file" onChange={this.changeHandler} />
//         <Spacer />
//         <div class=" flex justify-end">
//           <div>
//             <button
//               style={{
//                 backgroundColor: "#24d8a7",
//                 height: "1.6rem",
//                 color: "white",
//                 borderColor: "#24d8a7",
//               }}
//               onClick={() => {
//                 this.handleSubmission();
//                 this.handleResumeUpload();
//               }}
//             >
//               Upload Selected File
//             </button>
//           </div>

//           <div class=" ml-[5px]" >
//             <Button
//               type="danger"
//               ghost
//               onClick={() => {
//                 handleCandidateModal(true);
//                 this.props.handleResponseData(null);
//               }}
//             >
//               Don't have resume handy
//             </Button>
//           </div>
//         </div>
//       </>
//     );
//   }
// }

// const mapStateToProps = ({
//   auth,
//   librarys,
//   candidate,
//   opportunity,
//   contact,
//   customer,
// }) => ({
//   //   user: auth.userDetails,
//   addingResumeForm: candidate.addingResumeForm,
//   addCandidateModal: candidate.addCandidateModal,
//   librarys: librarys.librarys,
//   organizationId: auth.userDetails.organizationId,
//   resumeForm: candidate.resumeForm,
//   parsingForm:candidate.parsingForm
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       addResumeForm,
//       handleCandidateResumeModal,
//       handleCandidateModal,
//       getLibrarys,
//       addParsingForm
//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(ResumeForm);


import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from "axios";
import {
  handleCandidateModal,
  handleCandidateResumeModal,

} from "../CandidateAction";
import { getLibrarys } from "../../../Containers/Settings/Library/LibraryAction";
import { Button } from "antd";
import { Spacer } from "../../../Components/UI/Elements";
import { addResumeForm, addParsingForm } from "../CandidateAction";
import AddCandidateModal from "./AddCandidateModal";

const ResumeForm = ({
  addingResumeForm,
  addCandidateModal,
  librarys,
  organizationId,
  resumeForm,
  parsingForm,
  addResumeForm,
  handleCandidateResumeModal,
  handleCandidateModal,
  getLibrarys,
  name,
  // handleResponseData, // Include handleResponseData in the props
}) => {
  const [fileData, setFileData] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSetFileData = useCallback((file) => {
    setFileData(file);
  }, []);

  const handleReset = useCallback((resetForm) => {
    resetForm();
  }, []);

  const handleResumeUpload = () => {
    let formData = new FormData();
    formData.append("file", selectedFile);
    console.log(resumeForm.length && resumeForm);
    addResumeForm(formData);
  };

  console.log(name)

  const handleResponseData = (data) => {
    console.log(data)
    console.log('function called');
    setResponseData(data);
  };

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmission = () => {
    console.log(selectedFile);
    console.log(librarys);
    const convertedArray = librarys.map((item) => item.name);
    const convertedString = convertedArray.toString();
    console.log(convertedString);
    let formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("skills", convertedString);
    console.log(formData);
    axios
      .post(`https://develop.tekorero.com/HrAnalytics/pdf/read`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(res=> {
        console.log("data45", res.data);
         // Call handleResponseData with the response data
         handleResponseData(res.data);
        handleCandidateModal(true);
      
        // handleCandidateResumeModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getLibrarys(organizationId);
  }, [getLibrarys, organizationId]);

  console.log("formch", resumeForm);
  console.log("FormRender", fileData);
  console.log("parsing", parsingForm);

  return (
    <>
      <input type="file" name="file" onChange={changeHandler} />
      <Spacer />
      <div className="flex justify-end">
        <div>
          <button
            style={{
              backgroundColor: "#24d8a7",
              height: "1.6rem",
              color: "white",
              borderColor: "#24d8a7",
            }}
            onClick={() => {
              handleSubmission();
              handleResumeUpload();
            }}
          >
            Upload Selected File
          </button>
        </div>

        <div className="ml-[5px]">
          <Button
            type="danger"
            ghost
            onClick={() => {
              handleCandidateModal(true);
            }}
          >
            Don't have resume handy
          </Button>
        </div>
      </div>
      <AddCandidateModal
          addCandidateModal={addCandidateModal}
          handleCandidateModal={handleCandidateModal}
          responseData={responseData}
        />
    </>
  );
};

const mapStateToProps = ({
  auth,
  librarys,
  candidate,
  opportunity,
  contact,
  customer,
}) => ({
  addingResumeForm: candidate.addingResumeForm,
  addCandidateModal: candidate.addCandidateModal,
  librarys: librarys.librarys,
  organizationId: auth.userDetails.organizationId,
  resumeForm: candidate.resumeForm,
  parsingForm: candidate.parsingForm,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addResumeForm,
      handleCandidateResumeModal,
      handleCandidateModal,
      getLibrarys,
      addParsingForm,
     
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ResumeForm);

