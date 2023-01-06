import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Select from "react-select";
import multiSelect from "react-select/animated";
import csc from "country-state-city";
import { UserForm } from "../../helpers/formFieldError";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter, redirect } from "next/navigation";

const menuItems = [
  { value: "MyProfile", label: "My Profile" },
  { value: "OrganizationProfile", label: "Organization Profile" },
  { value: "Users", label: "Users" },
  { value: "Funder", label: "Funder" },
  { value: "Receipt", label: "Receipt" },
  { value: "Project", label: "Project" },
  { value: "Budget", label: "Budget" },
  { value: "Gantt-chart", label: "Project Gantt chart" },
];

const userRoleOption = [
  { value: "Admin", label: "Admin" },
  { value: "User", label: "User" },
];

const CreateUser = ({ session }) => {
  const router = useRouter();
  const multiSelectField = multiSelect();
  // add Data in Formik
  const userFormik = useFormik({
    initialValues: {
      createdBy: session?.createdBy,
      logo: "",
      firstName: "",
      lastName: "",
      phone: "",
      department: "",
      email: "",
      addressLine1: "",
      addressLine2: "",
      pinCode: "",
      userRole: "",
      password: "",
      country: "",
      state: null,
      city: null,
      formPermission: null,
      deleteAccess: "",
      updateAccess: "",
      viewAccess: "",
      addCreateAccess: "",
    },
    validationSchema: UserForm,
    onSubmit,
  });

  // get Countries in country-state-city
  const countries = csc.getAllCountries();
  // console.log(countries)
  const updatedCountries = countries.map((country) => ({
    label: country.name,
    value: country.id,
    ...country,
  }));
  // update formik states
  const updatedStates = (countryId) =>
    csc
      .getStatesOfCountry(countryId)
      .map((state) => ({ label: state.name, value: state.id, ...state }));
  const updatedCities = (stateId) =>
    csc
      .getCitiesOfState(stateId)
      .map((city) => ({ label: city.name, value: city.id, ...city }));

  const { values, handleSubmit, setFieldValue, setValues } = userFormik;

  useEffect(() => {}, [values]);

  // access handle
  const [viewForms, setViewForms] = useState({
    view: [],
  });
  const [updateForms, setUpdateForms] = useState({
    update: [],
  });
  const [addForms, setAddForms] = useState({
    add: [],
  });
  const [deleteForms, setDeleteForms] = useState({
    delete_dt: [],
  });
  const handleChange = (e) => {
    const { value, checked, name } = e.target;
    const { view } = viewForms;
    const { update } = updateForms;
    const { add } = addForms;
    const { delete_dt } = deleteForms;
    // console.log(`${value} is ${checked} name ${name}`);
    // Case 1 : The user checks the box
    if (name === "veiw") {
      if (checked) {
        setViewForms({
          view: [...view, value],
        });
      }
      // Case 2  : The user unchecks the box
      else {
        setViewForms({
          view: view.filter((e) => e !== value),
        });
      }
    }

    if (name === "update") {
      if (checked) {
        setUpdateForms({
          update: [...update, value],
        });
      }
      // Case 2  : The user unchecks the box
      else {
        setUpdateForms({
          update: update.filter((e) => e !== value),
        });
      }
    }
    // Case 1 : The user checks the box
    if (name === "add") {
      if (checked) {
        setAddForms({
          add: [...add, value],
        });
      }
      // Case 2  : The user unchecks the box
      else {
        setAddForms({
          add: add.filter((e) => e !== value),
        });
      }
    }

    if (name === "delete") {
      if (checked) {
        setDeleteForms({
          delete_dt: [...delete_dt, value],
        });
      }
      // Case 2  : The user unchecks the box
      else {
        setDeleteForms({
          delete_dt: delete_dt.filter((e) => e !== value),
        });
      }
    }
  };

  // image upload handle
  const [imgUrl, setImgUrl] = useState();
  const [logoUrl, setLogoUrl] = useState();
  const imageHandler = (e) => {
    setLogoUrl(e.target.files[0]);
  };

  const imageUploadhandler = async (e) => {
    const body = new FormData();
    body.append("file", logoUrl);
    body.append("user_email", values?.email);
    // console.log(body)
    let res = await fetch(`/api/imageUpload`, {
      method: "POST",
      body,
    });
    let response = await res.json();
    setImgUrl(response);
  };

  async function onSubmit(values) {
    const data = {
      createdBy: session?.createdBy,
      name: values.firstName + " " + values.lastName,
      email: values.email,
      logo: imgUrl,
      department: values.department,
      phone: values.phone,
      addressLine1: values.addressLine1,
      addressLine2: values.addressLine2,
      country: values.country,
      state: values.state,
      city: values.city,
      pinCode: values.pinCode,
      userRole: values.userRole,
      formPermission: values.formPermission,
      deleteAccess: deleteForms,
      updateAccess: updateForms,
      viewAccess: viewForms,
      addCreateAccess: addForms,
      password: values.password,
    };
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    console.log(res);
    if (res.status) {
      toast.success(res.message, {
        position: "top-center",
      });
      router.push("/Users");
    } else {
      toast.error(res.message, {
        position: "top-center",
      });
    }
  }

  return (
    <div className="max-w-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <form onSubmit={userFormik.handleSubmit} encType="multipart/form-data">
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="first_name"
              className=" mb-2 text-sm font-medium text-gray-900 dark:text-white flex gap-3"
            >
              First name{" "}
              {userFormik.errors.firstName && userFormik.touched.firstName ? (
                <p className="text-red-400">{userFormik.errors.firstName}</p>
              ) : (
                ""
              )}
            </label>
            <input
              type="text"
              id="first_name"
              name="firstName"
              // value={values.firstName}
              {...userFormik.getFieldProps("firstName")}
              placeholder="First Name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeHolder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="last_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Last name
            </label>
            <input
              type="text"
              id="last_name"
              name="lastName"
              // value={values.lastName}
              {...userFormik.getFieldProps("lastName")}
              placeholder="Last Name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeHolder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="default_size"
            >
              User Pic
            </label>
            <input
              id="default_size"
              type="file"
              name="logoUrl"
              onChange={imageHandler}
              accept="image/*"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeHolder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white flex gap-3"
            >
              Phone number
              {userFormik.errors.phone && userFormik.touched.phone ? (
                <p className="text-red-400">{userFormik.errors.phone}</p>
              ) : (
                ""
              )}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              // value={values.phone}
              {...userFormik.getFieldProps("phone")}
              placeholder="Phone number"
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              maxLength={10}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="department"
              className=" mb-2 text-sm font-medium text-gray-900 dark:text-white flex gap-3"
            >
              Department{" "}
              {userFormik.errors.department && userFormik.touched.department ? (
                <p className="text-red-400">{userFormik.errors.department}</p>
              ) : (
                ""
              )}
            </label>
            <input
              type="department"
              id="department"
              name="department"
              // value={values.department}
              {...userFormik.getFieldProps("department")}
              placeholder="Department"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeHolder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white flex gap-3"
          >
            Email address{" "}
            {userFormik.errors.email && userFormik.touched.email ? (
              <p className="text-red-400">{userFormik.errors.email}</p>
            ) : (
              ""
            )}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            // value={values.email}
            {...userFormik.getFieldProps("email")}
            placeholder="Email Address"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeHolder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {/* <ErrorMessage name="email" /> */}
        </div>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="addressLine1"
              className=" mb-2 text-sm font-medium text-gray-900 dark:text-white flex gap-3"
            >
              Address Line 1{" "}
              {userFormik.errors.addressLine1 &&
              userFormik.touched.addressLine1 ? (
                <p className="text-red-400">{userFormik.errors.addressLine1}</p>
              ) : (
                ""
              )}
            </label>
            <input
              type="addressLine1"
              id="addressLine1"
              name="addressLine1"
              // value={values.addressLine1}
              {...userFormik.getFieldProps("addressLine1")}
              placeholder="Address Line 1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeHolder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="addressLine2"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Address Line 2
            </label>
            <input
              type="addressLine2"
              id="addressLine2"
              name="addressLine2"
              // value={values.addressLine2}
              {...userFormik.getFieldProps("addressLine2")}
              placeholder="Address Line 2"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeHolder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>
        <div className="grid gap-6 mb-6 md:grid-cols-4">
          <div>
            <label
              htmlFor="country"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Country
            </label>
            <Select
              id="country"
              name="country"
              label="country"
              options={updatedCountries}
              value={values.country}
              // {...userFormik.getFieldProps("country")}
              onChange={(value) => setFieldValue("country", value)}
            />
          </div>
          <div>
            <label
              htmlFor="state"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              State
            </label>
            <Select
              id="state"
              name="state"
              options={updatedStates(
                values.country ? values.country.value : null
              )}
              value={values.state}
              // {...userFormik.getFieldProps("state")}
              onChange={(value) => setFieldValue("state", value)}
            />
          </div>
          <div>
            <label
              htmlFor="city"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              City
            </label>
            <Select
              id="city"
              name="city"
              options={updatedCities(values.state ? values.state.value : null)}
              value={values.city}
              // {...userFormik.getFieldProps("city")}
              onChange={(value) => setFieldValue("city", value)}
            />
          </div>
          <div>
            <label
              htmlFor="pinCode"
              className=" mb-2 text-sm font-medium text-gray-900 dark:text-white flex gap-3"
            >
              Pin Code{" "}
              {userFormik.errors.pinCode && userFormik.touched.pinCode ? (
                <p className="text-red-400">{userFormik.errors.pinCode}</p>
              ) : (
                ""
              )}
            </label>
            <input
              type="pinCode"
              id="pinCode"
              name="pinCode"
              // value={values.pinCode}
              {...userFormik.getFieldProps("pinCode")}
              placeholder="Pin Code"
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              maxLength={6}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeHolder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="userRole"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              User Role
            </label>
            <Select
              id="userRole"
              name="userRole"
              value={values.userRole}
              // {...userFormik.getFieldProps("userRole")}
              options={userRoleOption}
              onChange={(value) => setFieldValue("userRole", value)}
            />
          </div>
          <div>
            <label
              htmlFor="formPermission"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Form Permission
            </label>
            <Select
              id="formPermission"
              name="formPermission"
              value={values.formPermission}
              closeMenuOnSelect={false}
              components={multiSelectField}
              // defaultValue={[menuItems[4], menuItems[5]]}
              isMulti
              options={menuItems}
              // {...userFormik.getFieldProps("formPermission")}
              onChange={(value) => setFieldValue("formPermission", value)}
            />
          </div>
        </div>
        {values.formPermission !== null ? (
          <>
            <div className="grid gap-6 mb-6 md:grid-cols-4">
              <div>
                <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
                  Delete
                </h3>
                <ul className="w-48 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  {values.formPermission?.map((item) => {
                    return (
                      <>
                        <li
                          className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600"
                          key={item?.value}
                        >
                          <div className="flex items-center pl-3">
                            <input
                              // id={item}
                              type="checkbox"
                              name="delete"
                              value={item?.value}
                              onChange={handleChange}
                              className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                              htmlFor={item?.label}
                              className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              {item?.label}
                            </label>
                          </div>
                        </li>
                      </>
                    );
                  })}
                </ul>
              </div>
              <div>
                <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
                  View
                </h3>
                <ul className="w-48 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  {values.formPermission?.map((item) => {
                    return (
                      <>
                        <li
                          className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600"
                          key={item?.value}
                        >
                          <div className="flex items-center pl-3">
                            <input
                              // id={item}
                              type="checkbox"
                              name="veiw"
                              value={item?.value}
                              onChange={handleChange}
                              className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                              htmlFor={item?.label}
                              className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              {item?.label}
                            </label>
                          </div>
                        </li>
                      </>
                    );
                  })}
                </ul>
              </div>
              <div>
                <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
                  Update
                </h3>
                <ul className="w-48 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  {values.formPermission?.map((item) => {
                    return (
                      <>
                        <li
                          className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600"
                          key={item?.value}
                        >
                          <div className="flex items-center pl-3">
                            <input
                              // id={item}
                              type="checkbox"
                              name="update"
                              value={item?.value}
                              onChange={handleChange}
                              className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                              htmlFor={item?.label}
                              className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              {item?.label}
                            </label>
                          </div>
                        </li>
                      </>
                    );
                  })}
                </ul>
              </div>
              <div>
                <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
                  Add/Create
                </h3>
                <ul className="w-48 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  {values.formPermission?.map((item) => {
                    return (
                      <>
                        <li
                          className="w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600"
                          key={item?.value}
                        >
                          <div className="flex items-center pl-3">
                            <input
                              // id={item}
                              type="checkbox"
                              name="add"
                              value={item?.value}
                              onChange={handleChange}
                              className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                              htmlFor={item?.label}
                              className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              {item?.label}
                            </label>
                          </div>
                        </li>
                      </>
                    );
                  })}
                </ul>
              </div>
            </div>
          </>
        ) : (
          ""
        )}

        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div className="">
            <label
              htmlFor="password"
              className=" mb-2 text-sm font-medium text-gray-900 dark:text-white flex gap-3"
            >
              Password{" "}
              {userFormik.errors.password && userFormik.touched.password ? (
                <p className="text-red-400">{userFormik.errors.password}</p>
              ) : (
                ""
              )}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              // value={values.password}
              onKeyUp={imageUploadhandler}
              {...userFormik.getFieldProps("password")}
              placeholder="•••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeHolder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
