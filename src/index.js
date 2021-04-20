import React from "react";
import ReactDOM from "react-dom";
import { Application } from "./lunatic-user";
// import Fab from "@material-ui/core/Fab";
// import Loop from "@material-ui/icons/Loop";
// import "./index.css";
// import App from "./App";
// import { LunaticIDBSuggester, storeIndex } from "lunatic-suggester";
// import { storeCog } from "./stores-info";
// import reportWebVitals from "./reportWebVitals";
// import fetchCOG from "./fetch-cog";
// import Loader from "./loader";
// import OptionCOGRenderer from "./option-cog-renderer";
// import "./custom-themes.scss";
// import "./custom-option.scss";

// const { name: storeCogName } = storeCog;

// function Store({ store = {}, idbVersion, fetch }) {
//   const { name } = store;
//   const [disabled, setDisabled] = useState(true);
//   const [start, setStart] = useState(false);
//   const db = storeIndex.useStoreIndex(store, idbVersion);

//   useEffect(
//     function () {
//       if (db) {
//         setDisabled(false);
//       }
//     },
//     [db]
//   );

//   return (
//     <>
//       <Fab
//         disabled={disabled}
//         color="primary"
//         aria-label="add"
//         onClick={() => setStart(true)}
//       >
//         <Loop />
//       </Fab>
//       {start ? (
//         <Loader key={name} start={start} db={db} store={store} fetch={fetch} />
//       ) : undefined}
//     </>
//   );
// }

// ReactDOM.render(
//   <React.StrictMode>
//     <Store store={storeCog} idbVersion="1" fetch={fetchCOG} />
//     <label id="label-suggester-cog" htmlFor="suggest-communes">
//       Label for Suggester COG
//     </label>
//     <div className="cog-suggester">
//       <LunaticIDBSuggester
//         id="suggest-communes"
//         labelledBy="label-suggester-cog"
//         className="custom-theme"
//         storeName={storeCogName}
//         version="1"
//         onChange={(...args) => console.log(args)}
//         onSelect={(...args) => console.log(args)}
//         optionRenderer={OptionCOGRenderer}
//       />
//     </div>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );

const JSON_LUNATIC = {
  suggesters: ["cog"],
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
