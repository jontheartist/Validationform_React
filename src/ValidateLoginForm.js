import React, { Children } from "react";
import { Formik } from "formik";
import * as EmailValidator from "email-validator";
import * as Yup from "yup";

const ValidatedLoginForm = () => (
  <Formik
    initialValues={{ email: "", password: "" }}
    onSubmit={(values, { setSubmitting }) => {
      console.log("Submitting");
      console.log(values);
    }}
    // Instead of using validate instruction ourselves just use the Yup package.
    validationSchema={Yup.object().shape({
      email: Yup.string()
        .email()
        .required("Required"),
      password: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/(?=.*[0-9])/, "Password must contain a number.")
    })}

    // validate = { values =>{
    //   let errors ={};

    //   if (!values.email){
    //     errors.email = "Required";
    //   }
    //   else if(!EmailValidator.validate(values.email)){
    //     errors.email = "Invalid Email Address"
    //   }

    //   const passwordRegex = /(?=.*[0-9])/)
    //   // requires a number between 0 - 9

    //   if (!values.password){
    //     errors.password = "Required";
    //   }
    //   else if(values.password.length < 8){
    //     errors.password = "Password must be 9 characters long."
    //   }
    //   else if (!passwordRegex.text(values.password)){
    //     errors.password = "Invalid password. Must contain one number."
    //   }
    //   return errors;
    // }}
  >
    {props => {
      const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit
      } = props;
      return (
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="text"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email && touched.email && "error"}
          />
          {errors.email && touched.email && (
            <div className="input-feedback">{errors.email}</div>
          )}
          <label htmlFor="email">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email && touched.email && "error"}
          />
          {errors.email && touched.email && (
            <div className="input-feedback">{errors.email}</div>
          )}
          <button type="submit">Login</button>
        </form>
      );
    }}
    {/* 
Formik uses render props to pass properties to its Children. Children now has access to properties.  */}
  </Formik>
);

export default ValidatedLoginForm;
