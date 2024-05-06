<script setup>
const { locale, setLocale, t } = useI18n();
console.log(t);
</script>

<template>
  <div>
    <NuxtWelcome />
  </div>
</template>