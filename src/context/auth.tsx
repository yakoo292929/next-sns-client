/**
 * ===========================================================================================
 * SYSTEM NAME    : next-sns
 * PROGRAM ID     : client/src/context/auth.tsx
 * PROGRAM NAME   : auth.tsx
 *                : authコンテキスト
 * DEVELOPED BY   : yamabakery
 * CREATE DATE    : 2024/07/01
 * CREATE AUTHOR  : yakoo292929
 * ===========================================================================================
**/

import apiClient from "@/lib/apiClient";
import React, { ReactNode, useContext, useEffect, useState } from "react";

/////////////////////////////////////////////
// AuthProvider型定義
/////////////////////////////////////////////
interface AuthProviderProps {
  children: ReactNode;
}

/////////////////////////////////////////////
// AuthContext型定義
/////////////////////////////////////////////
interface AuthContextType {

  user: null | {
    id: number,
    username: string,
    email: string,
  };
  login: (token: string) => void;
  logout: () => void;

}

/////////////////////////////////////////////
// AuthContext作成・デフォルト値設定
/////////////////////////////////////////////
const AuthContext = React.createContext<AuthContextType>({

  user: null,
  login: () => {},
  logout: () => {},

});


export const useAuth = () => {
  return useContext(AuthContext);
};


/////////////////////////////////////////////
// 認証情報提供
/////////////////////////////////////////////
export const AuthProvider = ({ children }: AuthProviderProps ) => {

  const [ user, setUser ] = useState<null | {id: number, email: string, username: string}>(null);

  useEffect(() => {

    const token = localStorage.getItem('auth_token');
    if (token) {
        // ヘッダー情報セット
        apiClient.defaults.headers['Authorization'] = `Bearer ${token}`;

        // ユーザー情報取得 API
        apiClient.get('/users/find')
        .then((res) => {
          setUser(res.data.user);
        })
        .catch((err) => {
          console.log(err);
        });

    }

  }, []);


  /////////////////////////////////////////////
  // ログイン
  /////////////////////////////////////////////
  const login = async (token: string) => {

    // ローカルストレージにトークンを保存
    localStorage.setItem('auth_token', token);

    // ヘッダー情報セット
    apiClient.defaults.headers['Authorization'] = `Bearer ${token}`;

    try {
      // ユーザー情報取得 API
      apiClient.get('/users/find').then((res) => {
        setUser(res.data.user);
      });
    } catch(err) {
      console.log(err);
    }

  };


  /////////////////////////////////////////////
  // ログアウト
  /////////////////////////////////////////////
  const logout = () => {

    // ローカルストレージからトークン削除
    localStorage.removeItem('auth_token');

    // ヘッダー情報削除
    delete apiClient.defaults.headers['Authorization'];

    // ユーザー情報削除
    setUser(null);

  };


  /////////////////////////////////////////////
  // コンテキストに提供する値セット
  /////////////////////////////////////////////
  const value = {

    user,
    login,
    logout,

  };


  /////////////////////////////////////////////
  // 子コンポーネントに認証情報を提供
  /////////////////////////////////////////////
  return <AuthContext.Provider value={value}>{ children }</AuthContext.Provider>;

};
