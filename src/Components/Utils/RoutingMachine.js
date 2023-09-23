import { MapLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { withLeaflet } from "react-leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

class Routing extends MapLayer {
  createLeafletElement() {
    const { map, waypoints } = this.props;
    let leafletElement = L.Routing.control({
      waypoints: waypoints,
      show: false,
      lineOptions: {
        styles: [{ color: "#1890ff", opacity: 0.8, weight: 6 }]
      },
      position: "bottomright"
      // styles: [{color: 'black', opacity: 0.15, weight: 9}, {color: 'white', opacity: 0.8, weight: 6}, {color: 'green', opacity: 1, weight: 20}]
    }).addTo(map.leafletElement);
    return leafletElement.getPlan();
  }
}
export default withLeaflet(Routing);
