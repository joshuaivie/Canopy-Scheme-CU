import React from "react";
import Navigation from "../components/LayoutComponent/navigation";
import Footer from "../components/LayoutComponent/footer";

export default ({ children }) => (
	<div className="main-container">
		<Navigation />
		{children}
		<Footer />
	</div>
);
