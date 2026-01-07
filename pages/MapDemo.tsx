
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix for default Leaflet marker icons in React
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Mock Data for RS cities
const LOCATIONS = [
  { id: 1, name: "Porto Alegre", coords: [-30.0346, -51.2177], votes2022: 15400, votes2016: 12000, mayor: "Sebastião Melo" },
  { id: 2, name: "Caxias do Sul", coords: [-29.1691, -51.1794], votes2022: 5600, votes2016: 4500, mayor: "Adiló Didomenico" },
  { id: 3, name: "Pelotas", coords: [-31.7654, -52.3376], votes2022: 8900, votes2016: 8100, mayor: "Paula Mascarenhas" },
  { id: 4, name: "Santa Maria", coords: [-29.6842, -53.8069], votes2022: 4200, votes2016: 3800, mayor: "Jorge Pozzobom" },
  { id: 5, name: "Passo Fundo", coords: [-28.2628, -52.4087], votes2022: 3100, votes2016: 2200, mayor: "Pedro Almeida" },
];

const MapDemo: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 h-[calc(100vh-140px)] flex flex-col">
       <div className="flex justify-between items-center border-b border-gray-200 pb-5 flex-shrink-0">
        <div>
           <h2 className="text-3xl font-bold text-gray-900">Mapa Territorial Avançado</h2>
           <p className="text-gray-500 mt-2">Visualização geo-eleitoral (Demo: Rio Grande do Sul)</p>
           <p className="text-red-600 font-bold text-xs mt-1 uppercase tracking-tight">
             * campo dedicado à equipe interna
           </p>
        </div>
      </div>

      <div className="flex-1 rounded-xl overflow-hidden border border-gray-200 shadow-sm relative z-0">
        <MapContainer 
          center={[-30.0346, -51.2177]} 
          zoom={7} 
          scrollWheelZoom={true} 
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          {LOCATIONS.map(loc => (
            <Marker key={loc.id} position={loc.coords as [number, number]} icon={icon}>
              <Popup>
                <div className="p-1">
                  <h3 className="font-bold text-indigo-700 text-lg mb-1">{loc.name}</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><strong>Prefeito:</strong> {loc.mayor}</p>
                    <p><strong>Votos 2022:</strong> {loc.votes2022.toLocaleString()}</p>
                    <p><strong>Votos 2016:</strong> {loc.votes2016.toLocaleString()}</p>
                    <div className="mt-2 pt-2 border-t border-gray-200">
                       <span className={`text-xs font-bold ${loc.votes2022 > loc.votes2016 ? 'text-green-600' : 'text-red-500'}`}>
                         {loc.votes2022 > loc.votes2016 ? '▲ Crescimento' : '▼ Queda'}
                       </span>
                    </div>
                  </div>
                  <button className="mt-3 w-full bg-indigo-600 text-white text-xs py-1 rounded hover:bg-indigo-700">
                    + Detalhes
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Floating Legend */}
        <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg z-[400] text-sm">
          <h4 className="font-bold mb-2 text-gray-800">Legenda</h4>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full bg-indigo-600"></div>
            <span>Base Forte</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-400"></div>
            <span>Oportunidade</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapDemo;
