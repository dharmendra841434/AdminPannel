import { withReduxAndRouter } from "./app/hoc/index";
import Routes from "./app/routes/routes";

function App() {
  return <Routes />;
}

export default withReduxAndRouter(App);
