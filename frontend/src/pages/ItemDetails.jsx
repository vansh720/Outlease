import { useParams } from "react-router-dom";

function ItemDetails() {
  const { id } = useParams();

  return (
    <div>
      <h1>Item Details Page</h1>
      <p>Item ID: {id}</p>
    </div>
  );
}

export default ItemDetails;
