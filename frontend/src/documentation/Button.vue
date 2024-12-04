<!-- TODO create documentation for each components -->
<script setup lang="ts">
import { ref } from "vue";

const isLoading = ref(false);

const importCode = `
import { Button } from '../components/Button';`;

const labelCode = `
<Button label="Button" size="medium" />`;

const iconCode = `
<Button icon="pi pi-plus" size="medium" />
<Button label="Search" icon="pi pi-search" size="medium" />
<Button label="User" icon="pi pi-user" size="medium" iconPosition="right" />`;

const loadingCode = `
<Button label="Loading" size="medium" loading />`;

const variantCode = `
<Button label="Primary" size="medium" variant="primary" />
<Button label="Secondary" size="medium" variant="secondary" />
<Button label="Info" size="medium" variant="info" />
<Button label="Success" size="medium" variant="success" />
<Button label="Warning" size="medium" variant="warning" />
<Button label="Danger" size="medium" variant="danger" />`;

const sizeCode = `
<Button label="Small" size="small" />
<Button label="Medium" size="medium" />
<Button label="Large" size="large" />`;

const disabledCode = `
<Button label="Disabled" size="medium" disabled />`;

const roundedCode = `
<Button label="Rounded" size="medium" rounded />
<Button label="Rounded" icon="pi pi-search" size="medium" rounded />
<Button icon="pi pi-search" size="medium" rounded />`;

const outlinedCode = `
<Button label="Primary" size="medium" variant="primary" outlined />
<Button label="Secondary" size="medium" variant="secondary" outlined />
<Button label="Info" size="medium" variant="info" outlined />
<Button label="Success" size="medium" variant="success" outlined />
<Button label="Warning" size="medium" variant="warning" outlined />
<Button label="Danger" size="medium" variant="danger" outlined />`;

const badgeCode = `
<Button label="Primary" size="medium" badge="7" />`;

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
  <Card title="Button">
    <div>
      <h1 class="text-xl mb-6 font-semibold">
        This is custom component for button
      </h1>

      <!-- Import -->
      <div class="mb-6">
        <h1 class="text-xl mb-4 font-semibold">Import</h1>
          <CodeBlock :code="importCode" language="typescript" />
      </div>

      <!-- Basic -->
      <div class="mb-6">
        <h1 class="text-xl mb-4 font-semibold">Basic</h1>
        <div class="doc-section-description">
          <p class="mb-4">
            Text to display on a button is defined with the
            <i>label</i> property.
          </p>
        </div>
        <div class="doc-card-sample">
          <div class="flex justify-center">
            <Button label="Button" size="medium" />
          </div>
        </div>
          <div>
            <CodeBlock :code="labelCode" language="typescript" />
          </div>
      </div>

      <!-- Icons -->
      <div class="mb-6">
        <h1 class="text-xl mb-4 font-semibold">Icons</h1>
        <div class="doc-section-description">
          <p class="mb-4">
            Icon of a button is specified with <i>icon</i> property and position
            is configured using <i>iconPosition</i> attribute.
          </p>
        </div>
        <div class="doc-card-sample">
          <div class="flex justify-center gap-2">
            <Button icon="pi pi-plus" size="medium" />
            <Button label="Search" icon="pi pi-search" size="medium" />
            <Button
              label="User"
              icon="pi pi-user"
              size="medium"
              iconPosition="right"
            />
          </div>
        </div>
          <div>
            <CodeBlock :code="iconCode" language="typescript" />
          </div>
      </div>

      <!-- Loading -->
      <div class="mb-6">
        <h1 class="text-xl mb-4 font-semibold">Loading</h1>
        <div class="doc-section-description">
          <p class="mb-4">
            Busy state is controlled with the <i>loading</i> property.
          </p>
        </div>
        <div class="doc-card-sample">
          <div class="flex justify-center gap-2">
            <!-- Button with dynamic loading -->
            <Button
              label="Play"
              icon="pi pi-play"
              :loading="isLoading"
              size="medium"
              @click="load"
            />
          </div>
        </div>
          <div>
            <CodeBlock :code="loadingCode" language="typescript" />
          </div>
      </div>
      
      <!-- variant -->
      <div class="mb-6">
        <h1 class="text-xl mb-4 font-semibold">Variant</h1>
        <div class="doc-section-description">
          <p class="mb-4">
            The <i>variant</i> property defines the variant of a button.
          </p>
        </div>
        <div class="doc-card-sample">
          <div class="flex justify-center gap-2">
            <Button label="Primary" size="medium" variant="primary" />
            <Button label="Secondary" size="medium" variant="secondary" />
            <Button label="Info" size="medium" variant="info" />
            <Button label="Success" size="medium" variant="success" />
            <Button label="Warning" size="medium" variant="warning" />
            <Button label="Danger" size="medium" variant="danger" />

          </div>
        </div>
          <div>
            <CodeBlock :code="variantCode" language="typescript" />
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
          <div>
            <CodeBlock :code="sizeCode" language="typescript" />
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
          <div>
            <CodeBlock :code="disabledCode" language="typescript" />
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
          <div>
            <CodeBlock :code="roundedCode" language="typescript" />
          </div>
      </div>
      
      <!-- outlined -->
      <div class="mb-6">
        <h1 class="text-xl mb-4 font-semibold">Outlined</h1>
        <div class="doc-section-description">
          <p class="mb-4">
            Outlined buttons display a border without a transparent background.
          </p>
        </div>
        <div class="doc-card-sample">
          <div class="flex justify-center gap-2">
            <Button label="Primary" size="medium" variant="primary" outlined />
            <Button label="Secondary" size="medium" variant="secondary" outlined />
            <Button label="Info" size="medium" variant="info" outlined />
            <Button label="Success" size="medium" variant="success" outlined />
            <Button label="Warning" size="medium" variant="warning" outlined />
            <Button label="Danger" size="medium" variant="danger" outlined />
          </div>
        </div>
          <div>
            <CodeBlock :code="outlinedCode" language="typescript" />
          </div>
      </div>
      
      <!-- badge counter -->
      <div class="mb-6">
        <h1 class="text-xl mb-4 font-semibold">Badge Counter</h1>
        <div class="doc-section-description">
          <p class="mb-4">
            Buttons have built-in badge support with <i>badge</i> properties.
          </p>
        </div>
        <div class="doc-card-sample">
          <div class="flex justify-center gap-2">
            <Button label="Primary" size="medium" badge="7" />
          </div>
        </div>
          <div>
            <CodeBlock :code="badgeCode" language="typescript" />
          </div>
      </div>
    </div>
  </Card>
</template>

<style scoped></style>
