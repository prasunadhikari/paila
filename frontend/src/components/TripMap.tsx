import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type Props = {
  lat: number;
  lng: number;
  destination: string;
};

export default function TripMap({
  lat,
  lng,
  destination,
}: Props) {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={9}
      style={{
        height: "450px",
        width: "100%",
        borderRadius: "24px",
      }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[lat, lng]}>
        <Popup>{destination}</Popup>
      </Marker>
    </MapContainer>
  );
}