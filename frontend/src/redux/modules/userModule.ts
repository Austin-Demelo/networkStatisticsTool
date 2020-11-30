import { removeObjectFromLocalStorage, saveObjectFromLocalStorage } from "../../utilities/localStorage";

import { AppThunkAction } from "../../types/thunk";
import {HttpMethod} from "../../types/httpMethods";
import {IUser} from "../../interfaces/user";
import { UpdateStatus } from "../../types/updateStatus";
import { http } from "../../utilities/http";

const UserActions = {
  GET_ALL_USERS: "user/GET_ALL_USERS",
  POST_USER: "user/POST_USER",
  PUT_USER: "user/PUT_USER",
  DELETE_USER: "user/DELETE_USER",


  LOGIN: "USER/LOGIN",
  LOGIN_ERROR: "USER/LOGIN_ERROR",

  LOGOUT: "USER/LOGOUT",
  LOGOUT_ERROR: "USER/LOGOUT_ERROR",
};

export function getAllUsers(): AppThunkAction<Promise<IUser[] | undefined>> {
  return async (dispatch, getState) => {
   try{
    let users: IUser[] = await http<IUser[]>("http://localhost:52288/api/user");
    dispatch({type: UserActions.GET_ALL_USERS, payload: users});
    return users;
  }catch(error){
     console.log(error);
   }
  };
}

export function createUser(addUser:IUser): AppThunkAction<Promise<IUser | undefined>>{
  return async (dispatch, getState) => {
    try {
       let user: IUser = await http<IUser>("http://localhost:52288/api/user", HttpMethod.POST, JSON.stringify(addUser));
       dispatch({ type: UserActions.POST_USER, payload: user });
       return user;
    } catch(error){
      //TO-DO, Add Error to user State
      console.log(error);
    }
   };
} 

export function registerUser(addUser:IUser): AppThunkAction<Promise<IUser | undefined>>{
  return async (dispatch, getState) => {
    try {
       let user: IUser = await http<IUser>("http://localhost:52288/api/user/register", HttpMethod.POST, JSON.stringify(addUser));
       dispatch({ type: UserActions.POST_USER, payload: user });
       return user;
    } catch(error){
      //TO-DO, Add Error to user State
      console.log(error);
    }
   };
} 

export function updateUser(updateUser:IUser): AppThunkAction<Promise<IUser | undefined>>{
  return async (dispatch, getState) => {
    try {
      // Must send "stringified" JSON to server
       const updateStatus: UpdateStatus = await http<UpdateStatus>(`http://localhost:52288/api/user`, HttpMethod.PUT, JSON.stringify(updateUser));
       if(updateStatus === UpdateStatus.Ok) {
          // If the update status is good, then push to store
          dispatch({ type: UserActions.PUT_USER, payload: updateUser });
          return updateUser;
       }
       
    } catch(error){
      //TO-DO, Add Error to User State
      console.log(error);
    }
   };
}


export function deleteUser(userId: number): AppThunkAction<Promise<number | undefined>>{
  return async (dispatch, getState) => {
    try {
      // Must send "stringified" JSON to server
       const deleteId: number = await http<UpdateStatus>(`http://localhost:52288/api/user/${userId}`, HttpMethod.DELETE);
       console.log(deleteId);
       if(deleteId === userId) {
          // If the update status is good, then push to store
          dispatch({ type: UserActions.DELETE_USER, payload: deleteId });
          return deleteId;
       }
       
    } catch(error){
      //TO-DO, Add Error to User State
      console.log(error);
    }
   };
}

export function validateUser(key: string): AppThunkAction<Promise<IUser | undefined>>{
  return async (dispatch, getState) => {
    try {
        console.log(key);
       return await http<IUser>(`http://localhost:52288/api/user/key/${key}`);
    } catch(error){
      //TO-DO, Add Error to User State
      console.log(error);
    }
   };
}

export function loginUser(user: IUser): AppThunkAction<Promise<IUser | undefined>> { //AppThunkAction<Promise<ILoginPayload>> {
  console.log(user);
  return async (dispatch, getState) => {
    try { 
       let trustredUser: IUser = await http<IUser>("http://localhost:52288/api/login", HttpMethod.POST, JSON.stringify(user));
       console.log(`THIS ${JSON.stringify(trustredUser)}`);
       if(trustredUser) {
          dispatch({ type: UserActions.LOGIN, payload: trustredUser });
          saveObjectFromLocalStorage('nsc-logged-in', trustredUser);
       }
       return trustredUser;
    } catch(error){
      console.log(error);
      logout();
    }
   };
}

export function logout() : AppThunkAction<void> {
	return ((dispatch) => {
    dispatch({ type: UserActions.LOGOUT });
    removeObjectFromLocalStorage('nsc-logged-in');
	});
}

const initialState = {
  users: [],
  hasError: false,
  message: "",
};

export function userReducer(state = initialState, action) {
  let updatedUsers: IUser[] = [];
  switch (action.type) {
    case UserActions.GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
        hasError: false,
        message: "",
      };
      case UserActions.POST_USER:
        let newUsers : IUser[] = [...state.users]; //might be an error with the IUser type here
        newUsers.push(action.payload);
        return {
          ...state,
          users: newUsers,
          hasError: false,
          message: "",
        };
      case UserActions.PUT_USER:
        updatedUsers = [...state.users];
        updatedUsers = updatedUsers.map(user =>  user.Id === action.payload.Id ? action.payload : user);
        return {
          ...state,
          users: updatedUsers,
          hasError: false,
          message: "",
        };
      case UserActions.DELETE_USER:
        updatedUsers = [...state.users];
        updatedUsers = updatedUsers.filter(user =>  user.Id !== action.payload); //Find the deleted network by ID, and filter it out
        return {
          ...state,
          users: updatedUsers,
          hasError: false,
          message: "",
        };
    case UserActions.LOGIN:
      return {
        ...state,
        currentUser: action.payload,
        hasError: false,
        message: "",
      };
      case UserActions.LOGOUT:
      return {
        ...state,
        currentUser: undefined,
        hasError: false,
        message: "",
      };
    default:
      return state;
  }
}

export { initialState as InitialUserState };
