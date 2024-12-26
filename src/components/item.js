// PackingList 组件中的Item组件
function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input // 复选框
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)} // 通过onChange事件监听器来监听复选框的变化
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} - {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

export default Item;
