/**
 * ===========================================================================================
 * SYSTEM NAME    : next-sns
 * PROGRAM ID     : client/src/components/Post.tsx
 * PROGRAM NAME   : Post.tsx
 *                : Postコンポーネント
 * DEVELOPED BY   : yamabakery
 * CREATE DATE    : 2024/07/01
 * CREATE AUTHOR  : yakoo292929
 * ===========================================================================================
**/

import { PostType } from '@/types';
import React from 'react';
import Link from 'next/link';

type Props = {
  post: PostType;
}

const Post = (props: Props) => {

  const { post } = props;

  /////////////////////////////////////////////
  // 画面表示
  /////////////////////////////////////////////
  return (
    <div className="bg-white shadow-md rounded p-4 mb-4">
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <Link href={`/profile/${post.autherId}`}>
            <img
              className="w-10 h-10 rounded-full mr-2"
              src={post.auther.profile?.prifileImageUrl}
              alt="User Avatar"
            />
          </Link>
          <div>
            <h2 className="font-semibold text-md">{post.auther?.username}</h2>
            <p className="text-gray-500 text-sm">{new Date(post.createdAt).toLocaleString()}</p>
          </div>
        </div>
        <p className="text-gray-700">{post.content}</p>
      </div>
    </div>
  )
}

export default Post;
