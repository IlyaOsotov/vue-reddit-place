import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pixels: {},
  },
  mutations: {
    setPixels(state, pixels) {
      state.pixels = pixels;
    },
    addPixel(state, pixel) {
      state.pixels.push(pixel);
    },
  },
});
