<script setup lang="ts">
import { onMounted } from 'vue';
import { useTheme} from 'vuetify'

const theme = useTheme()

onMounted(() => {
    let currentTheme = localStorage.getItem("theme");

    if (currentTheme) {
        theme.global.name.value = currentTheme
    }
});

</script>

<template>
  <RouterView />
</template>
