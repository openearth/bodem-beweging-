export const xmlRequestTemplate2 = ({ functionId, transect, outputId, inputId }) => `
<wps:Execute xmlns:wps="http://www.opengis.net/wps/1.0.0" version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">
	<ows:Identifier xmlns:ows="http://www.opengis.net/ows/1.1">${ functionId }</ows:Identifier>
	<wps:DataInputs>
      ${wpsInput(transect, inputId)}
    </wps:DataInputs>
    <wps:ResponseForm>
      <wps:RawDataOutput mimeType="application/json">
        <ows:Identifier xmlns:ows="http://www.opengis.net/ows/1.1">${ outputId }</ows:Identifier>
      </wps:RawDataOutput>
    </wps:ResponseForm>
  </wps:Execute>
`;

function wpsInput(inputs, inputId) {
  return `
    <wps:Input>
      <ows:Identifier xmlns:ows="http://www.opengis.net/ows/1.1">${ inputId }</ows:Identifier>
      <ows:Title xmlns:ows="http://www.opengis.net/ows/1.1">Please draw a transect [double-click to finish] and click Execute</ows:Title>
      <wps:Data>
        <wps:LiteralData>${ inputs[0][0] + "," + inputs[0][1] }</wps:LiteralData>
      </wps:Data>
    </wps:Input>
  `;
}
