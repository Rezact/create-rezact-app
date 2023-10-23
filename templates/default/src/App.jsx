import "./styles/main.css";
import Counter from "./components/counter";

export default function App() {
  return (
    <div className="body">
      <img className="logo" src="/rezact.svg" alt="rezact logo" />
      <div>
        <h1>Welcome To Rezact</h1>
        <p>
          A Javascript Framework, UI library, whatever you want to call it that
          blends the best of svelte, solid, react, and many others.
        </p>
      </div>
      <Counter />
      <ul className="links">
        <li>
          <a href="https://github.com/rezact/rezact#readme">
            Learn More &#8594;
          </a>
          <p>Learn more about Rezact and how it is different from others.</p>
        </li>
        <li>
          <a href="https://github.com/Rezact/Rezact/blob/main/CONTRIBUTING.md">
            Contributing &#8594;
          </a>
          <p>Learn more about Rezact and how it is different from others.</p>
        </li>
      </ul>
    </div>
  );
}
