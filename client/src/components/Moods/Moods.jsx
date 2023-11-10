// import React, { useEffect } from 'react';
// import Chip from '@mui/material/Chip';
// import Stack from '@mui/material/Stack';
// import axios from 'axios';

// export default function Moods({moods, setMoods, selectedMoods, setSelectedMoods }) {
//    console.log(moods)
//   const fetchMoods = async () =>{
//     const {data} = await axios.get('http://localhost:8080/moods');
//     setMoods(data);
//   }

//   useEffect(() => {
//     fetchMoods();
//   },[])
    
  
// // filter movies by moodid
//   const handleAddMood = (mood) => {
//     // setSelectedMoods([...selectedMoods, mood]);
//     console.log(mood)
//   };

//   return (
//     <div>
//       <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
//         {moods?.map(mood => (
//           <Chip
//             // key={mood.id}
//             label={mood.mood_name}
//             variant="outlined"
//             style={{ backgroundColor: 'blue', color: 'white' }}
//             onClick={() => handleAddMood(mood)}
//           />
//         ))}
//       </Stack>
//     </div>
//   );
// }



import React, { useEffect } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import axios from 'axios';

export default function Moods({moods, setMoods, selectedMoods, setSelectedMoods }) {
   console.log(moods)
  const fetchMoods = async () =>{
    const {data} = await axios.get('http://localhost:8080/moods/movie');
    setMoods(data);
  }

  useEffect(() => {
    fetchMoods();
  },[])
    
  
// filter movies by moodid
  const handleAddMood = mood => {
    setSelectedMoods([...selectedMoods, mood]);
    // console.log(mood)
    setMoods(moods.filter(m => m?.mood_id !== mood?.mood_id))
  };

  const handleRemoveMood = mood => {
    setMoods([...moods, mood]);
    setSelectedMoods(selectedMoods.filter(selected => selected?.mood_id !== mood?.mood_id));
    // console.log(mood)
  };

  return (
    <div>
      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
        {selectedMoods?.map(mood => (
          <Chip style = {{ backgroundColor: '#adb5bd', color: 'black'}} 
            label={mood.mood_name}
            variant="outlined"
            onDelete={()=> handleRemoveMood(mood)}
          />
        ))}
        {moods?.map(mood => (
          <Chip
            // key={mood.id}
            label={mood.mood_name}
            variant="outlined"
            style={{ backgroundColor: '#ff4081', color: 'white' }}
            onClick={() => handleAddMood(mood)}
            clickable
          />
        ))}
      </Stack>
    </div>
  );
}
