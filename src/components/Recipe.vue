<template>
  <el-col :lg="24" :md="24" :sm="24" :xl="24" :xs="24">
    <h2>{{ currentRecipe }}</h2>
    <h3>
      Hvem kan vel motstå hjemmetrillede kjøttboller servert med spagetti og en herlig pastasaus?
    </h3>
    <el-row :gutter="10">
      <el-col :span="12"
        ><div class="grid-content ep-bg-purple" />
        <header>Ingredienser</header>
        <el-text>
          Pastasaus: 1 stk løk <br />
          1 ss olivenolje <br />
          1 stk hvitløksfedd <br />
          1 boks hermetiske tomater à 400 g <br />
          1 dl vann <br />
          2 ss oreganokrydder , ev. frisk hakket oregano <br />
          1 stk grønnsaksbuljongterning <br />
          ½ ts salt <br />
          ¼ ts pepper <br />
          1 ts sukker (kan sløyfes) <br />
          Kjøttboller:<br />
          400 g kjøttdeig eller karbonadedeig <br />
          1 stk egg <br />
          100 g parmesan <br />
          2 stk hvitløksfedd <br />
          ¼ ts oreganokrydder <br />
          ¼ ts salt <br />
          ¼ ts pepper <br />
          2 ss olivenolje (gjerne blandet med smør) til steking <br />
          spagetti: <br />
          400 g ukokt spaghetti<br />
        </el-text>
      </el-col>
      <el-col :span="12"
        ><div class="grid-content ep-bg-purple-light" />
        <header>Slik gjør du det</header>
        <el-text>
          Pastasaus: <br />
          1. Finhakk løk og hvitløk. <br />
          2. Varm oljen i en kjele og fres løk og hvitløk til løken er blank. <br />
          3. Tilsett hermetiske tomater, vann, oregano, buljongterning, salt, pepper og sukker.
          <br />
          4. La sausen småkoke i ca. 10 minutter. <br />
          Kjøttboller: <br />
          1. Bland kjøttdeig, egg, revet parmesan, finhakket hvitløk, oregano, salt og pepper.
          <br />
          2. Form små kjøttboller med en skje og stek dem i olje i en stekepanne. <br />
          3. Legg kjøttbollene i pastasausen og la dem trekke i sausen i ca. 5 minutter. <br />
          Spagetti: <br />
          1. Kok spagettien etter anvisning på pakken. <br />
          2. Server kjøttboller og pastasaus med spagetti og gjerne revet parmesan. <br />
        </el-text>
      </el-col>
    </el-row>
  </el-col>
    <el-button type="danger" @click="emit('removeRecipe')">Tilbake til oppskrifter</el-button>
</template>

<script setup lang="ts">
const props = defineProps({
  currentRecipe: String,
});

const emit = defineEmits<{
  (event: "removeRecipe"): void;
}>();
</script>
