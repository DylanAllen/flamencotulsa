import config from '../config.js';

export const getBlogs = async () => {
  try {
    const apiCall = await fetch(`${config.apiGateway.URL}/blog`);
    const blogs = await apiCall.json();
    console.log(blogs);
    const sorted = blogs.sort((a,b) => {
      return (a.dateval < b.dateval) ? 1 : -1
    })
    return sorted;
  } catch(err) {
    return []
  }
}

export const loadBlogData = async (slug, state, dispatch, force=false) => {
  if (force) {
    console.log('Force refresh blog data');
  }
  if (state.blogData.length && !force) {
    console.log(state, slug);
    return setBlogPost(slug, state, dispatch);
  }

  const localData = window.localStorage.getItem('blogState')

  if (localData && !force) {
    const localStore = JSON.parse(localData);
    const timeLimit = new Date().valueOf() - 300000;
    if (localStore.timestamp > timeLimit) {
      dispatch({ type: 'setBlogData', value: localStore.blogData, slug: slug });
      return slug
    }

  }

  const blogs = await getBlogs();
  console.log('Updating blogs with new data', blogs);
  return dispatch({ type: 'setBlogData', value: blogs, slug: slug });
}

export const postBlog = async (post, state, dispatch, slug) => {

  console.log(post);

  if (!post.dateval) {
    post.dateval = new Date().valueOf();
  }

  try {
    const apiCall = await fetch(`${config.apiGateway.URL}/blog`, {
      method: 'post',
      headers: new Headers({
        Authorization: state.user.signInUserSession.idToken.jwtToken,
      }),
      body: JSON.stringify(post)
    });
    const postResp = await apiCall.json();
    await loadBlogData(slug, state, dispatch, true);
    if (postResp.message) {
      return postResp.message
    }

    return 'Post successful!'
  } catch(err) {
    console.error('Error posting to blog', err);
    return 'API post error.';
  }
}

export const deletePost = async (id, state, dispatch) => {
  try {
    const apiCall = await fetch(`${config.apiGateway.URL}/blog`, {
      method: 'delete',
      headers: new Headers({
        Authorization: state.user.signInUserSession.idToken.jwtToken,
      }),
      body: JSON.stringify({ id: id })
    });
    const postResp = await apiCall.json();
    await loadBlogData(null, state, dispatch, true);
    return postResp;
  } catch(err) {
    console.error('Error deleting post', err);
    return null;
  }
}

export const setBlogPost = (slug, state, dispatch) => {
  if (slug) {
    console.log('slug', slug, 'blogstate', state);
    return state.blogData.map((post) => {
      if (post.slug === slug) {
        console.log('Setting post', post);
        return dispatch({ type: 'setActiveBlog', value: post })
      }
      return null;
    })
  }
}

export const getEnrollments = async (state) => {

  const apiCall = await fetch(`${config.apiGateway.URL}/enroll`, {
    method: 'get',
    headers: new Headers({
      Authorization: state.user.signInUserSession.idToken.jwtToken,
    })
  });
  const enrollmentResp = await apiCall.json();
  return enrollmentResp;

}
