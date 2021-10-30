import store from "@/store/index.js";

const getToolBarItems = () => {
  return {
    items: [
      {
        label: "Quit",
        icon: "pi pi-fw pi-power-off",
        items: [
          {
            label: "Sign in",
            icon: "pi pi-fw pi-sign-in",
            to: "/login",
          },
          {
            label: "Sign out",
            icon: "pi pi-fw pi-sign-out",
            to: "/login",
            command: () => {
              store.dispatch("auth/logout");
            },
          },
          {
            label: "Sign up",
            icon: "pi pi-fw pi-user-plus",
            to: "/register",
          },
        ],
      },
    ],
  };
};

const toolBarItems = getToolBarItems();

export default toolBarItems;
