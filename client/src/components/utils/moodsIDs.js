export default function moodsIDs(selectedMoods) {
  if (selectedMoods.length < 1) return '';
  const moodId = selectedMoods?.map(mood => mood?.id)
  return moodId?.reduce((acc, curr) => acc + ', ' + curr);
}
