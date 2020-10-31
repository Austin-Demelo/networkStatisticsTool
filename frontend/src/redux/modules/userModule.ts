const UserActions = {
  GET_ALL_USERS: "USER/GET_ALL_USERS",
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
    default:
      return state;
  }
}

export { initialState as InitialUserState };
