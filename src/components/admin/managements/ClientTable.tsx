

import { Button } from "@/components/pages/ui/button";
import { TableHead ,TableHeader , Table , TableRow , TableBody , TableCell ,  } from "@/components/pages/ui/table";


interface IClient {
  _id: string
  clientId: string
  name: string
  email: string
  role: string
  phone: string
  status: string
  createdAt: string
  updatedAt: string
}


interface ClientTableProps {
  clients: IClient[];
  updatingUserId: string | null;
  onBlockToggle: (client: IClient) => void;
}

const ClientTable: React.FC<ClientTableProps> = ({ clients, updatingUserId, onBlockToggle }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients.map((client) => (
          <TableRow key={client._id}>
            <TableCell>{client.name}</TableCell>
            <TableCell>{client.email}</TableCell>
            <TableCell>{client.phone}</TableCell>
            <TableCell className="text-center">
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  client.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {client.status}
              </span>
            </TableCell>
            <TableCell className="text-center">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onBlockToggle(client)}
                disabled={updatingUserId === client._id}
              >
                {updatingUserId === client._id
                  ? "Updating..."
                  : client.status === "active"
                  ? "Block"
                  : "Unblock"}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ClientTable;
