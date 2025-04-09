import { useFormik } from "formik";
import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import * as Yup from "yup";
import ButtonSpinner from "../common/button-spinner";
import PasswordInput from "../common/password-input";
import { login } from "../../api/auth-service";
import { useDispatch } from "react-redux";
import { login as loginSuccess } from "../../store/slices/auth-slice";
import { useNavigate } from "react-router-dom";
import { swalAlert } from "../../helpers/swal";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Base64 kodlama ve çözme fonksiyonları
  const encodeBase64 = (text) => {
    return window.btoa(text);
  };

  const decodeBase64 = (encoded) => {
    try {
      return window.atob(encoded);
    } catch (error) {
      console.error("Base64 decode error:", error);
      return "";
    }
  };

  // Hatırlanan bilgileri al
  const getRememberedValues = () => {
    const username = localStorage.getItem("rememberedUsername") || "";
    const encodedPassword = localStorage.getItem("rememberedPassword");
    const password = encodedPassword ? decodeBase64(encodedPassword) : "";
    const rememberMe = Boolean(localStorage.getItem("rememberedUsername"));
    
    return { username, password, rememberMe };
  };

  const initialValues = getRememberedValues();

  const validationSchema = Yup.object({
    username: Yup.string().required("Gerekli"),
    password: Yup.string().required("Gerekli"),
    rememberMe: Yup.boolean(),
  });

  const onSubmit = async (values) => {
    setLoading(true);

    try {
      if (
        values.username === process.env.REACT_APP_ADMIN_USERNAME &&
        values.password === process.env.REACT_APP_ADMIN_PASSWORD
      ) {
        // Token oluştur ve sakla
        const expirationTime = values.rememberMe
          ? new Date().getTime() + 7 * 24 * 60 * 60 * 1000 // 7 gün
          : new Date().getTime() + 2 * 60 * 60 * 1000; // 2 saat

        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userRole", "admin");
        localStorage.setItem("expirationTime", expirationTime);

        if (values.rememberMe) {
          localStorage.setItem("rememberedUsername", values.username);
          localStorage.setItem("rememberedPassword", encodeBase64(values.password));
        } else {
          localStorage.removeItem("rememberedUsername");
          localStorage.removeItem("rememberedPassword");
        }

        navigate("/admin");
      } else {
        swalAlert("Geçersiz kullanıcı adı veya şifre", "error");
      }
    } catch (err) {
      console.error("Login error:", err);
      swalAlert("An error occurred", "error");
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow border-0 border-top border-5 border-primary">
            <Card.Body>
              <div className="mb-4 mt-4 text-muted fst-italic">
                Lütfen Kullanıcı Adı ve Şifrenizi Giriniz!
              </div>

              <Form noValidate onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3" controlId="userName">
                  <Form.Label>Kullanıcı Adı</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Kullanıcı Adı"
                    {...formik.getFieldProps("username")}
                    isInvalid={
                      formik.touched.username && formik.errors.username
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Şifre</Form.Label>
                  <PasswordInput
                    {...formik.getFieldProps("password")}
                    isInvalid={
                      formik.touched.password && formik.errors.password
                    }
                    error={formik.errors.password}
                    placeholder="Şifre"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="rememberMe">
                  <Form.Check
                    type="checkbox"
                    label="Beni Hatırla"
                    name="rememberMe"
                    checked={formik.values.rememberMe}
                    onChange={formik.handleChange}
                  />
                </Form.Group>

                <Button
                  className="w-100"
                  type="submit"
                  disabled={!(formik.dirty && formik.isValid) || loading}
                >
                  {loading && <ButtonSpinner />} Giriş Yap
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
