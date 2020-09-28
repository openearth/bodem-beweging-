<template>
  <v-navigation-drawer
    clipped
    app
    permanent
    width="500"
  >
    <v-row>
      <v-col :cols="12">
        <router-view />
      </v-col>
    </v-row>
  </v-navigation-drawer>
</template>
