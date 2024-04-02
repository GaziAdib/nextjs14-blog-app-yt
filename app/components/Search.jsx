"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Search = () => {

    const searchParams = useSearchParams();

    const pathName = usePathname(); // path of current url

    const { replace } = useRouter();

    const handleSearch = (query) => {
    
        const params = new URLSearchParams(searchParams);

        if (query) {
            params.set('query', query);
        } else {
            params.delete('query');
        }

        replace(`${pathName}?${params.toString()}`) //http://localhost:3000/blogs?query=science

    }


    return (
        <div className="flex flex-1 w-[500] flex-shrink-0">
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <input
                className="peer block w-full mx-4 mt-2 px-3 py-2 rounded-md border text-gray-200 bg-gray-800 border-gray-200 pl-10 text-sm outline-2 placeholder:text-gray-400"
                placeholder="Search by Category"
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}

            />

        </div>
    )
}

export default Search