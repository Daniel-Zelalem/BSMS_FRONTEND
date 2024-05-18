import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { icon } from "leaflet";

const ICON = icon({
  iconUrl: "/circle.png",
  iconSize: [30, 30],
});

const Map = ({ width, height, coordinates, propName }) => {
  return (
    <div className="flex justify-center items-center mt-8 mb-5">
      <MapContainer
        center={[coordinates.lat, coordinates.lng]}
        zoom={7}
        scrollWheelZoom={false}
        style={{ height: height, width: width }}
        className="rounded-md shadow-md"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker icon={ICON} position={[coordinates.lat, coordinates.lng]}>
          <Popup>{propName}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
