import {
  createContext,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthService } from "../services/authService";
import { router } from "expo-router";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const authService = new AuthService();

  useEffect(() => {
    // const loadUser = async () => {
    //   const storedUser = await AsyncStorage.getItem("user");
    //   if (storedUser) {
    //     setUser(JSON.parse(storedUser));
    //   }
    //   setLoading(false);
    // };
    // loadUser();
    // authService
    //   .getUser()
    //   .then((res) => {
    //     console.log("Current: ", res);

    //     if (res) {
    //       router.push("/(tabs)");
    //     } else {
    //       router.push("/login");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

    // 
    const checkUser = async () => {
      try {
        const res = await authService.getUser();
        if (res) {
          setUser(res);
          router.replace("/(tabs)/Home");
        } else {
          setUser(null);
          router.replace("/login");
        }
      } catch (error) {
        console.error("Auth error: ", error);
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  const login = async (userData: SetStateAction<null>) => {
    setUser(userData);
  };

   const logout = async () => {
    setUser(null);
    router.replace("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
