import React from 'react';
//import GoogleLogin from 'react-google-login';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { gapi } from "gapi-script"
import { useEffect } from "react"
import shareVideo from '../assets/share.mp4';
//import logo from '../assets/logowhite.png';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { client } from '../client';

const Login = () => {

  const clientId ="505333663249-8vsksegtd99276m26qbmreto08va3cm8.apps.googleusercontent.com"

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  const navigate = useNavigate();
  const responseGoogle = async (response) => {
    console.log(response)
    const res = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${response.access_token}`, { headers: { Authorization: `Bearer ${response.access_token}`, Accept: `application/json`}})
    const data = await res.json()
    console.log(data)
    if (!data) return;
      localStorage.setItem('user', JSON.stringify(data.id));
      const { name, id, picture } = data;
      const doc = {
        _id: id,
        _type: 'user',
        userName: name,
        image: picture,
      };
      client.createIfNotExists(doc).then(() => {
        navigate('/', { replace: true });
      });
    
    };

    const login = useGoogleLogin({
      onSuccess: responseGoogle
    })

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className=" relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay">
          <div className="p-3">
          <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">CircleShare</span></h1>
          </div>

          <div className="shadow-2xl">
            
            <button className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
              onClick={() => login()}>
                <FcGoogle className="mr-4" /> Sign in with google
            </button>
            {/* <GoogleLogin
              clientId="505333663249-8vsksegtd99276m26qbmreto08va3cm8.apps.googleusercontent.com"
              render={(renderProps) => (
                <button
                  type="button"
                  className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className="mr-4" /> Sign in with google
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            /> */}
            
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;