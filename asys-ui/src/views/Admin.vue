<template>
  <div>
    <Panel />
  </div>
  <div>
    <Card style="width: 50em; margin: auto; margin-top: 7em">
      <template #content>
        <Toolbar class="p-mb-4">
          <template #left>
            <Button
              label="Delete"
              icon="pi pi-trash"
              class="p-button-danger"
              @click="confirmDeleteSelected"
              :disabled="!selectedUsers || !selectedUsers.length"
            />
          </template>
        </Toolbar>

        <DataTable
          ref="dt"
          :value="users"
          v-model:selection="selectedUsers"
          dataKey="id"
          :paginator="true"
          :rows="5"
          :filters="filters"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[2, 5, 7]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
          responsiveLayout="scroll"
        >
          <template #header>
            <div
              class="
                table-header
                p-d-flex p-flex-column p-flex-md-row p-jc-md-between
              "
            ></div>
          </template>

          <Column
            selectionMode="multiple"
            style="width: 3rem"
            :exportable="false"
          ></Column>
          <Column
            field="firstName"
            header="First name"
            :sortable="true"
            style="min-width: 10rem"
          ></Column>
          <Column
            field="lastName"
            header="Last name"
            :sortable="true"
            style="min-width: 10rem"
          ></Column>
          <Column
            field="emailAddress"
            header="Email"
            :sortable="true"
            style="min-width: 10rem"
          ></Column>
          <Column :exportable="false" style="min-width: 8rem">
            <template #body="slotProps">
              <Button
                icon="pi pi-trash"
                class="p-button-rounded p-button-warning"
                @click="confirmDeleteUser(slotProps.data)"
              />
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>

    <Dialog
      v-model:visible="deleteUserDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="user"
          >Are you sure you want to delete <b>{{ user.firstName }}</b
          >?</span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteUserDialog = false"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteUser"
        />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteUsersDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle p-mr-3" style="font-size: 2rem" />
        <span v-if="user"
          >Are you sure you want to delete the selected users?</span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteUsersDialog = false"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="deleteSelectedUsers"
        />
      </template>
    </Dialog>
    <Toast />
  </div>
</template>

<script>
import { FilterMatchMode } from "primevue/api";
import Panel from "@/components/Panel";
import UserService from "@/services/UserService";

export default {
  userService: null,
  components: {
    Panel,
  },
  data() {
    return {
      users: null,
      deleteUserDialog: false,
      deleteUsersDialog: false,
      user: {},
      selectedUsers: null,
      filters: {},
    };
  },
  created() {
    this.initFilters();
    this.userService = new UserService();
    this.accountName = this.$store.state.auth.user.username;
  },
  mounted() {
    this.userService.getUsers().then(
      (users_data) => {
        let filteredUsers = users_data.data.users.filter((value) => {
          return value.account.userName !== this.accountName;
        });
        this.users = filteredUsers;
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
    confirmDeleteUser(user) {
      this.user = user;
      this.deleteUserDialog = true;
    },
    deleteUser() {
      this.users = this.users.filter((val) => val.id !== this.user.id);
      this.deleteUserDialog = false;
      this.callDeleting(this.user.id);
      this.user = {};
      this.callSuccessMessage();
    },
    callSuccessMessage() {
      this.$toast.add({
        severity: "success",
        summary: "Successful",
        detail: "Deleted user/users",
        life: 3000,
      });
    },
    callErrorMessage() {
      this.$toast.add({
        severity: "error",
        summary: "error",
        detail: "Error during deleting",
        life: 3000,
      });
    },
    callDeleting(user_id) {
      this.userService.deleteUser(user_id).then(
        () => {},
        (error) => {
          this.callErrorMessage();
          if (error.response && error.response.status === 401) {
            this.$store.dispatch("auth/logout");
            this.$router.push("/login");
          } else {
            this.errorUpload();
          }
        }
      );
    },
    confirmDeleteSelected() {
      this.deleteUsersDialog = true;
    },
    deleteSelectedUsers() {
      this.users = this.users.filter(
        (val) => !this.selectedUsers.includes(val)
      );
      this.deleteUsersDialog = false;

      this.selectedUsers.forEach((selectedUser) => {
        this.callDeleting(selectedUser.id);
      });
      this.callSuccessMessage();
      this.selectedUsers = null;
    },
    initFilters() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      };
    },
  },
};
</script>

<style scoped>
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
@media screen and (max-width: 960px) {
  .table-header {
    align-items: start;
  }
}
.p-dialog {
  width: 50px;
  margin: 0 auto 2rem auto;
  display: block;
}
.confirmation-content {
  display: flex;
  align-items: center;
  justify-content: center;
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
