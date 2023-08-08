import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useModal } from "../../../context/Modal";

import CreateCategoryModal from "./CreateCategoryModal";
import { thunkDeleteCategory } from "../../../store/userBusinesses";
import { ConfirmDeleteModal } from "../../utils/ConfirmModal/ConfirmDeleteModal";

export default function CategoryTableRow({
  categoryId,
  maxRow,
  setOrderChanged,
}) {
  const { businessId } = useParams();
  const { setModalContent, setModalClass, closeModal } = useModal();
  const dispatch = useDispatch();
  const row = useRef();
  const category = useSelector(
    (state) => state.userBusinesses.singleBusiness.categories[categoryId]
  );

  const handleEdit = (e) => {
    e.preventDefault();
    setModalClass("flex flex-11");
    setModalContent(
      <CreateCategoryModal
        category={category}
        businessId={businessId}
      />
    );
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

  const handleMove = (dir) => {
    if (
      (dir === -1 && category.order === 0) ||
      (dir === 1 && category.order === maxRow)
    )
      return;

    let firstSibling, secondSibling;
    if (dir === -1) {
      firstSibling = row.current.previousElementSibling;
      secondSibling = row.current;
    } else {
      firstSibling = row.current;
      secondSibling = row.current.nextElementSibling;
    }

    firstSibling.parentNode.insertBefore(secondSibling, firstSibling);

    [firstSibling.dataset.order, secondSibling.dataset.order] = [
      secondSibling.dataset.order,
      firstSibling.dataset.order,
    ];

    setOrderChanged(true);
  };

  return (
    <tr
      key={categoryId}
      data-id={categoryId}
      data-order={category.order}
      ref={row}
    >
      <td className="flex flex-11">{category.count}</td>
      <td className="flex flex-01">{category.name}</td>
      <td className="flex flex-11 g10">
        <i
          className="fa-solid fa-caret-up category-action"
          onClick={() => handleMove(-1)}
        ></i>
        <i
          className="fa-solid fa-caret-down category-action"
          onClick={() => handleMove(1)}
        ></i>
      </td>
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
