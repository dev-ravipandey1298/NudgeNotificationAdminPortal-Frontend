import React from "react";

const CommentSection = () => {
    return (
        <div className="w-[50%] px-4 py-2 outline-none border-4 border-blue-600 rounded-lg w-full p-2 text-lg">
            <lable className="font-semibold p-1 text-xl">Comment : </lable>
            <textarea
                className="mt-1 h-[5.8rem] outline-none border-2 border-blue-400 rounded-lg w-full p-2 text-lg"
                id="comments-input"
                type="text"
                placeholder="Add a comment..."
            />
            <div className="flex justify-end">
            <button
                className="mt-2 w-[5.7rem] h-[2.5rem] p-2 px-4 bg-sky-500 hover:bg-sky-700 rounded text-white font-semibold flex items-center"
                type="submit"
            >
                Submit
            </button>
                </div>
        </div>
    );
};

export default CommentSection;
