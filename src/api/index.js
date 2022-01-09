import axios from 'axios';

const url = 'https://memory-application-server.herokuapp.com/posts';

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
// export const createPost = (newPost) => {
//     console.log(newPost)
//     fetch(url,{
//         method : 'POST', 
//         headers:{
//             'content-type' : 'application/json'
//         },
//         body: JSON.stringify(newPost)
//     })
// };
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id)=> axios.delete(`${url}/${id}`);
export const likePost = (id)=> axios.patch(`${url}/${id}/likePost`)




