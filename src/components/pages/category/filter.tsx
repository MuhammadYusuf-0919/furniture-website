// Sidebar.jsx
import React from "react";
import { Card, Typography, List, ListItem, Rating, Button } from "@material-tailwind/react";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setPrice, setRating, clearFilters } from "@/redux/filterSlice";
import { categories } from "@/data";
import Link from "next/link";
import MultiRangeSlider from "@/components/slider";

export function Sidebar() {
  const dispatch = useDispatch();
  const { price, rating } = useSelector((state: RootState) => state.filter);
  const { isOpen } = useSelector((state: RootState) => state.sidebar);

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  return (
    <Card
      placeholder
      className={`w-full lg:max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-[500px] hidden"
      }`}
    >
      <div className="p-4 flex items-center justify-between">
        <Typography placeholder variant="h5" color="blue-gray">
          Turkumlar
        </Typography>
        <Button
          placeholder
          variant="outlined"
          className="border-primary text-primary"
          onClick={handleClearFilters}
        >
          Clear
        </Button>
      </div>
      <hr className="my-2 border-blue-gray-50" />
      <List placeholder>
        <ListItem ripple={false} placeholder>
          <Typography placeholder variant="lead" color="blue-gray">
            {/* Price: {price} */}
          </Typography>
          <MultiRangeSlider min={price.min} max={price.max} onChange={(values) => dispatch(setPrice(values))} />
        </ListItem>
        <ListItem ripple={false} placeholder>
          <Rating
            placeholder
            value={rating}
            onChange={(value) => dispatch(setRating(value))}
          />
        </ListItem>
        <hr className="my-2 border-blue-gray-50" />
        {categories.map((category, idx) => (
          <Link key={idx} href={`/category/${category}`}>
            <ListItem ripple={false} placeholder>{category}</ListItem>
          </Link>
        ))}
      </List>
    </Card>
  );
}
