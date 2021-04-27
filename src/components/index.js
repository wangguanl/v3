export { default as ComForm } from "./form";
export { default as ComSearchBar } from "./searchbar";
export { default as ComTable } from "./table";
export * from "./upload";

import ComDialog from "./dialog";
export default {
  install: (app) => {
    app.component(ComDialog.name, ComDialog);
  },
};
