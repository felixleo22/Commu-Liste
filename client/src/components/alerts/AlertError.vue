<template>
    <v-alert
      border="left"
      close-text="Close Alert"
      type=error
      dismissible>
        {{text}}
      </v-alert>
</template>

<script>
export default {
  props: ['text'],
};
</script>
