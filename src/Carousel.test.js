import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel.js";



// smoke test
it("renders without crashing", function() {
    render(<Carousel/>);
});


// snapshot test
it("matches snapshot", function() {
    const {asFragment} = render(<Carousel/>);
    expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});


it("works when you click on the left arrow", function() {
    const { queryByTestId, queryByAltText } = render(<Carousel />);
  
    // expect the first image to show, but not the second
    expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
    expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
  
    // move forward in the carousel
    const rightArrow = queryByTestId("right-arrow");
    fireEvent.click(rightArrow);
  
    // expect the second image to show, but not the first
    expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
    expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();

    // move forward in the carousel
    const leftArrow = queryByTestId("left-arrow");
    fireEvent.click(leftArrow);

    // expect the first image to show, but not the second
    expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
    expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
  });


  it("hides left arrow at beginning of image array", function() {
    const { queryByTestId } = render(<Carousel />);
    expect(queryByTestId("left-arrow")).toHaveClass("hidden");
    const rightArrow = queryByTestId("right-arrow");
    fireEvent.click(rightArrow);
    expect(queryByTestId("left-arrow")).not.toHaveClass("hidden");
  
  });

  it("hides right arrow at end of image array", function() {
    const { queryByTestId } = render(<Carousel />);
    const rightArrow = queryByTestId("right-arrow");
    fireEvent.click(rightArrow);
    expect(queryByTestId("right-arrow")).not.toHaveClass("hidden");
    fireEvent.click(rightArrow);
    expect(queryByTestId("right-arrow")).toHaveClass("hidden");
  
  });