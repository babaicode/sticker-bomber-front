import { AdminComponentProps } from "../interfaces/StreamerInterface";

export const AdminComponent: React.FC<AdminComponentProps> = ({ adminName, adminId }) => {
  return (
    <div className="admin-link-container">
      <p>Admin</p>
      <p>{adminName}</p>
      <p>{adminId}</p>
    </div>
  );
};