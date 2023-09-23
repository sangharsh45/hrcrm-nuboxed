// import { Button, DatePicker, Icon, message } from "antd";
// import React, { useState, useEffect } from "react";
// import { FormattedMessage } from "react-intl";
// import { Spacer, TextInput } from "../../../../Components/UI/Elements";
// import { bindActionCreators } from "redux";
// import { connect } from "react-redux";
// import SearchSelect from "../../../../Components/Forms/Formik/SearchSelect";
// import {
//   Formik,
//   Form,
//   Field,
//   FieldArray,
//   FastField,
//   validateYupSchema,
// } from "formik";
// import {
//   DeleteOutlined,
//   EyeInvisibleOutlined,

  
// } from '@ant-design/icons';
//  import { addOpportunitySkills} from "../../OpportunityAction";
// // import { getCurrency } from "../../Auth/AuthAction";
// import dayjs from "dayjs";
// import * as Yup from "yup";
// import { Select } from "antd";
// import { opportunityMapSelector } from "../../OpportunitySelector";

// const { Option } = Select;

// const data = [
//   {
//     skill: "Java",
//     skillId: 12345,
   
//   },
//   {
//     skill: "css ",
//     userId: 5678,
    
//   }
// ]

// const MileageSchema = Yup.object().shape({
//   dateString: Yup.string().required("Input Required"),
//   // emailId: Yup.string().email("Enter a valid Email"),
//   // firstName: Yup.string().required("Input needed!"),
//   // phoneNo: Yup.string().matches(phoneRegExp, "Enter a valid Phone No"),
//   // mobileNo: Yup.string()
//   //   // .required("Input needed!")
//   //   .matches(phoneRegExp, "Enter a valid Mobile No"),
// });
// function OpportunityInitiativeForm(props) {
//   const [row, setRows] = useState([
//     {
     
     
//       position: "",
//     },
     
//   ]);

//   // useEffect(() => {
//   //   props.getCurrency();
//   // }, []);
//   console.log("currenctjudfljd;regf", props.currencies);
//   const [id, setId] = useState(1);
//   function onChangeDatePicker(date, dateString, id) {
//     setRows((value) => {
//       console.log(value);
//       return value.map((data) => {
//         if (`${data.id}date` === id) {
//           console.log(dateString);
//           return { ...data, mileageDate: dayjs(dateString).toISOString() };
//         } else {
//           return data;
//         }
//       });
//     });
//   }
//   function handleCurrencyChange(currency, id) {
//     console.log(id);
//     setRows((value) => {
//       console.log(value);
//       return value.map((data) => {
//         if (`${data.id}curr` === id) {
//           return { ...data, currency: currency };
//         } else {
//           return data;
//         }
//       });
//     });
//   }
//   function handleChangeattribute(e) {
//     e.persist();
//     setRows((v) => {
//       console.log(v);
//       return v.map((d) => {
//         console.log(`${d.id}attribute`);
//         console.log(e.target.name);

//         if (`${d.id}attribute` === e.target.name) {
//           return { ...d, clientName: e.target.value };
//         } else {
//           return d;
//         }
//       });
//     });
//   }
//   function handleChangefromLocation(e) {
//     e.persist();
//     setRows((v) => {
//       console.log(v);
//       return v.map((d) => {
//         console.log(`${d.id}fromLocation`);
//         console.log(e.target.name);

//         if (`${d.id}fromLocation` === e.target.name) {
//           return { ...d, fromLocation: e.target.value };
//         } else {
//           return d;
//         }
//       });
//     });
//   }
//   function handleChange(id, billType) {
//     setRows((value) => {
//       console.log(value);
//       return value.map((data) => {
//         if (`${data.id}select` === id) {
//           return { ...data, billType: billType };
//         } else {
//           return data;
//         }
//       });
//     });
//   }
//   function handleChangetoposition(e) {
//     e.persist();
//     setRows((v) => {
//       console.log(v);
//       return v.map((d) => {
//         console.log(`${d.id}position`);
//         console.log(e.target.name);

//         if (`${d.id}position` === e.target.name) {
//           return { ...d, position: e.target.value };
//         } else {
//           return d;
//         }
//       });
//     });
//   }

//   function handleChangedistances(e) {
//     e.persist();
//     setRows((v) => {
//       console.log(v);
//       return v.map((d) => {
//         console.log(`${d.id}distances`);
//         console.log(e.target.name);

//         if (`${d.id}distances` === e.target.name) {
//           return { ...d, distances: e.target.value };
//         } else {
//           return d;
//         }
//       });
//     });
//   }
//   function handleChangeremark(e) {
//     e.persist();
//     setRows((v) => {
//       console.log(v);
//       return v.map((d) => {
//         console.log(`${d.id}remark`);
//         console.log(e.target.name);

//         if (`${d.id}remark` === e.target.name) {
//           return { ...d, remark: e.target.value };
//         } else {
//           return d;
//         }
//       });
//     });
//   }

//   function handleChangemileageRate(e) {
//     e.persist();
//     setRows((v) => {
//       console.log(v);
//       return v.map((d) => {
//         console.log(`${d.id}mileageRate`);
//         console.log(e.target.name);

