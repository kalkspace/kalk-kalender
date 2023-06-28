import { useEffect, useState } from "react";
import "./App.css";
import { CreateEvent } from "./CreateEvent";
import { Login, LoginInfo } from "./Login";

function App() {
  const [loginInfo, setLoginInfo] = useState<LoginInfo | null>(null);
  useEffect(() => {
    console.log(loginInfo);
  }, [loginInfo]);

  if (loginInfo == null) {
    return <Login onLogin={setLoginInfo} />;
  } else {
    return <CreateEvent loginInfo={loginInfo} />;
  }
}

export default App;
