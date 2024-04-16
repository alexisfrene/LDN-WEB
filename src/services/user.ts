import axios from 'axios';

interface registerUserValues {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  gender: string;
  username: string;
  birthday_date: string | Date;
}

export const registerUser = async (values: registerUserValues) => {
  try {
    values.birthday_date = new Date(values.birthday_date);
    const res = await axios.post(
      `${import.meta.env.VITE_API_NAME}/user`,
      values,
    );

    return res;
  } catch (error) {
    console.log(error);
  }
};

interface loginUserValues {
  password: string;
  email_or_user: string;
}

export const loginUser = async (values: loginUserValues) => {
  try {
    const { password, email_or_user } = values;
    const res = await axios.post(
      `${import.meta.env.VITE_API_NAME}/user/login`,
      { password, email_or_user },
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
