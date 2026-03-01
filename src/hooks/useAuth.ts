import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";


const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};

export default useAuth;

