<template>
  <div>
    <Panel />
    <Toast />
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
        <Button icon="pi pi-check" label="Edit" @click="showEditDialog" />
      </template>
    </Card>

    <Dialog
      v-model:visible="editFataDialog"
      :style="{ width: '450px' }"
      header="Changed user data"
      :modal="true"
      class="p-fluid"
    >
      <form @submit.prevent="handleSubmit()">
        <div class="p-field">
          <label for="firstName">First name*</label>
          <InputText id="firstName" v-model="newFirstName" />
        </div>
        <div class="p-field">
          <label for="lastName">Last name*</label>
          <InputText id="lastName" v-model="newLastName" />
        </div>
        <div class="p-field">
          <label>Email*</label>
          <div class="p-input-icon-right">
            <i class="pi pi-envelope" />
            <InputText id="emailAddress" v-model="newEmailAddress" />
          </div>
        </div>
        <div class="p-field">
          <label for="password">Password*</label>
          <Password id="password" v-model="password"> </Password>
        </div>
        <Button label="Save" type="submit" class="p-button-text" />
      </form>
    </Dialog>
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
      newFirstName: "",
      newLastName: "",
      newEmailAddress: "",
      newUserName: "",
      password: "",
      id: "",
      roles: null,
      submitted: false,
      editFataDialog: false,
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
          const user = response.data.users[0];
          this.id = user.id;
          this.firstName = user.firstName;
          this.lastName = user.lastName;
          this.emailAddress = user.emailAddress;
          this.userName = user.account.userName;
          this.roles = user.account.roles;
        },
        (error) => {
          if (error.response && error.response.status === 401) {
            this.$store.dispatch("auth/logout");
            this.$router.push("/login");
          }
        }
      );
  },
  methods: {
    showEditDialog() {
      this.newFirstName = this.firstName;
      this.newLastName = this.lastName;
      this.newEmailAddress = this.emailAddress;
      this.editFataDialog = true;
    },
    hideDialog() {
      this.editFataDialog = false;
    },
    handleSubmit() {
      this.editData();
    },
    callSuccessMessage() {
      this.$toast.add({
        severity: "success",
        summary: "Successful",
        detail: "Editing was success",
        life: 3000,
      });
    },
    callErrorMessage() {
      this.$toast.add({
        severity: "error",
        summary: "error",
        detail: "Error during editing",
        life: 3000,
      });
    },
    loadingNewData() {
      this.firstName = this.newFirstName;
      this.lastName = this.newLastName;
      this.emailAddress = this.newEmailAddress;
      this.editFataDialog = false;
      this.callSuccessMessage();
    },
    editData() {
      let userRoles = new Array();

      if (this.roles.includes("WRITE_PRIVILEGE")) {
        userRoles = ["READ_PRIVILEGE", "WRITE_PRIVILEGE"];
      } else {
        userRoles = ["READ_PRIVILEGE"];
      }

      let data = {
        user: {
          firstName: this.newFirstName,
          lastName: this.newLastName,
          emailAddress: this.newEmailAddress,
          account: {
            userName: this.userName,
            password: this.password,
            roles: userRoles,
          },
        },
      };
      this.userService
        .editUser(data, this.id)
        .then(() => {
          this.loadingNewData();
        })
        .catch(() => {
          this.callErrorMessage();
        });
    },
  },
};
</script>
<style>
.p-text-left {
  color: green;
}
</style>
