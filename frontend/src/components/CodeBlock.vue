<!-- TODO : if have 10 lines, it triggered 1 button named toggle full code and default hidden <script/> -->
<template>
  <div class="relative bg-black rounded-lg overflow-x-auto ">
    <!-- Code block with dynamic language support -->
    <pre :class="`language-${language}`">
      <code ref="codeElement">{{ code }}</code>
    </pre>
    <Button
      @click="copyCode"
      class="copy-btn"
      :title="copyStatus"
      :icon="copyStatus === 'copied' ? 'pi pi-check' : 'pi pi-copy'"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue';
import Prism from 'prismjs';
import 'prismjs/themes/prism-funky.css';
import 'prismjs/components/prism-javascript.js';
import 'prismjs/components/prism-typescript.js';
import 'prismjs/components/prism-css.js';

// Dynamically import the required language
const props = defineProps<{
  code: string;
  language: string;
}>();

const codeElement = ref<HTMLElement | null>(null);
const copyStatus = ref<'copy' | 'copied'>('copy');

onMounted(() => {
  if (codeElement.value) {
    Prism.highlightElement(codeElement.value);
  }
});

// Copy code to clipboard
const copyCode = () => {
  if (codeElement.value) {
    const text = codeElement.value.innerText;
    navigator.clipboard.writeText(text).then(() => {
      copyStatus.value = 'copied';
      setTimeout(() => {
        copyStatus.value = 'copy';
      }, 2000);
    });
  }
};
</script>

<style scoped>

</style>
