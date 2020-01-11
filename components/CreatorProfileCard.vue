<template>
  <div>
    <div
      class="max-w-4xl flex items-center h-auto flex-wrap mx-auto pb-24 mt-16 md:mt-0"
    >
      <!--Main Col-->
      <div
        id="profile"
        class="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white mx-6 lg:mx-0"
      >
        <div class="p-4 md:p-12 text-center lg:text-left">
          <!-- Image for mobile view-->
          <div
            class="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48"
          >
            <img
              class="rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 object-cover"
              src="~assets/images/RemoteKristian-min.jpg"
            />
          </div>

          <h1 class="text-3xl font-bold pt-8 lg:pt-0">Kristian Elset Bø</h1>
          <div
            class="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-teal-500 opacity-25"
          ></div>
          <p
            class="pt-6 md:pt-4 text-base font-bold flex flex-wrap items-center justify-center lg:justify-start"
          >
            <svg
              class="h-4 fill-current text-teal-700 pr-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z"
              />
            </svg>
            Remote Full-stack developer / Product Manager
          </p>
          <p
            class="pt-6 md:pt-4 text-gray-600 text-xs lg:text-sm flex flex-wrap items-center justify-center lg:justify-start"
          >
            <svg
              class="h-4 fill-current text-teal-700 pr-4 w-full md:w-auto"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm7.75-8a8.01 8.01 0 0 0 0-4h-3.82a28.81 28.81 0 0 1 0 4h3.82zm-.82 2h-3.22a14.44 14.44 0 0 1-.95 3.51A8.03 8.03 0 0 0 16.93 14zm-8.85-2h3.84a24.61 24.61 0 0 0 0-4H8.08a24.61 24.61 0 0 0 0 4zm.25 2c.41 2.4 1.13 4 1.67 4s1.26-1.6 1.67-4H8.33zm-6.08-2h3.82a28.81 28.81 0 0 1 0-4H2.25a8.01 8.01 0 0 0 0 4zm.82 2a8.03 8.03 0 0 0 4.17 3.51c-.42-.96-.74-2.16-.95-3.51H3.07zm13.86-8a8.03 8.03 0 0 0-4.17-3.51c.42.96.74 2.16.95 3.51h3.22zm-8.6 0h3.34c-.41-2.4-1.13-4-1.67-4S8.74 3.6 8.33 6zM3.07 6h3.22c.2-1.35.53-2.55.95-3.51A8.03 8.03 0 0 0 3.07 6z"
              />
            </svg>
            Oslo, Norway / The World
          </p>
          <p class="pt-8 text-sm">
            Ambitious young professional working in consulting, starting
            startups, learning new technologies and traveling the world.
          </p>

          <a href="mailto:kristian@boe.ventures" target="blank">
            <div class="py-6 flex items-center flex-wrap justify-center">
              <button
                class="bg-teal-700 hover:bg-teal-900 text-white font-bold py-2 px-4 rounded-full"
              >
                Get In Touch
              </button>
              <div class="m-4">kristian@boe.ventures</div>
            </div>
          </a>

          <div
            class="mt-6 pb-16 lg:pb-0 w-4/5 lg:w-full mx-auto flex flex-wrap items-center justify-between"
          >
            <a
              class="link"
              target="blank"
              href="https://www.linkedin.com/in/kristianeboe/"
              data-tippy-content="@linkedin_handle"
            >
              <svg
                class="h-6 fill-current text-gray-600 hover:text-teal-700"
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Facebook</title>
                <path
                  d="M1,6h4v13H1V6z M3,1C1.8,1,1,2,1,3.1C1,4.1,1.8,5,3,5c1.3,0,2-0.9,2-2C5,1.9,4.2,1,3,1z M14.6,6.2
	c-2.1,0-3.3,1.2-3.8,2h-0.1l-0.2-1.7H6.9C6.9,7.6,7,8.9,7,10.4V19h4v-7.1c0-0.4,0-0.7,0.1-1c0.3-0.7,0.8-1.6,1.9-1.6
	c1.4,0,2,1.2,2,2.8V19h4v-7.4C19,7.9,17.1,6.2,14.6,6.2z"
                />
              </svg>
            </a>
            <a
              class="link"
              target="blank"
              href="https://www.facebook.com/kristianeboe"
              data-tippy-content="@facebook_handle"
            >
              <svg
                class="h-6 fill-current text-gray-600 hover:text-teal-700"
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>LinkedIn</title>
                <path
                  d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.408.593 24 1.324 24h11.494v-9.294H9.689v-3.621h3.129V8.41c0-3.099 1.894-4.785 4.659-4.785 1.325 0 2.464.097 2.796.141v3.24h-1.921c-1.5 0-1.792.721-1.792 1.771v2.311h3.584l-.465 3.63H16.56V24h6.115c.733 0 1.325-.592 1.325-1.324V1.324C24 .593 23.408 0 22.676 0"
                />
              </svg>
            </a>
            <a
              class="link"
              target="blank"
              href="https://github.com/kristianeboe/"
              data-tippy-content="@github_handle"
            >
              <svg
                class="h-6 fill-current text-gray-600 hover:text-teal-700"
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>GitHub</title>
                <path
                  d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                />
              </svg>
            </a>

            <a
              class="link"
              target="blank"
              href="https://www.instagram.com/kristianeboe/"
              data-tippy-content="@instagram_handle"
            >
              <svg
                class="h-6 fill-current text-gray-600 hover:text-teal-700"
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Instagram</title>
                <path
                  d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"
                />
              </svg>
            </a>
            <a
              class="link"
              href="https://kristianeboe.me"
              data-tippy-content="@blog_handle"
            >
              <svg
                class="h-6 fill-current text-gray-600 hover:text-teal-700"
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Travel blog</title>
                <path
                  d="M12.496,17.414c-0.394-1.096-1.805-4.775-2.39-6.297c-1.103,0.737-2.334,1.435-3.512,1.928
	c-0.366,1.28-1.094,3.709-1.446,4.033c-0.604,0.557-0.832,0.485-0.925-0.279c-0.093-0.764-0.485-3.236-0.485-3.236
	s-2.162-1.219-2.84-1.568s-0.667-0.591,0.057-0.974c0.422-0.223,2.927-0.085,4.242,0.005c0.861-0.951,1.931-1.882,2.993-2.679
	C6.975,7.271,4.04,4.672,3.156,3.923C2.38,3.265,3.235,3.126,3.235,3.126c0.39-0.07,1.222-0.132,1.628-0.009
	c2.524,0.763,6.442,2.068,7.363,2.376c0.353-0.249,0.737-0.52,1.162-0.821c4.702-3.33,5.887-2.593,6.111-2.27
	s0.503,1.701-4.199,5.032c-0.425,0.301-0.808,0.573-1.16,0.823c-0.029,0.98-0.157,5.151-0.311,7.811
	c-0.025,0.428-0.367,1.198-0.565,1.544C13.263,17.612,12.841,18.377,12.496,17.414z"
                />
              </svg>
            </a>
            <a href="https://kristianeboe.github.io">
              <svg
                class="h-6 fill-current text-gray-600 hover:text-teal-700"
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <title>Portfolio</title>
                  <path
                    d="M11.18,14.356c0-1.451,1.1-2.254,2.894-3.442C16.268,9.458,19,7.649,19,3.354
		c0-0.387-0.317-0.699-0.709-0.699h-3.43C14.377,1.759,12.932,0.8,10,0.8c-2.934,0-4.377,0.959-4.862,1.855H1.707
		C1.316,2.655,1,2.968,1,3.354c0,4.295,2.73,6.104,4.926,7.559c1.794,1.188,2.894,1.991,2.894,3.442v1.311
		c-1.884,0.209-3.269,0.906-3.269,1.736c0,0.994,1.992,1.799,4.449,1.799s4.449-0.805,4.449-1.799c0-0.83-1.385-1.527-3.269-1.736
		C11.18,15.666,11.18,14.356,11.18,14.356z M13.957,9.3c0.566-1.199,1.016-2.826,1.088-5.246h2.51
		C17.315,6.755,15.693,8.118,13.957,9.3z M10,2.026c2.732-0.002,3.799,1.115,3.798,1.529c0,0.418-1.066,1.533-3.798,1.535
		C7.268,5.089,6.201,3.974,6.201,3.556C6.2,3.142,7.268,2.024,10,2.026z M2.445,4.054h2.509C5.027,6.474,5.475,8.101,6.043,9.3
		C4.307,8.118,2.684,6.755,2.445,4.054z"
                  />
                </g>
              </svg>
            </a>
          </div>

          <!-- Use https://simpleicons.org/ to find the svg for your preferred product -->
        </div>
      </div>

      <!--Img Col-->
      <div class="w-full lg:w-2/5">
        <!-- Big profile image for side bar (desktop) -->
        <img
          src="~assets/images/RemoteKristian-min.jpg"
          class="rounded-none lg:rounded-lg shadow-2xl hidden lg:block"
        />
        <!-- Image from: http://unsplash.com/photos/MP0IUfwrn0A -->
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
