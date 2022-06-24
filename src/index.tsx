import ReactDOM from "react-dom";
import App from "./App";

import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import videosReducer from "./store/reducers/videos";
import commentsReducer from "./store/reducers/comments";

const composeEnhancers =
  (window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] as typeof compose) || compose;

const rootReducer = combineReducers({
  videos: videosReducer,
  comments: commentsReducer,
});

const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
