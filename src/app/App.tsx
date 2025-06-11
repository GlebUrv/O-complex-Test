import { Router } from "./router/router";
import { Provider } from "react-redux";
import store from "./store/store";

export function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}
