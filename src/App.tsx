import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useAppDispatch } from "./app/hooks";
import { setUser, removeUser } from "./app/slices/userSlice";
import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { HomePage } from "./pages/HomePage";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.refreshToken,
            name: user.displayName,
          })
        );
      } else {
        dispatch(removeUser());
      }
    });

    return () => listen();
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
