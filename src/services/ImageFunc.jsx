import axios from "axios";

const postImage = async (formData) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const { data } = await axios.post("/contents", formData, config);
  return data;
};

export { postImage };
