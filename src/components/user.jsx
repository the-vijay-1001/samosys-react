import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { insert } from "../storage/user";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

function User() {
    const data = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [selectedFile, setSelectedFile] = useState(null); // State to store the selected file
    const [filePreview, setFilePreview] = useState("");
    const validation = Yup.object({
        name: Yup.string().required("Name is required"),
        gendar: Yup.string().required("Gendar is required"),
        file: Yup.mixed().required('File is required'),
        email: Yup.string().email().required("Email is required"),
    });
    return <>
        <div className="my-5">
            <Formik
                initialValues={{ name: "", email: "", gendar: "", file: null }}
                validationSchema={validation}
                onSubmit={(data, { resetForm }) => {
                    data.file = filePreview
                    dispatch(insert(data))
                    resetForm();
                    setSelectedFile(null);
                    setFilePreview("");
                }}
            >
                {({ setFieldValue }) => (
                    <Form className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4">
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <Field
                                name="name"
                                type="text"
                                placeholder="Enter your name"
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300"
                            />
                            <ErrorMessage
                                name="name"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                            />
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <Field
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300"
                            />
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                            />
                        </div>

                        {/* Gender Field */}
                        <div>
                            <label htmlFor="gendar" className="block text-sm font-medium text-gray-700">
                                Gender
                            </label>
                            <Field
                                name="gendar"
                                as="select"
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300"
                            >
                                <option value="" label="Select gender" />
                                <option value="male" label="Male" />
                                <option value="female" label="Female" />
                                <option value="other" label="Other" />
                            </Field>
                            <ErrorMessage
                                name="gendar"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                            />
                        </div>

                        {/* File Upload Field */}
                        <div>
                            <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                                Upload File
                            </label>
                            <input
                                id="file"
                                name="file"
                                type="file"
                                onChange={(event) => {
                                    const file = event.target.files[0];

                                    // Update Formik's value
                                    setFieldValue("file", file);

                                    // Set local state for preview
                                    setSelectedFile(file);
                                    if (file && file.type.startsWith("image/")) {
                                        const reader = new FileReader();
                                        reader.onload = (e) => {
                                            setFilePreview(e.target.result); // Display image preview
                                        };
                                        reader.readAsDataURL(file);
                                    } else {
                                        setFilePreview("");
                                    }
                                }}
                                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300"
                            />
                            <ErrorMessage
                                name="file"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                            />
                        </div>


                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                            >
                                Submit
                            </button>
                        </div>

                        {filePreview && (
                            <div className="mt-4 p-4 border border-gray-300 rounded-lg">
                                <div className="mt-2">
                                    <h3 className="text-lg font-medium text-gray-700">Selected File</h3>
                                    <img
                                        src={filePreview}
                                        alt="Selected file preview"
                                        className="w-32 h-32 object-cover rounded-md shadow-md"
                                    />
                                </div>
                            </div>
                        )}
                    </Form>
                )}
            </Formik>
        </div>

        <table className="min-w-full border-collapse border border-gray-300 shadow-md rounded-lg">
            <thead>
                <tr className="bg-blue-500 text-white text-left">
                    <th className="px-4 py-2 border border-gray-300">S.No.</th>
                    <th className="px-4 py-2 border border-gray-300">Name</th>
                    <th className="px-4 py-2 border border-gray-300">Email</th>
                    <th className="px-4 py-2 border border-gray-300">Gender</th>
                    <th className="px-4 py-2 border border-gray-300">File</th>
                    <th className="px-4 py-2 border border-gray-300">Action</th>
                </tr>
            </thead>
            <tbody>
                {data.user?.map((data, index) => (
                    <tr
                        key={index}
                        className={`text-gray-800 hover:bg-gray-100 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                            }`}
                    >
                        <td className="px-4 py-2 border border-gray-300">{index + 1}</td>
                        <td className="px-4 py-2 border border-gray-300">{data?.name}</td>
                        <td className="px-4 py-2 border border-gray-300">{data?.email}</td>
                        <td className="px-4 py-2 border border-gray-300">{data?.gendar}</td>
                        <td className="px-4 py-2 border border-gray-300">
                            <img className="rounded-full h-14 w-14" src={data?.file} alt="" />
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                            <div className="flex gap-3">
                                <button className="border p-1 rounded-lg border-blue-500 hover:bg-blue-500">update</button>
                                <button className="border p-1 rounded-lg border-red-700 hover:bg-red-500">delete</button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </>
}

export default User;