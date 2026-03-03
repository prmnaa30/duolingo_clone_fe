<template>
  <div>
    <LandingHeader />
    <LandingHero @click="redirectToLogin" />
    <LandingFeatures />
    <LandingCTA @click="redirectToLogin" />
  </div>
</template>

<script setup lang="ts">
const router = useRouter()

const redirectToLogin = () => {
  router.push('/login')
}
</script>
