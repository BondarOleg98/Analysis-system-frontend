<template>
  <div class="form-demo">
    <Dialog
      v-model:visible="showMessage"
      :breakpoints="{ '960px': '80vw' }"
      :style="{ width: '30vw' }"
      position="top"
      :closable="false"
    >
      <div v-if="succsess" class="p-d-flex p-ai-center p-dir-col p-pt-6 p-px-3">
        <i
          class="pi pi-check-circle"
          :style="{ fontSize: '5rem', color: 'var(--green-500)' }"
        ></i>
        <h5>Registration Successful!</h5>
        <p :style="{ lineHeight: 1.5, textIndent: '1rem' }">
          {{ message }}
        </p>
      </div>
      <div v-else class="p-d-flex p-ai-center p-dir-col p-pt-6 p-px-3">
        <i
          class="pi pi-ban"
          :style="{ fontSize: '5rem', color: 'var(--pink-900)' }"
        ></i>
        <h5>Registration Unsuccessful!</h5>
        <p :style="{ lineHeight: 1.5, textIndent: '1rem' }">
          {{ message }}
        </p>
      </div>
      <template #footer>
        <div v-if="succsess" class="p-d-flex p-jc-center">
          <Button
            label="OK"
            @click="$router.replace('/login')"
            class="p-button-text"
          />
        </div>
        <div v-else class="p-d-flex p-jc-center">
          <Button label="OK" @click="collapseDialog()" class="p-button-text" />
        </div>
      </template>
    </Dialog>

    <Card style="width: 30rem; margin: auto; margin-top: 12em">
      <template #content>
        <div class="p-d-flex p-jc-center">
          <div class="card">
            <h3 class="p-text-center">Register</h3>
            <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
              <div class="p-field">
                <div class="p-float-label">
                  <InputText
                    id="firstName"
                    v-model="v$.firstName.$model"
                    :class="{ 'p-invalid': v$.firstName.$invalid && submitted }"
                  />
                  <label
                    for="firstName"
                    :class="{ 'p-error': v$.firstName.$invalid && submitted }"
                    >First name*</label
                  >
                </div>
                <small
                  v-if="
                    (v$.firstName.$invalid && submitted) ||
                    v$.firstName.$pending.$response
                  "
                  class="p-error"
                  >{{
                    v$.firstName.required.$message.replace(
                      "Value",
                      "First name"
                    )
                  }}</small
                >
              </div>
              <div class="p-field">
                <div class="p-float-label">
                  <InputText
                    id="lastName"
                    v-model="v$.lastName.$model"
                    :class="{ 'p-invalid': v$.lastName.$invalid && submitted }"
                  />
                  <label
                    for="lastName"
                    :class="{ 'p-error': v$.lastName.$invalid && submitted }"
                    >Last name*</label
                  >
                </div>
                <small
                  v-if="
                    (v$.lastName.$invalid && submitted) ||
                    v$.lastName.$pending.$response
                  "
                  class="p-error"
                  >{{
                    v$.lastName.required.$message.replace("Value", "Last name")
                  }}</small
                >
              </div>
              <div class="p-field">
                <div class="p-float-label">
                  <InputText
                    id="userName"
                    v-model="v$.userName.$model"
                    :class="{ 'p-invalid': v$.userName.$invalid && submitted }"
                  />
                  <label
                    for="userName"
                    :class="{ 'p-error': v$.userName.$invalid && submitted }"
                    >Username*</label
                  >
                </div>
                <small
                  v-if="
                    (v$.userName.$invalid && submitted) ||
                    v$.userName.$pending.$response
                  "
                  class="p-error"
                  >{{
                    v$.userName.required.$message.replace("Value", "Username")
                  }}</small
                >
              </div>
              <div class="p-field">
                <div class="p-float-label p-input-icon-right">
                  <i class="pi pi-envelope" />
                  <InputText
                    id="emailAddress"
                    v-model="v$.emailAddress.$model"
                    :class="{
                      'p-invalid': v$.emailAddress.$invalid && submitted,
                    }"
                    aria-describedby="email-error"
                  />
                  <label
                    for="emailAddress"
                    :class="{
                      'p-error': v$.emailAddress.$invalid && submitted,
                    }"
                    >Email*</label
                  >
                </div>
                <span v-if="v$.emailAddress.$error && submitted">
                  <span
                    id="email-error"
                    v-for="(error, index) of v$.emailAddress.$errors"
                    :key="index"
                  >
                    <small class="p-error">{{ error.$message }}</small>
                  </span>
                </span>
                <small
                  v-else-if="
                    (v$.emailAddress.$invalid && submitted) ||
                    v$.emailAddress.$pending.$response
                  "
                  class="p-error"
                  >{{
                    v$.emailAddress.required.$message.replace("Value", "Email")
                  }}</small
                >
              </div>
              <div class="p-field">
                <div class="p-float-label">
                  <Password
                    id="password"
                    v-model="v$.password.$model"
                    :class="{ 'p-invalid': v$.password.$invalid && submitted }"
                    toggleMask
                  >
                    <template #header>
                      <h6>Pick a password</h6>
                    </template>
                    <template #footer="sp">
                      {{ sp.level }}
                      <Divider />
                      <p class="p-mt-2">Suggestions</p>
                      <ul class="p-pl-2 p-ml-2 p-mt-0" style="line-height: 1.5">
                        <li>At least one lowercase</li>
                        <li>At least one uppercase</li>
                        <li>At least one numeric</li>
                        <li>Minimum 8 characters</li>
                      </ul>
                    </template>
                  </Password>
                  <label
                    for="password"
                    :class="{ 'p-error': v$.password.$invalid && submitted }"
                    >Password*</label
                  >
                </div>
                <small
                  v-if="
                    (v$.password.$invalid && submitted) ||
                    v$.password.$pending.$response
                  "
                  class="p-error"
                  >{{
                    v$.password.required.$message.replace("Value", "Password")
                  }}</small
                >
              </div>
              <div class="p-field-checkbox">
                <Checkbox
                  id="accept"
                  name="accept"
                  value="Accept"
                  v-model="v$.accept.$model"
                  :class="{ 'p-invalid': v$.accept.$invalid && submitted }"
                />
                <label
                  for="accept"
                  :class="{ 'p-error': v$.accept.$invalid && submitted }"
                  >I agree to the terms and conditions*</label
                >
              </div>
              <BlockUI :blocked="blockedButton">
                <Button
                  type="submit"
                  label="Submit"
                  class="p-mt-2"
                  @click="blockButton()"
                />
              </BlockUI>
            </form>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import RegisterService from "@/services/RegisterService";
