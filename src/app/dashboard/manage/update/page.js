"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const UserUpdate = () => {
  const userState = useSelector((state) => state.updateInfo);
  const [user, setUser] = useState(userState.value.userData);
  const [originalUser, setOriginalUser] = useState(userState.value.userData);

  useEffect(() => {
    // Update the user state when userState changes
    setUser(userState.value.userData);
    setOriginalUser(userState.value.userData);
  }, [userState]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleStatusChange = (e) => {
    const status = e.target.value;
    setUser((prevUser) => ({ ...prevUser, status: status }));
  };

  const handleSaveChanges = async () => {
    const hasChanges = JSON.stringify(user) !== JSON.stringify(originalUser);

    if (hasChanges) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/User/update/${originalUser.id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // Specify the content type as JSON
            },
            body: JSON.stringify(user), // Stringify the user object
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setUser(data.user);

        setOriginalUser(data.user);
        console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.log("No changes detected");
    }
  };

  return (
    <section>
      <div className="mx-12 mt-4 shadow border rounded">
        <Tabs defaultValue="General" className="w-full mt-3 ">
          <TabsList className="ml-2">
            <TabsTrigger
              value="General"
              className="text-black text-1xl font-bold "
            >
              User Information
            </TabsTrigger>
          </TabsList>

          <TabsContent value="General">
            <div className="grid grid-cols-2 w-7/12 gap-3">
              <div className="mb-3 mx-2 mt-2">
                <Label htmlFor="firstName" className="font-bold block">
                  First Name :
                </Label>
                <Input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  className="mt-3"
                  value={user.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3 mx-2 mt-2">
                <Label htmlFor="lastName" className="font-bold block">
                  Last Name :
                </Label>
                <Input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  className="mt-3"
                  value={user.lastName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3 mx-2">
                <Label htmlFor="phone" className="font-bold block">
                  Phone Number :
                </Label>
                <Input
                  type="number"
                  id="phone"
                  name="phone"
                  placeholder="Phone Number"
                  className="mt-3"
                  value={user.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3 mx-2 mt-1">
                <Label htmlFor="status" className="font-bold block">
                  Status :
                </Label>
                <FormControl
                  sx={{ mt: 1, minWidth: 120 }}
                  size="small"
                  className=""
                >
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    name="status"
                    value={user.status}
                    label="status"
                    onChange={handleStatusChange}
                  >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Deactive">Deactive</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            <Button
              className="bg-green mx-2 mb-3 mt-4 hover:bg-green/90"
              onClick={handleSaveChanges}
            >
              Save Changes
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default UserUpdate;
