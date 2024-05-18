import { BiCheck, BiX } from "react-icons/bi";

const DeleteComponent = ({ deleteHandler, cancelHandler }) => {
  return (
    <div className="flex gap-5">
      <p>Are You Sure To Delete This Employee?</p>
      <button
        onClick={deleteHandler}
        className="flex bg-red-400 text-white px-2 py-1 border rounded-md hover:bg-rose-500 hover:border-red-500 hover:text-gray-50"
      >
        Yes{" "}
        <span className="px-1">
          <BiCheck color="rgb(255 255 255" size={20}></BiCheck>
        </span>
      </button>
      <button
        onClick={cancelHandler}
        className="flex bg-gray-400 text-white px-2 py-1 border rounded-md hover:bg-green-500 hover:border-green-500 hover:text-gray-50"
      >
        No{" "}
        <span className="px-1">
          <BiX color="rgb(255 255 255" size={20}></BiX>
        </span>
      </button>
    </div>
  );
};
export default DeleteComponent;