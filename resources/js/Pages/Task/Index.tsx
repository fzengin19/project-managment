import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constans";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";
import { Head, Link, router } from "@inertiajs/react";
import TasksTable from "./TasksTable";

export default function Index({ auth, tasks, queryParams = null, hideProjectColumn = false }: any) {
  queryParams = queryParams || {};


  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Tasks
        </h2>
      }
    >
      <Head title="Tasks" />
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
          <TasksTable tasks={tasks} queryParams={queryParams} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
