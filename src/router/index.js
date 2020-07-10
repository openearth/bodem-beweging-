import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

import BoreholeData from '@/views/BoreholeData';
import Timeseries from '@/views/Timeseries';
import StaticData from '@/views/StaticData';
import Intro from '@/views/Intro';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/intro'
  },
  {
    path: '/intro',
    name: 'intro',
    component: Intro
  },
  {
    path: '/boreholedata',
    name: 'Borehole data',
    component: BoreholeData
  },
  {
    path: '/timeseriesdata',
    name: 'Timeseries data',
    component: Timeseries
  },
  {
    path: '/staticdata',
    name: 'Static data',
    component: StaticData
  },

];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  store.commit('mapbox/RESET_ALL');
  next();
});

export default router;
