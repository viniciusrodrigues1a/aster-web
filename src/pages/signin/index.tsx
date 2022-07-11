import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useAuthContext();

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    signIn(email, password);
  }

  return (
    <div className="flex justify-center items-center py-12 min-h-screen bg-slate-200">
      <div className="px-12 py-10 bg-neutral-50 rounded max-w-2xl w-4/5 sm:w-3/5 lg:w-2/5 shadow-lg">
        <h1 className="font-bold text-lg 2xl:text-xl 4xl:text-3xl">Login</h1>

        <form className="mt-10" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter email"
            className="border border-zinc-300 rounded pl-2 py-2 w-full mt-3"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter password"
            className="border border-zinc-300 rounded pl-2 py-2 w-full mt-3"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-violet-500 p-2 mt-10 text-neutral-50 rounded text-base 2xl:text-lg 4xl:text-xl"
          >
            Login to my account
          </button>
        </form>

        <Link to="/signup">
          <p className="w-full text-gray-500 text-center mt-3 text-sm 2xl:text-base 4xl:text-lg">
            Doesn't have an account yet?
          </p>
        </Link>
      </div>
    </div>
  );
}
