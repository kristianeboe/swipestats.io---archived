<template>
  <div>
    <nav
      class="navbar flex items-center justify-between flex-wrap p-6 fixed w-full z-20 text-white h-24"
      :class="{
        'navbar--hidde': !showNavbar,
        'bg-white': scrolled || !indexPage,
        'text-tinder': scrolled || !indexPage
      }"
    >
      <nuxt-link to="/">
        <div
          class="flex items-center flex-shrink-0 mr-6"
          :class="{ 'text-tinder': scrolled || !indexPage }"
        >
          <svg
            class="fill-current h-8 w-8 mr-2"
            width="54"
            height="54"
            viewBox="0 0 54 54"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"
            />
          </svg>
          <span class="font-semibold text-xl tracking-tight"
            >Swipestats.io</span
          >
        </div>
      </nuxt-link>
      <div class="block lg:hidden">
        <button
          class="flex items-center px-3 py-2 border rounded text-tinder border-tinder text-white border-white"
          :class="{
            'text-tinder': scrolled || !indexPage,
            'border-tinder': scrolled || !indexPage
          }"
          @click="toggleNav"
        >
          <svg
            class="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>

      <div class="text-sm hidden lg:flex lg:flex-grow" />
      <div
        class="hidden w-full flex-grow lg:flex lg:items-center lg:w-auto justify-end"
      >
        <nuxt-link to="/#process" class="nav-link mr-8"
          >How does this work?</nuxt-link
        >
        <nuxt-link to="/#how-do-i-get-my-data" class="nav-link mr-8"
          >How do I get my data?</nuxt-link
        >

        <nuxt-link to="/">
          <button
            class="text-center bg-tinder hover:bg-red-300 text-white font-medium text-base px-6 py-4 rounded shadow-md no-underline block leading-normal w-48"
          >
            Upload
          </button>
        </nuxt-link>
      </div>
    </nav>
    <div
      class="lg:hidden fixed h-screen w-screen bg-white z-10 flex flex-col justify-center items-center"
      :class="{ hidden: hideNav }"
    >
      <div class="text-sm flex flex-col justify-around items-center mx-auto">
        <nuxt-link class="" to="/#process">
          <button
            class="p-6 mt-8 w-64 rounded block bg-tinder text-white text-xl "
            @click="toggleNav"
          >
            How does this work?
          </button>
        </nuxt-link>
        <nuxt-link class="" to="/#how-do-i-get-my-data">
          <button
            class="p-6 mt-8 w-64 rounded block bg-tinder text-white text-xl "
            @click="toggleNav"
          >
            How do I get my data?
          </button>
        </nuxt-link>
        <nuxt-link class="" to="/">
          <button
            class="p-6 mt-8 w-64 rounded block bg-tinder text-white text-xl "
            @click="toggleNav"
          >
            Upload
          </button>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {
      hideNav: true,
      showNavbar: true,
      lastScrollPosition: 0,
      scrolled: false,
      indexPage: this.$router.history.current.path === "/"
    };
  },
  watch: {
    $route() {
      this.indexPage = this.$router.history.current.path === "/";
    }
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    toggleNav() {
      this.$ga.event("nav", "toggleNav", !this.hideNav);
      this.hideNav = !this.hideNav;
    },
    onScroll() {
      const currentScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;

      this.scrolled = currentScrollPosition > 60 ? true : false;
      if (currentScrollPosition < 0) {
        return;
      }

      // Stop executing this function if the difference between
      // current scroll position and last scroll position is less than some offset
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 60) {
        return;
      }
      this.showNavbar = currentScrollPosition < this.lastScrollPosition;
      this.lastScrollPosition = currentScrollPosition;
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  transition: all ease-out 0.5s;
}

.navbar--hidden {
  transform: translate3d(0, -100%, 0);
}

.nav-link {
  position: relative;
  text-decoration: none;
}
.nav-link:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: 0;
  left: 0;
  visibility: hidden;
  -webkit-transform: scaleX(0);
  transform: scaleX(0);
  -webkit-transition: all 0.3s ease-in-out 0s;
  transition: all 0.3s ease-in-out 0s;
}
.nav-link:hover:before {
  visibility: visible;
  -webkit-transform: scaleX(1);
  transform: scaleX(1);
}
</style>
