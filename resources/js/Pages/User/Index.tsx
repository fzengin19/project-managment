import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { USER_STATUS_CLASS_MAP, USER_STATUS_TEXT_MAP } from "@/constans";

import { Head, Link, router } from "@inertiajs/react";

export default function Index({
  auth,
  users,
  queryParams = null,
  success,
}: any) {
  queryParams = queryParams || {};
  const searchFieldChanged = (name: any, value: any) => {
    if (value) {
      queryParams[name] = value;
    } else {
      queryParams[name] = null;
    }
    router.get(route("user.index"), queryParams);
  };

  const onKeyPress = (name: any, e: any) => {
    if (e.key !== "Enter") return;
    searchFieldChanged(name, e.target.value);
  };
  const sortChanged = (name: string) => {
    if (queryParams.sort_field == name) {
      if (queryParams.sort_direction == "asc") {
        queryParams.sort_direction = "desc";
      } else {
        queryParams.sort_direction = "asc";
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }
    router.get(route("user.index"), queryParams);
  };

  const deleteUser = (user: any) => {
    if (!window.confirm("Are you sure you want delete to tje user?")) {
      return;
    }
    router.delete(route("user.destroy", user.id));
  };
  console.log("Success message:", success);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Users
          </h2>
          <Link
            className="px-3 py-1 text-white transition-all bg-indigo-600 rounded shadow hover:bg-indigo-700"
            href={route("user.create")}
          >
            Create new User
          </Link>
        </div>
      }
    >
      <Head title="Users" />
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          {success && (
            <div className="px-4 py-2 mb-4 text-white rounded bg-emerald-500">
              {success}
            </div>
          )}
          <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="overflow-auto">
              <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
  <thead className="text-xs text-gray-700 uppercase border-b-2 border-gray-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    <tr className="text-nowrap">
      <TableHeading
        name="id"
        sort_field={queryParams.sort_field}
        sort_direction={queryParams.sort_direction}
        sortChanged={sortChanged}
      >
        ID
      </TableHeading>
      <TableHeading
        name="name"
        sort_field={queryParams.sort_field}
        sort_direction={queryParams.sort_direction}
        sortChanged={sortChanged}
      >
        Name
      </TableHeading>
      <TableHeading
        name="email"
        sort_field={queryParams.sort_field}
        sort_direction={queryParams.sort_direction}
        sortChanged={sortChanged}
      >
        Email
      </TableHeading>
      <th className="px-3 py-3">Actions</th>
    </tr>
  </thead>
  <thead className="text-xs text-gray-700 uppercase border-b-2 border-gray-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    <tr className="text-nowrap">
      <th className="px-2 py-2"></th>
      <th className="px-2 py-2">
        <TextInput
          defaultValue={queryParams.name}
          className="w-full"
          placeholder="User Name"
          onBlur={(e) =>
            searchFieldChanged("name", e.target.value)
          }
          onKeyPress={(e) => onKeyPress("name", e)}
        />
      </th>
      <th className="px-2 py-2">
        <TextInput
          defaultValue={queryParams.email}
          className="w-full"
          placeholder="User Email"
          onBlur={(e) =>
            searchFieldChanged("email", e.target.value)
          }
          onKeyPress={(e) => onKeyPress("email", e)}
        />
      </th>
      <th className="px-2 py-2"></th>
    </tr>
  </thead>
  <tbody>
    {users.data.map((user: any) => (
      <tr
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        key={user.id}
      >
        <td className="px-2 py-2">{user.id}</td>
        <td className="px-2 py-2 text-gray-200 text-nowrap">
          {user.name}
        </td>
        <td className="items-center justify-center px-2 py-2">
          {user.email}
        </td>
        <td className="px-2 py-2">
          <Link
            href={route("user.edit", user.id)}
            className="mx-1 font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Edit
          </Link>
          <button
            onClick={(e) => deleteUser(user)}
            className="mx-1 font-medium text-red-600 dark:text-red-500 hover:underline"
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

              </div>
              <Pagination links={users.meta.links} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
