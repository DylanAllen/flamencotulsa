import "./Admin.css";
import React, { useEffect, useState } from "react";
import { Box, Heading, Text, Button, Anchor } from 'grommet';
import AppliedRoute from "../components/AppliedRoute";
import EditPost from '../components/EditPost';
import AdminMenu from '../components/AdminMenu';
import config from '../config.js';
import { Route } from "react-router-dom";
import { deletePost } from '../services/blogService';

const getBlogs = async () => {
  try {
    const apiCall = await fetch(`${config.apiGateway.URL}/blog`);
    const blogs = await apiCall.json();
    return blogs;
  } catch(err) {
    return []
  }
}


export default function Admin(props) {

  const { state, dispatch, history } = props;

  const [activePost, setActivePost] = useState(null);
  const [slug, setSlug] = useState(null);

  const deleteHandler = async (id) => {
    const yesdelete = confirm('Are you sure you want to delete this post?'); // eslint-disable-line
    if (yesdelete) {
      return await deletePost(id, state, dispatch);
    }
    return null;
  }

  const menuItems = [
    { label: 'Manage Blog', onClick: () => {history.push('/admin/blog');}, title: 'Manage Blog' },
    { label: 'Manage Enrollments', onClick: () => {history.push('/admin/enrollments');}, title: 'Manage Enrollments' },
    { label: 'Manage Store', onClick: () => {history.push('/admin/store');}, title: 'Manage Store' }
  ]

  const loadBlogData = async (slug) => {
    if (state.blogData.length) {
      console.log(state, slug);
      setBlogPost(slug);
      return null
    }

    const localData = window.localStorage.getItem('blogState')

    if (localData) {
      const localStore = JSON.parse(localData);
      const timeLimit = new Date().valueOf() - 300000;
      if (localStore.timestamp > timeLimit && localStore.blogData.length) {
        dispatch({ type: 'setBlogData', value: localStore.blogData, slug: slug });
        return slug
      }

    }

    const blogs = await getBlogs();
    console.log(blogs)
    dispatch({ type: 'setBlogData', value: blogs, slug: slug });
    setBlogPost(slug);
  }

  const setBlogPost = (slug) => {
    if (slug) {
      console.log('slug', slug, 'blogstate', state);
      state.blogData.map((post) => {
        if (post.slug === slug) {
          console.log('Setting post', post);
          dispatch({ type: 'setActiveBlog', value: post })
        }
      })
    }
  }

  const PostList = (props) => {

    return (
      <Box className="adminPostList" alignSelf="start" margin={'medium'} elevation="small" pad={'medium'}>
        <Heading level={2}>Manage Posts</Heading>
      {
        state.blogData.map(post => {
          return (
            <Box className="adminPost" key={post.id} border={'bottom'} margin={{bottom: 'small'}} pad="small" elevation="small">
              <Text size="large">{post.title}</Text>
              <Button label='Edit' onClick={() => {
                  setActivePost(post)
                  setSlug(post.slug)
                  props.history.push(`/admin/blog/${post.slug}`)
                }} />
              <Button label='Delete' onClick={() => {deleteHandler(post.id)}} />
            </Box>
          )
        })
      }
      <Button label="Create New Post" onClick={() => {
          props.history.push('/admin/blog/new');
        }} />
      </Box>
    )
  }

  useEffect(() => {
    loadBlogData(props.match.params.slug);
  },[])

  return (
    <Box>
      <Heading level="1">Admin Page</Heading>
      <Box border={'bottom'}>
        <AdminMenu menuItems={menuItems} />
      </Box>
      <AppliedRoute path="/admin/blog" component={PostList} />
      <AppliedRoute path="/admin/blog/:slug" component={EditPost} appProps={{ state: state, dispatch: dispatch, slug: slug}} />
      <AppliedRoute path="/admin/blog/new" component={EditPost} appProps={{ state: state, dispatch: dispatch, slug: ''}} />
    </Box>
  )
}
