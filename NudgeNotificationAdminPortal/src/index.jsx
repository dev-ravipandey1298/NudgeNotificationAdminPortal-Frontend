import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import TemplateForm from "./components/TemplateForm";
import TemplateForm_v1 from "./components/TemplateForm";
import LoginPage from "./components/LoginPage";
import Maker from "./components/Maker";
import Checker from "./components/Checker";
import PendingRequestTable from "./components/PendingRequestTable";
import ShowAllCheckerTable from "./components/ShowAllCheckerTable";
import DraftTable from "./components/DraftTable";
import ShowAllMakerTable from "./components/ShowAllMakerTable";
import CUGTable from "./components/CUGTable";


const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Layout />}>
			<Route path="login" element={<LoginPage />} />
			<Route path="maker" element={<Maker />} />
			<Route path="checker" element={<Checker />} />
			<Route path="checker/pending-requests" element={<PendingRequestTable />} />
			<Route path="checker/show-all" element={<ShowAllCheckerTable />} />
			<Route path="checker/show/nudge-template-form" element={<TemplateForm />} />
			<Route path="maker/create/nudge-template-form" element={<TemplateForm />} />
			<Route path="maker/drafts" element={<DraftTable />} />
			<Route path="maker/show-all" element={<ShowAllMakerTable />} />
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
