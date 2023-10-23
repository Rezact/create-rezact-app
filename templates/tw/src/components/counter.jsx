let $count = 0;

export default function Counter() {
  return (
    <div className="flex justify-center items-center ">
      <button className="button" onClick={() => $count++}>
        +
      </button>
      <p className=" py-[0.6em] px-[1.2em]">{$count}</p>
      <button className=" button" onClick={() => $count--}>
        -
      </button>
    </div>
  );
}
