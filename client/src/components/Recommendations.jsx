import React, { useState, useEffect } from "react";
import RecommendationItem from "./RecommendationItem"; 
import axios from "axios";

function Recommendations({ type }) {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    axios.get(`/api/recommendations?type=${type}`).then((response) => {
      setRecommendations(response.data);
    });
  }, [type]);

  // Render recommendations
  return (
    <div>
      {recommendations.map((recommendation) => (
        <RecommendationItem key={recommendation.recommendation_id} recommendation={recommendation} />
      ))}     
    </div>
  );
}

export default Recommendations;