import User from "@/models/User";
import Account from "@/models/Account";

export default {
  setup: () => ({
    v$: useVuelidate(),
  }),
  registerService: null,
  data() {
    return {
      firstName: "",
      lastName: "",
      emailAddress: "",
      userName: "",
      password: "",
      blockedButton: false,
      accept: null,
      submitted: false,
      showMessage: false,
      succsess: true,
      message: "",
    };
  },
  validations() {
    return {
      firstName: {
        required,
      },
      lastName: {
        required,
      },
      emailAddress: {
        required,
        email,
      },
      userName: {
        required,
      },
      password: {
        required,
      },
      accept: {
        required,
      },
    };
  },
  created() {
    this.registerService = new RegisterService();
  },
  methods: {
    registration() {
      const user = new User(
        this.firstName,
        this.lastName,
        this.emailAddress,
        new Account(this.userName, this.password, "READ_PRIVILEGE")
      );

      this.registerService
        .register(user)
        .then((response) => {
          console.log(response.data);
          this.message = response.data;
          this.succsess = true;
          this.toggleDialog();
        })
        .catch((e) => {
          console.log(e);
          this.message = "Error during registration";
          this.succsess = false;
          this.toggleDialog();
        });
    },

    blockButton() {
      this.blockedButton = true;
    },

    unblockButton() {
      this.blockedButton = false;
    },

    handleSubmit(isFormValid) {
      this.submitted = true;

      if (!isFormValid) {
        this.unblockButton();
        return;
      }
      this.registration();
    },

    collapseDialog() {
      this.showMessage = false;
      this.resetForm();
      this.unblockButton();
    },

    toggleDialog() {
      this.showMessage = !this.showMessage;

      if (!this.showMessage) {
        this.resetForm();
      }
    },

    resetForm() {
      this.firstName = "";
      this.lastName = "";
      this.emailAddress = "";
      this.userName = "";
      this.password = "";
      this.accept = null;
      this.submitted = false;
    },
  },
};
</script>
<style scoped>
.form-demo .card {
  min-width: 450px;
}
.form-demo .card form {
  margin-top: 2rem;
}
.form-demo .card .p-field {
  margin-bottom: 1.5rem;
}
@media screen and (max-width: 960px) {
  .form-demo .card {
    width: 80%;
  }
}
</style>
