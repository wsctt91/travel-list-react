import { useState } from "react";
import Logo from "./logo.js";
import Form from "./form.js";
import PackingList from "./packlingList.js";
import Stats from "./state.js";

// 用于测试的初始数据
// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: true },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "Charger", quantity: 1, packed: false },
// ];

/* 整体 App 组件 */
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
  //  handlerToggleItem函数用于处理切换item的打包状态
  function handlerToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  //  handlerClearList函数用于处理清空item列表
  function handlerClearList() {
    const confirmed = window.confirm("确定要清空列表吗？");
    if (confirmed) {
      return setItems([]);
    }
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handlerAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handlerDeleteItem}
        onToggleItem={handlerToggleItem}
        onClearList={handlerClearList}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;
