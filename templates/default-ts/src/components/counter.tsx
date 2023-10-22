let $count: number = 0;

export default function Counter() {
  return (
    <>
      <div className="counter">
        <button onClick={() => $count++}>+</button>
        <p>{$count}</p>
        <button onClick={() => $count--}>-</button>
      </div>
    </>
  );
}
