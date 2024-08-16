/**
 * ===========================================================================================
 * SYSTEM NAME    : next-sns
 * PROGRAM ID     : client/src/components/Navbar.tsx
 * PROGRAM NAME   : Navbar.tsx
 *                : Navbarコンポーネント
 * DEVELOPED BY   : yamabakery
 * CREATE DATE    : 2024/07/01
 * CREATE AUTHOR  : yakoo292929
 * ===========================================================================================
**/

import { useAuth } from '@/context/auth';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {

  const {user, logout} = useAuth();

  /////////////////////////////////////////////
  // 画面表示
  /////////////////////////////////////////////
  return (
    <header className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="font-semibold text-xl">
          <Link href="/" className="text-3xl font-medium" style={{ fontFamily: 'Lobster, cursive' }}>Simple SNS</Link>
        </h1>
        <nav>
          <ul className="flex space-x-4">

            {/* ユーザー存在にてボタンを変更 */}
            {user ? (
              <>
                <Link href={`/profile/${user.id}`} className="text-white text-sm px-3 py-3 rounded-md font-medium hover:text-gray-200">
                  プロフィール
                </Link>
                <button
                  className="text-white text-sm px-3 py-3 rounded-md font-medium hover:text-gray-200" onClick={logout}
                >
                  ログアウト
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-white text-sm px-3 py-3 rounded-md font-medium hover:text-gray-200">
                  ログイン
                </Link>
                <Link href="/signup" className="text-white text-sm px-3 py-3 rounded-md font-medium hover:text-gray-200">
                  サインアップ
                </Link>
              </>
            )}

          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Navbar;
