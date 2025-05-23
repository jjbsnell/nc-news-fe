import { useSearchParams } from "react-router-dom";

function SortControls() {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort_by = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  const handleSortChange = (e) => {
    setSearchParams({ sort_by: e.target.value, order });
  };

  const handleOrderChange = (e) => {
    setSearchParams({ sort_by, order: e.target.value });
  };

  return (
    <div className="sort-controls">
      <label htmlFor="sort">Sort by: </label>
      <select id="sort" value={sort_by} onChange={handleSortChange}>
        <option value="created_at">Date</option>
        <option value="comment_count">Comments</option>
        <option value="votes">Votes</option>
      </select>

      <label htmlFor="order">Order: </label>
      <select id="order" value={order} onChange={handleOrderChange}>
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </select>
    </div>
  );
}

export default SortControls;