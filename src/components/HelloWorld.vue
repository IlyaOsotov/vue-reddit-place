<template>
  <div 
    v-on:click="addPoint" 
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
    <!-- <compact-picker v-model="colors"/> -->
  </div>
</template>

<script>
import { Compact } from 'vue-color';
import db from '../apiStore';

let colors = '#194d33';
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
    // db.collection('points').add({
    //   color: '#194d33',
    //   x: Math.floor(Math.random() * 100),
    //   y: Math.floor(Math.random() * 100),
    // });
  },
  methods: {
    addPoint() {
      console.log(123)
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