//         if (`${d.id}mileageRate` === e.target.name) {
//           return { ...d, mileageRate: e.target.value };
//         } else {
//           return d;
//         }
//       });
//     });
//   }
//   function handleAddRowClick() {
//     setId((v) => v + 1);
//     setRows((v) => [
//       ...v,
//       {
      
//         position: "",
       
//         // userId: props.userId,
//         id: id + 1,
//       },
//     ]);
//   }
//   function handleDelete(row) {
//     setRows((v) => v.filter((d) => d.id !== row.id));
//   }

//   function handleCallBack(status) {
//     if (status === "Success") {
//       props.getMileageByUserId(props.userId);
//     } else {
//       message.error("Some Error Occourd");
//     }
//   }
//   function handleSubmit() {
//     // validateYupSchema={MileageSchema}
//     console.log(row);
//     // console.log(row["attribute"]);
//     if (row) {
//       row.map((item) => {
//         if (
//           // !item.date &&
//           !item.position 
         
//         ) {
//           alert("All Fields Required");
//         } else {
//           props.addOpportunitySkills(row, handleCallBack);
//         }
        
//       });
//     } else {
//     }
//   }
//   const { addingOpportunitySkills } = props;
//   // const data1=data .map((item) => {
//   //   return {
//   //     label: `${item.skill || ""}`,
//   //     value: item.skillId,
//   //   };
//   // });
//   return (
//     <div>
//       <table>
//         <th>Skill</th>
//         <th>Value</th>
      

//         {/* <th>Rate</th>
//         <th>Currency</th> */}
//         {props.opportunitySkills.map((item) => {
//           return (
//             <tr>
            
                
            

//               <td style={{ width: "16%" }}>
//                 {/* <TextInput
//                    name={`${item.id}fromLocation`}
//                   // value={`${item.fromLocation}`}
//                   // onChange={handleChangefromLocation}
//                   style={{ width: "96%" }}
//                 /> */}
//                 {item.name}
                

//               </td>

//               <td style={{ width: "17%" }}>
//                 <TextInput
//                    name={`${item.id}position`}
//                    //value={`${item.position}`}
//                   onChange={handleChangetoposition}
//                   style={{ width: "96%" }}
//                 />
//               </td>

           
             
          
//               {/* <td>
//                 <TextInput
//                   name={`${item.id}mileageRate`}
//                   value={`${item.mileageRate}`}
//                   onChange={handleChangemileageRate}
//                   style={{ width: "50%" }}
//                 />
//               </td> */}
//               {/* <td>
//                 <Select
//                   style={{ width: 120 }}
//                   onSelect={(value) =>
//                     handleCurrencyChange(value, `${item.id}curr`)
//                   }
//                 >
//                   {props.currencies.map((item) => {
//                     return (
//                       <Option value={item.currencyName}>
//                         {item.currencyName}
//                       </Option>
//                     );
//                   })}
//                 </Select>
//               </td> */}

//               {row.length > 1 && (
//                 <DeleteOutlined
//                   style={{
//                     color: "red",
//                     fontSize: "1.125em",
//                     // marginLeft: "0.3125em",
//                   }}
//                   type="delete"
//                   onClick={() => handleDelete(item)}
//                 />
//               )}
//             </tr>
//           );
//         })}
//       </table>
//       <Spacer />
//       <div>
//       <Button
//         style={{ float: "right",marginRight:"5px" }}
//         type="primary"
//          onClick={handleSubmit}
//          Loading={addingOpportunitySkills}
//       >
//         Submit
//       </Button>
//       &nbsp; &nbsp; &nbsp;
//       <Button
//         style={{ float: "right",marginRight:"5px"}}
//         type="primary"
//         //onClick={handleAddRowClick}
//         // Loading={addingMileage}
//       >
//         Add more
//       </Button>
//       </div>
//     </div>
//   );
// }

// const mapStateToProps = ({ opportunity, auth }) => ({
//   addingOpportunitySkills:opportunity.addingOpportunitySkills

//   // addingMileage: mileage.addingMileage,
//   // userId: auth.userDetails.userId,
//   // currencies: auth.currencies,
//   // user: auth.userDetails,
// });
// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       addOpportunitySkills,
//       // addMileage,
//       // getMileageByUserId,
//       // getCurrency,
//     },
//     dispatch
//   );
// export default connect(mapStateToProps, mapDispatchToProps)(OpportunityInitiativeForm);



import React, { useEffect, useState,useMemo } from "react";
import { connect } from "react-redux";
import { FlexContainer } from "../../../../Components/UI/Layout";
// import SkillsLoadMore from "../../../../../Candidate/Child/CandidateTable/SkillsLoadMore";
import { bindActionCreators } from "redux";
import RecruitmentValue from "../OpportunityTable/RecruitmentValue"
import dayjs from "dayjs";
 import { addOpportunitySkills} from "../../OpportunityAction";
