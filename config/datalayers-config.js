
const app_name = "Bodembeweging";
const intro_tab = "Introduction";
const tab1_name = "Borehole data";
const tab2_name = "Timeseries data";
const tab3_name = "Static data";

const items_tab1 = [
  {
    id: 1,
    name:'Borehole locations',
    children:[
      { id: 'boreholes', name: 'Borehole locations' , layer: 'bodem:borehole_locations'},
    ]
  }
];

const items_tab2 = [
  {
    id: 1,
    name: 'Leaf Area Index',
    children: [
      { id: 'LAI00000_01', name:'LAI00000 01', layer: 'rhine:LAI00000_01' },
      { id: 'LAI00000_02', name:'LAI00000 02', layer: 'rhine:LAI00000_02' },
      { id: 'LAI00000_03', name:'LAI00000 03', layer: 'rhine:LAI00000_03' },
      { id: 'LAI00000_04', name:'LAI00000 04', layer: 'rhine:LAI00000_04' },
      { id: 'LAI00000_05', name:'LAI00000 05', layer: 'rhine:LAI00000_05' },
      { id: 'LAI00000_06', name:'LAI00000 06', layer: 'rhine:LAI00000_06' },
      { id: 'LAI00000_07', name:'LAI00000 07', layer: 'rhine:LAI00000_08' },
      { id: 'LAI00000_09', name:'LAI00000 09', layer: 'rhine:LAI00000_09' },
      { id: 'LAI00000_10', name:'LAI00000 10', layer: 'rhine:LAI00000_10' },
      { id: 'LAI00000_11', name:'LAI00000 11', layer: 'rhine:LAI00000_11' },
      { id: 'LAI00000_12', name:'LAI00000 12', layer: 'rhine:LAI00000_12' },
    ],
  },
  {
    id: 2,
    name:'Water bodies',
    children:[
      { id: 'lakes', name: 'Lakes' , layer: 'rhine:lakes'},
      { id: 'rivers', name: 'Rivers',layer: 'rhine:rivers'},
      { id: 'reservoirs', name: 'Reservoirs',layer: 'rhine:reservoirs'},

    ]
  },
  {
    id: 3,
    name:'General info',
    children:[
      { id: 'dem', name: 'Digital elevation model' , layer: 'rhine:dem'},
      { id: 'landuse', name: 'Land use',layer: 'rhine:landuse'},
      { id: 'rootingdepth', name: 'Roothing depth',layer: 'rhine:rootingdepth'},

    ]
  }
];

export { app_name, intro_tab, tab1_name, tab2_name, tab3_name, items_tab1, items_tab2 };
