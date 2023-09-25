let $count: number = 0;

export function Counter() {
  return (
    <>
      <div class="card">
        <div class="counter">{$count}</div>
        <button onClick={() => $count++}>+</button>{" "}
        <button onClick={() => $count--}>-</button>
      </div>
    </>
  );
}
