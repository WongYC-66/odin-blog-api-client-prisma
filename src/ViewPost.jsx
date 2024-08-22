import { useEffect, useState, useRef } from "react"
import Editor from 'react-simple-wysiwyg';

import CommentCard from './CommentCard.jsx'
import { API_URL } from './api_url.js'

export default function EditPost(props) {
    const postId = props.postId
    const setShowPage = props.setShowPage
    const isLogin = props.isLogin

    const [post, setPost] = useState({})
    const [allComments, setAllComments] = useState([])
    const [errData, setErrData] = useState('')

    const [toFetch, setToFetch] = useState(1)

    useEffect(() => {
        const fetchData = async (api_str) => {

            const myHeaders = new Headers();
            const token = localStorage.getItem("token");
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", `Bearer ${token}`);

            const response = await fetch(`${API_URL}/v1/${api_str}/${postId}`, {
                method: "GET",
                headers: myHeaders,
            });
            let data = await response.json()

            if (api_str == 'posts') {
                if (data.post) {
                    setPost(data.post)
                }
            } else {
                // comments
                if (data.allComments) {
                    setAllComments(data.allComments)
                }
            }

            if (data.error) {
                setErrData(data.error)
            }
        }
        fetchData("posts")
        fetchData("comments")

    }, [toFetch])

    async function submitNewComment(event) {
        event.preventDefault()
        const myHeaders = new Headers();
        const token = localStorage.getItem("token");
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");

        let formData = new FormData(event.target);
        formData = Object.fromEntries(formData.entries());

        let filteredFormData = {
            text: formData.comment,
        }

        const response = await fetch(`${API_URL}/v1/comments/${post.id}`, {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(filteredFormData),
        });

        let data = await response.json()
        if (data && data.message) {
            // setShowPage(`AllBlog`)
            setToFetch(toFetch + 1)
            setErrData("")
        } else {
            setErrData(data.error)
        }
    }

    return (
        <div className="">

            <h1>{post.title}</h1>

            <hr />

            <p dangerouslySetInnerHTML={{ __html: post.contents }}></p>

            {errData && <li className='text-danger'>{errData}</li>}

            {/* Comment Section, POST new comment & show list */}
            <hr></hr>
            <h2>Comments:</h2>

            <form method="POST" onSubmit={submitNewComment}>
                <input type="text" className="form-control" name="comment" id="comment" placeholder={!isLogin ? "To post comment, please sign in" : ""}/>
                <div className="my-1 d-flex flex-row-reverse">
                    <button type="submit" className="btn btn-primary btn-sm">Reply</button>
                </div>

            </form>

            {allComments.map(comment => <CommentCard key={comment.id} comment={comment} toFetch={toFetch} setToFetch={setToFetch} />)}


        </div>
    )

}