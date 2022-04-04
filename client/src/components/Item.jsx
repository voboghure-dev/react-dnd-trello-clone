import React, { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import Window from "./Window";
import ITEM_TYPE from "../data/types";

export default function Item({ item, index, moveItem, status }) {
	const ref = useRef(null);

	const [, drop] = useDrop({
		accept: ITEM_TYPE,
		hover(item, monitor) {
			if (!ref.current) {
				return;
			}

			const dragIndex = item.index;
			const hoverIndex = index;

			if (dragIndex === hoverIndex) {
				return;
			}

			const hoveredRect = ref.current.getBoundClientRect();
			const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
			const mousePosition = monitor.getClientOffset();
			const hoverClientY = mousePosition.y - hoveredRect.top;

			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}

			if (dragIndex > hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}

			moveItem(dragIndex, hoverIndex);
			item.index = hoverIndex;
		},
	});

	const [{ isDragging }, drag] = useDrag({
		item: { type: ITEM_TYPE, ...item, index },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const [show, setShow] = useState(false);

	const onOpen = () => setShow(true);

	const onClose = () => setShow(false);

	drag(drop(ref));

	return (
		<>
			I
			<div
				ref={ref}
				style={{ opacity: isDragging ? 0 : 1 }}
				className={"item"}
				onClick={open}
			>
				<div className="color-bar" style={{ backgroundcolor: status.color }} />
				<p className="item-title">{item.content}</p>
				<p className="item-status">{item.icon}</p>
			</div>
			<Window item={item} onClose={onClose} show={show} />
		</>
	);
}
