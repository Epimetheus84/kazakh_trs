import { useState } from 'react';
import { Input, Button } from './form';

export default function LoginForm({ onSubmit = () => {}, loading = false }) {
  const defaultFormState = {
    login: '',
    password: '',
  };
  const defaultErrorsState = {
    ...defaultFormState,
    other: '',
  };

  const [errors, setErrors] = useState({...defaultErrorsState});
  const [state , setState] = useState({...defaultFormState});

  // validate password rule must be at least 6 characters and contain at least one
  const validatePasswordRule = (password) => {
    // return password.length >= 6 && password.match(/\d/)
    return password.length >= 4;
  };
  // validate username rule (min 4 characters) and must not contain spaces
  const validateLoginRule = (login) => {
    const re = /^\S{4,}$/;
    return re.test(login);
  };

  // validate by rules and set errors
  const validate = ({ login, password }) => {
    const errors = {};
    if (!validateLoginRule(login)) {
      errors.login = 'Username must be at least 4 characters and not contain spaces';
    }
    if (!validatePasswordRule(password)) {
      errors.password = 'Password must be at least 6 characters and contain at least one number';
    }
    return errors;
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log('onSubmit [state]', state);
    // clear errors
    setErrors({ ...defaultFormState });
    // validate
    const errors = validate(state);
    // console.log('onSubmit [errors]', errors);
    // set errors
    setErrors(errors);
    // submit
    if (!Object.keys(errors).length) {
      onSubmit(state);
    }
  };


  const handleChange = (e) => {
      const {id , value} = e.target;
      setState(prevState => ({
          ...prevState,
          [id] : value
      }))
  }

  return (
    <div className="w-full max-w-xs h-screen mx-auto flex flex-col justify-center">
      <form className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4" onSubmit={onFormSubmit}>
        <div className="mb-4">
         <Input
            name="login"
            label="Login"
            placeholder='Login'
            value={state.login}
            onChange={handleChange}
            error={errors.login}
            disabled={loading}
         />
        </div>
        <div className="mb-6">
          <Input
            name="password"
            label="Password"
            placeholder='Password'
            value={state.password}
            onChange={handleChange}
            error={errors.password}
            type="password"
            disabled={loading}
          />
        </div>
        { errors.other && <p className="text-red-500 text-xs italic">{errors.other}</p> }
        <div className="flex items-center justify-between">
          <Button
            type="submit"
            loading={loading}
          >
            Login
          </Button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="/forgot-password"
          >
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
}
