import { createSelector } from "reselect";
import _ from "lodash";

const partners = (partner) => partner.partners;
const partnersMap = (partner) => partner.partnerByUserId;




export const partnerMapSelector = createSelector(
  [partnersMap],
  (partnersMap) => {
    //////debugger;
    const partnerAdresses = [];
    var locality1, locality2, street, city, state, zip, country;
    _.forEach(partnersMap, (component) => {
      var latlng = _.get(component, "address");
      _.forEach(latlng, (l) => {
        console.log(l);
        if (l.latitude && l.longitude) {
            partnerAdresses.push({
            lat: Number(l.latitude),
            lng: Number(l.longitude),
            name: component.accountName,
            type: l.addressType,
            data: component,
            // address: `{}`
          });
        }
      });
    });
    return partnerAdresses;
  }
);







