import Image from "next/image";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { BiEdit, BiTrashAlt, BiShow, BiRepost } from "react-icons/bi";

const columns = [
  {
    name: "Image",
    selector: (row) =>
      row.logo ? (
        <Image
          width={50}
          height={50}
          src={row?.logo?.split("./public")[1]}
          alt={"user img"}
          className="p-1"
        />
      ) : (
        <Image
          width={50}
          height={50}
          src={"/assed/images/userIcon.png"}
          alt={"user img"}
          className="p-1"
        />
      ),
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row) => row.email,
  },
  {
    name: "Phone",
    selector: (row) => row.phone,
  },
  {
    name: "User Role",
    selector: (row) => row.userRole.map((item) => item?.value),
  },
  {
    name: "Action",
    // selector: row => row.year,
    cell: (row) =>
      row.userRole.map((item, index) =>
        item?.value !== "Super Admin" ? (
          <>
            <div className="flex gap-5 ml-2" key={index}>
              {/* view  */}
              <button className="cursor" onClick={() => onView(row._id)}>
                <BiShow size={25} color={"rgb(0 ,0,254)"}></BiShow>
              </button>
              {/* delete  */}
              <button className="cursor" onClick={() => onDelete(row._id)}>
                <BiTrashAlt size={25} color={"rgb(244,63,94)"}></BiTrashAlt>
              </button>
              {/* update  */}
              <button className="cursor" onClick={() => onUpdate(row._id)}>
                <BiEdit size={25} color={"rgb(255, 204, 0)"} />
              </button>
            </div>
          </>
        ) : (
          ""
        )
      ),
  },
];

const onView = (id) => {
  console.log(id)
  alert('Under Work')
};

const onDelete = (id) => {
  console.log(id)
  alert('Under Work')
};

const onUpdate = (id) => {
  console.log(id)
  alert('Under Work')
};

// main function 
export default function UsersTable({ Users }) {
  
  const [search, setSearch] = useState();
  const [searchFilter, setSearchFilter] = useState();

  useEffect(() => {
    const result = Users.filter((user) => {
      return user.name?.toLowerCase().match(search?.toLowerCase());
    });
    setSearchFilter(result);
  }, [search]);

  return (
    <div className="max-w-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <DataTable
        title="User Lists"
        columns={columns}
        data={searchFilter}
        pagination
        fixedHeader
        subHeaderAlign="right"
        subHeader
        fixedHeaderScrollHeight="600px"
        highlightOnHover
        pointerOnHover
        customStyles={customStyles}
        subHeaderComponent={
          <input
            type="text"
            placeholder="Search hear"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeHolder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        }
      />
    </div>
  );
}

//  Internally, customStyles will deep merges your customStyles with the default styling.
const customStyles = {
  // rows: {
  //   style: {
  //     minHeight: "72px", // override the row height
  //   },
  // },
  headCells: {
    style: {
      // paddingLeft: "8px", // override the cell padding for head cells
      // paddingRight: "8px",
      fontSize: "small",
    },
  },
  // cells: {
  //   style: {
  //     paddingLeft: "8px", // override the cell padding for data cells
  //     paddingRight: "8px",
  //   },
  // },
};
