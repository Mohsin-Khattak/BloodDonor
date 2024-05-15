import { Task } from "../entities-types";

type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Login: undefined;
  Signup: undefined;
  AddTask:Task|undefined,
};
export default RootStackParamList;
