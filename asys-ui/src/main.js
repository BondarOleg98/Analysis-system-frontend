import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import PrimeVue from "primevue/config";
import Toolbar from "primevue/toolbar";
import Button from "primevue/button";
import SplitButton from "primevue/splitbutton";
import Sidebar from "primevue/sidebar";
import Avatar from "primevue/avatar";
import PanelMenu from "primevue/panelmenu";
import FileUpload from "primevue/fileupload";
import Menubar from "primevue/menubar";
import Chart from "primevue/chart";
import Splitter from "primevue/splitter";
import SplitterPanel from "primevue/splitterpanel";
import Card from "primevue/card";

import "primevue/resources/themes/vela-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

const app = createApp(App);
app.use(PrimeVue, { ripple: true });

app.use(store);
app.use(router);

app.component("Toolbar", Toolbar);
app.component("Button", Button);
app.component("SplitButton", SplitButton);
app.component("Sidebar", Sidebar);
app.component("FileUpload", FileUpload);
app.component("Menubar", Menubar);
app.component("PanelMenu", PanelMenu);
app.component("Avatar", Avatar);
app.component("Chart", Chart);
app.component("Card", Card);
app.component("Splitter", Splitter);
app.component("SplitterPanel", SplitterPanel);

app.mount("#app");
