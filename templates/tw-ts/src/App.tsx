import "./styles/main.css";
import Counter from "./components/counter";

export default function App() {
  return (
    <div className="max-w-[1280px] text-center">
      <img className=" w-[180px] h-[200px] mx-auto my-0" src="/rezact.svg" alt="rezact logo" />
      <div>
        <h1 className=" text-5xl font-bold m-2">Welcome To Rezact</h1>
        <p className="text-base m-2 font-medium opacity-80">
          A Javascript Framework, UI library, whatever you want to call it that
          blends the best of svelte, solid, react, and many others.
        </p>
      </div>
      <Counter />
      <ul className="flex gap-4">
        <li className="w-[240px] text-left">
          <a className="font-medium" href="https://github.com/rezact/rezact#readme">
            Learn More &#8594;
          </a>
          <p className="text-base m-2 font-medium opacity-80">Learn more about Rezact and how it is different from others.</p>
        </li>
        <li className="w-[240px] text-left">
          <a className="font-medium" href="https://github.com/Rezact/Rezact/blob/main/CONTRIBUTING.md">
            Contributing &#8594;
          </a>
          <p className="text-base m-2 font-medium opacity-80">Learn more about Rezact and how it is different from others.</p>
        </li>
      </ul>
    </div>
  );
}
