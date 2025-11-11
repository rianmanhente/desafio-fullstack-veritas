import type { UserProps } from "../utils/typeUser";
import { api } from "./api";


export async function createUser( userData: UserProps) : Promise<UserProps | undefined> {
  try {
    const res = await api.post("/auth/register", userData)
    return res.data
  } catch(err) {
    console.log(err)
  }
}