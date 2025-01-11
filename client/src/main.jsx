import React from "react";
import ReactDOM from "react-dom/client";
import { AppWrapper } from "./App.jsx";
import "./index.css"
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

library.add(faPlus, faEdit, faTrash);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AppWrapper />
    </React.StrictMode>
);
