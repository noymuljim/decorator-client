import 'leaflet/dist/leaflet.css'
import { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useLoaderData } from 'react-router';
const Map = () => {
    const position = [24.4449, 90.7766];
    const serviceCenters = useLoaderData();

    const mapRef = useRef(null)

    const handleSearch = (e) => {
        e.preventDefault()
        const location = e.target.location.value;

        const district = serviceCenters.find(c => c.district.toLowerCase()
            .includes(location.toLowerCase()));

        if (district) {
            const coord = [district.latitude, district.longitude]
            mapRef.current.flyTo(coord, 14)
        }

    }

    return (
        <div>
            <h2 className='my-10  font-bold text-3xl text-center'>We are available in your district!</h2>



            <div className='flex flex-col-reverse lg:flex-row gap-6'>
                <div className=' w-full h-[800px] flex-2 w-full'>
                    <MapContainer ref={mapRef} className='h-[800px]' center={position} zoom={13} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {
                            serviceCenters.map((center, index) =>
                                <Marker key={index} position={[center.latitude, center.longitude]}>
                                    <Popup>
                                        <strong>{center.district}</strong> <br />
                                        Service Area: {center.covered_area.join(', ')}                </Popup>
                                </Marker>)
                        }
                    </MapContainer>
                </div>


                      
                <div className="flex-1 lg:w-1/3 flex items-center justify-center h-[600px]">
                    <div className="w-full max-w-md space-y-4">
                        <h3 className="text-xl font-semibold text-center">Find Service Area</h3>
                        <p className="text-center text-gray-500">
                            Search your district to find decorators available near you
                        </p>

                        <form
                            onSubmit={handleSearch}
                            className="flex items-center w-full bg-white rounded-full px-4 py-2 gap-3"
                        >
                            
                            <svg
                                className="h-5 w-5 text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.3-4.3" />
                            </svg>

                            
                            <input
                                name="location"
                                type="search"
                                placeholder="Search here"
                                className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
                            />

                         
                            <button
                                type="submit"
                                className="bg-primary text-white font-medium px-6 py-2 rounded-full transition"
                            >
                                Search
                            </button>
                        </form>
                    </div>
                </div>
            </div>


        </div>

    );
};

export default Map;