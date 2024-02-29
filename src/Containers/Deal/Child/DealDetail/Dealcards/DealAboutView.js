import { Menu } from "antd";
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { CurrencySymbol } from "../../../../../Components/Common";
class DealAboutView extends Component {
  render() {
    const {
        dealDetailsbyID: {
        proposalAmount,
        currency,
        exchangePrice,
      },
      tradeCurrency,
      toggleViewType,
    } = this.props;
    const data=currency
    console.log(data);
    const menu = (
      <Menu>
        <p
          style={{
            paddingRight: "0.625em",
            paddingLeft: "0.625em",
            fontSize: "bold",
          }}
        >
          <FormattedMessage
                id="app.proposalvalueis"
                defaultMessage=" Deals Value is"
              />
         
        </p>
        <p
          style={{
            textAlign: "right",
            paddingRight: "0.625em",
          }}
        >{` ${parseFloat(exchangePrice && exchangePrice.EUR).toFixed(
          0
        )} EUR`}</p>
        <p
          style={{
            textAlign: "right",
            paddingRight: "0.625em",
          }}
        >{`  ${parseFloat(exchangePrice && exchangePrice.GBP).toFixed(
          0
        )} GBP`}</p>
        <p
          style={{
            textAlign: "right",
            paddingRight: "0.625em",
          }}
        >{`  ${parseFloat(exchangePrice && exchangePrice.USD).toFixed(
          0
        )} USD`}</p>
        <p
          style={{
            textAlign: "right",
            paddingRight: "0.625em",
          }}
        >{` ${parseFloat(exchangePrice && exchangePrice.INR).toFixed(
          0
        )} INR`}</p>
        <p
          style={{
            textAlign: "right",
            paddingRight: "0.625em",
          }}
        >{` ${parseFloat(exchangePrice && exchangePrice.BDT).toFixed(
          0
        )} BDT`}</p>
        <p
          style={{
            textAlign: "right",
            paddingRight: "0.625em",
          }}
        >{` ${parseFloat(exchangePrice && exchangePrice.AUD).toFixed(
          0
        )} AUD`}</p>
        <p
          style={{
            textAlign: "right",
            paddingRight: "0.625em",
          }}
        >{` ${parseFloat(exchangePrice && exchangePrice.CAD).toFixed(
          0
        )}  CAD`}</p>
        <p
          style={{
            textAlign: "right",
            paddingRight: "0.625em",
          }}
        >
          {" "}
          {` ${parseFloat(exchangePrice && exchangePrice.SGD).toFixed(0)}  SGD`}
        </p>
      </Menu>
    );

    return (
      <>
 <ProfileItemRow
          //label="Proposal value"
          label={<FormattedMessage
            id="app.proposalvalue"
            defaultMessage="Deals Value"
          />}
          // value={proposalAmount} 
          value={
            <span>
          <CurrencySymbol currencyType={currency} />
          {proposalAmount}
          </span>
          }
        />
 

     
    
      </>
    );
  }
}

export default DealAboutView;

const ProfileItemRow = ({ label, value }) => {
  return (
    <div class=" flex items-center w-fit justify-between flex-no-wrap m-2 h-2">
      <div class=" text-[#444] font-semibold" >{label}</div>
      <div className="overflow-hidden truncate ml-8">{value}</div>
    </div>
  );
};