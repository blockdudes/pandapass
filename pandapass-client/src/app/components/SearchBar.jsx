"use client"
import { Button, Input } from '@material-tailwind/react'
import React from 'react'

const SearchBar = () => {
  return (
    <div className="relative flex w-full gap-2  md:w-max">
          <Input
            type="search"
            color="black"
            label="Type here..."
            className="pr-20 text-black"
            containerProps={{
              className: "min-w-[288px]",
            }}
          />
          <Button
            size="sm"
            color="white"
            className="!absolute right-1 top-1 rounded"
          >
            Search
          </Button>
        </div>
  )
}

export default SearchBar