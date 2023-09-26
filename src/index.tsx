import reportWebVitals from "./reportWebVitals";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {createRoot} from "react-dom/client";
import "src/utils/i18n/i18n";
import DestinationScreen from "src/views/DestinationScreen/DestinationScreen";
import ParticipantsScreen from "src/views/ParticipantsScreen/ParticipantsScreen";
import ResultScreen from "src/views/ResultScreen/ResultScreen";
import ThemeScreen from "src/views/ThemeScreen/ThemeScreen";
import DatesScreen from "src/views/DatesScreen/DatesScreen";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement as Element);

root.render(
    <BrowserRouter>
        <Routes>
            <Route
                path={"/"}
                element={<DestinationScreen/>}
            />
            <Route
                path={"/participants"}
                element={<ParticipantsScreen/>}
            />
            <Route
                path={"/dates"}
                element={<DatesScreen/>}
            />
            <Route
                path={"/theme"}
                element={<ThemeScreen/>}
            />
            <Route
                path={"/result"}
                element={<ResultScreen/>}
            />
        </Routes>
    </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
