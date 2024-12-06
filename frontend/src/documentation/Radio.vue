<script setup lang="ts">
import { ref } from "vue";

const importCode = `
import { Radio } from "../components/Radio";`;

const labelCode = `
<Radio label="Radio Button" />`;

const groupCode = `
<template>
  <div class="flex flex-wrap justify-center gap-4">
    <div class="flex items-center gap-2">
      <Radio v-model="ingredient" inputId="ingredient1" name="pizza" value="Cheese" />
    </div>
    <div class="flex items-center gap-2">
      <Radio v-model="ingredient" inputId="ingredient2" name="pizza" value="Mushroom" />
    </div>
    <div class="flex items-center gap-2">
      <Radio v-model="ingredient" inputId="ingredient3" name="pizza" value="Pepper" />
    </div>
    <div class="flex items-center gap-2">
      <Radio v-model="ingredient" inputId="ingredient4" name="pizza" value="Onion" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const ingredient = ref<string>("");
<\/script>`;

const sizeCode = `
<template>
  <div class="flex justify-center gap-3">
    <Radio v-model="sizes" value="Small" label="Small" size="small" />
    <Radio v-model="sizes" value="Medium" label="Medium" size="medium" />
    <Radio v-model="sizes" value="Large" label="Large" size="large" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const sizes = ref<string>("");
<\/script>`;

const disabledCode = `
<div class="flex justify-center gap-2">
  <Radio label="Disabled" disabled />
</div>;`;

const invalidCode = `
<Radio label="Invalid" v-model="invalid" invalid />`;

const ingredient = ref<string>("");
const sizes = ref<string[]>([]);
const checked = ref<boolean>(false);
const invalid = ref<boolean>(false);
</script>
<template>
  <Card title="Radio">
    <div>
      <h1 class="text-xl mb-6 font-semibold">
        This is custom component for radio
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
            Text to display on a radio is defined with the
            <i>label</i> property.
          </p>
        </div>
        <div class="doc-card-sample">
          <div class="flex justify-center">
            <Radio label="Radio Button" v-model="checked" />
          </div>
        </div>
        <div>
          <CodeBlock :code="labelCode" language="typescript" />
        </div>
      </div>

      <!-- group -->
      <div class="mb-6">
        <h1 class="text-xl mb-4 font-semibold">Group</h1>
        <div class="doc-section-description">
          <p class="mb-4">Multiple radios can be grouped together.</p>
        </div>
        <div class="doc-card-sample">
          <div class="flex flex-wrap justify-center gap-4">
            <div class="flex items-center gap-2">
              <Radio
                v-model="ingredient"
                inputId="ingredient1"
                name="pizza"
                value="Cheese"
                label="Cheese"
              />
            </div>
            <div class="flex items-center gap-2">
              <Radio
                v-model="ingredient"
                inputId="ingredient2"
                name="pizza"
                value="Mushroom"
                label="Mushroom"
              />
            </div>
            <div class="flex items-center gap-2">
              <Radio
                v-model="ingredient"
                inputId="ingredient3"
                name="pizza"
                value="Pepper"
                label="Pepper"
              />
            </div>
            <div class="flex items-center gap-2">
              <Radio
                v-model="ingredient"
                inputId="ingredient4"
                name="pizza"
                value="Onion"
                label="Onion"
              />
            </div>
          </div>
        </div>
        <div>
          <CodeBlock :code="groupCode" language="typescript" />
        </div>
      </div>

      <!-- size -->
      <div class="mb-6">
        <h1 class="text-xl mb-4 font-semibold">Sizes</h1>
        <div class="doc-section-description">
          <p class="mb-4">
            When <i>size</i> is present, the radio can be configured to be
            either <i>small</i>, <i>medium</i> or <i>large</i>.
          </p>
        </div>
        <div class="doc-card-sample">
          <div class="flex justify-center gap-3">
            <Radio v-model="sizes" value="Small" label="Small" size="small" />
            <Radio v-model="sizes" value="Medium" label="Medium" size="medium" />
            <Radio v-model="sizes" value="Large" label="Large" size="large" />
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
            <Radio label="Disabled" disabled />
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
            <Radio label="Invalid" v-model="invalid" invalid />
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
