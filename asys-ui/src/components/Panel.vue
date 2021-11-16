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
        <div v-if="admin">
          <Sidebar v-model:visible="visibleLeft" :baseZIndex="1000">
            <h3>Functional management</h3>
            <PanelMenu :model="sideBarAdminItems" />
          </Sidebar>
        </div>
        <div v-else>
          <Sidebar v-model:visible="visibleLeft" :baseZIndex="1000">
            <h3>Functional management</h3>
            <PanelMenu :model="sideBarItems" />
          </Sidebar>
        </div>
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
import SideBarAdminItems from "@/items/SideBarAdminItems";
import AvatarView from "@/views/Avatar.vue";
import UserService from "@/services/UserService";

export default {
  name: "Panel",
  userService: null,
  components: {
    AvatarView,
  },

  data() {
    return {
      visibleLeft: false,
      admin: false,
      toolBarItems: ToolBarItems.items,
      sideBarItems: SideBarItems.items,
      sideBarAdminItems: SideBarAdminItems.items,
    };
  },
  created() {
    this.userService = new UserService();
  },
  mounted() {
    this.userService
      .getUserByUsername(this.$store.state.auth.user.username)
      .then(
        (response) => {
          console.log(this.$store.state.auth.user.username);
          const user = response.data.users[0];
          if (user.account.roles.includes("WRITE_PRIVILEGE")) {
            this.admin = true;
          }
        },
        (error) => {
          if (error.response && error.response.status === 401) {
            this.$store.dispatch("auth/logout");
            this.$router.push("/login");
          }
        }
      );
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
