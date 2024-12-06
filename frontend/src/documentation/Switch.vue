<script setup lang="ts">
import { ref } from "vue";

const importCode = `
import { Switch } from "../components/Switch";`;

const labelCode = `
<Switch label="Switch Button" />`;

const preSelectCode = `
<template>
  <div class="flex justify-center">
    <Switch v-model="checked" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const checked = ref<boolean>(true);
<\/script>`;

const disabledCode = `
<div class="flex justify-center">
  <Switch label="Disabled" disabled />
</div>;`;

const invalidCode = `
<Switch label="Invalid" v-model="invalid" invalid />`;

const checked = ref<boolean>(true);
const invalid = ref<boolean>(false);
const isChecked = ref<boolean>(false);
</script>
<template>
  <Card title="Switch">
    <div>
      <h1 class="text-xl mb-6 font-semibold">
        This is custom component for switch
      </h1>

      <!-- Import -->
      <div class="mb-6">
        <h1 class="text-xl mb-4 font-semibold">Import</h1>
        <div>
          <CodeBlock :code="importCode" language="typescript" />
        </div>
      </div>

      <!-- Basic -->
      <div class="mb-6">
        <h1 class="text-xl mb-4 font-semibold">Basic</h1>
        <div class="doc-section-description">
          <p class="mb-4">
            Text to display on a switch is defined with the
            <i>label</i> property.
          </p>
        </div>
        <div class="doc-card-sample">
          <div class="flex justify-center">
            <Switch label="Switch Button" v-model="isChecked" />
          </div>
        </div>
        <div>
          <CodeBlock :code="labelCode" language="typescript" />
        </div>
      </div>

      <!-- preselection -->
      <div class="mb-6">
        <h1 class="text-xl mb-4 font-semibold">Preselection</h1>
        <div class="doc-section-description">
          <p class="mb-4">
            Enabling <i>checked</i> property displays the component as active
            initially.
          </p>
        </div>
        <div class="doc-card-sample">
          <div class="flex justify-center">
            <Switch v-model="checked" />
          </div>
        </div>
        <div>
          <CodeBlock :code="preSelectCode" language="typescript" />
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
          <div class="flex justify-center">
            <Switch label="Disabled" disabled />
          </div>
        </div>
        <div>
          <CodeBlock :code="disabledCode" language="typescript" />
        </div>
      </div>

      <!-- invalid -->
      <div class="mb-6">
        <h1 class="text-xl mb-4 font-semibold">Invalid</h1>
        <div class="doc-section-description">
          <p class="mb-4">
            When <i>invalid</i> is present, the element style will have a red
            border.
          </p>
        </div>
        <div class="doc-card-sample">
          <div class="flex justify-center gap-2">
            <Switch label="Invalid" v-model="invalid" invalid />
          </div>
        </div>
        <div>
          <CodeBlock :code="invalidCode" language="typescript" />
        </div>
      </div>
    </div>
  </Card>
</template>

<style scoped></style>