// import { getCountries } from "../../../../../Auth/AuthAction";
// import { LinkCandidateRecruit,LinkRecruitCandidate,getSkillsCount,getRecruiter } from "../../../../OpportunityAction";
import { StyledTable } from "../../../../Components/UI/Antd";
import { Tooltip, Icon, Button, } from "antd";
import Highlighter from 'react-highlight-words';
import Input from "antd/es/input/Input";
import { MultiAvatar, SubTitle } from "../../../../Components/UI/Elements";

import { SearchOutlined } from "@ant-design/icons";

const includesMulti = (elements, inArray) => {
  const unmatched = inArray.slice();
  for (const element of elements) {
    const matchIndex = unmatched.indexOf(element);
    if (matchIndex === -1) return false;
    unmatched.splice(matchIndex, 1);
  }
  return true;
};


const backenddata=[ 
  {
  noOfPosition: "6",
  oppInnitiative: "IDG165422547152022",
  opportunityId:  "OIG95455684217172023",
  opportunitySkillLinkId : "OSLG86304798635172023",
  orgId: "OIF73746229259222021",
  definationId: "DEIN5473703404692022",
  skillName :  "Admin",
  userId: "EMP16818052295222021",
  }
]



function OpportunityInitiativeForm(props) {
 

  useEffect(() => {
    // props.getSkillsCount(props.candidatePostData.recruitmentId,props.organizationId,);
    // props.getCountries();
       
  }, []);
 

  // const [initiative, setInitiative] = useState(initiativeNameOption);
  const [input, setInput] = useState([]);
  const [row, setselectedRowKeys] = useState(null);
  function handleChange(e, item) {
    setInput([...input, { ...item, noOfPosition: e.target.value }]);
  }
  function handleSend() {
    console.log(row, input);

    const data = input.filter((item, i) => {
      if (item.definationId === row[i]) {
        return item
        
      }
      
    
    });
    const newData=data.map((item)=>{
      return {
        skill:item.definationId,
        noOfPosition:item.noOfPosition

      }
    }
    )
    console.log("new",newData)
    console.log(data)
    props.addOpportunitySkills(
      {
        opportunitySkill:newData,
        oppInnitiative:props.item.oppInnitiative,
        opportunityId:props.item.opportunityId
        // candidateIds: selectedRowData,
        // document:selectType
      },
      
    );
    console.log(data);
  }
  console.log(input);
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      setselectedRowKeys(selectedRowKeys);
    }
  };

  const data1=props.opportunityInitiativesSkillsDetails.map((item)=>{
    return item
    
  })

  console.log("detoc",data1&&data1.noOfPosition)

  // const initiativeNameOption = props.opportunityInitiativesSkillsDetails.map((item) => {
  //   return item.noOfPosition
  // }
  // )

  // useEffect(() => {
  //   console.log("helo")
  //   const initiativeNameOption = props.opportunityInitiativesSkillsDetails.map((item) => {
  //     return item.noOfPosition
  //   }

  //   );
  
  //   setInitiative(initiativeNameOption)
   
  // }, [props.opportunityInitiativesSkillsDetails]);



  

  const columns = [


    {
      title: "",
      dataIndex: "imageId",
      width: "3%",
      // render: (name, item, i) => {
      //   return (
      //     <SubTitle>
      //       <MultiAvatar
      //         primaryTitle={item.firstName}
      //         imageId={item.imageId}
      //         imageURL={item.imageURL}
      //         imgWidth={"2.5em"}
      //         imgHeight={"2.5em"}
      //       />
      //     </SubTitle>
      //   );
      // },
    },

    {
      title:"Skills",
      dataIndex:"name"
    },
    {
      title: "Value",
      render: (text, item) => (
        <span>
          <Input 
          onChange={(e) => handleChange(e, item)} 
          // defaultValue={initiative}
          />
        </span>
      )
    }

 
  
   

   
  
    
  
 

  

  ];

 

 
console.log("check",row)

  return (
    <>
      {/* <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}> */}
     
       {/* <span
        style={{
          marginLeft: 8,
        }}
      >
        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
      </span> */}
     
      
     

        
         
      <StyledTable
        rowKey="definationId"
        columns={columns}
        dataSource={props.opportunitySkills}
        scroll={{ y: 460 }}
        loading={props.fetchingOpportunitySkills}
        rowSelection={rowSelection}
        pagination={false}
      />
      <Button type="primary"
      onClick={handleSend}
      disabled={row===null}
      >Select</Button>
    </>
  );
}
// }
const mapStateToProps = ({ auth, opportunity }) => ({

  // organizationId: auth.userDetails.organizationId,
  // skillsCount:opportunity.skillsCount,
  // userId:auth.userDetails.userId,
  // user: auth.userDetails,
  // role: auth.userDetails.role,
  // countries:auth.countries,
  // fetchingRecruiter: opportunity.fetchingRecruiter,
  // opportunityId: opportunity.opportunity.opportunityId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addOpportunitySkills
      // LinkCandidateRecruit,
      // LinkRecruitCandidate,
      // getSkillsCount,
      // getRecruiter,
      // getCountries
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(OpportunityInitiativeForm);










