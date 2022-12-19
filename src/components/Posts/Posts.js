import React from "react";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";

import Post from "./Post/Post";
import useStyles from "./styles";

const Posts = ({ setCurrentId }) => {
  // use selector is used to get access to redux store
  // from reducers index.js we have posts: posts, we can access by key as belows.
  // in below we have return globalReduxStore.posts  (state indicate globalReduxStore)
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();

  // !posts.length ?   Means=> posts.length ==0
  // xs={12} (extra small displays (Phones))  sm={6} (small and medium displays)

  if (!posts.length && !isLoading) return "No Posts";

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.mainContainer}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
