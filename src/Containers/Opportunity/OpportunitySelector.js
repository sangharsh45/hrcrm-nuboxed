import { createSelector } from "reselect";
import _ from "lodash";

const candidates = (candidate) => candidate.candidates;
const opportunityMap = (opportunity) => opportunity;




export const opportunityMapSelector = createSelector(
  [opportunityMap],
  (opportunityMap) => {
  debugger;
    const opportunityAdresses = [];
    // const addresses = accounts.map((account) => {
    //     if (account.address[0].latitude !== undefined  && account.address[0].longitude!== undefined) {
    //         return {
    //             lat: account.address && account.address[0].latitude,
    //             lng: account.address && account.address[0].longitude,
    //         }
    //     }
    // })
    // var address = _.get(accounts[0], 'address_components');
    var locality1, locality2, street, city, state, zip, country;
    _.forEach(opportunityMap, (component) => {
      var latlng = _.get(component, "address");
      _.forEach(latlng, (l) => {
        console.log(l);
        if (l.latitude && l.longitude) {
            opportunityAdresses.push({
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
    return opportunityAdresses;
  }
);







