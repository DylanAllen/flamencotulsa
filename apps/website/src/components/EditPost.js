import "./EditPost.css";
import React, { useEffect } from "react";
import { Box, TextArea, FormField, Markdown, Button, Paragraph, TextInput } from 'grommet';
import AdminMenu from './AdminMenu';
import { loadBlogData, setBlogPost, postBlog } from '../services/blogService';

const savePost = async (slug, state, dispatch) => {
  console.log('save the post');
  return await postBlog(state.activeBlog, state, dispatch, slug)
}

export default function EditPost(props) {

  const { state, dispatch, history } = props;
  const slug = props.match.params.slug;
  console.log(props)

  const saveHandler = () => {
    let overwrite = false;
    state.blogData.map((post) => {
      if (post.slug === state.activeBlog.slug && post.id !== state.activeBlog.id) {
        overwrite = true;
      }
    })
    if (overwrite) {
      alert(`The URL slug "${state.activeBlog.slug}" is already in use. Please select another slug value`);
      return null;
    }
    savePost(slug, state, dispatch)
    if (slug !== state.activeBlog.slug) {
      history.push(`/admin/blog/${state.activeBlog.slug}`)
    }
  }

  const menuItems = [
    { label: 'Manage Blog', onClick: () => {history.push('/admin/blog');}, title: 'Manage Blog' },
    { label: 'Manage Enrollments', onClick: () => {history.push('/admin/enrollments');}, title: 'Manage Enrollments' },
    { label: 'Manage Store', onClick: () => {history.push('/admin/store');}, title: 'Manage Store' }
  ]

  useEffect(() => {
    console.log(slug, state, dispatch)
    if (slug === 'new' && state.activeBlog.id) {
      dispatch({ type: 'setActiveBlog', value: {
        ContentType: 'blog',
        title: '',
        slug: '',
        content: '',
        excerpt: ''
      }})
    }
    loadBlogData(slug, state, dispatch);
  },[])

  return (
    <Box className="postEditContainer">
      <Box className="editorMenu" border='bottom' pad={'small'}>
        <AdminMenu menuItems={menuItems} />
        <Button className="saveButton" label="Save" onClick={() => {
            saveHandler()
          }} />
      </Box>
      <Box elevation="small" pad="small" className="editorPane">
        <FormField label="Post Title">
          <TextInput placeholder="Post title" value={state.activeBlog.title} onChange={(event)=> {
            const post = JSON.parse(JSON.stringify(state.activeBlog));
            post.title = event.target.value;
            dispatch({ type: 'setActiveBlog', value: post})
          }} />
        </FormField>
        <FormField label="Post Slug">
          <TextInput placeholder="Post title" value={state.activeBlog.slug} onChange={(event)=> {
            const post = JSON.parse(JSON.stringify(state.activeBlog));
            post.slug = event.target.value;
            dispatch({ type: 'setActiveBlog', value: post})
          }} />
        </FormField>
        <FormField className="postEditFormField" label="Blog Content" elevation={"small"}>
          <TextArea className='postEditor' elevation={"small"} pad='medium' value={state.activeBlog.content} onChange={(event)=> {
            const post = JSON.parse(JSON.stringify(state.activeBlog));
            console.log(event);
            post.content = event.target.value;
            dispatch({ type: 'setActiveBlog', value: post})
          }} />
        </FormField>
        <FormField label="Excerpt">
          <TextInput placeholder="Post excerpt" value={state.activeBlog.excerpt} onChange={(event)=> {
            const post = JSON.parse(JSON.stringify(state.activeBlog));
            post.excerpt = event.target.value;
            dispatch({ type: 'setActiveBlog', value: post})
          }} />
        </FormField>
      </Box>
      <Box elevation="small" pad="small" className="editorPane">
        <Markdown components={
          {
            "p": {
              "component": Paragraph,
              "props": {"size": "large", fill: true}
            }
          }}>{state.activeBlog.content}</Markdown>
      </Box>
    </Box>
  )
}
