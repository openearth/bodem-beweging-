import buildGeoserverUrl from './build-geoserver-url';

const defaultUrl = process.env.VUE_APP_GEOSERVER_BASE_URL;

export default ({ url=defaultUrl, id, layer }) => {
  const tile = buildGeoserverUrl({
    url,
    service: 'WFS',
    version: '2.0',
    request: 'GetFeature',
    typeNames: layer,
    outputFormat: 'application/json'
  });

  return {
    id,
    source: {
      data: tile,
      tolerance: 3.5,
      type: 'geojson',

    },
    type:'circle',
    layout: {},
    // paint: {
    //   'circle-radius': 5,
    //   "circle-opacity" : 0.7,
    //   'circle-color':  '#bbe73f'
    // }
  };
};
