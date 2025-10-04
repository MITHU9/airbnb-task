import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import PropertyCard2 from "./PropertyCard2,";

const PropertiesListWithMap = ({ properties, isLoading }) => {
  if (isLoading) return <div className="p-10">Loading...</div>;
  if (!properties?.length) return <div className="p-10">No results found.</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-screen mt-4 overflow-y-clip">
      {/* Left: Property List */}
      <div className="col-span-2 lg:col-span-1 overflow-y-hidden p-4 space-y-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {properties.map((property) => (
          <PropertyCard2 key={property._id} property={property} />
        ))}
      </div>

      {/* Right: Map */}
      <div className="relative hidden lg:block">
        <MapContainer
          center={[
            properties[0].coordinates.lat,
            properties[0].coordinates.lng,
          ]}
          zoom={12}
          scrollWheelZoom={false}
          className="h-full w-full rounded-lg"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {properties.map((p) => (
            <Marker
              key={p._id}
              position={[p.coordinates.lat, p.coordinates.lng]}
            >
              <Popup>
                <div className="text-sm font-semibold">{p.title}</div>
                <div>${p.price}</div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default PropertiesListWithMap;
