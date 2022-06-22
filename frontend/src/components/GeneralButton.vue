<template>    
    <button>{{text}}</button>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            default: null
        },
        colorHover: {
            type: String,
            default: '#41b883'
        }
    }
}
</script>

<style scoped>
button {
  padding: 1% 10%;
  background: transparent;
  -webkit-box-shadow: 6px 6px 10px 3px rgba(0,0,0,0.75); 
  box-shadow: 6px 6px 10px 3px rgba(0,0,0,0.75);
}

button:hover{
  color: white;
  background-color: v-bind(colorHover);
}
</style>