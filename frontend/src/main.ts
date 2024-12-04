import { createApp } from 'vue'
import './assets/style.css'
import '@/assets/style.scss'
import App from './App.vue'
import router from './routers/index.ts'
import { createPinia } from 'pinia';
import PrimeVue from "primevue/config";
import Aura from '@primevue/themes/aura';
import Select from 'primevue/select';
import Menu from 'primevue/menu';
import Toast from 'primevue/toast';
import Password from 'primevue/password'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputNumber from 'primevue/inputnumber'
import Textarea from 'primevue/textarea'
// import DatePicker from 'primevue/datepicker'
import RadioButton from 'primevue/radiobutton'
import ToggleSwitch from 'primevue/toggleswitch'
import DataTable from 'primevue/datatable'
import Dialog from 'primevue/dialog'
import Popover from 'primevue/popover'
import ConfirmDialog from 'primevue/confirmdialog'
import ConfirmPopup from 'primevue/confirmpopup'
import Tabs from 'primevue/tabs'
import Stepper from 'primevue/stepper'
import ToastService from 'primevue/toastservice';
import Divider from 'primevue/divider'
import TabList from 'primevue/tablist'
import TabPanels from 'primevue/tabpanels'
import Tab from 'primevue/tab'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup'
import ConfirmationService from 'primevue/confirmationservice';
import Row from 'primevue/row'
import TabComponent from './components/Tab.vue'
import Button from './components/Button.vue'
import Card from './components/Card.vue'
import Checkbox from './components/Checkbox.vue'
import Clock from './components/Clock.vue'
import Modal from './components/Modal.vue'
import Radio from './components/Radio.vue'
import Switch from './components/Switch.vue'
import Datepicker from './components/Datepicker.vue'
import CodeBlock from './components/CodeBlock.vue'

const app = createApp(App);

app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
});
app.use(ToastService)
app.use(ConfirmationService)
app.use(createPinia());

app.component('Button', Button)
app.component('Card', Card)
app.component('Checkbox', Checkbox)
app.component('Clock', Clock)
app.component('CodeBlock', CodeBlock)
app.component('Column', Column)
app.component('ColumnGroup', ColumnGroup)
app.component('ConfirmDialog', ConfirmDialog)
app.component('ConfirmPopup', ConfirmPopup)
app.component('DataTable', DataTable)
app.component('DatePicker', Datepicker)
app.component('Dialog', Dialog)
app.component('Divider', Divider)
app.component('InputGroup', InputGroup)
app.component('InputNumber', InputNumber)
app.component('InputText', InputText)
app.component('Modal', Modal)
app.component('Menu', Menu)
app.component('Password', Password)
app.component('Popover', Popover)
app.component('RadioButton', RadioButton)
app.component('Radio', Radio)
app.component('Row', Row)
// app.component('Select', Select)
app.component('Stepper', Stepper)
app.component('Switch', Switch)
app.component('Tab', Tab)
app.component('TabComponent', TabComponent)
app.component('TabList', TabList)
app.component('TabPanels', TabPanels)
app.component('Tabs', Tabs)
app.component('Textarea', Textarea)
app.component('Toast', Toast)
app.component('ToggeSwitch', ToggleSwitch)

app.mount('#app');