<template>
  <div class="flex pl-6 py-2">
    <a href="https://www.linkedin.com/in/kristianeboe/">
      <img :src="LinkedInSVG" alt="LinkedIn" class="w-8 ml-2" />
    </a>
    <a href="https://www.instagram.com/kristianeboe/">
      <img :src="InstagramSVG" alt="Instagram" class="w-8 ml-2" />
    </a>
    <a href="https://github.com/kristianeboe">
      <img :src="GithubSVG" alt="Github" class="w-8 ml-2" />
    </a>
    <a href="https://kristianeboe.me">
      <img :src="AircraftSVG" alt="Travel blog" class="w-8 ml-8" />
    </a>
    <a href="https://kristianeboe.github.io">
      <img :src="Trophy" alt="Portfolio" class="w-8 ml-2" />
    </a>
  </div>
</template>

<script>
import FacebookSVG from "@/assets/svgs/icons/facebook-with-circle.svg";
import LinkedInSVG from "@/assets/svgs/icons/linkedin-with-circle.svg";
import InstagramSVG from "@/assets/svgs/icons/instagram-with-circle.svg";
import GithubSVG from "@/assets/svgs/icons/github-with-circle.svg";
import AircraftSVG from "@/assets/svgs/icons/aircraft.svg";
import Trophy from "@/assets/svgs/icons/trophy.svg";

export default {
  data() {
    return {
      FacebookSVG,
      LinkedInSVG,
      InstagramSVG,
      GithubSVG,
      AircraftSVG,
      Trophy
    };
  }
};
</script>

<style ></style>
