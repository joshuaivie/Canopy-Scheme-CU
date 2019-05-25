import React from "react";
import Layout from "../layouts";

import Login from "../components/AuthComponents/login";
import { MDBContainer } from "mdbreact";
import Register from "../components/AuthComponents/register";

export default () => (
	<Layout>
		<MDBContainer>
					<Login />
			<Register />

		</MDBContainer>
	</Layout>
);
