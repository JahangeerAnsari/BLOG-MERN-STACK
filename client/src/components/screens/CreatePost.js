import { React, useState, useEffect } from "react";
import M from "materialize-css";
import { useHistory } from "react-router-dom";
import { baseUrl } from "../../utils/urlConfig";

const CreatePost = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  // useEffect work when url set means pic uploaded
  // then after go for body title
  useEffect(() => {
    if (url) {
      fetch(`${baseUrl}/createpost`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          body,
          photo: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            M.toast({ html: data.error, classes: "#c62828 red darken-3" });
          } else {
            M.toast({
              html: "Created Post successfull",
              classes: "#43a047 green darken-3",
            });
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [url]);
  const addPostDetail = () => {
    const data = new FormData();
    data.append("upload_preset", "insta-clone");
    data.append("file", image);
    data.append("cloud_name", "dcgbqqprq");

    const config = {
      method: "POST",
      body: data,
    };

    const imgurl = "https://api.cloudinary.com/v1_1/dcgbqqprq/image/upload";

    fetch(imgurl, config)
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div
      className="card input-field"
      style={{
        margin: "10px auto",
        maxWidth: "500px",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h2>Create New Post</h2>
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      <div className="file-field input-field">
        <div className="btn">
          <span>Upload Image</span>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button
        className="btn waves-effect waves-light #64b5f6 blue darken-1"
        onClick={() => addPostDetail()}
      >
        SUBMIT POST
      </button>
    </div>
  );
};

export default CreatePost;
