<template>
  <div>
    <Card style="width: 37rem; margin: auto; margin-top: 15em">
      <template #content>
        <form @submit.prevent="handleSubmit()">
          <div class="p-grid">
            <div class="p-col-5 p-d-flex p-ai-center p-jc-center">
              <div class="p-fluid">
                <div class="p-field">
                  <label for="username">Username</label>
                  <InputText id="username" v-model="username" type="text" />
                </div>
                <div class="p-field">
                  <label for="password">Password</label>
                  <InputText id="password" v-model="password" type="password" />
                </div>
                <Button label="Login" type="submit"></Button>
              </div>
            </div>
            <div class="p-col-2">
              <Divider layout="vertical">
                <b>OR</b>
              </Divider>
            </div>
            <div class="p-col-5 p-d-flex p-ai-center p-jc-center">
              <Button
                label="Sign Up"
                icon="pi pi-user-plus"
                class="p-button-success"
              ></Button>
            </div>
          </div>
        </form>
      </template>
    </Card>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  loginService: null,
  computed: {
    loggedIn() {
      return this.$store.state.auth.initialState.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    handleSubmit() {
      const user = {
        username: this.username,
        password: this.password,
      };

      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$router.push("/");
        },
        (error) => {
          console.log("ERROR " + error);
        }
      );
    },
  },
};
</script>

<style>
p {
  line-height: 1.5;
  margin: 0;
}
</style>
