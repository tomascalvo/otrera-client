const onDragEnd = ({ source, destination }) => {
    console.log("source: ");
    console.dir(source);
    console.log("destination: ");
    console.dir(destination);

    // make sure we have a valid destination
    if (destination === undefined || destination === null) return null;

    // make sure we're actually moving the item
    if (source.index === destination.index) return null;

    const start = column["selections"];

    // move the item within the list

    // start by making a new list without the dragged item
    console.log(start);
    const newStartList = start.list.filter((_, idx) => idx !== source.index);

    // then insert the item at the right location
    newStartList.splice(destination.index, 0, start.list[source.index]);

    // then create a copy of the new column object
    const newCol = {
      id: start.id,
      list: newStartList.map((exercise, i) => ({ ...exercise, index: i })),
    };

    // update the state
    setColumn((prevColumn) => ({ ...prevColumn, [newCol.id]: newCol }));
  };

  export default onDragEnd;