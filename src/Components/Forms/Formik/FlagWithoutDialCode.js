import React from "react";
import UnitedStatesofAmerica from "../../../Assets/Images/flag-of-United-States-of-America.png";
import unitedKingdom from "../../../Assets/Images/flag-of-United-Kingdom.png";
import Australia from "../../../Assets/Images/flag-of-Australia.png";
import Austria from "../../../Assets/Images/flag-of-Austria.png";
import Belgium from "../../../Assets/Images/flag-of-Belgium.png";
import Botswana from "../../../Assets/Images/flag-of-Botswana.png";
import Cameroon from "../../../Assets/Images/flag-of-Cameroon.png";
import Canada from "../../../Assets/Images/flag-of-Canada.png";
import Cyprus from "../../../Assets/Images/flag-of-Cyprus.png";
import Egypt from "../../../Assets/Images/flag-of-Egypt.png";
import Estonia from "../../../Assets/Images/flag-of-Estonia.png";
import Ethiopia from "../../../Assets/Images/flag-of-Ethiopia.png";
import Finland from "../../../Assets/Images/flag-of-Finland.png";
import France from "../../../Assets/Images/flag-of-France.png";
import Gambia from "../../../Assets/Images/flag-of-Gambia.png";
import Germany from "../../../Assets/Images/flag-of-Germany.png";
import Ghana from "../../../Assets/Images/flag-of-Ghana.png";
import Greece from "../../../Assets/Images/flag-of-Greece.png";
import India from "../../../Assets/Images/flag-of-India.png";
import Ireland from "../../../Assets/Images/flag-of-Ireland.png";
import Italy from "../../../Assets/Images/flag-of-Italy.png";
import Kenya from "../../../Assets/Images/flag-of-Kenya.png";
import Latvia from "../../../Assets/Images/flag-of-Latvia.png";
import Libya from "../../../Assets/Images/flag-of-Libya.png";
import Lithuania from "../../../Assets/Images/flag-of-Lithuania.png";
import Luxembourg from "../../../Assets/Images/flag-of-Luxembourg.png";
import Mali from "../../../Assets/Images/flag-of-Mali.png";
import Malta from "../../../Assets/Images/flag-of-Malta.png";
import Mauritius from "../../../Assets/Images/flag-of-Mauritius.png";
import Morocco from "../../../Assets/Images/flag-of-Morocco.png";
import Namibia from "../../../Assets/Images/flag-of-Namibia.png";
import Netherlands from "../../../Assets/Images/flag-of-Netherlands.png";
import Niger from "../../../Assets/Images/flag-of-Niger.png";
import Nigeria from "../../../Assets/Images/flag-of-Nigeria.png";
import Portugal from "../../../Assets/Images/flag-of-Portugal.png";
import Singapore from "../../../Assets/Images/flag-of-Singapore.png";
import Slovakia from "../../../Assets/Images/flag-of-Slovakia.png";
import Slovenia from "../../../Assets/Images/flag-of-Slovenia.png";
import SouthSudan from "../../../Assets/Images/flag-of-South-Sudan.png";
import Spain from "../../../Assets/Images/flag-of-Spain.png";
import Sudan from "../../../Assets/Images/flag-of-Sudan.png";
import Tanzania from "../../../Assets/Images/flag-of-Tanzania.png";
import Uganda from "../../../Assets/Images/flag-of-Uganda.png";
import Zambia from "../../../Assets/Images/flag-of-Zambia.png";
import Zimbabwe from "../../../Assets/Images/flag-of-Zimbabwe.png";
import Bangladesh from "../../../Assets/Images/flag-of-Bangladesh.png";

