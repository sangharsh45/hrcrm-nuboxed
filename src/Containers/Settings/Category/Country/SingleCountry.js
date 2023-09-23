import React, { Component, useMemo } from "react";
import styled from "styled-components";
import { TextInput } from "../../../../Components/UI/Elements";
import ViewEditCard from "../../../../Components/UI/Elements/ViewEditCard";
import CountryFlag1 from "./CountryFlag1";
import CountryStatusToggle from "./CountryStatusToggle";


class SingleCountry extends Component {
  constructor(props) {
    super(props);
    this.state = {
        country_name: "",
    
      
    };
  }
  render() {
    const {
      country: { country_name,editInd,country_dial_code,country_alpha2_code,country_flag,country_currency_name
,        mandatoryInd, country_id },
      handleChange,
      name,
      value,
      documents,
    } = this.props;
    return (
      <CountryWrapper>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <div>
                <div class=" flex justify-between flex-row" >
                <div style={{width:"40%"}}>
                  <CountryName class=" basis-11/12">
                  <CountryFlag1 countryCode={country_alpha2_code} />
                  &nbsp;&nbsp;
                    {country_name}
                  </CountryName>
                  </div>
             
                <div style={{width:"20%"}}>
                <CountryName >
             +{country_dial_code}
                </CountryName>
                </div>
                  <div class=" w-2/6">
                    <CountryStatusToggle
                  editInd={editInd}
                      mandatoryInd={mandatoryInd}
                      country_name={country_name}
                      country_id={country_id}
                    />  
                    </div>
                  
                </div>
              </div>
            ) : (
              <div>
                <TextInput
                  name={name}
                  defaultValue={country_name}
                  onChange={handleChange}
                  style={{ width: "60%" }}
                />
               
              </div>
            )
          }
        </ViewEditCard>
      </CountryWrapper>
    );
  }
}

export default SingleCountry;

const CountryWrapper = styled.div`
  width: 100%;
  cursor: pointer;
`;
const CountryName = styled.h3`
  color: ${(props) => props.theme.color || "teal"};
  font-weight: 600;
`;
const CountryValue = styled.h3`
  color: #999;
  font-size: 1.3rem;
`;








// import React, { Component, useMemo } from "react";
// import styled from "styled-components";
// import { TextInput } from "../../../../Components/UI/Elements";
// import ViewEditCard from "../../../../Components/UI/Elements/ViewEditCard";
// import CountryFlag1 from "./CountryFlag1";
// import CountryStatusToggle from "./CountryStatusToggle";
// class SingleCountry extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       countryName: "",
      
//     };
//   }
//   render() {
//     const {
//       country: { country_name,editInd,country_dial_code,country_alpha2_code,country_flag,country_currency_name
//         ,        mandatoryInd, country_id },
//       handleChange,
//       name,
//       value,
//       documents,
//     } = this.props;
//     return (
//       <CountryWrapper>
//         <ViewEditCard>
//           {({ viewType }, toggleViewType) =>
//             viewType === "view" ? (
//               <div>
//                 <div class=" flex justify-evenly" >
//                   <div class=" w-1/2">
//                   <CountryName class=" basis-11/12">
//                   <CountryFlag1 countryCode={country_alpha2_code} />
//                   &nbsp;&nbsp;
//                     {country_name}
//                   </CountryName>
//                   </div>
//                   <div style={{width:"20%"}}>
//                 <CountryName >
//              +{country_dial_code}
//                 </CountryName>
//                 </div>
//                   <div class=" w-2/6">
//                     <CountryStatusToggle
//          editInd={editInd}
//          mandatoryInd={mandatoryInd}
//          country_name={country_name}
//          country_id={country_id}
//                     />  
//                     </div>
                  
//                 </div>
//               </div>
//             ) : (
//               <div>
//                 <TextInput
//                   name={name}
//                   defaultValue={country_name
//                   }
//                   onChange={handleChange}
//                   style={{ width: "60%" }}
//                 />
               
//               </div>
//             )
//           }
//         </ViewEditCard>
//       </CountryWrapper>
//     );
//   }
// }

// export default SingleCountry;

// const CountryWrapper = styled.div`
//   width: 100%;
//   cursor: pointer;
// `;
// const CountryName = styled.h3`
//   color: ${(props) => props.theme.color || "teal"};
//   font-weight: 600;
// `;
// const CountryValue = styled.h3`
//   color: #999;
//   font-size: 1.3rem;
// `;
