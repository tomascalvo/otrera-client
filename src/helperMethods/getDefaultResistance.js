const getResistanceByEquipment = (equipmentArray) => {
  return equipmentArray.includes("barbell")
    ? 45
    : equipmentArray.includes("dumbbell")
    ? 5
    : equipmentArray.includes("cable")
    ? 10
    : equipmentArray.includes("kettlebell")
    ? 5
    : equipmentArray.includes("medicine ball")
    ? 1
    : equipmentArray.includes("ez barbell")
    ? 25
    : equipmentArray.includes("olympic barbell")
    ? 45
    : equipmentArray.includes("smith machine")
    ? 15
    : equipmentArray.includes("tire")
    ? 100
    : equipmentArray.includes("trap bar")
    ? 45
    : undefined;
};

export default getResistanceByEquipment;
