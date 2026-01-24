"use client";

export const CurrentYear = () => {
    const currentYear = new Date().getFullYear();
    return <>{currentYear}</>
}