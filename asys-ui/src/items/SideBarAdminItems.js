const getSideBarAdminItems = () => {
  return {
    items: [
      {
        label: "Home",
        icon: "pi pi-fw pi-home",
        to: "/",
      },
      {
        label: "File",
        icon: "pi pi-fw pi-file",
        items: [
          {
            label: "New",
            icon: "pi pi-fw pi-plus",
            to: "/uploadFile",
          },
          {
            label: "List",
            icon: "pi pi-fw pi-bars",
            to: "/files",
          },
        ],
      },
      {
        label: "Users",
        icon: "pi pi-fw pi-user",
        items: [
          {
            label: "Delete users",
            icon: "pi pi-fw pi-user-minus",
            to: "/admin",
          },
        ],
      },
      {
        label: "Analysis",
        icon: "pi pi-fw pi-search",
        items: [
          {
            label: "Analyzing/Forecasting data",
            icon: "pi pi-fw pi-briefcase",
            to: "/analysis",
          },
          {
            label: "Build chart",
            icon: "pi pi-fw pi-chart-line",
            to: "/chart",
          },
        ],
      },
    ],
  };
};

const sideBarAdminItems = getSideBarAdminItems();

export default sideBarAdminItems;
