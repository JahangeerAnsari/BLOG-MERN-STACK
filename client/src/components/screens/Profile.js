import React, { useEffect, useState } from "react";
import { baseUrl } from "../../utils/urlConfig";
const Profile = () => {
  const [posts, setPosts] = useState([]);
  console.log(JSON.stringify(posts));
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    fetch(`${baseUrl}/mypost`, {
      method: "get",
      headers: {
        Authorization: localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setPosts(result);
      });
  }, []);
  return (
    <div style={{ maxWidth: "550px", margin: "0px auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "18px 0px",
          borderBottom: "1px solid grey",
        }}
      >
        <div>
          <img
            style={{ width: "160px", height: "160px", borderRadius: "80px" }}
            src="https://images.unsplash.com/photo-1542206395-9feb3edaa68d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
          />
        </div>
        <div>
          <h4>{user.name}</h4>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "108%",
            }}
          >
            <h6>5 posts</h6>
            <h6>110 followers</h6>
            <h6>200 following</h6>
          </div>
        </div>
      </div>
      <div className="gallery">
        {posts.map((p, index) => {
          const image = p.photo;
          return <img key={index} className="item" src={`${image}`} />;
        })}
      </div>
    </div>
  );
};
export default Profile;
