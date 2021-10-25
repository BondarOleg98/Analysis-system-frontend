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
          },
          {
            label: "Sign out",
            icon: "pi pi-fw pi-sign-out",
          },
        ],
      },
    ],
  };
};

const toolBarItems = getToolBarItems();

export default toolBarItems;
