import * as api from '../api';
import { FETCH_ALL, UPDATE, DELETE, CREATE } from '../constants/actionTypes'
import Swal from 'sweetalert2'

//sweet alert

const swalWithBootstrapButtons = Swal.mixin();


//Action creator

export const getPosts = () => async (dispatch) => {

    try {
        const { data } = await api.fetchPosts();
        dispatch({ type: FETCH_ALL, payload: data })
    }
    catch (error) {
        console.log(error)
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);

        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);

        dispatch({ type: UPDATE, payload: data })
    }
    catch (error) {
        console.log(error)
    }

};

export const deletePost = (id) => async (dispatch) => {

    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    })
        .then(async (result) => {

            if (result.isConfirmed) {
                try {
                    await api.deletePost(id);
                    dispatch({ type: DELETE, payload: id });
                    swalWithBootstrapButtons.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                } catch (error) {
                    console.log(error)

                }
            }
            else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                )
            }

        })
};

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);

        dispatch({ type: UPDATE, payload: data })
    }
    catch (error) {
        console.log(error);

    }
}