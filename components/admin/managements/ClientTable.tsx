// "use client"

// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../pages/ui/table"
// import { Button } from "../../pages/ui/button"

// export type User = {
//   id: string
//   name: string
//   email: string
//   status: "active" | "blocked"
// }

// interface UserTableProps {
//   users: User[]
//   onBlock: (id: string) => void
//   onUnblock: (id: string) => void
// }

// export function UserTable({ users, onBlock, onUnblock }: UserTableProps) {
//   return (
//     <div className="border rounded-lg w-full">
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead className="w-[100px]">ID</TableHead>
//             <TableHead>Name</TableHead>
//             <TableHead>Email</TableHead>
//             <TableHead>Status</TableHead>
//             <TableHead className="text-right">Actions</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {users.length === 0 ? (
//             <TableRow>
//               <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
//                 No users found.
//               </TableCell>
//             </TableRow>
//           ) : (
//             users.map((user) => (
//               <TableRow key={user.id}>
//                 <TableCell className="font-medium">{user.id}</TableCell>
//                 <TableCell>{user.name}</TableCell>
//                 <TableCell>{user.email}</TableCell>
//                 <TableCell>
//                   <span
//                     className={`px-2 py-1 rounded-full text-xs font-semibold ${
//                       user.status === "active"
//                         ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
//                         : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
//                     }`}
//                   >
//                     {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
//                   </span>
//                 </TableCell>
//                 <TableCell className="text-right">
//                   {user.status === "active" ? (
//                     <Button variant="destructive" size="sm" onClick={() => onBlock(user.id)}>
//                       Block
//                     </Button>
//                   ) : (
//                     <Button variant="outline" size="sm" onClick={() => onUnblock(user.id)}>
//                       Unblock
//                     </Button>
//                   )}
//                 </TableCell>
//               </TableRow>
//             ))
//           )}
//         </TableBody>
//       </Table>
//     </div>
//   )
// }
