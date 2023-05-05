<template>
  <div class="container">
    <el-row class="section wrapper">
      <el-col :span="24" :sm="12">
        <h1 class="contrast-text fade-in-text">Freshify</h1>
        <h3 class="contrast-text fade-in-text">
          Handle smartere, ikke hardere - vi håndterer datoen for deg
        </h3>
        <el-button
          class="contrast-text animate-buttons contrast-bg"
          type="primary"
          size="large"
          @click="router.push('/login')"
          round
          >Logg inn
        </el-button>
        <el-link
          class="animate-buttons contrast-text"
          type="primary"
          @click="router.push({ name: 'register' })"
          style="margin-left: 1rem"
          >eller registrer deg
        </el-link>
      </el-col>
      <el-col :span="24" :sm="12" class="col flex">
        <div class="spacer"></div>
        <img
          src="src/assets/logo-no-background.svg"
          style="width: 100%; padding-bottom: 4rem"
          class="fade-in-text"
        />
      </el-col>
    </el-row>
    <el-row class="section wrapper-2">
      <el-col :span="24" :sm="12" class="flex">
        <h1>Freshify er lett å bruke</h1>
        <h3>- akkurat som en handleliste</h3>
        <div class="spacer"></div>
        <h3>
          Varene du har handlet havner i oversikt - og vi holder styr over de som du har hatt lengst
        </h3>
      </el-col>
      <el-col :span="24" :sm="12"></el-col>
    </el-row>
    <el-row class="section wrapper-3">
      <el-col :span="24" :sm="12" class="flex center">
        <img src="src/assets/snap.png" class="img" />
      </el-col>
      <el-col :span="24" :sm="12" style="background-color: transparent">
        <h1>Bruk varene med to trykk</h1>
        <h3>Du bruker hele varer og svinner resten enkelt i oversikten</h3>
        <div class="spacer"></div>
      </el-col>
    </el-row>
    <el-row class="section wrapper-4">
      <el-col :span="24" :sm="12">
        <h1>Sulten?</h1>
        <h3>Vi har gode oppskrifter som prioriterer varene du har hatt lengst.</h3>
        <h4 style="margin-top: 1rem">Slik hjelper vi deg med å redusere matsvinnet ditt</h4>
        <div class="spacer"></div>
      </el-col>
      <el-col :span="24" :sm="12" style="background-color: transparent" class="flex center">
        <img src="src/assets/recipe.png" class="img" />
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import router from "@/router";
import { inject, onMounted, onUnmounted } from "vue";

const emitter = inject("emitter");

onMounted(async () => {
  emitter.on("scroll", () => myFunction());
  const topNav = document.getElementById("topNav");
  const img = document.getElementById("logo-img");

  if (!topNav || !img) return;

  if (topNav.classList?.contains("solid-menu")) {
    topNav.classList.remove("solid-menu");
  }
  if (!img.classList?.contains("invert")) {
    img.classList.add("invert");
  }
  return;

  function myFunction() {
    if (!topNav || !img) return;
    if (!topNav.classList?.contains("solid-menu")) {
      topNav.classList.add("solid-menu");
    }
    if (img.classList?.contains("invert")) {
      img.classList.remove("invert");
    }
  }
});

onUnmounted(() => {
  const topNav = document.getElementById("topNav");
  const img = document.getElementById("logo-img");
  if (!topNav) return;
  if (!topNav.classList?.contains("solid-menu")) {
    topNav.classList.add("solid-menu");
  }
  if (img.classList?.contains("invert")) {
    img.classList.remove("invert");
  }
});
</script>
<style scoped>
.container {
  height: 100%;
  width: calc(100% + 2rem);
  margin: calc(-1.2rem - 1px);
  padding: 0;
}

.wrapper {
  height: 100%;
  width: 100%;
  background-image: url("/src/assets/landing-page.svg");
  background-repeat: no-repeat;
  background-size: cover;
}

.flex {
  display: flex;
  flex-direction: column;
}

.wrapper-2 {
  height: 100%;
  background-image: url("/src/assets/blob-background.svg");
  background-color: #cffcda;
  background-repeat: no-repeat;
  background-size: cover;
}

.wrapper-3 {
  height: 100%;
  background-color: transparent;
  background-size: cover;
}

.wrapper-4 {
  height: 100%;
  background-color: #cffcda;
  background-image: url("/src/assets/wave-background.svg");
  background-repeat: no-repeat;
  background-size: cover;
}

.contrast-text {
  color: white !important;
}

.contrast-bg {
  background-color: lightseagreen;
}

.section {
  margin: 0;
  padding: 5rem;
  height: 100vh;
}

.fade-in-text {
  font-family: Arial, serif;
  animation: fadeIn ease 3s;
}

.img {
  width: 100%;
  max-width: 20rem;
}

.center {
  justify-content: center;
  align-items: center;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fadeInDelayed {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.animate-buttons {
  animation: fadeInDelayed ease 1s;
}

@media only screen and (max-width: 1500px) {
  .section {
    padding: 1rem;
  }
}
</style>
