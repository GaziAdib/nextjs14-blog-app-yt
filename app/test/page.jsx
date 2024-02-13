"use client";

import { useState } from "react";


const Test = () => {

    const [date, setDate] = useState("");

    const onChangeHandler = (e) => {
        const input = e.target.value;

        // 1st string (0-0) 
        // 2nd string (0-2)

        // if (input.length === 2 && Number(input) >= 1 && Number(input) <= 12) {
        //     console.log(input);

        // }



        if (date == 0 && Number(input) >= 0 && Number(input) <= 9) {
            setDate(input)

        }

        if (date.length == 1 && Number(input) >= 0 && Number(input) <= 2) {
            setDate(prev => prev + '' + input)

        }


    }



    return (
        <div>
            <form>
                <input onChange={onChangeHandler} value={date} className="m-5 py-2 text-stone-800" placeholder="MM/DD/YYYY" />
            </form>
        </div>
    )
}

export default Test