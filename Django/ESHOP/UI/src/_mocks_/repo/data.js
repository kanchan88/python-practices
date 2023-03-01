import axios from 'axios';

export const token = localStorage.getItem('authToken');
export const apiUrl = 'https://alphateds.com.np';

export const getAllParties = async () => {
  try {
    return await axios.get(`${apiUrl}/api/service`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('authToken')}`
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllItems = async () => {
  try {
    return await axios.get(`${apiUrl}/api/page`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('authToken')}`
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllBlogNews = async () => {
  try {
    return await axios.get(`${apiUrl}/api/blog-news`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('authToken')}`
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllPartners = async () => {
  try {
    return await axios.get(`${apiUrl}/api/partner`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('authToken')}`
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllTestimonial = async () => {
  try {
    return await axios.get(`${apiUrl}/api/testimonial`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('authToken')}`
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllTeamMember = async () => {
  try {
    return await axios.get(`${apiUrl}/api/team`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('authToken')}`
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllTimeLine = async () => {
  try {
    return await axios.get(`${apiUrl}/api/timeline`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('authToken')}`
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllMigrationService = async () => {
  try {
    return await axios.get(`${apiUrl}/api/country`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('authToken')}`
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllOtherService = async () => {
  try {
    return await axios.get(`${apiUrl}/api/other-service`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('authToken')}`
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllMedia = async () => {
  try {
    return await axios.get(`${apiUrl}/api/media`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('authToken')}`
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSingleVisaSevice = async (id) => {
  try {
    return await axios.get(`${apiUrl}/api/service/${id}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('authToken')}`
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSingleTimeLine = async (id) => {
  try {
    return await axios.get(`${apiUrl}/api/timeline/${id}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('authToken')}`
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSingleBlog = async (id) => {
  try {
    return await axios.get(`${apiUrl}/api/blog-news/${id}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('authToken')}`
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSingleMedia = async (id) => {
  try {
    return await axios.get(`${apiUrl}/api/media/${id}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('authToken')}`
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSingleTeamMember = async (id) => {
  try {
    return await axios.get(`${apiUrl}/api/team/${id}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('authToken')}`
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllAboutUs = async () => {
  try {
    return await axios.get(`${apiUrl}/api/about`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('authToken')}`
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSingleAboutUs = async (id) => {
  try {
    return await axios.get(`${apiUrl}/api/about/${id}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('authToken')}`
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSingleTestimonial = async (id) => {
  try {
    return await axios.get(`${apiUrl}/api/testimonial/${id}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('authToken')}`
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSinglePartner = async (id) => {
  try {
    return await axios.get(`${apiUrl}/api/partner/${id}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('authToken')}`
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCompanyInfo = async () => {
  try {
    return await axios.get(`${apiUrl}/api/company-info/1`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('authToken')}`
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSingleMigrationSevice = async (id) => {
  try {
    return await axios.get(`${apiUrl}/api/country/${id}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('authToken')}`
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSingleOtherSevice = async (id) => {
  try {
    return await axios.get(`${apiUrl}/api/other-service/${id}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('authToken')}`
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSinglePage = async (id) => {
  try {
    return await axios.get(`${apiUrl}/api/page/${id}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('authToken')}`
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllSuccessStory = async () => {
  try {
    return await axios.get(`${apiUrl}/api/success-story`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('authToken')}`
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSingleSuccessStory = async (id) => {
  try {
    return await axios.get(`${apiUrl}/api/success-story/${id}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('authToken')}`
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllMailer = async () => {
  try {
    return await axios.get(`${apiUrl}/api/mail`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('authToken')}`
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSingleMailer = async (id) => {
  try {
    return await axios.get(`${apiUrl}/api/mail/${id}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('authToken')}`
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllCounter = async () => {
  try {
    return await axios.get(`${apiUrl}/api/counter`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('authToken')}`
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSingleCounter = async (id) => {
  try {
    return await axios.get(`${apiUrl}/api/counter/${id}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('authToken')}`
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllCard = async () => {
  try {
    return await axios.get(`${apiUrl}/api/about-card`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('authToken')}`
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSingleCard = async (id) => {
  try {
    return await axios.get(`${apiUrl}/api/about-card/${id}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('authToken')}`
      }
    });
  } catch (error) {
    console.log(error);
  }
};
