import { colors } from "../../config/colors"

export type Theme ={
    dark:boolean
    colors: typeof colors
  }
export type Task ={
  id?:string,
  title?: string,
  time?: string,
  description?: string,
  }
export type UserInfo ={
  email?: string,
  name?: string,
  userId?: string,
  }
