import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { UserContext } from "./contexts/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    {/* <StrictMode> */}
    {/* <UserContext.Provider value={{ username: "grumpy19" }}> */}
    <App />
    {/* </UserContext.Provider> */}
    {/* </StrictMode> */}
  </BrowserRouter>
);

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState({ username: "grumpy19" });

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
