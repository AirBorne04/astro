import { createSignal } from 'solid-js';
import './Counter.css';

console.log("before function call: ", globalThis.WORKER_ENV);

export default function Counter({ children }) {
	const [count, setCount] = createSignal(0);
	const add = () => setCount(count() + 1);
	const subtract = () => setCount(count() - 1);

	return (
		<>
			<div class="counter">
				<button onClick={subtract}>-</button>
				<pre>{count()}</pre>
				<button onClick={add}>+</button>
			</div>
			<div class="counter-message">{children}</div>
		</>
	);
}
