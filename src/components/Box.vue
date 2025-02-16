<script setup>
import { onMounted, ref } from "vue";
import gsap from "gsap";
const props = defineProps(["depth", "width", "height", "id", "name"]);
const emits = defineEmits(["ready", "open"]);
const front = {
  transform: `translateZ(${props.depth}px)`,
};
const back = {
  transform: `translateZ(-${props.depth}px)`,
};
const right = {
  transform: `rotateY(90deg) translateZ(${props.depth}px)`,
  width: `${props.depth * 2}px`,
};
const left = {
  transform: `rotateY(90deg) translateZ(-${props.depth}px)`,
  width: `${props.depth * 2}px`,
};
const top = {
  transform: `rotateX(90deg) translateZ(${props.depth}px)`,
  minHeight: `${props.depth * 2}px`,
};
const bottom = {
  transform: `rotateX(90deg) translateZ(-${props.depth}px)`,
  minHeight: `${props.depth * 2}px`,
};
const box = {
  minWidth: `${props.width}px`,
  minHeight: `${props.height}px`,
};

const mainBox = ref(null);
const open =async isOpen => {
  if (isOpen == false) {
    isDisabled.value= false
    gsap.to(mainBox.value, {
      rotateY: 0,
      duration: 0.4,
      ease: "none",
    });
    await new Promise(res=>{setTimeout(res, 400)})
    return;
  }
  gsap.to(mainBox.value, {
    rotateY: 180,
    duration: 0.4,
    ease: "none",
  });
  await new Promise(res=>{setTimeout(res, 400)})
};
let isClicked = ref(false);
let isDisabled = ref(false);

const getProps = () => {
  const id = props.id;
  const name = props.name;
  return { isClicked, isDisabled, id, name, open };
};

const onClick = () => {
  isClicked = true;
  emits("open", getProps());
};

onMounted(() => {
  emits("ready", getProps());
});
</script>

<template>
  <div @click="onClick" ref="mainBox" :style="box" class=" border-black box relative border-gray-300">
    <div :style="front" class="border-4 absolute top-0 left-0 w-full h-full">
      <slot name="front"></slot>
    </div>
    <div :style="back" class="border-2 absolute top-0 left-0 w-full h-full bg-green-400">
      <div class="scale-x-[-1] h-full w-full">
        <slot name="back"></slot>
      </div>
    </div>
    <div :style="right" class="bg-green-400 absolute top-0 right-0 h-full"></div>
    <div :style="left" class="bg-green-400  absolute top-0 left-0 h-full"></div>
    <div :style="top" class="top absolute top-0 left-0 w-full bg-gray-900">
      <slot name="top"></slot>
    </div>
    <div :style="bottom" class="bottom absolute bottom-0 left-0 w-full bg-gray-900">
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<style scoped>
.box {
  transform-style: preserve-3d;
}
</style>
