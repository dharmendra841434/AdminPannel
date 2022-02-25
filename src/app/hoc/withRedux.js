import { store } from "../../store/store";
import { Provider } from "react-redux";
// Providing centeral store state => hoc for app
const withRedux = (component) => () => {
  return <Provider store={store}>{component()}</Provider>;
};
export default withRedux;
