
<template>
  <div class="card">
      <DataTable :value="products" tableStyle="min-width: 50rem">
          <Column field="code" header="No"></Column>
          <Column field="name" header="Name"></Column>
          <Column field="category" header="Action"></Column>
      </DataTable>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

onMounted(() => {

});

const products = ref();

</script>
