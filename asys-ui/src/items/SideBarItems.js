const getSideBarItems = () => {
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
            label: "New",
            icon: "pi pi-fw pi-user-plus",
          },
          {
            label: "All users",
            icon: "pi pi-fw pi-users",
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

const sideBarItems = getSideBarItems();

export default sideBarItems;
