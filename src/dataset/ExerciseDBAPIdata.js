export const conformToMovement = (mvmnt) => {
    return {
        title: mvmnt.name,
        regions: [mvmnt.target, mvmnt.bodyPart],
        equipment: [mvmnt.equipment],
        image: mvmnt.gifUrl,
        id: mvmnt.id,
        source: "EDB"
    }
};

export const conformToExercise = (EDBmovement, index) => {
    return {
        index,
        draggableId: parseInt(100 + index),
        EDBmovement: {
            id: EDBmovement.id,
            title: EDBmovement.name,
            regions: [EDBmovement.target, EDBmovement.bodyPart],
            image: EDBmovement.gifUrl,
            equipment: [EDBmovement.equipment],
        }
    }
};