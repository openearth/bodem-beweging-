
import baseRepo from './_base';
import { map, path, pathOr, compose } from 'ramda';
import { xmlRequestTemplate2 } from './_xml-template_wps';

const transectRepo = {


  getTransect(lineCoordinates) {
    var self = this;
    const template = xmlRequestTemplate2({
      functionId: 'bodemtime_plots',
      inputId: 'location',
      transect: lineCoordinates,
      outputId: 'output_html'
    });
    // console.log(template)
    return baseRepo({
      method: 'post',
      data: template,
      timeout:50000,
      headers: {'Content-Type': 'application/xml'},

    })
    // .then(({ data }) => convert.xml2js(data, { compact: true, spaces: 2}))
    .then(data => formatDataIntoLinks(data, self));
  },


};
function formatDataIntoLinks(data) {
  // 🐏
  // console.log(data)
  const formatLink = feature => {
  const url = path([],feature);
    return {
      name: "Timeseries plot",
      url
    };
  };

  const buildLinks = compose(
    map(formatLink),
    val => Array.isArray(val) ? val : [val],
    pathOr([], ['data'])
  );
  return buildLinks(data);
}

export default transectRepo;
