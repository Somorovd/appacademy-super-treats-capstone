import { useSelector } from "react-redux";

export default function CategoryTableRow({ categoryId }) {
  const category = useSelector(
    (state) => state.userBusinesses.singleBusiness.categories[categoryId]
  );

  return (
    <tr key={categoryId}>
      <td className="flex flex-21 row-drag-icon">
        <i className="fa-solid fa-ellipsis"></i>
      </td>
      <td className="flex flex-11">{category.count}</td>
      <td className="flex flex-01">{category.name}</td>
    </tr>
  );
}
