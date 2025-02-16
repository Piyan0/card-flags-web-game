<script setup>
import { onMounted, ref } from "vue";
import useRandom from "../composables/useRandom.js";
import useFlag from "../composables/useFlag.js";
import Box from "../components/Box.vue";

const { flagList, getImage } = useFlag();
const { generatePlainNumber, generatePair } = useRandom();

const debug = false;
const random = generatePair(12, generatePlainNumber(12));

let boxes = [];
let opened = [];
let currentAnswer = [];
let canOpen = true;

const STATE_WRONG = 1;
const STATE_CORRECT = 2;
let currentState = -1;

const onAnswerCorrect = async () => {
  console.log("Rightt..");
};
const onAnswerWrong = async () => {
  for (let i of opened) {
    i.open(false);
  }
};

const timer = async delay => {
  await new Promise(res => {
    setTimeout(res, delay);
  });
};
const boxReady = data => {
  boxes.push(data);
};
const getBox = id => {
  for (let i of boxes) {
    if (id == i.id) {
      return i;
    }
  }
};
const matchPair = () => {
  if (opened[0].name == opened[1].name) {
    currentState = STATE_CORRECT;
    return;
  }
  currentState = STATE_WRONG;
};
const openBox = async data => {
  if (!canOpen) return;
  if (data.isDisabled.value) return;
  data.isDisabled.value= true
  opened.push(data);
  if (opened.length == 2) {
    canOpen = false;
    await data.open();
    matchPair();
    switch (currentState) {
      case STATE_WRONG:
        await onAnswerWrong();
        break;
      case STATE_CORRECT:
        await onAnswerCorrect();
        break;
    }
    opened = [];
    canOpen = true;
  } else {
    data.open(true);
  }
};
const revealAll = async () => {
  for (let i of boxes) {
    i.func(true);
    await new Promise(res => {
      setTimeout(res, 50);
    });
  }
};
const closeAll = async () => {
  for (let i of boxes) {
    if (i.isDisabled == true) continue;
    i.func(false);
  }
};
</script>

<template>
  <div class="container">
    <div class=" rounded-xl m-auto md:w-[600px] flex flex-wrap gap-2 items-center justify-center px-4 py-12">
      <Box @open="openBox" @ready="boxReady" v-for="(i, idx) of random" :name="flagList[i].name" :id="idx" width="80" height="80" depth="6">
        <template #front>
          <p v-if="debug">
            {{ flagList[i].name }}
          </p>
          <div class= "h-full w-full bg-green-200 flex items-center justify-center text-green-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M4 5a1 1 0 0 1 .3-.714a6 6 0 0 1 8.213-.176l.351.328a4 4 0 0 0 5.272 0l.249-.227c.61-.483 1.527-.097 1.61.676L20 5v9a1 1 0 0 1-.3.714a6 6 0 0 1-8.213.176l-.351-.328A4 4 0 0 0 6 14.448V21a1 1 0 0 1-1.993.117L4 21z"/></svg>
          </div>
        </template>
        <template #back>
          <img :src="getImage(flagList[i].idx)" class="object-cover h-full w-full bg-green-200" />
        </template>
      </Box>
    </div>
    <p class="text-sm text-center text-gray-800">Card Flags by Piyan Apriyanto @2025</p>
  </div>
</template>
