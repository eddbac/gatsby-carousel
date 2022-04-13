import React, { useEffect, useMemo, useRef, useState } from "react";
import { styled, useStyletron } from "styletron-react";
import "./CarouselStyle.css";

interface ICarousel {
  children?: React.ReactNode;
  itemsToShow: 1 | 2 | 3 | 4 | 5; //max 5 items
  infiniteLoop: boolean;
  dots?: boolean;
  buttonLeft?: {
    rightArrow?: React.CSSProperties;
    leftArrow?: React.CSSProperties;
  };
  buttonRight?: {
    rightArrow?: React.CSSProperties;
    leftArrow?: React.CSSProperties;
  };
  buttonCenter?: {
    rightArrow?: React.CSSProperties;
    leftArrow?: React.CSSProperties;
  };
}

const CarouselContainer = styled("div", {
  width: "100%",
  display: "flex",
  flexDirection: "column",
});

const CarouselContentWrapper = styled("div", {
  overflow: "hidden",
  width: "100%",
  height: "100%",
});

const CarouselWrapper = styled("div", {
  display: "flex",
  width: "100%",
  position: "relative",
});

const LeftArrow = styled("button", {
  position: "absolute",
  zIndex: 1,
  top: "50%",
  transform: `translateY(-50%)`,
  width: "48px",
  height: "48px",
  borderRadius: "24px",
  backgroundColor: "white",
  border: "1px solid #ddd",
  left: "24px",
});

// const RightArrow = (children:React.ReactNode, ...ownStyle:Object) => {
//  return (<button {...ownStyle}>
//     {children}
//   </button>)}

const RightArrow = styled("button", {
  position: "absolute",
  zIndex: 1,
  top: "50%",
  transform: `translateY(-50%)`,
  width: "48px",
  height: "48px",
  borderRadius: "24px",
  backgroundColor: "white",
  border: "1px solid #ddd",
  right: "24px",
});

const Carousel = (props: ICarousel) => {
  const { children, itemsToShow, infiniteLoop } = props;
  const [currentIndex, setCurrentIndex] = useState(
    infiniteLoop ? itemsToShow : 0
  );
  const [length, setLength] = useState(children.length);
  const [isRepeating, setIsRepeating] = useState(
    infiniteLoop && children.length > itemsToShow
  );
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  const [touchPosition, setTouchPosition] = useState(null);

  // Set the length to match current children from props
  useEffect(() => {
    setLength(children.length);
    setIsRepeating(infiniteLoop && children.length > itemsToShow);
  }, [children, infiniteLoop, itemsToShow]);

  useEffect(() => {
    if (isRepeating) {
      if (currentIndex === itemsToShow || currentIndex === length) {
        setTransitionEnabled(true);
      }
    }
  }, [currentIndex, isRepeating, itemsToShow, length]);

  const next = () => {
    if (isRepeating) {
      currentIndex < length + itemsToShow
        ? setCurrentIndex((prevState) => prevState + 1)
        : setCurrentIndex((prevState) => prevState);
    }
  };

  const prev = () => {
    if (isRepeating) {
      currentIndex > 0
        ? setCurrentIndex((prevState) => prevState - 1)
        : setCurrentIndex((prevState) => prevState);
    }
  };

  // touch feature for mobile
  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  const handleTouchMove = (e) => {
    const touchDown = touchPosition;

    if (touchDown === null) {
      return;
    }

    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;

    if (diff > 5) {
      next();
    }

    if (diff < -5) {
      prev();
    }

    setTouchPosition(null);
  };

  const handleTransitionEnd = () => {
    if (isRepeating) {
      if (currentIndex === 0) {
        setTransitionEnabled(false);
        setCurrentIndex(length);
      } else if (currentIndex === length + itemsToShow) {
        setTransitionEnabled(false);
        setCurrentIndex(itemsToShow);
      }
    }
  };

  const renderExtraPrev = () => {
    let output = [];
    for (let index = 0; index < itemsToShow; index++) {
      output.push(children[length - 1 - index]);
    }
    output.reverse();
    return output;
  };

  const renderExtraNext = () => {
    let output = [];
    for (let index = 0; index < itemsToShow; index++) {
      output.push(children[index]);
    }
    return output;
  };

  return (
    <CarouselContainer>
      <CarouselWrapper>
        {!props.buttonLeft || !props.buttonRight
          ? (isRepeating || currentIndex > 0) && (
              <LeftArrow onClick={prev} style={props.buttonCenter?.leftArrow}>
                &lt;
              </LeftArrow>
            )
          : ""}
        <CarouselContentWrapper
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <div
            className={`carousel-content show-${itemsToShow}`}
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
              transition: !transitionEnabled ? "none" : undefined,
            }}
            onTransitionEnd={() => handleTransitionEnd()}
          >
            {length > itemsToShow && isRepeating && renderExtraPrev()}
            {children}
            {length > itemsToShow && isRepeating && renderExtraNext()}
          </div>
        </CarouselContentWrapper>
        {!props.buttonLeft || !props.buttonRight
          ? (isRepeating || currentIndex < length - itemsToShow) && (
              <RightArrow onClick={next} style={props.buttonCenter?.rightArrow}>
                &gt;
              </RightArrow>
            )
          : ""}
      </CarouselWrapper>
    </CarouselContainer>
  );
};

export default Carousel;
