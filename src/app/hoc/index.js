import { compose } from "redux";
import withRedux from "./withRedux";
import withRouter from "./withRouter";
// Initializing complete app state with router and redux state
export const withReduxAndRouter = compose(withRouter, withRedux);
