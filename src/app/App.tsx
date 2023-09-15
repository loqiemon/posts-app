import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { deletePost, fetchPosts } from "../store/reducers/ActionCreators";
import Tablee, { TableSkeleton } from "../components/Tablee";
import Alert from '@mui/material/Alert';
import useSort from "../hooks/useSort";
import useSearch from "../hooks/useSearch";
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import PostForm from "../components/PostForm";

const Container = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
`

function App() {
  const {posts, isLoading, getPostsError} = useAppSelector(state => state.postReducer)

  const dispatch = useAppDispatch();

  const {
    searchedArray,
    handleSearch,
    searchInput
  } = useSearch({array: posts, searchProp: 'title'})

  const {
    handleSort,
    sortedArray
  } = useSort({array: searchedArray});


  useEffect(() => {
    dispatch(fetchPosts())
  }, [])

  const handleDelete = (id: number):void => {
    dispatch(deletePost(id))
  }

  return (
    <Container>
      <PostForm/>
      {getPostsError && <Alert severity="error">{getPostsError}</Alert>}
      {isLoading && <TableSkeleton data={sortedArray}/>}
      {!isLoading && 
        <>
          <TextField 
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            value={searchInput}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Tablee
            data={sortedArray}
            handleSort={handleSort}
            handleDelete={handleDelete}
          />
        </>
      }
    </Container>
  )
}

export default App
