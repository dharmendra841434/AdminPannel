import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginComplete } from "../features/appSlice";
import book from "../app/assets/img/bg.jpg";
import logo from "../app/assets/img/logo.png";
import { Formik, Form, Field } from "formik";

const LoginComp = () => {
  const dispatch = useDispatch();
  const location = useNavigate();
  const onSubmit = (values) => {
    console.log(values);
    dispatch(loginComplete());
    location("dashboard");
  };
  return (
    <main className="flex">
      <div className="w-1/2 flex flex-col justify-between items-center mt-8">
        <div className="">
          <img src={logo} className="" alt="" />
        </div>
        <h3 className="text-doc text-2xl mt-12">
          Content Relationship Management
        </h3>
        <div className="flex flex-col items-center">
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            onSubmit={onSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="mb-2">
                  <label htmlFor="username" className="text-doc text-sm ">
                    имя пользователя
                  </label>
                </div>
                <div>
                  <Field
                    name="username"
                    className="w-72 outline-none border border-gray-200 focus:border-gray-400 placeholder-gray-400 placeholder-opacity-50 px-4 py-2.5"
                    placeholder="Введите имя пользователя"
                  ></Field>
                </div>
                <div className="mt-3 mb-2">
                  <label htmlFor="Пароль" className="text-doc text-sm">
                    Пароль
                  </label>
                </div>
                <Field
                  name="password"
                  type="password"
                  className="w-72 outline-none border border-gray-200 focus:border-gray-400 placeholder-gray-400 placeholder-opacity-50  px-4 py-2.5"
                  placeholder="Введите пароль"
                ></Field>
                <div className="mt-12">
                  <button
                    className="bg-gold rounded-normal text-white font-medium w-full py-2"
                    type="submit"
                  >
                    Нажмите, чтобы войти
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <p className="">
          Не можете войти в систему?
          <a href="https://github.com/dotsimplify">
            <span className="text-doc font-medium ml-2">Contact Admin</span>
          </a>
        </p>
      </div>
      <div className="w-1/2">
        <img src={book} className="h-screen w-full" alt="" />
      </div>
    </main>
  );
};

export default LoginComp;
