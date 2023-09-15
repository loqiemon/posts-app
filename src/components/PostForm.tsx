import { Button, FormGroup , Input, InputLabel, CircularProgress, Alert } from '@mui/material';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { addPost } from '../store/reducers/ActionCreators';

const MyFormControl = styled(FormGroup )`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
`
const MyButton = styled(Button)`

    
`

function PostForm() {
  const { input: title, handleInput: handleTitleInput} = useInput();
  const { input: body, handleInput: handleBodyInput} = useInput();

  const isLoading = useAppSelector(state => state.postReducer.isLoadingAdd);
  const error = useAppSelector(state => state.postReducer.addPostsError);

  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    if (title.length > 3 && body.length > 10) {
        dispatch(addPost({title, body}))
        handleBodyInput('');
        handleTitleInput('');
    } else {
        alert("Поля не заполнены или не соответстуют длине")
    }
  }

  return (
    <MyFormControl>
        {error.length > 0 && <Alert severity="error">{error}</Alert>}
        <InputLabel htmlFor="title">Title</InputLabel>
        <Input
            id="title"
            value={title}
            onChange={(e) => handleTitleInput(e.target.value)}
        />
        <InputLabel htmlFor="body">Body</InputLabel>
        <Input
            id="body"
            value={body}
            onChange={(e) => handleBodyInput(e.target.value)}
        />
        <MyButton onClick={handleSubmit} disabled={isLoading}>Submit</MyButton>
        {isLoading && <CircularProgress />}
    </MyFormControl>
  )
}

export default PostForm
