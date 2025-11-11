import type { LoginProps } from "../utils/typeLoginUser";
import { api } from "./api";


export async function loginUser( userData: LoginProps) : Promise<LoginProps | undefined> {
  try {
    const res = await api.post("/auth/login", userData)
    return res.data
  } catch(err) {
    console.log(err)
  }
}