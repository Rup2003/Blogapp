import { Navigate } from "react-router";
import { useAuthstores } from "../src/store/useAuthstores";
import Loader from "./Loader";

const ProtectedRoutes = ({ children }) => {
  const { authUser, isgettingProfile, hasFetchedProfile } = useAuthstores();

  if (isgettingProfile || !hasFetchedProfile) return <Loader />;

  return authUser ? children : <Navigate to="/login" />;
};

export default ProtectedRoutes;