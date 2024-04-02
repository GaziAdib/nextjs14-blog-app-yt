"use client";

import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const Pagination = ({ currentPage, totalPages }) => {
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    const pathName = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const [page, setPage] = useState(currentPage);

    const params = new URLSearchParams(searchParams);

    if(page) {
        params.set('page', page);
    }
    // } else {
    //     params.delete('page');
    // }

    const handleNextPage = () => {
        if (!isLastPage) {
            const nextPage = Number(page) + 1;
            setPage(nextPage);
            replace(`${pathName}?page=${nextPage?.toString()}`);
        
        }
    };

    const handlePrevPage = () => {
        if (!isFirstPage) {
            const prevPage = Number(page) - 1;
            if(prevPage > 0){
                setPage(prevPage);
                replace(`${pathName}?page=${prevPage?.toString()}`);
            } 
        }
    };

    return (
        <div className="flex justify-center my-4">
            <button
                className={`${
                    isFirstPage ? 'opacity-50 cursor-default' : 'cursor-pointer'
                } bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l`}
                onClick={handlePrevPage}
                disabled={isFirstPage}
            >
                Previous
            </button>
            <button
                className={`${
                    isLastPage ? 'pointer-events-none opacity-50 cursor-default' : 'cursor-pointer'
                } bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r`}
                onClick={handleNextPage}
                disabled={isLastPage}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
