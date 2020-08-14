<template>
  <div>
    <v-card-title>
      {{tabname}}
    </v-card-title>
    <v-card-text>Intro: bevindingen op basis van gebruik datasets
    </v-card-text>

    <v-expansion-panels
    max:1
    multiple: False
    >
    <v-expansion-panel>
      <v-expansion-panel-header>1. Historische daling het grootst in de binnenstad.'</v-expansion-panel-header>
      <v-expansion-panel-content>
        Dit kan worden afgeleid uit boorbeschrijvingen en eigenschappen van veen <a href="https://bodembeweging.netlify.app/#/data">(data)</a>.  De top van de veenlaag onder Gouda lag rond het jaar 1000 na Chr. aan maaiveld op een niveau op of boven NAP. ‘Op dit moment’ neemt de hoogteligging van de top van het (niet afgegraven) veen stapsgewijs af van het buitengebied ten ZW van Korte Akkeren (ca. 2 m –NAP), naar Korte Akkeren (ca 4 m –NAP), naar het noordelijk deel van de binnenstad (5-6 m –NAP) (Fig 1.1). De totale bodemdaling van het ‘oorspronkelijk’ maaiveld in het noordelijk deel van de binnenstad bedraagt dus rond de 5 a 6 m voor het afgelopen millennium, gemiddeld grofweg een halve centimeter per jaar.
        De verschillen in de historische bodemdaling kunnen hoofdzakelijk worden toegeschreven aan verschillen in de mate van ophoging (Fig. 1.1). Elke nieuwe ophoging zorgt voor extra gewicht dat drukt op het veen. Een groter gewicht zorgt voor grotere samendrukking/compactie van het veen. Dit wordt bevestigd door de compactiegraad (dikteafname t.o.v. de oorspronkelijke dikte) die is afgeleid uit eigenschappen van veenmonsters (ref. dataset). Die laat een toename van de compactiegraad zien van het buitengebied (ca 30%) naar Korte Akkeren (ca 45-50%) naar de binnenstad (ca 60%) (Fig 1.2).
N.B. de huidige, of recente, snelheid van daling van het maaiveld hangt af van de recente ontwikkelingen; het historisch gemiddelde is daarvoor niet representatief. Het huidige maaiveldniveau is het resultaat van een het samenspel van bodemdaling en ophoging. Ondanks de grote historische bodemdaling in de binnenstad ligt het maaiveld in de binnenstad over het algemeen hoger dan in de omgeving door de grote ophoogdikte (Fig 1.1).

      </v-expansion-panel-content>

      <v-expansion-panel-header>2. Recente daling over het algemeen groter in buitenwijken.</v-expansion-panel-header>
      <v-expansion-panel-content>
        Dit valt op te maken uit radarsatellietmetingen (<a href="https://bodembeweging.netlify.app/#/data">data</a>) met data voor  de periode 2013-2016 (Fig 2.1).  Vrij grote dalingssnelheden van 10 - 30 mm/jaar (rood) komen vooral voor in buitenwijken. Vaak hangen deze samen met werkzaamheden (ophogingen) die relatief kort voor 2013 zijn uitgevoerd. In de binnenstad zijn de dalingssnelheden over het algemeen kleiner ( 5 mm/jaar).De volgende factoren dragen waarschijnlijk bij aan dit beeld:
        <v-card-text>
        <div>1. Langere historie van belasting en grotere belasting in de binnenstad. Daardoor is het veen sterker gecompacteerd en minder gevoelig voor verdere belasting dan in jongere wijken.</div>
        <div>2. Door de lagere bodemdalingssnelheden in de binnenstad wordt er minder frequent  (en is er minder recent) opgehoogd dan in omliggende wijken.</div>
        </v-card-text>
      </v-expansion-panel-content>

      <v-expansion-panel-header>3. Bodemdalingsgevoeligheid in de binnenstad variabel.</v-expansion-panel-header>
      <v-expansion-panel-content>
        To be filled...
      </v-expansion-panel-content>

    </v-expansion-panel>
  </v-expansion-panels>
  </div>
</template>

<script>
// import arrayDiff from '@/lib/get-arrays-difference';
// import { formatIdToLabel } from '@/lib/format-id-to-label';
// import buildWmsLayer from '@/lib/build-wms-layer';
import { tab2_name } from "../../../config/datalayers-config";

export default {
  data: () => ({
    // links: ['1. Historische daling het grootst in de binnenstad.',
    //         '2. Recente daling over het algemeen groter in buitenwijken.',
    //         '3. Bodemdalingsgevoeligheid in de binnenstad variabel.',
    //         '4. Veenoxidatie speelt niet of nauwelijks een rol (rol belasting dominant, rol grondwaterpeiluitzakkingen/verlagingen onzeker).',
    //         '5. Grondwaterpeil zakt lokaal onder rioolbuisniveau (Chen data).',
    //         '6. Impact van verlaging boezempeil binnenstad variabel.',
    //         '7. Hoeveel kan Gouda nog zakken?'],
    visibleLayers: [],
    // items: items_tab2,
  }),
  computed:{
    tabname() {
      return tab2_name;
  }},

  // methods: {
  //   addLayer(layer) {
  //     const wmsLayer = buildWmsLayer(layer);
  //     this.$store.commit('mapbox/ADD_RASTER_LAYER', wmsLayer);

  //   },

  //   removeLayer(layerId) {
  //     this.$store.commit('mapbox/REMOVE_RASTER_LAYER', layerId);

  //   },

  //   formatIdToLabel(id) {
  //     return formatIdToLabel(id);
  //   }
  //  },

  // watch: {
  //   visibleLayers(newArray, oldArray) {
  //     const removeLayerId = newArray.length < oldArray.length;
  //     if(removeLayerId) {
  //       const layerToRemoveId = arrayDiff(oldArray, newArray)[0];
  //       this.removeLayer(layerToRemoveId);
  //       this.$store.commit('mapbox/SET_LEGEND_LAYER', null);
  //     }
  //     else {
  //       const layerToAddId = arrayDiff(newArray, oldArray)[0];
  //       var layerToAdd;
  //       for (var i=0; i < this.items.length; i++) {
  //         var child = this.items[i].children;
  //         for (var m=0; m < child.length; m++) {
  //           if (child[m].id == layerToAddId){
  //              layerToAdd = child[m];
  //           }
  //         }
  //       }
  //       // const layerToAdd = layers_to_show.find(({ id }) => id === layerToAddId);
  //       this.addLayer(layerToAdd);
  //       this.$store.commit('mapbox/SET_LEGEND_LAYER', layerToAdd.layer);
  //     }
  //   }
  // }
};
</script>
