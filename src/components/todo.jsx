import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

function Todo() {
    const [items, setItems] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [updatedValue, setUpdatedValue] = useState("");

    const validation = Yup.object({
        items: Yup.string().required("Item is required"),
    });

    function removeItem(index) {
        const newItems = items.filter((_, ind) => ind !== index);
        setItems(newItems);
        if (index === editIndex) {
            setEditIndex(null); // Exit edit mode if the edited item is removed
            setUpdatedValue("");
        }
    }

    function saveEdit() {
        if (editIndex !== null && updatedValue.trim() !== "") {
            const updatedItems = [...items];
            updatedItems[editIndex] = updatedValue;
            setItems(updatedItems);
            setEditIndex(null); // Exit edit mode
            setUpdatedValue(""); // Clear the edit input
        }
    }

    return (
        <>
            <Formik
                initialValues={{ items: "" }}
                validationSchema={validation}
                onSubmit={(data, { resetForm }) => {
                    setItems([...items, data.items]);
                    resetForm();
                }}
            >
                <Form>
                    <Field name="items" type="text" placeholder="Add Items" />
                    <ErrorMessage name="items" />
                    <button type="submit">Submit</button>
                </Form>
            </Formik>

            {items.map((data, index) => (
                <div
                    key={index}
                    style={{ display: "flex", gap: "10px", margin: "10px" }}
                >
                    {editIndex === index ? (
                        <input
                            type="text"
                            value={updatedValue}
                            onChange={(e) => setUpdatedValue(e.target.value)}
                        />
                    ) : (
                        <span>{data}</span>
                    )}
                    <button onClick={() => removeItem(index)}>Remove</button>
                    {editIndex === index ? (
                        <>
                            <button onClick={saveEdit}>Save</button>
                            <button
                                onClick={() => {
                                    setEditIndex(null);
                                    setUpdatedValue("");
                                }}
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => {
                                setEditIndex(index);
                                setUpdatedValue(data);
                            }}
                        >
                            Edit
                        </button>
                    )}
                </div>
            ))}
        </>
    );
}

export default Todo;
