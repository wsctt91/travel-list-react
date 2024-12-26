import { useState } from "react";
import Item from "./item.js"; // Ensure you have the correct path to the Item component

// 3. PackingList 输入物品的列表
function PackingList({ items, onDeleteItem, onToggleItem, onClearList }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;
  // 根据不同的排序方式来对items进行排序
  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            onDeleteItem={onDeleteItem} // 传递给Item组件的onDeleteItem函数
            onToggleItem={onToggleItem} // 传递给Item组件的onToggleItem函数
            item={item}
          />
        ))}
      </ul>

      {/* 筛选框 */}
      <div className="actions">
        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
        >
          <option value="input">根据输入顺序查找</option>
          <option value="description">根据描述查找</option>
          <option value="packed">根据打包查找</option>
        </select>
        <button onClick={onClearList}>清除行李列表</button>
      </div>
    </div>
  );
}

export default PackingList;
