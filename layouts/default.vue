<template>
  <div>
    <Nav />
    <nuxt class="antialiased leading-tight font-sans flex flex-col min-h-screen" />
    <Footer />
  </div>
</template>

<script>
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
export default {
  components: {
    Nav,
    Footer
  }
};
</script>

<style>
</style>
