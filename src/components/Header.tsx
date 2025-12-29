import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks/hooks";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export function Header() {
  const { isAuth } = useAppSelector((state) => ({
    isAuth: !!state.user?.email,
  }));

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="bg-black w-full h-20 flex justify-between items-center">
      <Link
        to="/"
        className="text-white lg:text-[30px] text-[20px] font-bold lg:ml-5 ml-2"
      >
        CineVerse
      </Link>

      <div className="flex gap-2">
        {isAuth ? (
          <div className="flex items-center gap-4">
            <Link
              to="/profile"
              className="text-white hover:text-rose-500 font-bold transition-colors"
            >
              My Profile
            </Link>
          </div>
        ) : (
          <Link to="/login">Sign In</Link>
        )}
        <Link
          className="text-white bg-neutral-900 p-2 pl-5 pr-5 lg:mr-5 mr-2 rounded-sm cursor-pointer"
          to="/login"
          onClick={handleLogout}
        >
          {isAuth ? "Log out" : "Log in"}
        </Link>
      </div>
    </header>
  );
}
