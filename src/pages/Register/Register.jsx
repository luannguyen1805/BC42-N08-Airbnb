import React, { useEffect, useState } from "react";
import { notification } from "antd";
import { useDispatch} from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { string, object, boolean } from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import dayjs from "dayjs";
import classNames from "classnames";
import { postSignupUser } from "../../redux/Reducers/userReducer";
import { getAllUser } from "../../redux/Reducers/userAdminReducer";
import UseCheckEmail from "../../Hooks/UseCheckEmail";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isShowPass, setIsShowPass] = useState(false);
  const [day, setDay] = useState("1/1/2022");
  const [isValid, setIsValid] = useState(true); // Thêm biến isValid

  useEffect(() => {
    dispatch(getAllUser());
  }, []);

  const { isExitEmail, handleCheckEmail } = UseCheckEmail();

  const schema = object({
    email: string()
      .required("Email không được để trống")
      .email("Email phải có định dạng test@gmail.com"),
    password: string()
      .required("Mật khẩu không được để trống")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,50}$/,
        "Mật khẩu tối thiểu 8 kí tự, gồm ít nhất 1 chữ cái và 1 số"
      ),
    name: string()
      .required("Tên không được để trống")
      .matches(
        /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]+$/,
        "Tên sai định dạng"
      ),
    phone: string()
      .required("Số điện thoại không được để trống")
      .matches(
        /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
        "Số điện thoại không đúng định dạng"
      ),
    birthday: string().required("Ngày sinh không được để trống"),
    gender: boolean().required("Giới tính không được để trống"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const onSubmit =  handleSubmit ( async (values) => {
    setIsValid(false); // Đánh dấu form không hợp lệ trước khi kiểm tra
    if (isExitEmail) {
      dispatch(postSignupUser(values));
      await dispatch(getAllUser());
      setIsValid(true); // Đánh dấu form hợp lệ nếu không có email trùng
      notification.success({
        message: "Tạo tài khoản thành công!",
      });
      navigate("/login");
    }
  });

  return (
    <form
      id="form"
      onSubmit={handleSubmit(onSubmit)}
      className="bg-grey-lighter min-h-screen flex flex-col"
    >
      <div
                className="h-20 px-5 py-4 flex justify-center cursor-pointer "
                style={{ boxShadow: " 0px 4px 12px rgba(0, 0, 0, 0.1)" }}
                onClick={() => {
                    navigate("/");
                }}
            >
                <div className="h-12 w-12 rounded-xl overflow-hidden">
                    <img
                        className="h-full w-full"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd-0CXiCSzYB7Qls6acs-5VZHEewRNH3DUyA&usqp=CAU"
                        alt=""
                    />
                </div>
                <span className="text-2xl font-semibold ml-2 text-rose-400">
                    Airbnb Home
                </span>
            </div>
      <div className="container max-w-3xl mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Đăng ký</h1>
          <div className="flex gap-3">
            <div className="w-1/2">
              <div className="h-24">
                <input
                  {...register("name")}
                  type="text"
                  className="block border border-grey-light w-full p-3 rounded mb-0"
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="m-0 text-red-500 text-md italic text-left mt-2">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="h-24">
                <input
                  onInput={handleCheckEmail}
                  {...register("email")}
                  type="text"
                  className="block border border-grey-light w-full p-3 rounded mb-0"
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="m-0 text-red-500 text-md italic text-left mt-2">
                    {errors.email.message}
                  </p>
                )}
                {!isExitEmail && (
                  <p className="m-0 text-red-500 text-md italic text-left mt-2">
                    Email đã tồn tại
                  </p>
                )}
              </div>
              <div className="relative">
                <input
                  {...register("password")}
                  type={isShowPass ? "text" : "password"}
                  className="block border border-grey-light w-full p-3 rounded mb-0"
                  placeholder="Password "
                />
                {errors.password && (
                  <p className="m-0 text-red-500 text-md italic text-left mt-2">
                    {errors.password.message}
                  </p>
                )}
                <span
                  onClick={() => setIsShowPass(!isShowPass)}
                  className="absolute top-4 right-1"
                >
                  <AiOutlineEye
                    className={classNames("text-lg cursor-pointer", {
                      hidden: !isShowPass,
                    })}
                  />
                  <AiOutlineEyeInvisible
                    className={classNames("text-lg cursor-pointer", {
                      hidden: isShowPass,
                    })}
                  />
                </span>
              </div>
            </div>
            <div className="w-1/2">
              <div className="h-24">
                <input
                  {...register("phone")}
                  type="text"
                  className="block border border-grey-light w-full p-3 rounded mb-0"
                  placeholder="Phone number"
                />
                {errors.phone && (
                  <p className="m-0 text-red-500 text-md italic text-left mt-2">
                    {errors.phone.message}
                  </p>
                )}
              </div>
              <div className="h-24">
                <input
                  {...register("birthday")}
                  onChange={(e) =>
                    setDay(
                      dayjs(e.target.value).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
                    )
                  }
                  type="date"
                  className="block border border-grey-light w-full p-3 rounded mb-0"
                  placeholder="Birthday"
                />
                {errors.birthday && (
                  <p className="m-0 text-red-500 text-md italic text-left mt-2">
                    {errors.birthday.message}
                  </p>
                )}
              </div>
              <div className="h-24">
                <select
                  {...register("gender")}
                  className="block border border-grey-light w-full p-3 rounded mb-0"
                >
                  <option value={"true"}>Nam</option>
                  <option value={"false"}>Nữ</option>
                </select>
                {errors.gender && (
                  <p className="m-0 text-red-500 text-md italic text-left mt-2">
                    {errors.gender.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <button
            type="submit"
            // onClick={() => {
            //   notification.success({
            //     message: "Đăng ký thành công!",
            // });
            // navigate("/login");
            // }}
            disabled={!isValid}
            className="w-full text-center py-3 rounded bg-green-500 text-white text-lg hover:bg-green-dark focus:outline-none my-1"
          >
            Create Account
          </button>
          <div className="text-center text-sm text-grey-dark mt-4">
            By signing up, you agree to the
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Terms of Service
            </a>{" "}
            and
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="#"
            >
              Privacy Policy
            </a>
          </div>
        </div>
        <div className="text-grey-dark mt-6 text-slate-700 text-xl">
          <button className="mr-2">Already have an account?</button>
          <button
            className="hover:text-blue-700"
            onClick={() => {
              navigate("/login");
            }}
          >
            Log in
          </button>
        </div>
      </div>
    </form>
  );
};

export default Register;


