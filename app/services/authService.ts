import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthState } from "../interfaces/auth-state.interface";

export class AuthService {
  AUTH = "auth";
  constructor() {}

  async setUser(user: AuthState) {
    await AsyncStorage.setItem(this.AUTH, JSON.stringify(user));
  }

  async getUser() {
    const user = await AsyncStorage.getItem(this.AUTH);

    if (user == undefined) return null;

    return JSON.parse(user) as AuthState;
  }

  async logout() {
    await AsyncStorage.clear();
  }
}
