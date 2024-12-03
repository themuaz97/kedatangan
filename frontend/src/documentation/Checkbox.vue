<script setup lang="ts">
import { ref } from "vue";

const isLoading = ref(false);

// Simulate a loading operation
const load = () => {
  isLoading.value = true;

  // Simulate an async operation (e.g., API call)
  setTimeout(() => {
    isLoading.value = false; // Reset loading after 2 seconds
  }, 2000);
};
</script>
<template>
  <Card title="Checkbox">
    <div>
      <h1 class="text-xl mb-6 font-semibold">
        This is custom component for checkbox
      </h1>

      <!-- Import -->
      <div class="mb-6">
        <h1 class="text-xl mb-4 font-semibold">Import</h1>
        <div class="doc-card">
          <code> import Checkbox from '../components/checkbox'; </code>
        </div>
      </div>

      <!-- Basic -->
      <div class="mb-6">
        <h1 class="text-xl mb-4 font-semibold">Basic</h1>
        <div class="doc-section-description">
          <p class="mb-4">
            Text to display on a checkbox is defined with the
            <i>label</i> property.
          </p>
        </div>
        <div class="doc-card-sample">
          <div class="flex justify-center">
            <Checkbox label="Accept Terms and Conditions" />
          </div>
        </div>
        <div class="doc-card">
          <div>
            <code> &lt;Checkbox label="Accept Terms and Conditions" /&gt; </code>
          </div>
        </div>
      </div>

      <!-- size -->
      <div class="mb-6">
        <h1 class="text-xl mb-4 font-semibold">Sizes</h1>
        <div class="doc-section-description">
          <p class="mb-4">
            When <i>size</i> is present, the button can be configured to be either <i>small</i>, <i>medium</i> or <i>large</i>.
          </p>
        </div>
        <div class="doc-card-sample">
          <div class="text-center">
            <Button class="mr-3" label="Small" size="small" />
            <Button class="mr-3" label="Medium" size="medium" />
            <Button class="mr-3" label="Large" size="large" />
          </div>
        </div>
        <div class="doc-card">
          <div>
            <code class="flex">
              &lt;Button label="Disabled" size="medium" disabled /&gt;<br />
            </code>
          </div>
        </div>
      </div>
      
      <!-- disabled -->
      <div class="mb-6">
        <h1 class="text-xl mb-4 font-semibold">Disabled</h1>
        <div class="doc-section-description">
          <p class="mb-4">
            When <i>disabled</i> is present, the element cannot be used.
          </p>
        </div>
        <div class="doc-card-sample">
          <div class="flex justify-center gap-2">
            <Button label="Disabled" size="medium" disabled />
          </div>
        </div>
        <div class="doc-card">
          <div>
            <code class="flex">
              &lt;Button label="Disabled" size="medium" disabled /&gt;<br />
            </code>
          </div>
        </div>
      </div>
      
      <!-- rounded -->
      <div class="mb-6">
        <h1 class="text-xl mb-4 font-semibold">Rounded</h1>
        <div class="doc-section-description">
          <p class="mb-4">
            Rounded buttons have a circular border radius.
          </p>
        </div>
        <div class="doc-card-sample">
          <div class="flex justify-center gap-2">
            <Button label="Rounded" size="medium" rounded />
            <Button label="Rounded" icon="pi pi-search" size="medium" rounded />
            <Button icon="pi pi-search" size="medium" rounded />
          </div>
        </div>
        <div class="doc-card">
          <div>
            <code class="flex">
              &lt;Button label="Rounded" size="medium" rounded /&gt;<br />
              &lt;Button label="Rounded" icon="pi pi-search" size="medium" rounded /&gt;<br />
              &lt;Button icon="pi pi-search" size="medium" rounded /&gt;<br />
            </code>
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>

<style scoped></style>
