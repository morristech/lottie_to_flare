import toArray from '../../../helpers/toArray'
import nodeId from '../../../helpers/nodeId'

export default class FlareAnimation {

	constructor() {

		this._FPS = 25
		this._Nodes = {};

		this._Converters = {
			rotation: this.animateRotation.bind(this),
			translation: this.animateTranslation.bind(this),
			scale: this.animateScale.bind(this),
			opacity: this.animateOpacity.bind(this),
			path: this.animatePath.bind(this),
		}
	}

	animatePath(keyframes, multplier) {
		return {

		}
	}

	animateScale(keyframes, multiplier) {
		
		const frameScaleX = []
		const frameScaleY = []

		keyframes.forEach((keyframe, index) => {
			const inValuesX = toArray(keyframe.in[0])
			const outValuesX = toArray(keyframe.out[0])
			const inValuesY = toArray(keyframe.in[1])
			const outValuesY = toArray(keyframe.out[1])

			let props = {
				t: keyframe.time / this._FPS,
			}

			if (index === keyframes.length - 1) {
				props = {
					...props,
					i: 1,
				}
			} else {
				props = {
					...props,
					i: 2,
				}
			}

			const value = keyframe.value

			frameScaleX.push({
				v: value[0] * multiplier,
				curve: outValuesX.concat(inValuesX),
				...props,
			})

			frameScaleY.push({
				v: value[1] * multiplier,
				curve: outValuesY.concat(inValuesY),
				...props,
			})
		})

		return {
			frameScaleX,
			frameScaleY,
		}
	}

	animateTranslation(keyframes, multiplier) {
		
		const framePosX = []
		const framePosY = []

		keyframes.forEach((keyframe, index) => {
			const inValuesX = toArray(keyframe.in[0])
			const outValuesX = toArray(keyframe.out[0])
			const inValuesY = toArray(keyframe.in[1])
			const outValuesY = toArray(keyframe.out[1])

			let props = {
				t: keyframe.time / this._FPS,
			}

			if (index === keyframes.length - 1) {
				props = {
					...props,
					i: 1,
				}
			} else {
				props = {
					...props,
					i: 2,
				}
			}

			const value = keyframe.value

			framePosX.push({
				v: value[0] * multiplier,
				curve: outValuesX.concat(inValuesX),
				...props,
			})

			framePosY.push({
				v: value[1] * multiplier,
				curve: outValuesY.concat(inValuesY),
				...props,
			})
		})

		return {
			framePosX,
			framePosY,
		}
	}

	animateUnidimensionalProperty(keyframes, multiplier, propertyName) {
		return {
			[propertyName]: keyframes.map((keyframe, index) => {
				if (index === keyframes.length - 1) {
					return {
						v: keyframe.value[0] * multiplier,
						t: keyframe.time / this._FPS,
						i: 1,
					}
				}
				
				const inValues = toArray(keyframe.in[0])
				const outValues = toArray(keyframe.out[0])
				return {
					v: keyframe.value[0] * multiplier,
					t: keyframe.time / this._FPS,
					curve: outValues.concat(inValues),
					i: 2,
				}
			})
		}
	}

	animateOpacity(keyframes, multiplier) {

		return this.animateUnidimensionalProperty(keyframes, multiplier, 'frameOpacity')
	}

	animateRotation(keyframes, multiplier) {
		
		return this.animateUnidimensionalProperty(keyframes, multiplier, 'frameRotation')
	}

	addAnimation(property, type, nodeId, multiplier) {

		const node = {
			...this._Nodes[nodeId],
			...this._Converters[type](property.keyframes, multiplier)
		}

		this._Nodes[nodeId] = node;

	}

	addPathAnimation(property, nodeId, verticesNodes) {

		const keyframes = property.keyframes

		const frameVerticesNode = {
			framePathVertices: keyframes.map(keyframe => {
				
				const inValuesX = toArray(keyframe.in[0])
				const outValuesX = toArray(keyframe.out[0])

				const vertices = keyframe.value.vertices
				.reduce((accumulator, vertex, index, all) => {

					const translation = toArray(vertex.position);
					const inPoints = toArray(vertex.in).map((value, index)=> value + translation[index]);
					const outPoints = toArray(vertex.out).map((value, index)=> value + translation[index]);

					accumulator[verticesNodes[index].id] = {
						pos: translation,
						in: inPoints,
						out: outPoints
					}
					return accumulator
				}, {})

				return {
					t: keyframe.time / this._FPS,
					v: vertices,
					i: 2,
					curve: outValuesX.concat(inValuesX),
				}
			})
		}

		const node = {
			...this._Nodes[nodeId],
			...frameVerticesNode,
			
		}

		this._Nodes[nodeId] = node;

	}

	convert() {
		return [{
			displayEnd: 10,
			displayStart: 0,
			duration: 10,
			fps: this._FPS,
			id: nodeId(),
			isWorkAreaActive: false,
			loop: false,
			name: "Animations",
			order: -1,
			nodes: this._Nodes
		}];
	}
}