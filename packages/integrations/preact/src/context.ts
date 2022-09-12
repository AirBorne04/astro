import type { RendererContext, SignalLike } from './types';

type Context = {
	id: string;
	c: number;
	signals: Map<SignalLike, string>;
};

const contexts = new WeakMap<RendererContext['result'], Context>();

export function getContext(result: RendererContext['result']): Context {
	if (contexts.has(result)) {
		return contexts.get(result)!;
	}
	let ctx = {
		c: 0,
		get id() {
			return 'p' + this.c.toString();
		},
		signals: new Map()
	};
	contexts.set(result, ctx);
	return ctx;
}

export function incrementId(ctx: Context): string {
	let id = ctx.id;
	ctx.c++;
	return id;
}
