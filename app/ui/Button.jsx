'use client';
const Button = ({ label, color }) => {
    return (
        <button
            style={{ color: color }}
            type="submit"
            className={`bg-${color}-600 text-gray-400 border-2 py-2 px-4 rounded-md hover:bg-${color}-600 focus:outline-none focus:ring focus:border-${color}-300`}
        >
            {label}
        </button>
    )
}

export default Button
