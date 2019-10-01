<template>
  <div 
    v-on:click="handlePicker" 
    class="hello"
    v-bind:style="{
      position: 'absolute',
      width: '10000px',
      height: '10000px',
    }"
  >
    <div 
      v-for="pixel in pixels" :key="pixel.id"
      v-bind:style="{
        position: 'absolute',
        'display': 'inline-block',
        left: pixel.x * PIXEL_SIZE + 'px',
        top: pixel.y * PIXEL_SIZE + 'px',
        width: PIXEL_SIZE + 'px',
        height: PIXEL_SIZE + 'px', 
        backgroundColor: pixel.color,
      }"
    >
    </div>
    {{this.selectedCoordinate}} && <div v-bind:style="{
      position: 'absolute',
      left: this.selectedCoordinate.x * PIXEL_SIZE + 'px',
      top: this.selectedCoordinate.y * PIXEL_SIZE + 'px',
    }">
      <compact-picker v-if="!isHidden" v-model="colors" @input="setColor"/>
    </div>
  </div>
</template>

<script>
import { Compact } from 'vue-color';
import db from '../apiStore';

let colors = '#194d33';
let isHidden = true;
let selectedCoordinate = {};
const PIXEL_SIZE = 10;

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  components: {
    'compact-picker': Compact,
  },
  created: function () {
    db.collection('points').onSnapshot(coll => {
      this.$store.commit('setPixels', coll.docs.map(doc => doc.data()))
    })
  },
  methods: {
    handlePicker(event) {
      const coordinate = {
        x: Math.floor(event.clientX / PIXEL_SIZE) - 1,
        y: Math.floor(event.clientY / PIXEL_SIZE) - 6
      }
      this.selectedCoordinate = coordinate;
      this.isHidden = !this.isHidden;
    },
    setColor(value) {
      db.collection('points').add({
        color: value.hex,
        x: this.selectedCoordinate.x,
        y: this.selectedCoordinate.y,
      });
    }
  },
  computed: {
    pixels() {
      return this.$store.state.pixels;
    }
  },
  data() {
    return {
      colors,
      isHidden,
      selectedCoordinate,
      PIXEL_SIZE
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
