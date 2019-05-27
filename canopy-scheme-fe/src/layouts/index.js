import React from "react";
import Footer from "../components/LayoutComponent/footer";

export default ({ children }) => (
	<div className="main-container">
		{children}
		<Footer />
	</div>
);
