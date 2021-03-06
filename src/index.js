import React from "react";
import ReactDOM from "react-dom";
import { Application } from "./lunatic-user";
import "./custom-themes.scss";

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
      className: " custom-theme",
    },
    {
      id: "ffnw9cqz",
      componentType: "IdbSuggester",
      mandatory: false,
      label: "Suggester NAf-REV2",
      response: {
        name: "STATE",
      },
      storeName: "naf-rev2",
      className: " custom-theme",
    },
  ],
};

ReactDOM.render(
  <React.StrictMode>
    <Application jsonLunatic={JSON_LUNATIC} />
  </React.StrictMode>,
  document.getElementById("root")
);
