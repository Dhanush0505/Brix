import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './CommentSection1.css';

const Comment = ({ comment, onReply, onEdit, onDelete }) => {
    const [replyText, setReplyText] = useState('');
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(comment.text);

    const handleReply = (e) => {
        e.preventDefault();
        if (replyText.trim()) {
            onReply(comment.id, replyText);
            setReplyText('');
            setShowReplyForm(false);
        }
    };

    const handleEdit = (e) => {
        e.preventDefault();
        onEdit(comment.id, editText);
        setIsEditing(false);
    };

    return (
        <div className="comment-card">
            {isEditing ? (
                <form onSubmit={handleEdit}>
                    <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        required
                    />
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                </form>
            ) : (
                <>
                    <p>{comment.text}</p>
                    <div className="comment-actions">
                        <button onClick={() => setIsEditing(true)} style={{backgroundColor: "#007bff", color: "white"}} className="icon-button">
                            <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button onClick={() => onDelete(comment.id)} style={{backgroundColor: "#007bff", color: "white"}} className="icon-button">
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                        <button onClick={() => setShowReplyForm(!showReplyForm)}>
                            {showReplyForm ? 'Cancel' : 'Reply'}
                        </button>
                    </div>
                </>
            )}
            {showReplyForm && (
                <form onSubmit={handleReply}>
                    <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write a reply..."
                        required
                    />
                    <button type="submit">Post Reply</button>
                </form>
            )}
            {comment.replies.length > 0 && (
                <div>
                    {comment.replies.map((reply) => (
                        <div key={reply.id} className="reply-card">
                            <p>{reply.text}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const CommentSection = () => {
    const [comments, setComments] = useState([]);
    const [text, setText] = useState('');

    const addComment = (e) => {
        e.preventDefault();
        if (text.trim()) {
            const newComment = {
                id: Date.now(),
                text,
                replies: [],
            };
            setComments([...comments, newComment]);
            setText('');
        }
    };

    const addReply = (commentId, replyText) => {
        const updatedComments = comments.map((comment) => {
            if (comment.id === commentId) {
                const newReply = {
                    id: Date.now(),
                    text: replyText,
                    replies: [],
                };
                return { ...comment, replies: [...comment.replies, newReply] };
            }
            return comment;
        });
        setComments(updatedComments);
    };

    const editComment = (commentId, newText) => {
        const updatedComments = comments.map((comment) => {
            if (comment.id === commentId) {
                return { ...comment, text: newText };
            }
            return comment;
        });
        setComments(updatedComments);
    };

    const deleteComment = (commentId) => {
        setComments(comments.filter(comment => comment.id !== commentId));
    };

    return (
        <div>
            <div className='input_box'>
                <h1 style={{ textAlign: 'center' }}>Threads App</h1>
                <form onSubmit={addComment} style={{ margin: '20px 0', width: '400px', marginLeft: 'auto', marginRight: 'auto' }}>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Write a comment..."
                        required
                        style={{ width: '100%', height: '50px', marginBottom: '10px' }}
                    />
                    <button type="submit" style={{ display: 'block', margin: '0 auto', height: '40px' }}>Post Comment</button>
                </form>
            </div>
            <div style={{ padding: '20px' }}>
                <div className="comment-section">
                    {comments.map((comment) => (
                        <Comment
                            key={comment.id}
                            comment={comment}
                            onReply={addReply}
                            onEdit={editComment}
                            onDelete={deleteComment}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CommentSection;
