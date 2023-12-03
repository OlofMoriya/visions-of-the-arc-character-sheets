import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { BiDice1Fill, BiDice2Fill, BiDice3Fill, BiDice4Fill, BiDice5Fill, BiDice6Fill,RiZhihuFill } from "oh-vue-icons/icons";

import './style.css'; 

const app = createApp(App)

app.use(router)

addIcons(BiDice1Fill, BiDice2Fill, BiDice3Fill, BiDice4Fill, BiDice5Fill, BiDice6Fill, RiZhihuFill);

app.component("v-icon", OhVueIcon);
app.mount("#app");
