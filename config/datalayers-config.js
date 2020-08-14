
const app_name = "Bodembeweging";
const tab1_name = "Introductie";
const tab2_name = "Bodemdalingsinzichten";
const tab3_name = "Datasets";


const items_tab3 = [
  {
    id: 1,
    name:'Ondergrond opbouw',
    children:[
      { id: 'boreholes', name: 'Boringen' , layer: 'bodem:borehole_locations'},
    ]
  },
  {
    id: 2,
    name:'Grondwater',
    children:[
      { id: 'groundwater', name: 'Wareco portal data' , layer: 'bodem:groundwater_locations'},
    ]
  }

];


// WPS configurations

// This dictionary defines which layer has corresponding WPS service: LayerId : WpsId
const wpsDict = {
  'boreholes': 'bodembore_plots',
  'groundwater': 'bodem_gw_plots'
};
// This dictionary defines the relevant location attribute per layer or the attribute used for the WPS call
const locDict = {
  'boreholes': 'locationkey',
  'groundwater' : 'name'
};

export { app_name, tab1_name, tab2_name, tab3_name, items_tab3, wpsDict, locDict};