function FlagWithoutDialCode(props) {
    const { countryName } = props;

    if (countryName === "United Kingdom") {
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={unitedKingdom} height="1.25em" width="1.875em" />
        &nbsp;&nbsp; &nbsp;&nbsp;
                {`${countryName}`}
            </div>
        );
    }
    if (countryName === "USA") {
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={UnitedStatesofAmerica} height="1.25em" width="1.875em" />
        &nbsp;&nbsp; &nbsp;&nbsp;
                {`${countryName}`}
            </div>
        );
    }
    if (countryName === "Australia") {
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={Australia} height="1.25em" width="1.875em" />
        &nbsp;&nbsp; &nbsp;&nbsp;
                {`${countryName}`}
            </div>
        );
    }
    if (countryName === "Austria") {
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={Austria} height="1.25em" width="1.875em" />
        &nbsp;&nbsp; &nbsp;&nbsp;
                {`${countryName}`}
            </div>
        );
    }
    if (countryName === "Belgium") {
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={Belgium} height="1.25em" width="1.875em" />
        &nbsp;&nbsp; &nbsp;&nbsp;
                {`${countryName}`}
            </div>
        );
    }
    if (countryName === "Botswana") {
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={Botswana} height="1.25em" width="1.875em" />
        &nbsp;&nbsp; &nbsp;&nbsp;
                {`${countryName}`}
            </div>
        );
    }

    if (countryName === "Cameroon") {
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={Cameroon} height="1.25em" width="1.875em" />
        &nbsp;&nbsp; &nbsp;&nbsp;
                {`${countryName}`}
            </div>
        );
    }
    if (countryName === "Canada") {
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={Canada} height="1.25em" width="1.875em" />
        &nbsp;&nbsp; &nbsp;&nbsp;
                {`${countryName}`}
            </div>
        );
    }
    if (countryName === "Cyprus") {
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={Cyprus} height="1.25em" width="1.875em" />
        &nbsp;&nbsp; &nbsp;&nbsp;
                {`${countryName}`}
            </div>
        );
    }
    if (countryName === "Egypt") {
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={Egypt} height="1.25em" width="1.875em" />
        &nbsp;&nbsp; &nbsp;&nbsp;
                {`${countryName}`}
            </div>
        );
    }
    if (countryName === "Estonia") {
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={Estonia} height="1.25em" width="1.875em" />
        &nbsp;&nbsp; &nbsp;&nbsp;
                {`${countryName}`}
            </div>
        );
    }
    if (countryName === "Ethiopia") {
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={Ethiopia} height="1.25em" width="1.875em" />
        &nbsp;&nbsp; &nbsp;&nbsp;
                {`${countryName}`}
            </div>
        );
    }
    if (countryName === "Finland") {
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={Finland} height="1.25em" width="1.875em" />
        &nbsp;&nbsp; &nbsp;&nbsp;
                {`${countryName}`}
            </div>
        );
    }
    if (countryName === "France") {
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={France} height="1.25em" width="1.875em" />
        &nbsp;&nbsp; &nbsp;&nbsp;
                {`${countryName}`}
            </div>
        );
    }
    if (countryName === "Gambia") {
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={Gambia} height="1.25em" width="1.875em" />
        &nbsp;&nbsp; &nbsp;&nbsp;
                {`${countryName}`}
            </div>
        );
    }
    if (countryName === "Germany") {
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={Germany} height="1.25em" width="1.875em" />
        &nbsp;&nbsp; &nbsp;&nbsp;
                {`${countryName}`}
            </div>
        );
    }

    if (countryName === "Ghana") {
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={Ghana} height="1.25em" width="1.875em" />
        &nbsp;&nbsp; &nbsp;&nbsp;
                {`${countryName}`}
            </div>
        );
    }
    if (countryName === "Greece") {
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={Greece} height="1.25em" width="1.875em" />
        &nbsp;&nbsp; &nbsp;&nbsp;
                {`${countryName}`}
            </div>
        );
    }
    if (countryName === "India") {
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={India} height="1.25em" width="1.875em" />
        &nbsp;&nbsp; &nbsp;&nbsp;
                {`${countryName}`}
            </div>
        );
    }
    if (countryName === "Ireland") {
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={Ireland} height="1.25em" width="1.875em" />
        &nbsp;&nbsp; &nbsp;&nbsp;
                {`${countryName}`}
            </div>
        );
    }
    if (countryName === "Italy") {
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={Italy} height="1.25em" width="1.875em" />
        &nbsp;&nbsp; &nbsp;&nbsp;
                {`${countryName}`}
            </div>
        );
    }
    if (countryName === "Kenya") {
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={Kenya} height="1.25em" width="1.875em" />
        &nbsp;&nbsp; &nbsp;&nbsp;
                {`${countryName}`}
            </div>
        );
    }
    if (countryName === "Latvia") {
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={Latvia} height="1.25em" width="1.875em" />
        &nbsp;&nbsp; &nbsp;&nbsp;
                {`${countryName}`}
            </div>
        );
    }
    if (countryName === "Libya") {
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={Libya} height="1.25em" width="1.875em" />
        &nbsp;&nbsp; &nbsp;&nbsp;
                {`${countryName}`}
            </div>
        );
    }
    if (countryName === "Lithuania") {
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={Lithuania} height="1.25em" width="1.875em" />
        &nbsp;&nbsp; &nbsp;&nbsp;
                {`${countryName}`}
            </div>
        );
    }
    if (countryName === "Luxembourg") {
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={Luxembourg} height="1.25em" width="1.875em" />
        &nbsp;&nbsp; &nbsp;&nbsp;
                {`${countryName}`}
            </div>
        );
    }
    if (countryName === "Mali") {
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={Mali} height="1.25em" width="1.875em" />
        &nbsp;&nbsp; &nbsp;&nbsp;
                {`${countryName}`}
            </div>
        );
    }
    if (countryName === "Malta") {
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={Malta} height="1.25em" width="1.875em" />
        &nbsp;&nbsp; &nbsp;&nbsp;
                {`${countryName}`}
            </div>
        );
    }
    if (countryName === "Mauritius") {
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={Mauritius} height="1.25em" width="1.875em" />
        &nbsp;&nbsp; &nbsp;&nbsp;
                {`${countryName}`}
            </div>
        );
    }
    if (countryName === "Morocco") {
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={Morocco} height="1.25em" width="1.875em" />
        &nbsp;&nbsp; &nbsp;&nbsp;
                {`${countryName}`}
            </div>
        );
    }
    if (countryName === "Namibia") {
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={Namibia} height="1.25em" width="1.875em" />
        &nbsp;&nbsp; &nbsp;&nbsp;
                {`${countryName}`}
            </div>
        );
    }
    if (countryName === "Netherlands") {
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={Netherlands} height="1.25em" width="1.875em" />
        &nbsp;&nbsp; &nbsp;&nbsp;
                {`${countryName}`}
            </div>
        );
    }
    if (countryName === "Niger") {
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={Niger} height="1.25em" width="1.875em" />
        &nbsp;&nbsp; &nbsp;&nbsp;
                {`${countryName}`}
            </div>
        );
    }
    if (countryName === "Nigeria") {
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={Nigeria} height="1.25em" width="1.875em" />
        &nbsp;&nbsp; &nbsp;&nbsp;
                {`${countryName}`}
            </div>
        );
    }
    if (countryName === "Portugal") {
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={Portugal} height="1.25em" width="1.875em" />
        &nbsp;&nbsp; &nbsp;&nbsp;
                {`${countryName}`}
            </div>
        );
    }
    if (countryName === "Singapore") {
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={Singapore} height="1.25em" width="1.875em" />
        &nbsp;&nbsp; &nbsp;&nbsp;
                {`${countryName}`}
            </div>
        );
    }
    if (countryName === "Slovakia") {
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={Slovakia} height="1.25em" width="1.875em" />
        &nbsp;&nbsp; &nbsp;&nbsp;
                {`${countryName}`}
            </div>
        );
    }
    if (countryName === "Slovenia") {
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={Slovenia} height="1.25em" width="1.875em" />
        &nbsp;&nbsp; &nbsp;&nbsp;
                {`${countryName}`}
            </div>
        );
    }
    if (countryName === "South Sudan") {
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={SouthSudan} height="1.25em" width="1.875em" />
        &nbsp;&nbsp; &nbsp;&nbsp;
                {`${countryName}`}
            </div>
        );
    }
    if (countryName === "Spain") {
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={Spain} height="1.25em" width="1.875em" />
        &nbsp;&nbsp; &nbsp;&nbsp;
                {`${countryName}`}
            </div>
        );
    }
    if (countryName === "Sudan") {
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={Sudan} height="1.25em" width="1.875em" />
        &nbsp;&nbsp; &nbsp;&nbsp;
                {`${countryName}`}
            </div>
        );
    }
    if (countryName === "Tanzania") {
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={Tanzania} height="1.25em" width="1.875em" />
        &nbsp;&nbsp; &nbsp;&nbsp;
                {`${countryName}`}
            </div>
        );
    }
    if (countryName === "Uganda") {
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={Uganda} height="1.25em" width="1.875em" />
        &nbsp;&nbsp; &nbsp;&nbsp;
                {`${countryName}`}
            </div>
        );
    }
    if (countryName === "Zambia") {
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={Zambia} height="1.25em" width="1.875em" />
        &nbsp;&nbsp; &nbsp;&nbsp;
                {`${countryName}`}
            </div>
        );
    }
    if (countryName === "Zimbabwe") {
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={Zimbabwe} height="1.25em" width="1.875em" />
        &nbsp;&nbsp; &nbsp;&nbsp;
                {`${countryName}`}
            </div>
        );
    }
    if (countryName === "Bangladesh") {
        return (
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={Bangladesh} height="1.25em" width="1.875em" />
        &nbsp;&nbsp; &nbsp;&nbsp;
                {`${countryName}`}
            </div>
        );
    } else {
        return null;
    }
}
export default FlagWithoutDialCode;
