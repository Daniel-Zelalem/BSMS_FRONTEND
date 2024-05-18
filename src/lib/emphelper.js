// get single user
export async function getEmployeeById(EmployeeId) {
  try {
    const empResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/Employee/getEmployee/${EmployeeId}`
    );
    if (empResponse.ok) {
      const json = await empResponse.json();
      return json;
    } else {
      throw new Error("Failed to fetch employee");
    }
  } catch (error) {
    console.error("Error fetching employee:", error.message);
    throw error;
  }
}

// fetch all all employee
export async function showemployee() {
  const empResponses = await fetch(
    `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/Employee/showemployee`
  );
  const json = await empResponses.json();
  return json;
}

// register all employee
export async function addemployee(formData) {
  try {
    const formDataToSend = new FormData();

    formDataToSend.append("FullName", formData.FullName);
    formDataToSend.append("Age", formData.Age);
    formDataToSend.append("Gender", formData.Gender);
    formDataToSend.append("Phone", formData.Phone);
    formDataToSend.append("Address", formData.Address);
    formDataToSend.append("JobType", formData.JobType);
    formDataToSend.append("Experience", formData.Experience);
    formDataToSend.append("RelativeName", formData.RelativeName);
    formDataToSend.append("RelativePhone", formData.RelativePhone);
    formDataToSend.append("RelativeAddress", formData.RelativeAddress);
    formDataToSend.append("Relationship", formData.Relationship);
    formDataToSend.append("Agent", formData.Agent);

    if (formData.EmpAvatar) {
      formDataToSend.append("EmpAvatar", formData.EmpAvatar);
    }
    if (formData.RelAvatar) {
      formDataToSend.append("RelAvatar", formData.RelAvatar);
    }

    const empResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/Employee/addemployee`,
      {
        method: "POST",
        body: formDataToSend,
      }
    );
    const json = await empResponse.json();

    return json;
  } catch (error) {
    return error;
  }
}

// Update a new user
export async function updateemployee(EmployeeId, formData) {
  try {
    const formDataToSend = new FormData();

    formDataToSend.append("FullName", formData.FullName);
    formDataToSend.append("Age", formData.Age);
    formDataToSend.append("Gender", formData.Gender);
    formDataToSend.append("Phone", formData.Phone);
    formDataToSend.append("Address", formData.Address);
    formDataToSend.append("JobType", formData.JobType);
    formDataToSend.append("Experience", formData.Experience);
    formDataToSend.append("RelativeName", formData.RelativeName);
    formDataToSend.append("RelativePhone", formData.RelativePhone);
    formDataToSend.append("RelativeAddress", formData.RelativeAddress);
    formDataToSend.append("Relationship", formData.Relationship);
    if (formData.EmpAvatar) {
      formDataToSend.append("EmpAvatar", formData.EmpAvatar);
    }
    if (formData.RelAvatar) {
      formDataToSend.append("RelAvatar", formData.RelAvatar);
    }

    const empResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/Employee/updateemployee/${EmployeeId}`,
      { method: "PUT", body: formDataToSend }
    );
    if (!empResponse.ok) {
      throw new Error("Failed to update employee");
    }
    const json = await empResponse.json();
    return json;
  } catch (error) {
    return error;
  }
}

// Delete an employeee
export async function deleteemployee(EmployeeId) {
  const Options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };

  const empResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BSMS_BACKEND_URL}/api/Employee/deleteemployee/${EmployeeId}`,
    Options
  );
  const json = await empResponse.json();
  return json;
}
