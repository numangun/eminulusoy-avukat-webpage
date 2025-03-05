/* import { useFormik } from "formik";
import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import * as Yup from "yup";
import ButtonSpinner from "../common/button-spinner";
import PasswordInput from "../common/password-input";
import { login } from "../../api/auth-service";
import { setLocalStorage } from "../../helpers/encrypted-storage";
import { useDispatch } from "react-redux";
import { login as loginSuccess } from "../../store/slices/auth-slice";
import { useNavigate } from "react-router-dom";
import { swalAlert } from "../../helpers/swal";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = async (values) => {
    setLoading(true);

    try {
      // Sabit kullanıcı adı ve şifre kontrolü
      if (values.username === "numangun" && values.password === "123numan.") {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userRole", "admin"); // Kullanıcı rolünü kaydet
        navigate("/admin"); // Admin paneline yönlendirme
      } else {
        swalAlert("Invalid credentials", "error");
      }
    } catch (err) {
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
                Please enter your username and password!
              </div>

              <Form noValidate onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3" controlId="userName">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Username"
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
                  <Form.Label>Password</Form.Label>
                  <PasswordInput
                    {...formik.getFieldProps("password")}
                    isInvalid={
                      formik.touched.password && formik.errors.password
                    }
                    error={formik.errors.password}
                  />
                </Form.Group>

                <Button
                  className="w-100"
                  type="submit"
                  disabled={!(formik.dirty && formik.isValid) || loading}
                >
                  {loading && <ButtonSpinner />} Login
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
 */

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

  const initialValues = {
    username: "",
    password: "",
    rememberMe: false,
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
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
        } else {
          localStorage.removeItem("rememberedUsername");
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
                Please enter your username and password!
              </div>

              <Form noValidate onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3" controlId="userName">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Username"
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
                  <Form.Label>Password</Form.Label>
                  <PasswordInput
                    {...formik.getFieldProps("password")}
                    isInvalid={
                      formik.touched.password && formik.errors.password
                    }
                    error={formik.errors.password}
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
                  {loading && <ButtonSpinner />} Login
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
