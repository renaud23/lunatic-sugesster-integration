import React from "react";
import ReactDOM from "react-dom";
import { Application } from "./lunatic-user";

const JSON_LUNATIC = {
  suggesters: ["cog", "naf-rev2"],
  components: [
    {
      id: "j4nw5cqz",
      componentType: "IdbSuggester",
      mandatory: false,
      label: "Suggester COG",
      response: {
        name: "STATE",
      },
      storeName: "cog",
    },
  ],
};

ReactDOM.render(
  <React.StrictMode>
    <Application jsonLunatic={JSON_LUNATIC} />
  </React.StrictMode>,
  document.getElementById("root")
);
