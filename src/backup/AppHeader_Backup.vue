<template>
  <header>
      <h1>{{dataString}}</h1>
      <button v-on:click="sendEvent">Click</button>
  </header>
</template>

<script>
export default {
  props: ['dataString'],
  methods: {
    sendEvent: function() {
      this.$emit('pass');
    }
  }
}
</script>

<style>

</style>