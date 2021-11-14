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
</template>

<script>
import ToolBarItems from "@/items/ToolBarItems";
import SideBarItems from "@/items/SideBarItems";
import AvatarView from "@/views/Avatar.vue";

export default {
  name: "Panel",
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
  border-radius: 0;
  left: 0;
  top: 0;
  width: 100%;
}
@media screen and (max-width: 960px) {
  ::v-deep(.p-toolbar) {
    flex-wrap: wrap;
  }
  ::v-deep(.p-toolbar) .p-button {
    margin-bottom: 0.25rem;
  }
}
</style>
