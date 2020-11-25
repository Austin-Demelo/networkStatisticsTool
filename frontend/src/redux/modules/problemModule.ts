import { AppThunkAction } from "../../types/thunk";
import { HttpMethod } from "../../types/httpMethods";
import { IProblem } from "../../interfaces/problem";
import { IProblemState } from "../states/problemState";
import { UpdateStatus } from "../../types/updateStatus";
import { http } from "../../utilities/http";

const ProblemActions = {
  GET_ALL_PROBLEMS: "problems/GET_ALL_PROBLEMS",
  POST_PROBLEM: "problems/POST_PROBLEM",
  PUT_PROBLEM: "problems/PUT_PROBLEM",
  DELETE_PROBLEM: "problems/DELETE_PROBLEM"

};

export function getAllProblems(): AppThunkAction<Promise<IProblem[] | undefined>>  {
  return async (dispatch, getState) => {
   try {

      let problems: IProblem[] = await http<IProblem[]>("http://localhost:52288/api/networkproblems");
      dispatch({ type: ProblemActions.GET_ALL_PROBLEMS, payload: problems });
      return problems;
   } catch(error){
     //TO-DO, Add Error to Problem State
     console.log(error);
   }
  };
}

export function createProblem(addProblem:IProblem): AppThunkAction<Promise<IProblem | undefined>>{
  return async (dispatch, getState) => {
    try {
       let problem:  IProblem  = await http<IProblem>("http://localhost:52288/api/networkproblems", HttpMethod.POST, JSON.stringify(addProblem));
       dispatch({ type: ProblemActions.POST_PROBLEM, payload: problem });
       return problem;
    } catch(error){
      //TO-DO, Add Error to Problem State
      console.log(error);
    }
   };
} 

export function updateProblem(updateProblem:IProblem): AppThunkAction<Promise<IProblem | undefined>>{
  return async (dispatch, getState) => {
    try {
      // Must send "stringified" JSON to server
       const updateStatus: UpdateStatus = await http<UpdateStatus>(`http://localhost:52288/api/networkproblems`, HttpMethod.PUT, JSON.stringify(updateProblem));
       if(updateStatus === UpdateStatus.Ok) {
          // If the update status is good, then push to store
          dispatch({ type: ProblemActions.PUT_PROBLEM, payload: updateProblem });
          return updateProblem;
       }
       
    } catch(error){
      //TO-DO, Add Error to Problem State
      console.log(error);
    }
   };
}

export function deleteProblem(problemId: number): AppThunkAction<Promise<number | undefined>>{
  return async (dispatch, getState) => {
    try {
      // Must send "stringified" JSON to server
       const deleteId: number = await http<UpdateStatus>(`http://localhost:52288/api/networkproblems/${problemId}`, HttpMethod.DELETE);
       console.log(deleteId);
       if(deleteId === problemId) {
          // If the update status is good, then push to store
          dispatch({ type: ProblemActions.DELETE_PROBLEM, payload: deleteId });
          return deleteId;
       }
       
    } catch(error){
      //TO-DO, Add Error to Problem State
      console.log(error);
    }
   };
}

const initialState: IProblemState = {
  problems: [],
  hasError: false,
  message: "",
};

export function problemReducer(state = initialState, action) {
  let updatedProblems: IProblem[] = [];
  switch (action.type) {
    case ProblemActions.GET_ALL_PROBLEMS:
      return {
        ...state,
        problems: action.payload,
        hasError: false,
        message: "",
      };
    case ProblemActions.POST_PROBLEM:
      let newProblems = [...state.problems];
      newProblems.push(action.payload);
      return {
        ...state,
        problems: newProblems,
        hasError: false,
        message: "",
      };
    case ProblemActions.PUT_PROBLEM:
      updatedProblems = [...state.problems];
      updatedProblems = updatedProblems.map(problem =>  problem.Id === action.payload.Id ? action.payload : problem);
      return {
        ...state,
        problems: updatedProblems,
        hasError: false,
        message: "",
      };
    case ProblemActions.DELETE_PROBLEM:
      updatedProblems = [...state.problems];
      updatedProblems = updatedProblems.filter(problem =>  problem.Id !== action.payload); //Find the deleted problem by ID, and filter it out
      return {
        ...state,
        problems: updatedProblems,
        hasError: false,
        message: "",
      };
    default:
      return state;
  }
}

export { initialState as InitialProblemState };
