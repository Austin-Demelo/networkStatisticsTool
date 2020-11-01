import { AppThunkAction } from "../../types/thunk";
import { ILoginPayload } from "../../interfaces/payloads/ILoginPayload";
import { IUser } from "../../interfaces/user";
import { http } from "../../utilities/http";

const UserActions = {
  GET_ALL_USERS: "USER/GET_ALL_USERS",
  LOGIN: "USER/LOGIN",
  LOGIN_ERROR: "USER/LOGIN_ERROR",

  LOGOUT: "USER/LOGOUT",
  LOGOUT_ERROR: "USER/LOGOUT_ERROR",
};

export function getAllUsers(user) {
  return (dispatch, getState) => {
    // return firebase
    //   .firestore()
    //   .collection("Exercises")
    //   .where("user", "==", user)
    //   .get()
    //   .then((result) => {
    //     // result.docs.forEach(doc => {

    //     // })
    // try{}
    //     const networks = [];
    //     result.forEach(function (doc) {
    //       workouts.push({ ...doc.data(), id: doc.id });
    //     });
    //     dispatch({ type: ExerciseActions.GET_EXERCISES, payload: workouts });
    //     return workouts;
    //   //})
    //   .catch((error) => {
    //     const payload = { hasError: true, message: error };
    //     dispatch({ type: ExerciseActions.EXERCISES_ERROR, payload: payload });
    //     return payload;
    //   //});

    const users = ["users go here"];

    dispatch({ payload: users });
  };
}

export function login(username: string, password: string): AppThunkAction<Promise<ILoginPayload>> { //AppThunkAction<Promise<ILoginPayload>> {
  return async (dispatch, getState) => {
    try { 
       let networks: ILoginPayload = await http<ILoginPayload>(URL + "/login");
       dispatch({ type: UserActions.LOGIN, payload: [networks] });
       return networks;
    } catch(error){
      const payload: ILoginPayload = {
        error: true,
        response: {
          message: error.message,
        },
      };
      dispatch({ type: UserActions.LOGIN_ERROR, payload });
      logout();
      return payload;
    }
   };
}

function logout() : AppThunkAction<void> {
	return ((dispatch) => {
		dispatch({ type: UserActions.LOGOUT });
	});
}

const initialState = {
  users: [],
  hasError: false,
  message: "",
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case UserActions.GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
        hasError: false,
        message: "",
      };
    case UserActions.LOGIN:
      return {
        ...state,
        currentUserId: action.payload.user.Id,
        hasError: false,
        message: "",
      };
    default:
      return state;
  }
}

export { initialState as InitialUserState };
