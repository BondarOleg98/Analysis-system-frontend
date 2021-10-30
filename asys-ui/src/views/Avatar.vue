<template>
  <div v-if="loginFlag">
    <Avatar
      :label="accountName"
      class="p-mr-2"
      size="large"
      style="background-color: #2196f3; color: #ffffff"
      shape="circle"
    />
    <i class="p-toolbar-separator p-mr-2" />
  </div>
  <div v-else>
    <Avatar
      icon="pi pi-user"
      class="p-mr-2"
      size="large"
      style="background-color: #2196f3; color: #ffffff"
      shape="circle"
    />
    <i class="p-toolbar-separator p-mr-2" />
  </div>
</template>

<script>
export default {
  name: "AvatarView",
  data() {
    return {
      loginFlag: this.$store.state.auth.status.loggedIn,
      accountName: this.$store.state.auth.user.username.toUpperCase().charAt(0),
    };
  },
};
</script>

<style></style>
