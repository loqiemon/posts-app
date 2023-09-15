import { Ipost } from "../../models/IPost"
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface PostState {
    posts: Ipost[];
    isLoading: boolean;
    isLoadingAdd: boolean;
    isLoadingRemove: boolean;
    getPostsError: string;
    addPostsError: string;
    deletePostsError: string;
}

const initialState: PostState = {
    posts: [],
    isLoading: false,
    isLoadingAdd: false,
    isLoadingRemove: false,
    getPostsError: '',
    addPostsError: '',
    deletePostsError: '',
}


export const PostSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postsFetching(state) {
            state.isLoading = true;
        },
        postsFetchingSuccess(state, action: PayloadAction<Ipost[]>) {
            state.isLoading = false;
            state.getPostsError = '';
            state.posts = action.payload;
        },
        postsFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.getPostsError = action.payload;
        },
        addPost(state) {
            state.isLoadingAdd = true;
        },
        addPostSuccess(state, action: PayloadAction<Ipost>) {
            state.isLoadingAdd = false;
            state.addPostsError = '';
            state.posts = [...state.posts, action.payload];
        },
        addPostError(state, action: PayloadAction<string>) {
            state.isLoadingAdd = false;
            state.addPostsError = action.payload;
        },
        deletePost(state) {
            state.isLoadingRemove = true;
        },
        deletePostSuccess(state, action: PayloadAction<number>) {
            state.isLoadingRemove = false;
            state.deletePostsError = '';
            state.posts = state.posts.filter(post => post.id !== action.payload);
        },
        deletePostError(state, action: PayloadAction<string>) {
            state.isLoadingRemove = false;
            state.deletePostsError = action.payload;
        }
    }
})

export default PostSlice.reducer