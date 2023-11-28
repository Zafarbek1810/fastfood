import React, { useEffect, useState } from "react";
import LoginWrapper from "./style";
import { useForm } from "react-hook-form";
import { useContextSelector } from "use-context-selector";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import UserContext from "../../../Context/UserContext";
import AuthProvider from "../../../Data/AuthProvider";
import ButtonLoader from "../../Common/ButtonLoader";
import { Button, Checkbox, Form, Input, Select } from "antd";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm();
  const { isAuth, user: currentUser } = useContextSelector(
    UserContext,
    (ctx) => ctx.state
  );
  const loginContext = useContextSelector(
    UserContext,
    (ctx) => ctx.actions.login
  );
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    console.log("Success:", values.role);
    const body = { username: values.role, password: values.password };
    setLoading(true);
    AuthProvider.login(body)
      .then(({ data }) => {
        console.log(data.data);
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("id", data.data.id);
        localStorage.setItem("health-roles", data.data.role);
        localStorage.setItem("health-name", data.data.firstName);
        localStorage.setItem("health-lastname", data.data.lastName);
        loginContext(data.data);
      })
      .catch((err) => {
        toast.warning("Login yoki parol noto'g'ri");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    console.log(currentUser);
    if (isAuth && currentUser) {
      switch (currentUser.roles) {
        case "ROLE_SEO": {
          router.replace("/dashboard/ceo/statistika");
          break;
        }
        case "ROLE_OPERATOR": {
          router.replace("/dashboard/operator/statistika");
          break;
        }
        case "ROLE_LABORANT": {
          router.replace("/dashboard/laborant/statistika");
          break;
        }
        case "ROLE_CASHIER": {
          router.replace("/dashboard/cashier/statistika");
          break;
        }
        case "ROLE_DIRECTOR": {
          router.replace("/dashboard/director/statistika");
          break;
        }
      }
    }
  }, [isAuth, currentUser]);

  const onSubmit = (values) => {
    const body = { username: values.name, password: values.password };
    setLoading(true);
    AuthProvider.login(body)
      .then(({ data }) => {
        console.log(data.data);
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("id", data.data.id);
        localStorage.setItem("health-roles", data.data.role);
        localStorage.setItem("health-name", data.data.firstName);
        localStorage.setItem("health-lastname", data.data.lastName);
        loginContext(data.data);
      })
      .catch((err) => {
        toast.warning("Login yoki parol noto'g'ri");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onGenderChange = (values) => {
    console.log(values);
  };
  return (
    <LoginWrapper>
      <div className="main">
        <div className="right">
          <h4>Kirish</h4>
          {/* <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input">
              <label>Login</label>
              <input
                type="text"
                autoComplete="off"
                {...register("name", { required: true })}
              />
            </div>
            <div className="input">
              <label>Parol</label>
              <input
                type="password"
                autoComplete="off"
                {...register("password", { required: true })}
              />
            </div>
            <button disabled={loading} type="submit" className="loginBtn">
              Kirish
              {loading && <ButtonLoader />}
            </button>
          </form> */}
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            size="large"
          >
            <Form.Item
              name="role"
              rules={[
                {
                  required: true,
                  message: "Tanlang",
                },
              ]}
            >
              <Select
                placeholder="Tanlang"
                onChange={onGenderChange}
                allowClear
              >
                <Option value="admin">Admin</Option>
                <Option value="kassa">Kassa</Option>
                <Option value="kuxnya">Kuxnya</Option>
                <Option value="ekran">Ekran</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Parol kiriting",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                span: 16,
              }}
            >
              <Button
                type="primary"
                style={{ width: "100%" }}
                htmlType="submit"
              >
                Kirish
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </LoginWrapper>
  );
};

export default Login;
