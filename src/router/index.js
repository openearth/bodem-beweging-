import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

// import BoreholeData from '@/views/BoreholeData';
// import GroundwaterData from '@/views/GroundwaterData';
// import Timeseries from '@/views/Timeseries';
// import StaticData from '@/views/StaticData';
// import Intro from '@/views/Intro';
import Tab1 from '../components/views/Tab1';
import Tab2 from '../components/views/Tab2';
import Tab3 from '../components/views/Tab3';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/intro'
  },
  {
    path: '/intro',
    name: 'intro',
    component: Tab1
  },
  {
    path: '/inzichten',
    name: 'inzichten',
    component: Tab2
  },
  {
    path: '/data',
    name: 'data',
    component: Tab3
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  store.commit('mapbox/RESET_ALL');
  next();
});

export default router;
