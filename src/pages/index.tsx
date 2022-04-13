import * as React from "react";
import "../component/Carousel/CarouselStyle.css";
import { Carousel, CarouselItem } from "../component/index";

const IndexPage = () => {
  return (
    <div
      style={{
        maxWidth: 1280,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 64,
        height: "600px",
        backgroundColor: "beige",
      }}
    >
      <Carousel
        itemsToShow={3}
        infiniteLoop={true}
        buttonCenter={{
          rightArrow: { backgroundColor: "blue" },
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 10px",
              height: "600px",
              backgroundColor: "orange",
            }}
          >
            <img
              src="https://via.placeholder.com/1600x300.png?text=FIRST"
              alt="placeholder"
              style={{ width: "100%", height: "500px" }}
            />
          </div>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 10px",
              height: "600px",
              backgroundColor: "orange",
            }}
          >
            <img
              src="https://via.placeholder.com/1600x300"
              alt="placeholder"
              style={{ width: "100%", height: "500px" }}
            />
          </div>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 10px",
              height: "600px",
              backgroundColor: "orange",
            }}
          >
            <img
              src="https://via.placeholder.com/1600x300"
              alt="placeholder"
              style={{ width: "100%", height: "500px" }}
            />
          </div>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 10px",
              height: "600px",
              backgroundColor: "orange",
            }}
          >
            <img
              src="https://via.placeholder.com/1600x300"
              alt="placeholder"
              style={{ width: "100%", height: "500px" }}
            />
          </div>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 10px",
              height: "600px",
              backgroundColor: "orange",
            }}
          >
            <img
              src="https://via.placeholder.com/782x90.png?text=This+Is+An+Example"
              alt="placeholder"
              style={{ width: "100%", height: "500px" }}
            />
          </div>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 10px",
              height: "600px",
              backgroundColor: "orange",
            }}
          >
            <img
              src="https://via.placeholder.com/1600x300"
              alt="placeholder"
              style={{ width: "100%", height: "500px" }}
            />
          </div>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 10px",
              height: "600px",
              backgroundColor: "orange",
            }}
          >
            <img
              src="https://via.placeholder.com/1600x300.png?text=End"
              alt="placeholder"
              style={{ width: "100%", height: "500px" }}
            />
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default IndexPage;
