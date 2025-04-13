import { useFormik } from "formik";
import React, { useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { AiOutlineUser, AiOutlineMail } from "react-icons/ai";
import { BiMessage, BiTag, BiSend } from "react-icons/bi";
import * as Yup from "yup";
import ButtonSpinner from "../common/button-spinner";
import "./contact-form.scss";

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const initialValues = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Gerekli").min(3, "En az 3 karakter olmalıdır"),
    email: Yup.string().email("Geçersiz email adresi").required("Gerekli"),
    subject: Yup.string()
      .required("Gerekli")
      .min(4, "En az 4 karakter olmalıdır")
      .max(50, "En fazla 50 karakter olmalıdır"),
    message: Yup.string()
      .required("Gerekli")
      .min(4, "En az 4 karakter olmalıdır")
      .max(500, "En fazla 500 karakter olmalıdır"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setLoading(true);
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            access_key:
              process.env.REACT_APP_WEB3FORMS_ACCESS_KEY ||
              process.env.GITHUB_WEB3FORMS_ACCESS_KEY,
            subject: `Konu: ${values.subject} - ${values.name} size Web Sitenizden bir mesaj gönderdi`,
            name: values.name,
            email: values.email,
            message: values.message,
          }),
        });

        if (response.ok) {
          setSuccessMessage("Mesajınız başarıyla gönderildi."); // 2. successMessage state'i güncelleniyor
          resetForm();
        } else {
          setSuccessMessage("Mesaj gönderilirken bir hata oluştu.");
        }
      } catch (error) {
        setSuccessMessage("Mesaj gönderilirken bir hata oluştu.");
      } finally {
        setLoading(false);
        setSubmitting(false);
      }
    },
  });

  return (
    <Form noValidate onSubmit={formik.handleSubmit} className="contact-form">
      <h2>Bize Mesaj Gönderin</h2>

      <Row>
        <Col md={6}>
          <InputGroup className="mb-3">
            <InputGroup.Text id="name">
              <AiOutlineUser />
            </InputGroup.Text>
            <Form.Control
              placeholder="Adınız Soyadınız"
              aria-label="Your name"
              aria-describedby="name"
              {...formik.getFieldProps("name")}
              isInvalid={formik.touched.name && formik.errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </InputGroup>
        </Col>

        <Col md={6}>
          <InputGroup className="mb-3">
            <InputGroup.Text id="email">
              <AiOutlineMail />
            </InputGroup.Text>
            <Form.Control
              placeholder="Mail Adresiniz"
              aria-label="Your email"
              aria-describedby="email"
              {...formik.getFieldProps("email")}
              isInvalid={formik.touched.email && formik.errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.email}
            </Form.Control.Feedback>
          </InputGroup>
        </Col>

        <Col xs={12}>
          <InputGroup className="mb-3">
            <InputGroup.Text id="subject">
              <BiTag />
            </InputGroup.Text>
            <Form.Control
              placeholder="Konu"
              aria-label="Your subject"
              aria-describedby="subject"
              {...formik.getFieldProps("subject")}
              isInvalid={formik.touched.subject && formik.errors.subject}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.subject}
            </Form.Control.Feedback>
          </InputGroup>
        </Col>

        <Col xs={12}>
          <InputGroup className="mb-3">
            <InputGroup.Text id="message">
              <BiMessage />
            </InputGroup.Text>
            <Form.Control
              as="textarea"
              placeholder="Mesajınız"
              aria-label="Your message"
              aria-describedby="message"
              {...formik.getFieldProps("message")}
              isInvalid={formik.touched.message && formik.errors.message}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.message}
            </Form.Control.Feedback>
          </InputGroup>
        </Col>
      </Row>

      <Button
        type="submit"
        disabled={!(formik.dirty && formik.isValid) || loading}
      >
        {loading && <ButtonSpinner />} Gönder <BiSend />
      </Button>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
    </Form>
  );
};

export default ContactForm;
