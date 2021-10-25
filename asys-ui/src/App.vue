<template>
  <div>
    <Toolbar>
      <template #left>
        <Button
          label="Functional management"
          icon="pi pi-th-large"
          class="p-button-text"
          style="color: #ffffff"
          @click="visibleLeft = true"
        />
        <Sidebar v-model:visible="visibleLeft" :baseZIndex="1000">
          <h3>Functional management</h3>
          <PanelMenu :model="sideBarItems" />
        </Sidebar>
      </template>
      <template #right>
        <AvatarView />
        <Menubar :model="toolBarItems" class="p-button-outlined" />
      </template>
    </Toolbar>
  </div>
  <router-view />
</template>

<script>
import ToolBarItems from "@/items/ToolBarItems";
import SideBarItems from "@/items/SideBarItems";
import AvatarView from "@/views/Avatar.vue";

export default {
  components: {
    AvatarView,
  },
  data() {
    return {
      visibleLeft: false,
      toolBarItems: ToolBarItems.items,
      sideBarItems: SideBarItems.items,
    };
  },
};
</script>

<style scoped>
.p-toolbar {
  position: fixed;
  border-radius: 0%;
  top: 0;
  left: 0;
  width: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
