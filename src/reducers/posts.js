import {
  CREATE,
  DELETE,
  UPDATE,
  LIKE,
  COMMENT,
  FETCH_ALL,
  FETCH_POST,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
} from "../constants/actionTypes";

export default (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_BY_SEARCH:
      return {
        ...state,
        posts: action.payload,
      };
    case FETCH_POST:
      return {
        ...state,
        post: action.payload,
      };
    case CREATE:
      // add new post obj to existing array
      return { ...state, posts: [...state.posts, action.payload] };
    case UPDATE:
    case LIKE:
      // action.payload mean updated post
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          // change the post that just received a comment
          if (post._id === action.payload._id) return action.payload;
          // return all the other posts normally...
          return post;
        }),
      };
    case DELETE:
      // keep all the post except the one where the id is equal to action.payload
      // in actions we set the payload as id (payload:id)
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    default:
      return state;
  }
};
