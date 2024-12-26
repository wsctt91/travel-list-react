import { useState } from "react";

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
      <button>加入</button>
    </form>
  );
}

export default Form;
