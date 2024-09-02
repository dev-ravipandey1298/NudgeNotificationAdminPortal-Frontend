import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import TemplateForm from "./Components/TemplateForm";
import LoginPage from "./Components/LoginPage";
import Maker from "./Components/Maker";
import Checker from "./Components/Checker";
import PendingRequestTable from "./Components/PendingRequestTable";
import ShowAllCheckerTable from "./Components/ShowAllCheckerTable";
import DraftTable from "./Components/DraftTable";
import ShowAllMakerTable from "./Components/ShowAllMakerTable";
import CUGTable from "./Components/CUGTable";


const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Layout />}>
			<Route path="login" element={<LoginPage />} />
			<Route path="maker" element={<Maker />} />
			<Route path="checker" element={<Checker />} />
			<Route path="checker/pendingRequests" element={<PendingRequestTable />} />
			<Route path="checker/showAll" element={<ShowAllCheckerTable />} />
			<Route path="maker/createNudgeTemplate" element={<TemplateForm />} />
			<Route path="maker/drafts" element={<DraftTable />} />
			<Route path="maker/showAll" element={<ShowAllMakerTable />} />
			<Route path="maker/cug_approval_status" element={<CUGTable />} />
		</Route>
	)
)


ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		{/* <App /> */}
		<RouterProvider router={router} />
	</React.StrictMode>,
);
