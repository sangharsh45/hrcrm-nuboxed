// import React, { useEffect, useMemo } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { Button, Switch } from "antd";
// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
// import { Spacer } from "../../../../Components/UI/Elements";
// import { InputComponent } from "../../../../Components/Forms/Formik/InputComponent";
// import { SelectComponent } from "../../../../Components/Forms/Formik/SelectComponent";
// import {
//   getSalesManagerUser,
//   getOnlySalesUser,
//   addTeamsContact,
// } from "../../TeamsAction";
// import { FlexContainer } from "../../../../Components/UI/Layout";
// import { getZoneList, getAreaList } from "../../../Areas/AreaAction";

// /**
//  * yup validation scheme for creating a Team
//  */
// const TeamsSchema = Yup.object().shape({
//   name: Yup.string().required("Please provide Team name"),
//   areaManager: Yup.string().required("Please select Area Manager"),
//   state: Yup.string().required("Please select State"),
//   city: Yup.string().required("Please select City"),
//   zoneId: Yup.string().required("Please select Zone"),
//   areaId: Yup.string().required("Please select Area"),
// });

// function TeamsForm(props) {
//   useEffect(() => {
//     props.getOnlySalesUser();
//     props.getSalesManagerUser();
//     props.getZoneList();
//     props.getAreaList();
//   }, []);

//   const managementOption = useMemo(() => {
//     if (!props.salesManagementUsers) return [];
//     return (
//       props.salesManagementUsers.length &&
//       props.salesManagementUsers.map((user) => {
//         return {
//           label: `${user.firstName} ${user.lastName} - ${user.email}` || "",
//           value: user.userId || "",
//         };
//       })
//     );
//   }, [props.salesManagementUsers]);

//   function getAreaOptions(filterOptionKey, filterOptionValue) {
//     const areaOptions =
//       props.areaListById.length &&
//       props.areaListById
//         .filter((option) => {
//           if (option.zoneId === filterOptionValue && option.probability !== 0) {
//             return option;
//           }
//         })
//         .map((option) => ({
//           label: option.areaName || "",
//           value: option.areaId,
//         }));

//     return areaOptions;
//   }

//   const zones = props.zoneList.map((item) => {
//     return {
//       label: item.zoneName || "",
//       value: item.zoneId,
//     };
//   });

//   const teamOption = useMemo(() => {
//     if (!props.onlySalesUsers) return [];
//     return (
//       props.onlySalesUsers.length &&
//       props.onlySalesUsers.map((user) => {
//         return {
//           label: `${user.firstName} ${user.lastName} - ${user.email}`,
//           value: user.userId,
//         };
//       })
//     );
//   }, [props.onlySalesUsers]);
//   function handleReset(resetForm) {
//     resetForm();
//   }



//   return (
//     <>
//       <Formik
//         enableReinitialize
//         initialValues={{
//           teamName: "",
//           name: "",
//           teamLead: undefined,
//           areaManager: undefined,
//           teamMembers: [],
//           management: "",
//           imageId: "",
//           state: "",
//           city: "",
//           zoneId: undefined,
//           areaId: undefined,
//         }}
//         validationSchema={TeamsSchema}
//         onSubmit={(values, { resetForm }) => {
//           props.addTeamsContact(values, () => handleReset(resetForm));
//         }}
//       >
//         {({
//           errors,
//           touched,
//           isSubmitting,
//           setFieldValue,
//           setFieldTouched,
//           values,
//           ...rest
//         }) => (
//           <Form class="form-background">
//             <div style={{ display: "flex", justifyContent: "space-between" }}>
//               <div
//                 style={{
//                   height: "100%",
//                   width: "45%",
//                 }}
//               >
//                 <Field
//                   name="name"
//                   label="Name"
//                   type="text"
//                   width={"100%"}
//                   component={InputComponent}
//                   isColumn
//                   inlineLabel
//                   isRequired
                  
//                 />              
//                 <Field
//                   name="management"
//                   label="Management"
//                   // isRequired
//                   isColumn                 
//                   component={SelectComponent}
//                   options={
//                     Array.isArray(managementOption) ? managementOption : []
//                   }
//                 />               
//                 <Field
//                   name="areaManager"
//                   label="Area Manager"
//                   isRequired
//                   isColumn
//                   component={SelectComponent}
//                   options={Array.isArray(teamOption) ? teamOption : []}
//                 />             
//               </div>
//               <div
//                 style={{
//                   height: "100%",
//                   width: "45%",
//                 }}
//               >
//                 <FlexContainer style={{ justifyContent: "space-between" }}>
//                   <div style={{ width: "100%" }}>
//                     <Field
//                       isRequired
//                       name="state"
//                       type="text"
//                       label="State"
//                       options={["Tripura"]}
//                       component={SelectComponent}
//                       isColumn
//                       inlineLabel
                      
//                     />                
//                     <Field
//                       isRequired
//                       name="city"
//                       type="text"
//                       label="City"
//                       options={["Agartala"]}
//                       component={SelectComponent}
//                       isColumn
//                       inlineLabel
                     
//                     />
//                   </div>
//                 </FlexContainer>             
//                 <FlexContainer justifyContent="space-between">
//                   <div style={{ width: "47%" }}>
//                     <Field
//                       isRequired
//                       name="zoneId"
//                       type="text"
//                       label="Zone"
//                       width={"100%"}
//                       component={SelectComponent}
//                       options={Array.isArray(zones) ? zones : []}
//                       isColumn
//                       inlineLabel
                     
//                     />
//                   </div>
//                   <div style={{ width: "47%" }}>
//                     <Field
//                       isRequired
//                       name="areaId"
//                       type="text"
//                       label="Area"
//                       width={"100%"}
//                       component={SelectComponent}
//                       options={
//                         Array.isArray(getAreaOptions("zoneId", values.zoneId))
//                           ? getAreaOptions("zoneId", values.zoneId)
//                           : []
//                       }
//                       value={values.areaId}
//                       filterOption={{
//                         filterType: "zone",
//                         filterValue: values.zoneId,
//                       }}
//                       disabled={!values.zoneId}
//                       isColumn
//                       inlineLabel
                      
//                     />
//                   </div>
//                   {/* </div> */}
//                 </FlexContainer>
//               </div>
//             </div>
//             <Spacer />
//             <FlexContainer justifyContent="flex-end">
//               <Button
//                 type="primary"
//                 htmlType="submit"
//                 loading={props.addingTeamsContact}
//               >
//                 Create
//               </Button>
//             </FlexContainer>
//           </Form>
//         )}
//       </Formik>
//     </>
//   );
// }

// const mapStateToProps = ({ teams, auth, area }) => ({
//   addingTeamsContact: teams.addingTeamsContact,
//   addingTeamsContactError: teams.addingTeamsContactError,
//   onlySalesUsers: teams.onlySalesUsers,
//   zoneList: area.zoneList,
//   areaListById: area.areaListById,
//   userId: auth.userDetails.userId,
//   zoneId: area.zoneId,
//   salesManagementUsers: teams.salesManagementUsers,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       getOnlySalesUser,
//       getSalesManagerUser,
//       getZoneList,
//       getAreaList,
//       addTeamsContact,
//     },
//     dispatch
//   );

// export default connect(mapStateToProps, mapDispatchToProps)(TeamsForm);
