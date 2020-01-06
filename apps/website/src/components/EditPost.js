import "./EditPost.css";
import React, { useEffect } from "react";
import { Box, ResponsiveContext, TextArea, FormField, Markdown, Button, Paragraph, TextInput } from 'grommet';
// import AdminMenu from './AdminMenu';
import { Shop, Article, StatusGood } from 'grommet-icons';
import { loadBlogData, postBlog } from '../services/blogService';
import MainMenu from './MainMenu';

const savePost = async (slug, state, dispatch) => {
  const post = await postBlog(state.activeBlog, state, dispatch, slug)
  return alert(post)
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
        return null;
      }
      return null;
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
    { label: 'Blog', icon: Article, onClick: () => {history.push('/admin/blog');}, title: 'Manage Blog' },
    { label: 'Enrollments', icon: StatusGood, onClick: () => {history.push('/admin/enrollments');}, title: 'Manage Enrollments' },
    { label: 'Store', icon: Shop, onClick: () => {history.push('/admin/store');}, title: 'Manage Store' }
  ]

  useEffect(() => {
    if (slug === 'new' && (state.activeBlog.id || !state.activeBlog.ContentType)) {
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
    <ResponsiveContext.Consumer>
      {(size) => (
      <Box className="postEditContainer">
        <Box className="editorMenu" border='bottom' pad={'small'}>
          <MainMenu
            menuOverride={menuItems}
            size={ size }
            handleLogout={null}
            history={ props.history }
            state={ state }
          />
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
    )}
  </ResponsiveContext.Consumer>
  )
}
