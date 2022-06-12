<template>
    <button class="not-selected">{{text}}</button>
</template>

<script>
export default {
    name: "menu-button-layout",
    props: {
        text: {
            type: String,
            default: null
        }
    }
}
</script>

<style scoped>
  button {
    width: 100%;
  }
  .selected {
    background-color: aqua;
  }
  .not-selected {
    background-color: transparent;
  }
</style>