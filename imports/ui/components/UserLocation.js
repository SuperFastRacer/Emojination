import React from 'react';
import Geolocation from 'react-geolocation';



export default () => {
    return (
      <Geolocation
      render={({
        fetchingPosition,
        position: { coords: { latitude, longitude } = {} } = {},
        error,
        getCurrentPosition
      }) =>
        <div >
                <div>Fetching Position: {fetchingPosition}</div>
          {error &&
            <div>
              {error.message}
            </div>}
          <pre>
            latitude: {this.latitude}
            longitude: {this.longitude}
          </pre>
        </div>}
    />
    );
  };


  
