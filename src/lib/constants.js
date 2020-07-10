const CENTER_LATITUDE = 52.01;
const CENTER_LONGITUDE = 4.71;


export const MAP_CENTER = [
  CENTER_LONGITUDE,
  CENTER_LATITUDE
];

export const MAP_ZOOM = 13;

export const MAP_BASELAYERS = [
  'light',
  'streets',
].map(layer => ({
  style: `mapbox://styles/mapbox/${ layer }-v9`,
  title: layer,
  thumbnail: `/thumbnails/${ layer }.png`
}));

export const MAP_BASELAYER_DEFAULT = MAP_BASELAYERS[0];
