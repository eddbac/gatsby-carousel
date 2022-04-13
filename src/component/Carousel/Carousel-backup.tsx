import React, { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";

import "./CarouselStyle.css";

interface ICarousel {
  children: React.ReactNode
  itemsToShow: 1 | 2 | 3 | 4 | 5; //max 5 items
}

const Carousel = (props: ICarousel) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const itemsToShow = props.itemsToShow;
  let buttons =React.Children.count(props.children) / itemsToShow

  const itemWidth = {
    1: '100%',
    2: '50%',
    3: '33%',
    4: '25%',
    5: '20%'
  }

  const updateIndex = (newIndex:number) => {
    if (newIndex < 0) {
      newIndex = React.Children.count(props.children) - 1;
    } else if (newIndex >= React.Children.count(props.children)) {
      newIndex = 0;
    }

    setActiveIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        updateIndex(activeIndex + itemsToShow);
      }
    }, 3000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  });

  const handlers = useSwipeable({
    // onSwipedLeft: () => updateIndex(activeIndex + 1),
    // onSwipedRight: () => updateIndex(activeIndex - 1),
    onSwipedLeft: () => updateIndex(activeIndex + itemsToShow),
    onSwipedRight: () => updateIndex(activeIndex - itemsToShow)
  });

  return (
    <div
      {...handlers}
      className="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="">
        <button
          onClick={() => {
            updateIndex(activeIndex - itemsToShow);
          }}
        >
          Prev
        </button>
      </div>
      <div
        className="inner"
        style={{ transform: `translateX(-${activeIndex  * (100 / itemsToShow)}%)` }}
      >
        {console.log(activeIndex)}
        {React.Children.map(props.children, (child, index) => {
          return React.cloneElement(child, { width: itemWidth[itemsToShow] });
        })}
      </div>
      <div>
      <button
          onClick={() => {
            updateIndex(activeIndex + 1);
          }}
        >
          Next
        </button>
      </div>
      <div className="indicators">
        {React.Children.map(props.children, (child, index) => {
          return (
            <button
              className={`${index === activeIndex ? "active" : ""}`}
              onClick={() => {
                updateIndex(index);
              }}
            >
              {index + 1}
            </button>
          );
        })}

      </div>
    </div>
  );
};

export default Carousel;