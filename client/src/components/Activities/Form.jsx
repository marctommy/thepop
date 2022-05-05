import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Form = () => {
  const navigate = useNavigate();
  const [categoryId, setCategoryId] = useState();
  const [newActivity, setNewActivity] = useState({
    title: "",
    description: "",
    duration: 0,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3005/api/activities/create",
        { ...newActivity, category: categoryId }
      );
      console.log(response);
      navigate("/activities");
    } catch (error) {
      console.log(error);
    }
  };

  const categories = [
    { text: "Outdoor", categoryId: "outdoor" },
    { text: "DIY", categoryId: "diy" },
    { text: "Mindfulness", categoryId: "mindfulness" },
    { text: "Sports", categoryId: "sports" },
    { text: "Games", categoryId: "games" },
    { text: "Children", categoryId: "children" },
    { text: "Others", categoryId: "others" },
  ];

  return (
    <form className="card" onSubmit={handleSubmit}>
      <label>
        Name
        <input
          type="text"
          onChange={(event) => {
            setNewActivity({
              ...newActivity,
              name: event.target.value,
            });
          }}
          value={newActivity.name}
        />
      </label>

      <label>
        Description
        <input
          type="text"
          onChange={(event) => {
            setNewActivity({
              ...newActivity,
              description: event.target.value,
            });
          }}
          value={newActivity.description}
        />
      </label>

      <label>
        Duration
        <input
          type="number"
          onChange={(event) => {
            setNewActivity({
              ...newActivity,
              duration: event.target.value,
            });
          }}
          value={newActivity.duration}
        />
      </label>

      <center>
        <span>
          <strong> </strong>
        </span>{" "}
        Category:
        <section>
          {categories.map((category) => (
            <span
              className={`badge rounded-pill ${
                categoryId === category.categoryId
                  ? "bg-success"
                  : "bg-secondary"
              }`}
              onClick={() => setCategoryId(category.categoryId)}
              key={category.categoryId}
            >
              {category.text}
            </span>
          ))}
        </section>
      </center>

      <button type="submit">Create</button>
    </form>
  );
};

export default Form;
