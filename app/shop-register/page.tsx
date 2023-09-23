"use client";

type Props = { searchParams?: { [key: string]: string | string[] } };

const Page = (props: Props) => {
    console.log(props.searchParams);
    return;
};

export default Page;
