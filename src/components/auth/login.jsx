import React from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { Triangle } from 'react-loader-spinner'

import { API_URL, doApiMethodSignUpLogin, TOKEN_NAME,TOKEN_ROLE } from '../../services/service';

const Login = () => {

  const [isSubmitted, setIsSubmitted] = useState(false)
  const nav = useNavigate()
  let { register, handleSubmit, getValues, formState: { errors } } = useForm();
  const regEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const [respError, setRespError] = useState("")
  const onSub = (_dataBody) => {
    console.log(_dataBody);
    setIsSubmitted(true);
    doApi(_dataBody)
  }

  const doApi = async (_dataBody) => {
    try {
      const url = API_URL + '/users/login';
      const { data } = await doApiMethodSignUpLogin(url, "POST", _dataBody);
      console.log(data);
      if (data.token) {
        localStorage.setItem(TOKEN_ROLE, data.userRole);
        localStorage.setItem(TOKEN_NAME, data.token);
        console.log(data);
        if (data.userRole == "admin") {
          nav("/admin");
        } else if (data.userRole == 'user') {
          nav("/");
        }
      }

    } catch (err) {

      setRespError(err.response.data.msg_err)
      setIsSubmitted(false);
      alert(err.response.data.msg);
    }
  }
  return (
    <div className='d-flex flex-column align-items-center'>
      <h1 className='text-center display-3'>Login</h1>
      <div className='col-10 d-flex justify-content-center'>
        <form onSubmit={handleSubmit(onSub)} className='col-12 col-md-4 p-3 shadow '>


          <label className='mt-2'>email:</label>
          <input {...register('email', { required: true, minLength: 2, maxLength: 35, pattern: regEmail })} type="text" className='form-control' />
          {errors.email && <p className='text-danger m-0'>Enter valid email</p>}

          <label className='mt-2'>password:</label>
          <input {...register('password', { required: true, minLength: 2, maxLength: 25 })} type="password" className='form-control' />
          {errors.password && <p className='text-danger m-0'>Enter valid password!</p>}
          {respError && <p className='text-danger m-0'>{respError}</p>}
          <div className='text-center d-flex flex-column '>

            {!isSubmitted ?
              <button className='mt-2 btn btn-primary my-2'>Login</button>
              :
              <Triangle
                height="80"
                width="80"
                radius="9"
                color='blue'
                ariaLabel='triangle-loading'
                wrapperStyle
                wrapperClass=" justify-content-around" />
            }

            <a onClick={() => { nav('/signup') }} >to sign in </a>
          </div>

        </form>
      </div>

    </div>
  )
}

export default Login