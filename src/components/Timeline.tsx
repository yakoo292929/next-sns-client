/**
 * ===========================================================================================
 * SYSTEM NAME    : next-sns
 * PROGRAM ID     : client/src/components/Timeline.tsx
 * PROGRAM NAME   : Timeline.tsx
 *                : Timelineコンポーネント
 * DEVELOPED BY   : yamabakery
 * CREATE DATE    : 2024/07/01
 * CREATE AUTHOR  : yakoo292929
 * ===========================================================================================
**/

import Post from './Post';
import apiClient from '@/lib/apiClient';
import React, { useEffect, useState } from 'react';
import { PostType } from '@/types';

const Timeline = () => {

  const [ postText, setPostText ] = useState<string>("");
  const [ latestPost, setLatestPosts] = useState<PostType[]>([]);


  /////////////////////////////////////////////
  // 投稿 API
  /////////////////////////////////////////////
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    try {
      // 投稿 API
      const newPost = await apiClient.post('/posts/post', {
        content: postText,
      });
      setLatestPosts((prevPosts) => [newPost.data, ... prevPosts]);
      setPostText('');

    } catch(err) {
      alert('ログインしてください。');
    }

  }


  /////////////////////////////////////////////
  // 投稿一覧取得 API
  /////////////////////////////////////////////
  useEffect(() => {

    const fetchLatestPosts = async () => {
      try{
        // 投稿一覧取得 API
        const response = await apiClient.get('/posts/get_latest_post');
        setLatestPosts(response.data);
      } catch(err) {
        console.log(err);
      }
    };

    fetchLatestPosts();

  }, []);


  /////////////////////////////////////////////
  // 画面表示
  /////////////////////////////////////////////
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-4">

        <div className="bg-white shadow-md rounded p-4 mb-4">
          <form onSubmit={handleSubmit}>
            <textarea
              className="w-full h-24 p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="What's on your mind?"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPostText(e.target.value)}
              value={postText}
            ></textarea>
            <button
              type="submit"
              className="mt-2 bg-gray-700 hover:bg-green-700 duration-200 text-white font-semibold py-2 px-4 rounded"
            >
              投稿
            </button>
          </form>
        </div>

        {latestPost.map((post: PostType) => (
          <Post key={post.id} post={post} />
        ))}

      </main>
    </div>
  )
}

export default Timeline;
