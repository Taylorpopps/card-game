<script setup>

import BlankLayout from "@/layout/BlankLayout.vue";
import { useRoute } from 'vue-router'

const route = useRoute()

function currentLayout()  {
  const components = {
    BlankLayout: BlankLayout
  };

  return components[route.meta.layout];
}

</script>

<template>
  <VApp>
    <component :is="currentLayout()" />
  </VApp>
</template>
