import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export function Header() {
  const { name, isAuth } = useAppSelector((state) => ({
    name: state.user?.name,
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
      <div>
        <span className="text-white mr-3 font-medium">{name}</span>
        <Link
          className="text-white bg-gray-700 p-2 pl-5 pr-5 lg:mr-5 mr-2 rounded-sm cursor-pointer"
          to="/login"
          onClick={handleLogout}
        >
          {isAuth ? "Log out" : "Log in"}
        </Link>
      </div>
    </header>
  );
}
