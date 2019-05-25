import React from "react";
import Routes from "./routes";

import "./assets/styles/main.scss";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import "./fontawesome";

class App extends React.Component {
	render() {
		return <Routes />;
	}
}

export default App;
