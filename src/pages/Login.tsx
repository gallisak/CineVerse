import { signInWithPopup } from "firebase/auth";
import { Header } from "../components/Header";
import { auth, provider } from "../firebase";
import { GoogleIcon } from "../components/GoogleIcon";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppSelector } from "../app/hooks";

export function Login() {
  const navigate = useNavigate();
  const { isAuth } = useAppSelector((state) => ({
    isAuth: !!state.user?.email,
  }));

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
      alert("Login error");
    }
  };

  return (
    <>
      <Header />
      <div className="h-screen flex justify-center items-center bg-gray-900">
        <div className="flex justify-center py-10 px-20 items-center bg-gray-800 rounded-sm shadow-lg">
          <button
            onClick={loginWithGoogle}
            className="flex items-center justify-center gap-3 bg-white text-gray-700 font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-200 border border-gray-200 w-full hover:bg-blue-500 cursor-pointer"
          >
            <GoogleIcon />
            <span>{isAuth ? "h" : "Sign in with Google"}</span>
          </button>
        </div>
      </div>
    </>
  );
}
