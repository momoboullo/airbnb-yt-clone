import ReactMapGL, { Marker, Popup } from "react-map-gl";
import React, { useState } from "react";
import getCenter from "geolib/es/getCenter";
import result from "postcss/lib/result";

function Map({ searchResults }) {
  const [selectLocation, setSelectedLocation] = useState({});
  // TranselectedLocation, setform the search results object into the {latitude: 52.516556, longitude: 13.545225555 } object

  const coordinates = searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  const center = getCenter(coordinates);

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/boullo/cks34ata03uut17p7t03qyznq"
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(viewport) => setViewport(viewport)}
    >
      {searchResults.map((result) => (
        <div key={result.long}>
          <Marker longitude={result.long} latitude={result.lat}>
            <p
              onClick={() => setSelectedLocation(result)}
              className="cursor-pointer text-2xl animated-bounce"
              aria-label="push-pin"
            >
              📌
            </p>
          </Marker>

          {selectLocation.long === result.long ? (
            <Popup
              onClose={() => setSelectedLocation({})}
              closeOnClick={true}
              latitude={result.lat}
              longitude={result.long}
            >
              {result.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default Map;
