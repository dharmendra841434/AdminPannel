import { BrowserRouter } from "react-router-dom";
// Providing router hoc for whole app
const withRouter = (component) => () => {
  return <BrowserRouter>{component()}</BrowserRouter>;
};

export default withRouter;
