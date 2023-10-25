// import React from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { Spacer } from "../../../Components/UI/Elements";
// import { FlexContainer } from "../../../Components/UI/Layout";
// import { StyledSelect } from "../../../Components/UI/Antd";
// import { ShoppingOutlined, TableOutlined } from "@ant-design/icons";
// import { Button, Empty, Tooltip, Badge } from "antd";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';

// const Option = StyledSelect.Option;
// class TeamsActionLeft extends React.Component {

//   render() {
//     const { viewType, setTeamsViewType, user } = this.props;

//     return (
//       <>
//         <FlexContainer alignItems="center">
//           {user.functionName !== "Customer Care" && (
//             <Tooltip title="Sales">
//               <Badge size="small">
//                 <span
//                   style={{
//                     marginRight: "0.5rem",
//                     color: viewType === "table" && "#1890ff",
//                   }}
//                   onClick={() => setTeamsViewType("table")}>
//                   <FontAwesomeIcon icon={solid('list')} />
//                 </span>
//               </Badge>
//             </Tooltip>
//           )}
//           {user.functionName !== "Customer Care" && (
//             <Tooltip title="Production">
//               <span
//                 onClick={() => setTeamsViewType("partner")}
//                 style={{
//                   marginRight: "0.5rem",
//                   color: viewType === "partner" && "#1890ff",
//                 }}
//               >
//                 <i class="fas fa-industry"></i>
//               </span>
//             </Tooltip>
//           )}

//           <Tooltip title="Client">
//             <span
//               onClick={() => setTeamsViewType("client")}
//               style={{
//                 marginRight: "0.5rem",
//                 color: viewType === "client" && "#1890ff",
//               }}
//             >
//               <FontAwesomeIcon icon={solid('building')} />
//             </span>
//           </Tooltip>

//           <Tooltip title="Inventory">
//             <span
//               onClick={() => setTeamsViewType("inventory")}
//               style={{
//                 marginRight: "0.5rem",
//                 color: viewType === "inventory" && "#1890ff",
//               }}
//             >
//               <FontAwesomeIcon icon={solid('warehouse')} />
//             </span>
//           </Tooltip>

//         </FlexContainer>
//       </>
//     );
//   }
// }

// const mapStateToProps = ({ auth }) => ({
//   role: auth.userDetails.role,
//   department: auth.userDetails.department,
//   user: auth.userDetails,
// });

// const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

// export default connect(mapStateToProps, mapDispatchToProps)(TeamsActionLeft);
