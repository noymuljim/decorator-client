import 'leaflet/dist/leaflet.css';
import { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useLoaderData } from 'react-router';

const Map = () => {
    const position = [24.4449, 90.7766];
    const serviceCenters = useLoaderData() || [];
    const mapRef = useRef(null);

    const handleSearch = (e) => {
        e.preventDefault();
        const location = e.target.location.value;
        if (!location) return;

        const district = serviceCenters.find(c => 
            c.district.toLowerCase().includes(location.toLowerCase())
        );

        if (district) {
            const coord = [district.latitude, district.longitude];
            mapRef.current.flyTo(coord, 12, { animate: true });
        }
    };

    const handleQuickSelect = (center) => {
        const coord = [center.latitude, center.longitude];
        mapRef.current.flyTo(coord, 12, { animate: true });
    };

    return (
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            {/* Header Section */}
            <div className="text-center max-w-2xl mx-auto space-y-3">
                
                <h2 className="font-extrabold text-4xl sm:text-5xl text-base-content tracking-tight">
                    We Are Available in <span className="text-primary">Your District!</span>
                </h2>
                <p className="text-base-content/70 text-base sm:text-lg leading-relaxed">
                    Search or select your district below to find decorator teams ready near your venue.
                </p>
            </div>

            {/* Main Interactive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Search Panel Card */}
                <div className="lg:col-span-4 bg-base-100/90 backdrop-blur-md border border-base-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold text-base-content">Find Service Area</h3>
                        <p className="text-sm text-base-content/70">
                            Type your district name to instantly locate our regional hubs on the map.
                        </p>
                    </div>

                    {/* Search Form */}
                    <form
                        onSubmit={handleSearch}
                        className="flex items-center w-full bg-base-200/60 border border-base-300 rounded-2xl p-1.5 gap-2 focus-within:border-primary transition-colors"
                    >
                        <div className="pl-3 text-base-content/40">
                            <svg
                                className="h-5 w-5"
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
                        </div>

                        <input
                            name="location"
                            type="search"
                            placeholder="e.g. Dhaka, Kishoreganj..."
                            className="flex-1 bg-transparent outline-none text-base-content placeholder:text-base-content/40 text-sm px-2 py-2"
                        />

                        <button
                            type="submit"
                            className="btn btn-primary text-primary-content rounded-xl px-6 font-semibold shadow-md shadow-primary/20 hover:scale-105 transition-all"
                        >
                            Search
                        </button>
                    </form>

                    {/* Quick District Chips */}
                    <div className="space-y-3 pt-2 border-t border-base-200">
                        <span className="text-xs font-bold uppercase tracking-wider text-base-content/50 block">
                            Popular Districts
                        </span>
                        <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-1">
                            {serviceCenters.slice(0, 8).map((center, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => handleQuickSelect(center)}
                                    className="px-3.5 py-1.5 text-xs font-semibold rounded-full bg-base-200 hover:bg-primary hover:text-primary-content text-base-content transition-all duration-200 border border-base-300"
                                >
                                    {center.district}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Map Display Box */}
                <div className="lg:col-span-8 w-full h-[550px] lg:h-[650px] rounded-3xl overflow-hidden shadow-2xl border border-base-200 bg-base-200">
                    <MapContainer 
                        ref={mapRef} 
                        className='w-full h-full z-0' 
                        center={position} 
                        zoom={9} 
                        scrollWheelZoom={false}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {
                            serviceCenters.map((center, index) =>
                                <Marker key={index} position={[center.latitude, center.longitude]}>
                                    <Popup className="rounded-xl overflow-hidden">
                                        <div className="p-1 space-y-1">
                                            <strong className="text-base text-primary font-bold">{center.district}</strong> <br />
                                            <span className="text-xs text-gray-600 font-medium">Covered Areas:</span>
                                            <p className="text-xs text-gray-800">{center.covered_area.join(', ')}</p>
                                        </div>
                                    </Popup>
                                </Marker>
                            )
                        }
                    </MapContainer>
                </div>

            </div>
        </section>
    );
};

export default Map;