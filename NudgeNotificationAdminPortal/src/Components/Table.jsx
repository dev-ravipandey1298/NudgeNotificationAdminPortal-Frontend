import React from "react";

const Table = () => {
    const data = [
        { name: "Anom", age: 19, gender: "Male" },
        { name: "Megha", age: 19, gender: "Female" },
        { name: "Subham", age: 25, gender: "Male" },
    ];

    return (
        <div>
            <table className="shadow-lg bg-white">
                <tr>
                    <th className="bg-blue-100 border text-left px-8 py-4">
                        Name
                    </th>
                    <th className="bg-blue-100 border text-left px-8 py-4">
                        Template ID
                    </th>
                    <th className="bg-blue-100 border text-left px-8 py-4">
                        View
                    </th>
                </tr>
                {data.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td className="border px-8 py-4">{val.name}</td>
                            <td className="border px-8 py-4">{val.age}</td>
                            <td className="border px-8 py-4 hover:cursor-pointer text-blue-500 hover:underline">View</td>
                        </tr>
                    );
                })}
            </table>
        </div>
    );
};

export default Table;
