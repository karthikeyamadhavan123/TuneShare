import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Comments = ({ audioId, songId, token, userId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState({});
  const [showComments, setShowComments] = useState(false);

  const fetchComments = async () => {
    if (!audioId || !songId) {
      console.error('audioId or songId is null:', { audioId, songId });
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5000/${songId}/songs/${audioId}/audio/comments`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [audioId, songId, token]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const postComment = async () => {
    if (!audioId || !songId) {
      console.error('audioId or songId is null:', { audioId, songId });
      return;
    }
    try {
      await axios.post(`http://localhost:5000/${userId}/songs/${songId}/audio/${audioId}/comments`, { comment: newComment }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setNewComment('');
      fetchComments();
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const deleteComment = async (commentId) => {
    if (!audioId || !songId) {
      console.error('audioId or songId is null:', { audioId, songId });
      return;
    }
    try {
      await axios.delete(`http://localhost:5000/${userId}/songs/${songId}/audio/${audioId}/comments/${commentId}/delete`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        data: {
          userId
        }
      });
      setComments(comments.filter(comment => comment._id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const editComment = async (commentId) => {
    if (!audioId || !songId) {
      console.error('audioId or songId is null:', { audioId, songId });
      return;
    }
    try {
      await axios.put(`http://localhost:5000/${userId}/songs/${songId}/audio/${audioId}/comments/${commentId}/edit`, { comment: editingComment[commentId], userId }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setEditingComment({});
      fetchComments();
    } catch (error) {
      console.error('Error editing comment:', error);
    }
  };

  if (!audioId || !songId) {
    return <div>Error: audioId or songId is null.</div>;
  }

  return (
    <div className="mt-4">
      <div className="flex items-center space-x-2 mb-4">
        <h3 className="text-lg font-semibold text-black">Comments</h3>
        <button className="text-gray-600 hover:text-gray-800" onClick={() => setShowComments(!showComments)}>
          <FontAwesomeIcon icon={showComments ? faAngleUp : faAngleDown} />
        </button>
      </div>
      {showComments && (
        <>
          {comments.map((comment) => (
            <div key={comment._id} className="mb-4 p-2 border rounded-lg shadow-sm bg-gray-100">
              <p className="text-sm font-semibold mb-1">{comment.username.username}</p>
              {editingComment[comment._id] === undefined ? (
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-black">{comment.Comments}</p>
                  <div>
                    <button className="text-gray-500 hover:text-gray-700" onClick={() => setEditingComment({ ...editingComment, [comment._id]: comment.Comments })}>
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className="text-red-500 hover:text-red-700 ml-2" onClick={() => deleteComment(comment._id)}>
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <textarea
                    value={editingComment[comment._id]}
                    onChange={(e) => setEditingComment({ ...editingComment, [comment._id]: e.target.value })}
                    className="w-full p-2 border rounded mb-2 bg-gray-200 text-black shadow-inner"
                  />
                  <button
                    className="bg-green-500 text-white py-1 px-2 rounded"
                    onClick={() => editComment(comment._id)}
                  >
                    Save
                  </button>
                </div>
              )}
            </div>
          ))}
          <div>
            <textarea
              value={newComment}
              onChange={handleCommentChange}
              className="w-full p-2 border rounded mb-2 bg-gray-200 text-black shadow-inner"
              placeholder="Add a comment"
            />
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded"
              onClick={postComment}
            >
              Post
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Comments;
