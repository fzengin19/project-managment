import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import { router, Link } from "@inertiajs/react";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constans";

export default function TasksTable({ tasks, queryParams }: any) {
  queryParams = queryParams || {};
  const searchFieldChanged = (name: any, value: any) => {
    if (value) {
      queryParams[name] = value;
    } else {
      queryParams[name] = null;
    }
    router.get(window.location.href, queryParams, {
      preserveState: true,
    });
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
    router.get(window.location.href, queryParams, {
      preserveState: true,
    });
  };

  return (
    <>
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
              <th className="px-3 py-3">Image</th>

              <TableHeading
                name="name"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                Name
              </TableHeading>

              <TableHeading
                name="status"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                Status
              </TableHeading>

              <TableHeading
                name="created_at"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                Create Date
              </TableHeading>

              <TableHeading
                name="due_date"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                Due Date
              </TableHeading>
              <th className="px-3 py-3">Created By</th>
              <th className="px-3 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <thead className="text-xs text-gray-700 uppercase border-b-2 border-gray-500 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="text-nowrap">
              <th className="px-2 py-2"></th>
              <th className="px-2 py-2"></th>

              <th className="px-2 py-2">
                <TextInput
                  defaultValue={queryParams.name}
                  className="w-full"
                  placeholder="Task Name"
                  onBlur={(e) => searchFieldChanged("name", e.target.value)}
                  onKeyPress={(e) => onKeyPress("name", e)}
                />
              </th>
              <th className="px-2 py-2">
                <SelectInput
                  defaultValue={queryParams.status}
                  className="w-full"
                  onChange={(e) => searchFieldChanged("status", e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </SelectInput>
              </th>
              <th className="px-2 py-2"></th>
              <th className="px-2 py-2"></th>
              <th className="px-2 py-2"></th>
              <th className="px-2 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {tasks.data.map((task: any) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={task.id}
              >
                <td className="px-2 py-2 ">{task.id}</td>
                <td className="px-2 py-2 ">
                  <img className="w-24" src={task.image_path} alt="" />
                </td>

                <td className="px-2 py-2 ">{task.name}</td>
                <td className="items-center justify-center px-2 py-2 mx-auto">
                  <span
                    className={
                      "px-2 py-1 rounded text-white " +
                      TASK_STATUS_CLASS_MAP[task.status]
                    }
                  >
                    {TASK_STATUS_TEXT_MAP[task.status]}
                  </span>
                </td>
                <td className="px-2 py-2 text-nowrap">{task.created_at}</td>
                <td className="px-2 py-2 text-nowrap">{task.due_date}</td>
                <td className="px-2 py-2 ">{task.createdBy.name}</td>
                <td className="px-2 py-2 ">
                  <Link
                    href={route("task.edit", task.id)}
                    className="mx-1 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>
                  <Link
                    href={route("task.destroy", task.id)}
                    className="mx-1 font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination links={tasks.meta.links} />
    </>
  );
}
