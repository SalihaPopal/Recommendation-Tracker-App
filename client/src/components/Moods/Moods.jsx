import React, { useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function Moods({ selectedMoods, setSelectedMoods }) {
  const [moods, setMoods] = useState([]);

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const response = await fetch('http://localhost:8080/moods');
        const data = await response.json();
        setMoods(data);
      } catch (error) {
        console.error('Error fetching moods:', error);
      }
    };

    fetchMoods();
  }, []);

  const handleAddMood = (mood) => {
    setSelectedMoods([...selectedMoods, mood]);
  };

  return (
    <div>
      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
        {moods.map((mood) => (
          <Chip
            key={mood.id}
            label={mood.mood}
            variant="outlined"
            style={{ backgroundColor: 'blue', color: 'white' }}
            onClick={() => handleAddMood(mood.mood)}
          />
        ))}
      </Stack>

      <div>
        <ul>
          {selectedMoods.map((selectedMood, index) => (
            <li key={index}>{selectedMood}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
