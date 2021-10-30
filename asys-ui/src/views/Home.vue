<template>
  <div>
    <Panel />
    <Card
      style="
        width: 25em;
        margin: auto;
        margin-top: 15em;
        background: white;
        color: initial;
      "
    >
      <template #header>
        <img
          src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png"
          style="height: 8em; width: 8em"
        />
      </template>
      <template #content>
        <div class="p-mb-3 p-text-left">First name: {{ firstName }}</div>
        <div class="p-mb-3 p-text-left">Last name: {{ lastName }}</div>
        <div class="p-mb-3 p-text-left">Email: {{ emailAddress }}</div>
        <div class="p-mb-3 p-text-left">Username: {{ userName }}</div>
      </template>
      <template #footer>
        <Button icon="pi pi-check" label="Edit" />
      </template>
    </Card>
  </div>
</template>

<script>
import Panel from "@/components/Panel";
import UserService from "@/services/UserService";

export default {
  userService: null,
  components: {
    Panel,
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      emailAddress: "",
      userName: "",
    };
  },
  created() {
    this.userService = new UserService();
  },
  mounted() {
    this.userService
      .getUserByUsername(this.$store.state.auth.user.username)
      .then((response) => {
        const user = response.data.users[0];
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.emailAddress = user.emailAddress;
        this.userName = user.account.userName;
      });
  },
};
</script>
<style>
.p-text-left {
  color: green;
}
</style>
