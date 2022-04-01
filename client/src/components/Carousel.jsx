import React, { useState, useEffect, useRef } from "react";
import { AiOutlineVerticalRight, AiOutlineVerticalLeft } from "react-icons/ai";
import { useParams } from 'react-router-dom'
import { getDetailId } from '../actions/index'
import { useSelector, useDispatch } from 'react-redux';

let count = 0;
let slideInterval;
export default function Carousel() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const detail = useSelector((state) => state.detail);


    useEffect(() => {
        dispatch(getDetailId(id));
    }, [dispatch, id]);


    const [currentIndex, setCurrentIndex] = useState(0);

    const slideRef = useRef();

    const removeAnimation = () => {
        slideRef.current.classList.remove("fade-anim");
    };

    useEffect(() => {
        slideRef.current.addEventListener("animationend", removeAnimation);
        slideRef.current.addEventListener("mouseenter", pauseSlider);
        slideRef.current.addEventListener("mouseleave", startSlider);

        startSlider();
        return () => {
            pauseSlider();
        };
        // eslint-disable-next-line
    }, []);

    const startSlider = () => {
        slideInterval = setInterval(() => {
            handleOnNextClick();
        }, 3000);
    };

    const pauseSlider = () => {
        clearInterval(slideInterval);
    };

    const handleOnNextClick = () => {
        count = (count + 1) % detail.images.length;
        setCurrentIndex(count);
        slideRef.current.classList.add("fade-anim");
    };
    const handleOnPrevClick = () => {
        const productsLength = detail.images.length;
        count = (currentIndex + productsLength - 1) % productsLength;
        setCurrentIndex(count);
        slideRef.current.classList.add("fade-anim");
    };

    return (
        <div ref={slideRef} className="w-full select-none relative">
            <div className="aspect-w-16 aspect-h-9">
                <img src={detail.images[currentIndex]} alt="" />
            </div>

            <div className="absolute w-full top-1/2 transform -translate-y-1/2 px-3 flex justify-between items-center">
                <button
                    className="bg-black text-white p-1 rounded-full bg-opacity-50 cursor-pointer hover:bg-opacity-100 transition"
                    onClick={handleOnPrevClick}
                >
                    <AiOutlineVerticalRight size={30} />
                </button>
                <button
                    className="bg-black text-white p-1 rounded-full bg-opacity-50 cursor-pointer hover:bg-opacity-100 transition"
                    onClick={handleOnNextClick}
                >
                    <AiOutlineVerticalLeft size={30} />
                </button>
            </div>
        </div>
    );
}