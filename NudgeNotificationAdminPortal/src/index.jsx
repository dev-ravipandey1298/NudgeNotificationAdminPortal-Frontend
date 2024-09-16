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
import FormComponent from "./components/FormComponent";
import FormComponent2 from "./components/FormComponent2";
import FormComponent3 from "./components/FormComponent3";
import Sidebar from "./components/Sidebar";
import Popup from "./components/Popup";
import CUGManagementPage from "./components/CUGManagementPage";
import CreateTemplateForm from "./components/CreateTemplateForm";
import DraftTemplateForm from "./components/DraftTemplateForm";
import CheckerTempateForm from "./components/CheckerTempateForm";
import ActionTemplatesTable from "./components/ActionTemplatesTable";


const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Layout />}>
			{/* <Route path="form" element={<FormComponent3 />} /> */}
			<Route path="login" element={<LoginPage />} />
			<Route path="maker" element={<Maker />} />
			<Route path="checker" element={<Checker />} />
			<Route path="checker/pending-requests" element={<PendingRequestTable />} />
			<Route path="checker/show-all" element={<ShowAllCheckerTable />} />
			<Route path="checker/show/nudge-template-form/templateId/:templateId/status/:status" element={<CheckerTempateForm />} />
			<Route path="maker/create/nudge-template-form" element={<CreateTemplateForm />} />
			<Route path="maker/drafts/nudge-template-form/templateId/:templateId" element={<DraftTemplateForm />} />
			<Route path="maker/actions/nudge-template-form/templateId/:templateId/status/:status" element={<TemplateForm />} />
			<Route path="maker/drafts" element={<DraftTable />} />
			<Route path="maker/show-all" element={<ShowAllMakerTable />} />
			<Route path="maker/action-templates" element={<ActionTemplatesTable />} />
		</Route>
	)
)


ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		{/* <App /> */}
		<RouterProvider router={router} />
	</React.StrictMode>,
);
