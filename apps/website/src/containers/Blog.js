import "./Home.css";
import React, { useEffect } from "react";
import { Box, Heading, Text, Markdown, Anchor, Paragraph } from 'grommet';
import config from '../config.js';
import { loadBlogData, setBlogPost } from '../services/blogService';

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

  const { history, state, dispatch } = props;

  console.log(state);

  useEffect(() => {
    loadBlogData(props.match.params.slug, state, dispatch);
  },[])

  const BlogPost = (props) => {

    return (
      <Box key={state.activeBlog.slug}>
        <Heading level="1" style={{maxWidth: '100%'}}>{state.activeBlog.title}</Heading>
        <Markdown components={
          {
            "p": {
              "component": Paragraph,
              "props": {"size": "large", fill: true}
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
            <Box pad="medium" border="bottom" key={post.slug} elevation="medium" margin={{vertical: 'small'}}>
              <Heading level="3" style={{maxWidth: '100%'}}><Anchor onClick={()=> {setBlogPost(post.slug, state, dispatch); history.push(`blog/${post.slug}`);}}>{post.title}</Anchor></Heading>
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
