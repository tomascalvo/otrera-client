import { fetchMovement } from "../../api";

const findMovement = async ({ movement: MDBid, EDBmovement: EDBid }) => {
  if (EDBid) {
    const EDBmovements = JSON.parse(
      localStorage.getItem("EDBmovements")
    );
    const movementData = EDBmovements.find((movementEl) => {
      return movementEl.id === EDBid;
    });
    return {
      ...movementData,
      title: movementData.name,
      regions: [movementData.target, movementData.bodyPart],
      description: `A ${movementData.equipment} movement that targets the ${movementData.target}.`,
      image: movementData.gifUrl,
    }
  } else if (MDBid) {
    const { data: movementData} = await fetchMovement(MDBid);
    return movementData;
  } else {
    return {};
  }
}

export default findMovement;