"use client";
import Image from "next/image";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const MyProfile = (params) => {
  const { session } = params;
  const { data, error, isLoading } = useSWR(
    `/api/users/${session?.sub}`,
    fetcher
  );

  const logo = data?.logo?.split("./public")[1];
  // const logo = false;

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return (
    <>
      <div className=" ">
        <div className="p-8 bg-white shadow mt-24">
          <div className="grid grid-cols-1">
            <div className="flex flex-row w-auto">
              <div className="w-48 h-48 mx-auto rounded-full shadow-2xl  inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                {logo ? (
                  <Image
                    src={logo}
                    width={250}
                    height={250}
                    alt={"logo"}
                    className="object-cover object-center rounded outline-gray-500"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-24 w-24"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clip-rule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </div>
          </div>

          <div className="mt-16 text-center border-b pb-10">
            <h1 className="text-4xl font-medium text-gray-700">{data?.name}</h1>
            <p className="font-light text-gray-600 mt-3">{data?.email}</p>

            <p className="mt-2 text-gray-500">
              {data?.userRole?.map((item) => item?.value)}
            </p>
            <p className="mt-2 text-gray-500">{data?.phone}</p>
            <p className="mt-2 text-gray-500">
              {data?.addressLine1} {data?.addressLine2} <br />{" "}
              {data?.country?.map((item) => item?.label)}{" "}
              {data?.state?.map((item) => item?.label)}{" "}
              {data?.city?.map((item) => item?.label)} {data?.pinCode}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
