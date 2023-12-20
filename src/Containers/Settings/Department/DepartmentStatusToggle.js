import React, { } from "react";
import { Switch,  Popconfirm, } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { linkDepartmentDocumentToggle } from "../Department/DepartmentAction";

function DepartmentStatusToggle(props) {
  const [toggle, setToggle] = React.useState(props.mandetoryInd);
console.log("mndtry",props.mandetoryInd);
  function handleToggleCollection(item) {
    if (props.mandetoryInd) {
      props.linkDepartmentDocumentToggle({
        ...props.notifications,
        departmentName: props.departmentName,
        departmentId: props.departmentId,
        editInd:false,
        mandetoryInd: props.mandetoryInd ? false : true,
      },
      props.departmentId,
      );

    } else {
      props.linkDepartmentDocumentToggle({
        departmentName: props.departmentName,
        departmentId: props.departmentId,
        editInd:false,
        mandetoryInd: props.mandetoryInd ? false : true,
      },
      props.departmentId,
      );
    }
  }

  function handleCancel() {
    if (props.mandetoryInd) {
      setToggle(true);
    } else {
      setToggle(false);
    }
  }
  return (
    <>
      
        <Popconfirm
          title="Confirm status change?"
          onConfirm={() => handleToggleCollection()}
          onCancel={handleCancel}
          okText="Yes"
          cancelText="No"
        >
       
       <Switch
            className="toggle-clr"
            checked={props.mandetoryInd || toggle}
            // disabled={props.status}
            isLoading={true}
            style={{
              width: "9em",
              backgroundColor: props.mandetoryInd || toggle ? "rgb(119, 221, 119)" : "#E6E6E6",
            }}
          
            checkedChildren="Mandatory"
            unCheckedChildren="Not Mandatory"
          />
        </Popconfirm>
      
    </>
  );
}

const mapStateToProps = ({ auth, candidate }) => ({
  // userId: auth.userDetails.userId,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      linkDepartmentDocumentToggle,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DepartmentStatusToggle);

// import React, { Component } from "react";
// import { Switch, Checkbox, Popconfirm, message, Select } from "antd";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { linkDepartmentDocumentToggle } from "../Department/DepartmentAction";

// function DepartmentStatusToggle(props) {
//   const [toggle, setToggle] = React.useState(props.mandetoryInd);
// console.log("mndtry",props.mandetoryInd);
//   function handleToggleCollection(item) {
//     if (props.mandetoryInd) {
//       props.linkDepartmentDocumentToggle({
//         departmentName: props.departmentName,
//         departmentId: props.departmentId,
//         editInd:false,
//         mandetoryInd: props.mandetoryInd ? false : true,
//       },
//       props.departmentId,
//       );

//     } else {
//       props.linkDepartmentDocumentToggle({
//         departmentName: props.departmentName,
//         departmentId: props.departmentId,
//         editInd:false,
//         mandetoryInd: props.mandetoryInd ? false : true,
//       },
//       props.departmentId,
//       );
//     }
//   }

//   function handleCancel() {
//     if (props.mandetoryInd) {
//       setToggle(true);
//     } else {
//       setToggle(false);
//     }
//   }
//   return (
//     <>
      
//         <Popconfirm
//           title="Confirm status change?"
//           onConfirm={() => handleToggleCollection()}
//           onCancel={handleCancel}
//           okText="Yes"
//           cancelText="No"
//         >
//           <Switch
//             className="toggle-clr"
//             checked={props.mandetoryInd || toggle}
//             // disabled={props.status}
//             isLoading={true}
//             style={{width: "9em"}}
//             checkedChildren="Mandatory"
//             unCheckedChildren="Not Mandatory"
//           />
//         </Popconfirm>
      
//     </>
//   );
// }

// const mapStateToProps = ({ auth, candidate }) => ({
//   // userId: auth.userDetails.userId,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//         linkDepartmentDocumentToggle,
//     },
//     dispatch
//   );
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(DepartmentStatusToggle);

