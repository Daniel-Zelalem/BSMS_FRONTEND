import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Map from "../Maps/Map";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const PropertyForm = () => {
  const [formData, setFormData] = useState({
    propertyType: "",
    location: "",
    price: "",
    description: "",
    images: [],
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="w-11/12 mx-2 bg-white shadow-2xl rounded-lg px-8 pt-6 pb-8 mb-4"
    >
      <div className="mb-2">
        <Label htmlFor="title" className="font-bold">
          Property Title :
        </Label>
        <Input type="text" id="title" placeholder="Title" className="mt-3" />
      </div>
      <div className="mb-2">
        <Label htmlFor="location" className="font-bold">
          Property Location :
        </Label>
        <Map height="300px" width="100%" />
      </div>
      <div className="mb-3">
        <Label htmlFor="location" className="font-bold">
          Property Description :
        </Label>
        <Textarea
          placeholder="Type your property Description here."
          className="mt-3"
        />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        <div>
          <div className="mb-4">
            <Label htmlFor="type" className="font-bold">
              Proprty Type :
            </Label>
          </div>
          <Select className="mt-4">
            <SelectTrigger className="w-[180px]">
              <SelectValue
                placeholder="Select an Option"
                className="font-bold"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="House">House</SelectItem>
                <SelectItem value="Vehicle">Vehicle</SelectItem>
                <SelectItem value="Land">Land</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <div className="mb-4">
            <Label htmlFor="type" className="font-bold">
              Contract Type :
            </Label>
          </div>
          <Select className="mt-4">
            <SelectTrigger className="w-[180px]">
              <SelectValue
                placeholder="Select an Option"
                className="font-bold"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="For Sale">For Sale</SelectItem>
                <SelectItem value="For Rent">For Rent</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <div className="mb-4">
            <Label htmlFor="type" className="font-bold">
              Currency :
            </Label>
          </div>
          <Select className="mt-4">
            <SelectTrigger className="w-[180px]">
              <SelectValue
                placeholder="Select an Option"
                className="font-bold"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="ETB">ETB</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <div className="mb-4">
            <Label htmlFor="type" className="font-bold">
              City :
            </Label>
          </div>
          <Select className="mt-4">
            <SelectTrigger className="w-[180px]">
              <SelectValue
                placeholder="Select an Option"
                className="font-bold"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Addis Abeba">Addis Abeba</SelectItem>
                <SelectItem value="Adama">Adama</SelectItem>
                <SelectItem value="Jimma">Jimma</SelectItem>
                <SelectItem value="Ambo">Ambo</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="mb-2">
          <Label htmlFor="title" className="font-bold">
            Proprty Price :
          </Label>
          <Input
            type="number"
            id="title"
            placeholder="Price"
            className="mt-3 w-44"
          />
        </div>
      </div>
    </form>
  );
};

export default PropertyForm;
