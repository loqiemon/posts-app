import axios from "axios";
import { AppDispatch } from "../store";
import { Ipost } from "../../models/IPost";
import { PostSlice } from "./PostsSlice";


export const fetchPosts = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(PostSlice.actions.postsFetching())
        const response = await axios.get<Ipost[]>('https://jsonplaceholder.typicode.com/posts');
        const simplifiedData = response.data.map(post => ({
            id: post.id,
            title: post.title,
            body: post.body,
          }));
        dispatch(PostSlice.actions.postsFetchingSuccess(simplifiedData))
    } catch (e) {
        if (e instanceof Error) {
            dispatch(PostSlice.actions.postsFetchingError(e.message))
        }
    }
}


export const addPost = (post: {title: string, body: string}) => async (dispatch: AppDispatch) => {
    try {
        dispatch(PostSlice.actions.addPost())
        const response = await axios.post<Ipost>('https://jsonplaceholder.typicode.com/posts', post);
        dispatch(PostSlice.actions.addPostSuccess(response.data))
    } catch (e) {
        if (e instanceof Error) {
            dispatch(PostSlice.actions.addPostError(e.message))
        }
    }
}

export const deletePost = (id: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(PostSlice.actions.deletePost())
        await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
        dispatch(PostSlice.actions.deletePostSuccess(id))
    } catch (e) {
        if (e instanceof Error) {
            dispatch(PostSlice.actions.deletePostError(e.message))
        }
    }
}