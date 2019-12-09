import "./Home.css";
import React, { useReducer, useEffect } from "react";
import { Box, Heading, Text, Markdown, Anchor } from 'grommet';
import { blogReducer, initBlogReducer } from '../reducers/blogReducer.js';
import config from '../config.js';

const getBlogs = async () => {
  try {
    const apiCall = await fetch(`${config.apiGateway.URL}/blog`);
    const blogs = await apiCall.json();
    return blogs;
  } catch(err) {
    return []
  }
}

const blogStateInit = {
  blogData: [],
  activeBlog: {
    title: '',
    slug: '',
    content: '',
    excerpt: ''
  }
}

export default function Blog(props) {

  const { history } = props;

  const [ state, dispatch ] = useReducer(blogReducer, blogStateInit, initBlogReducer);

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
      if (localStore.timestamp > timeLimit) {
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

  useEffect(() => {
    loadBlogData(props.match.params.slug);
  },[])

  const BlogPost = (props) => {

    return (
      <Box key={state.activeBlog.slug}>
        <Heading level="1">{state.activeBlog.title}</Heading>
        <Markdown components={
          {
            "p": {
              "component": "Paragraph",
              "props": {"size": "large", fill: "true"}
            }
          }}
        >{state.activeBlog.content}</Markdown>
      </Box>
    )
  }

  const BlogList = (props) => {

    return (
      <Box>
      {
        state.blogData.map((post) => {
          return (
            <Box pad="medium" border="bottom" key={post.slug}>
              <Heading level="3"><Anchor onClick={()=> {setBlogPost(post.slug); history.push(`blog/${post.slug}`);}}>{post.title}</Anchor></Heading>
              <Text>{post.excerpt}</Text>
            </Box>
          )
        })
      }
      </Box>
    )

  }

  const TheContent = () => {
    if (state.activeBlog) {
      return <BlogPost />
    } else {
      return <BlogList />
    }
  }

  return (
    <Box pad={{bottom: 'medium'}}>
      {(!props.match.params.slug) && <Heading>Blog</Heading>}
      {(props.match.params.slug) ? <BlogPost /> : <BlogList />}
    </Box>
  )
}
