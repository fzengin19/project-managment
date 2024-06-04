import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect } from "react";

export default function Edit({ auth, user }: any) {
  const { data, setData, post, errors } = useForm({
    image: "",
    name: user.name || "",
    status: user.status || "",
    description: user.description || "",
    due_date: user.due_date || "",
    _method: "PUT",
  });

  useEffect(() => {
    const formattedDueDate = new Date(user.due_date)
      .toISOString()
      .split("T")[0];
    setData("due_date", formattedDueDate);
  }, [user.due_date]);
  const onSubmit = (e: any) => {
    e.preventDefault();
    post(route("user.update", user.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Edit User ({user.name})
        </h2>
      }
    >
      <Head title="Create a new user" />
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
            <form
              onSubmit={onSubmit}
              className="p-4 bg-white shadow sm:p-8 dark:bg-gray-800 sm:rounded-lg"
            >
              {user.image_path && (
                <img src={user.image_path} className="w-64" />
              )}
              <div className="mt-4">
                <InputLabel
                  htmlFor="user_image_path"
                  value="User Image"
                />
                <TextInput
                  id="user_image_path"
                  type="file"
                  name="image"
                  className="block w-full p-2 mt-1"
                  onChange={(e) => setData("image", e.target.files[0])}
                />
                <InputError message={errors.image} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="name" value="User Name" />
                <TextInput
                  id="name"
                  type="text"
                  name="name"
                  value={data.name}
                  isFocused={true}
                  className="block w-full mt-1"
                  onChange={(e) => setData("name", e.target.value)}
                />
                <InputError message={errors.name} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="description" value="Description" />
                <TextAreaInput
                  id="description"
                  name="description"
                  value={data.description}
                  className="block w-full mt-1"
                  onChange={(e) => setData("description", e.target.value)}
                />
                <InputError message={errors.description} className="mt-2" />
              </div>

              <div className="mt-4">
                <InputLabel htmlFor="due_date" value="Due Date" />
                <TextInput
                  id="due_date"
                  type="date"
                  name="due_date"
                  value={data.due_date}
                  className="block w-full mt-1"
                  onChange={(e) => setData("due_date", e.target.value)}
                />
                <InputError message={errors.due_date} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="status" value="User Status" />
                <SelectInput
                  id="status"
                  name="status"
                  value={data.status}
                  className="block w-full mt-1"
                  onChange={(e) => setData("status", e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </SelectInput>
                <InputError message={errors.status} className="mt-2" />
              </div>
              <div className="flex justify-end gap-1 mt-4 text-center">
                <Link
                  href={route("user.index")}
                  className="w-24 h-full px-3 py-1 text-gray-800 transition-all bg-gray-100 rounded shadow hover:bg-gray-200"
                >
                  Cancel
                </Link>
                <button className="w-24 h-full px-3 py-1 text-white transition-all rounded shadow bg-emerald-500 hover:bg-emerald-600">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
