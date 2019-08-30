import nodeId from '../../helpers/nodeId';

export default class FlareNode {

	constructor(name = 'NodeName', children = [], type = 'node', transform = {}, opacity = 1) {

		this._Id = nodeId();
		this._Children = children;
		this._Transform = transform;
		this._Opacity = opacity;
		this._Name = name;
		this._Type = type;
	}

	addChildren(children) {
		this._Children = this._Children.concat(children)
	}

	addChild(child) {
		this._Children.push(child)
	}

	convert() {

		return {
			type: this._Type,
			id: this.id,
			name: this._Name,
			...this._Transform,
			opacity: this._Opacity,
			displayType: "empty",
			children: this._Children,

		}
	}

	get id() {
		return this._Id;
	}

	get name() {
		return this._Name;
	}

	set name(value) {
		this._Name = value;
	}

	get type() {
		return this._Type;
	}

	set type(value) {
		this._Type = value;
	}

	set transform(value) {
		this._Transform = value;
	}

	set opacity(value) {
		this._Opacity = value;
	}
}