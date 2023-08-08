import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";

import CreateCategoryModal from "./CreateCategoryModal";
import { thunkDeleteCategory } from "../../../store/userBusinesses";
import { ConfirmDeleteModal } from "../../utils/ConfirmModal/ConfirmDeleteModal";

export default function CategoryTableRow({ categoryId }) {
  const dispatch = useDispatch();
  const { setModalContent, setModalClass, closeModal } = useModal();
  const category = useSelector(
    (state) => state.userBusinesses.singleBusiness.categories[categoryId]
  );

  const handleEdit = (e) => {
    e.preventDefault();
    setModalClass("flex flex-11");
    setModalContent(<CreateCategoryModal category={category} />);
  };

  const onDelete = () => {
    dispatch(thunkDeleteCategory(categoryId));
    closeModal();
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setModalClass("flex flex-11");
    setModalContent(
      <ConfirmDeleteModal
        deleteName={category.name}
        onDelete={onDelete}
      />
    );
  };

  return (
    <tr key={categoryId}>
      <td className="flex flex-21 row-drag-icon">
        <i className="fa-solid fa-ellipsis"></i>
      </td>
      <td className="flex flex-11">{category.count}</td>
      <td className="flex flex-01">{category.name}</td>
      <td className="flex flex-11 g10">
        <i
          className="fa-solid fa-pen-to-square category-action"
          onClick={handleEdit}
        ></i>
        <i
          className="fa-solid fa-trash category-action"
          onClick={handleDelete}
        ></i>
      </td>
    </tr>
  );
}
