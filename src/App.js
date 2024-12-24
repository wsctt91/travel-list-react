import { useState } from "react";

// 用于测试的初始数据
// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: true },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "Charger", quantity: 1, packed: false },
// ];

// 整体 App 组件
function App() {
  // 全局状态管理 控制item的状态
  const [items, setItems] = useState([]);

  // handlerAddItems函数用于处理添加新的item
  function handlerAddItems(item) {
    setItems((items) => [...items, item]);
  }

  //  handlerDeleteItem函数用于处理删除item
  function handlerDeleteItem(id) {
    // console.log(id);
    setItems((items) =>
      items.filter((item) => {
        return item.id !== id; // 返回id不等于当前id的item 记得要返回item
      })
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handlerAddItems} />
      <PackingList items={items} onDeleteItem={handlerDeleteItem} />
      <Stats items={items} />
    </div>
  );
}

// 1. Logo 标题栏
function Logo() {
  return <h1>🏕️ Prepare for your Travel 🎒</h1>;
}

// 2. Form 输入框表单
function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  // handlerSubmit函数用于处理表单提交事件
  function handlerSubmit(event) {
    event.preventDefault();
    // console.log(event);
    if (!description) {
      return;
    }
    // newItem是一个对象，包含了描述、数量、是否已经打包、id
    const newItem = { description, quantity, packed: false, id: Date.now() };

    // console.log(newItem);
    onAddItems(newItem);

    // 这里是将新的item添加到initialItems数组中
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handlerSubmit}>
      <h3>在旅行中需要准备的东西...</h3>
      <select
        value={quantity}
        onChange={(event) => setQuantity(Number(event.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        // 通过onChange事件监听器来监听输入框的变化
        onChange={(event) => {
          // console.log(event.target.value);
          setDescription(event.target.value);
        }}
      />
      <button>Add</button>
    </form>
  );
}

// 3. PackingList 输入物品的列表
function PackingList({ items, onDeleteItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item key={item.id} onDeleteItem={onDeleteItem} item={item} />
        ))}
      </ul>
    </div>
  );
}

// PackingList 组件中的Item组件
function Item({ item, onDeleteItem }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} - {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

// 4. Stats
function Stats({ items }) {
  const totalItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const packedPercentage =
    totalItems === 0 ? 0 : Math.round(packedItems / totalItems) * 100;
  return (
    <footer className="stats">
      <em>
        有{totalItems}件物品在您的列表中，您已经准备好选择{packedItems}(
        {packedPercentage}%)
      </em>
      {/* 标签表示强调文本 */}
    </footer>
  );
}

export default App;
