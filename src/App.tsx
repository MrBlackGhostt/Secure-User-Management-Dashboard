import "./App.css"

import { Provider } from "react-redux"
import store from "./redux/store"

import AuthContainer from "./pages/authContainer"

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div>
        <AuthContainer />
      </div>
    </Provider>
  )
}

export default App
