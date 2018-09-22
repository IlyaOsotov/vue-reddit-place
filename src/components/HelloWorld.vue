<template>
  <div class="hello">
    <h1 v-on:click="incrementCount">{{ msg }}</h1>
    <compact-picker v-model="colors"/>
  </div>
</template>

<script>
import { Compact } from 'vue-color';
import db from '../apiStore';

let colors = '#194d33';

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  components: {
    'compact-picker': Compact,
  },
  methods: {
    incrementCount() {
      this.$store.commit('increment');
      let docRef = db.collection('points').doc("u0EEGMLUK1awp1lK618i");
      docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            console.log("No such document!");
        }
      }).catch(function(error) {
          console.log("Error getting document:", error);
      });

    },
  },
  data () {
    return {
      colors
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
