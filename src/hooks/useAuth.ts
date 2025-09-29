// hooks/useAuth.ts
import { useState, useEffect } from "react";

export function useAuth(): [boolean, React.Dispatch<React.SetStateAction<boolean>>] {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLogin(Boolean(localStorage.getItem("token")));
    }
  }, []);

  return [isLogin, setIsLogin];
}
