// 4. Stats
function Stats({ items }) {
  if (!items.length) {
    return (
      <p className="stats">
        <em>您还没有添加任何物品 🧳</em>
      </p>
    );
  }

  const totalItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const packedPercentage = Math.round((packedItems / totalItems) * 100);

  return (
    <footer className="stats">
      <em>
        {packedPercentage === 100
          ? "你已经准备好出发了！✈️"
          : `有${totalItems}
        件物品在您的列表中，您已经准备好选择 ${packedItems} (${packedPercentage}%)`}
      </em>
      {/* 标签表示强调文本 */}
    </footer>
  );
}

export default Stats;
