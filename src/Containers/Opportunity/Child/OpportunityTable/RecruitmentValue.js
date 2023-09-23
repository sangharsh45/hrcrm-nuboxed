import Input from "antd/lib/input/Input";
import React from "react";
import { TextInput } from "../../../../Components/UI/Elements";
//import { StyledSelect } from "../../../../../../Components/UI/Antd";
// const Option = StyledSelect.Option;
function RecruitmentValue(props) {
//   console.log("myProps",props.SkillList)
//   function handleChange(value) {
//     // props.filter(value);
//     console.log(value);
//     props.handleSkillsetChoose(value);
//   }
 
  return (
    <div>
      <TextInput
      //  onChange={props.handleFilterBy}
      name="document"
       onChange={props.handleChange}
        // showArrow={false}
         //defaultValue={props.selectType}
          //value={props.selectType}
         //disabled={props.candidatetList}
        // showSearch
        // style={{ width: 120 }}
        // placeholder="Filter Category"
        //  onChange={(e) => handleChange(e)}
      />
     
    
    </div>
  );
}
export default RecruitmentValue;
