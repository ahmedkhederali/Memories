
const API_ENDPOINT = 'https://snapus.pythonanywhere.com/api/send-email/';

const sendEmail = async (price,email) => {
  const data = {
    email: 'omarhasaan772@gmail.com',
    message: price,
  };

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(API_ENDPOINT, requestOptions);
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Re-throw the error to be handled by the calling component
  }
};

export default sendEmail;