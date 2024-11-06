"use client";
import React, { useState } from "react";
import axios from "axios";
import {
  Input,
  Button,
  Form,
  Typography,
  notification,
  Card,
  Row,
  Col,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import logo from "./favicon.ico";

const { Title } = Typography;

const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (username === "admin" && password === "admin") {
      try {
        const response = await axios.post(
          "https://run.mocky.io/v3/148d8bb1-6ebc-48c0-a1b1-bb272bf358a4",
          {
            username: "admin",
            password: "admin",
          }
        );

        let responseData = response.data;
        if (typeof responseData === "string") {
          try {
            responseData = responseData.replace(/(\w+):/g, '"$1":');
            responseData = JSON.parse(responseData);
          } catch (error) {
            console.error("Error parsing JSON:", error);
            notification.error({
              message: "Gagal memproses data dari server.",
            });
            return;
          }
        }

        if (responseData.status === 200) {
          localStorage.setItem("token", responseData.data.token);
          notification.success({
            message: "Login berhasil",
          });
          window.location.href = "/pasien";
        } else {
          notification.error({
            message: responseData.message || "Login gagal",
          });
        }
      } catch (err: any) {
        console.error("Error during login:", err);
        notification.error({
          message: "Login gagal, silakan periksa username dan password.",
        });
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      notification.error({
        message: "Username atau password salah.",
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Card
        style={{
          width: 600,
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Row>
          <Col
            span={8}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={logo.src}
              width={100}
              alt="Rumah Rehab Logo"
              style={{ borderRadius: "8px" }}
            />
          </Col>
          <Col span={16}>
            <div style={{ padding: "20px" }}>
              <Title level={3} style={{ textAlign: "center" }}>
                Rumah Rehab
              </Title>
              <Form
                onSubmitCapture={handleLogin}
                style={{
                  width: "100%",
                }}
              >
                <Form.Item>
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Item>
                <Form.Item>
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    loading={loading}
                    style={{ borderRadius: "4px", backgroundColor: "#1677ff" }}
                  >
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default LoginPage;
