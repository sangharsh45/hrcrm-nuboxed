import React, { Component,lazy } from "react";
import styled from "styled-components";
import { TextInput } from "../../../../Components/UI/Elements";
import ViewEditCard from "../../../../Components/UI/Elements/ViewEditCard";
import CountryFlag1 from "./CountryFlag1";
const CountrySalesToggle = lazy(() => import("../Country/CountrySalesToggle"));
const CountryStatusToggle = lazy(() => import("../Country/CountryStatusToggle"));



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
,        mandatoryInd,salesInd, country_id },
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
                  <div className="flex justify-between mt-2 "
             
              >
                <div class=" flex flex-row justify-evenly w-wk max-sm:flex-col">
                  <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

                    <div class=" text-sm text-cardBody font-medium font-poppins">

                      Name

                    </div>


                    <div class=" font-normal text-sm text-cardBody font-poppins">
                    <div style={{width:"70%"}}>
  <CountryName class=" basis-11/12">
  <CountryFlag1 countryCode={country_alpha2_code} />
  &nbsp;&nbsp;
    {country_name}
  </CountryName>
  </div>
                    </div>

                  </div>
                  <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

                    <div class=" text-sm text-cardBody font-medium font-poppins">

                     Dial Code

                    </div>


                    <div class=" font-normal text-sm text-cardBody font-poppins">
                    <div style={{width:"20%"}}>
<CountryName >
+{country_dial_code}
</CountryName>
</div>
                    </div>

                  </div>
                  <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

<div class=" text-sm text-cardBody font-medium font-poppins">

Currency
</div>


<div class=" font-normal text-sm text-cardBody font-poppins">
<div style={{width:"70%"}}>
<CountryName >
{country_currency_name}
</CountryName>
</div>
</div>

</div>
                  <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

                    <div class=" text-sm text-cardBody font-medium font-poppins">

                 Operations

                    </div>


                    <div class=" font-normal text-sm text-cardBody font-poppins">
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
                  <div className=" flex font-medium flex-col md:w-44 max-sm:justify-between w-full max-sm:flex-row ">

<div class=" text-sm text-cardBody font-medium font-poppins">

Sales
</div>


<div class=" font-normal text-sm text-cardBody font-poppins">
<div class=" w-2/6">
<CountrySalesToggle
editInd={editInd}
salesInd={salesInd}
country_name={country_name}
country_id={country_id}
/>  
</div>
</div>

</div>

                
                
                
           
               

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








