import User from "../interfaces/User.interface";

export interface UserFormProps {
  user: User
  handleSubmit: Function
}

export default function UserForm({
  user,
  handleSubmit
}: React.PropsWithChildren<UserFormProps>) {
  return (
    <form action="" onSubmit={(e) => handleSubmit(e)}>
      <div className="mt-4">
        <label htmlFor="name" className="block mb-2">Name</label>
        <input type="text" name="name" id="name" required defaultValue={user.name} className="shadow border rounded py-2 px-3 text-gray w-full" />
      </div>
      
      <div className="mt-4">
        <label htmlFor="surname" className="block mb-2">Surname</label>
        <input type="text" name="surname" id="surname" required defaultValue={user.surname} className="shadow border rounded py-2 px-3 text-gray w-full" />
      </div>
      
      <div className="mt-4">
        <label htmlFor="email" className="block mb-2">Email</label>
        <input type="email" name="email" id="email" required defaultValue={user.email} className="shadow border rounded py-2 px-3 text-gray w-full" />
      </div>
      
      <div className="mt-4">
        <label htmlFor="password" className="block mb-2">Password</label>
        <input type="password" name="password" id="password" defaultValue={user.password} className="shadow border rounded py-2 px-3 text-gray w-full" />
      </div>
      
      <input type="hidden" name="id" value={user.id}/>

      <button type="submit" className="block rounded bg-green-400 hover:bg-green-500 mt-4 p-2 transition ease-in-out delay-50">Submit</button>
    </form>
  )
}
