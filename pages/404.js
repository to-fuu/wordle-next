import Head from "next/head";

export default function Page404() {
    return <>
        <Head>
            <title>404: This page could not be found</title>
            <meta name="description" content="404: This page could not be found" />
        </Head>
        <main
            className="bg-gray-50  h-screen w-screen
   grid place-items-center"
        >
            <div className="flex items-center"><span className="text-2xl  border-r border-[rgba(0,0,0,0.3)] p-[10px_23px_10px_0] mr-5">404</span><span className="text-sm">This page could not be found.</span> </div>
        </main>
    </>
}