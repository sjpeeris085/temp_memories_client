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
import * as api from "../api";

// Action creators (fuctions that return actions)

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchPost(id);
    /**
         *  const action = { type: "FETCH_ALL", payload: [] };
               // Instead of return the actiosn we dispatch the action as belows.
                dispatch(action);
         */
    // Sending response data as a payload to Reducers:
    dispatch({ type: FETCH_POST, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchPosts(page);
    /**
         *  const action = { type: "FETCH_ALL", payload: [] };
               // Instead of return the actiosn we dispatch the action as belows.
                dispatch(action);
         */
    // Sending response data as a payload to Reducers:
    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getPostBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);

    // Sending response data as a payload to Reducers:
    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createPost(post);
    // Sending response data as a payload to Reducers:
    dispatch({ type: CREATE, payload: data });
    dispatch({ type: END_LOADING });
    history.push(`/posts/${data._id}`);
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    // Sending response data as a payload to Reducers:
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    // Sending response data as a payload to Reducers:
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const commentPost = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id);

    dispatch({ type: COMMENT, payload: data });
    return data.comments;
  } catch (error) {
    console.log(error);
  }
};
