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
            items: [
              {
                label: "CSV file",
                icon: "pi pi-fw pi-file-excel",
              },
            ],
          },
          {
            label: "Delete",
            icon: "pi pi-fw pi-trash",
          },
          {
            label: "List",
            icon: "pi pi-fw pi-bars",
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
            label: "Delete",
            icon: "pi pi-fw pi-user-minus",
          },
          {
            label: "Edit",
            icon: "pi pi-fw pi-user-edit",
          },
          {
            label: "All users",
            icon: "pi pi-fw pi-users",
            items: [
              {
                label: "List",
                icon: "pi pi-fw pi-bars",
              },
            ],
          },
        ],
      },
      {
        label: "Analysis",
        icon: "pi pi-fw pi-search",
        items: [
          {
            label: "Analyzing data",
            icon: "pi pi-fw pi-table",
          },
          {
            label: "Build chart",
            icon: "pi pi-fw pi-chart-line",
            to: "/chart",
          },
          {
            label: "Forecasting data",
            icon: "pi pi-fw pi-briefcase",
          },
        ],
      },
    ],
  };
};

const sideBarItems = getSideBarItems();

export default sideBarItems;
