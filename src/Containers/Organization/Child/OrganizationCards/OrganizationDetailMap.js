import React, { Component } from 'react';
import _ from 'lodash'
import { MainWrapper } from "../../../../Components/UI/Layout";
import { Leaflet } from '../../../../Components/Utils'
class OrganizationDetailMap extends Component {
    render() {
        // const { organizationFetching: { address } } = this.props;
        const position = [];
        position.push({ lat: Number(51.92301029999999), lng: Number(4.470038700000032), name: 'slack' })
        // _.forEach(accounts, (component) => {
        //     var latlng = _.get(component, 'address');
        // _.forEach(address, (l) => {
        //     if (l.latitude && l.longitude) {
        //         position.push({
        //             lat: Number(l.latitude),
        //             lng: Number(l.longitude),
        //             name: component.accountName,
        //         })
        //     }
        // })
        // });
        return (
            <MainWrapper style={{ padding: 0 }}>
                <Leaflet
                    height={180}
                    width={'auto'}
                    margin={5}
                    zoom={9}
                    centerPosition={[Number(51.92301029999999), Number(4.470038700000032)]}
                    markers={position && position}
                />
            </MainWrapper>
        );
    }
}

export default OrganizationDetailMap;
