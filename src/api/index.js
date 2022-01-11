import axios from 'axios';

// const url = 'https://memory-application-server.herokuapp.com/posts';

// create an axios instance ,  
const API = axios.create({baseURL: 'http://localhost:5000'});

// Auth middleware. Our [backend] middleware can't work without this.
// this is intercept all of the request and check, is user valid for to do this action?
// for example: Create post/ delete post etc.
// if this curly braces logic not match, he/she can't create any request below.
//{
API.interceptors.request.use((req)=> {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
})
//}

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`$/posts/${id}`, updatedPost);
export const deletePost = (id)=> API.delete(`$/posts/${id}`);
export const likePost = (id)=> API.patch(`$/posts/${id}/likePost`);
export const signIn = (formData)=> API.post('/user/signin', formData);
export const signUp = (formData)=> API.post('/user/signup', formData);
