const NetworkActions = {
  GET_ALL_NETWORKS: "networks/GET_ALL_NETWORKS",
};

export function getAllNetworks(network) {
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

    const networks = ["test"];

    dispatch({ payload: networks });
  };
}

const initialState = {
  networks: [],
  hasError: false,
  message: "",
};

export function networkReducer(state = initialState, action) {
  switch (action.type) {
    case NetworkActions.GET_ALL_NETWORKS:
      return {
        ...state,
        workouts: action.payload,
        hasError: false,
        message: "",
      };
    default:
      return state;
  }
}

export { initialState as InitialNetworkState };
