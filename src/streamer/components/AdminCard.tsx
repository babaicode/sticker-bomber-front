import "../styles/AdminListComponent.css";

export interface AdminCardProps {
  userName: string;
  avatarUrl?: string;
}

export const AdminCard: React.FC<AdminCardProps> = ({ userName, avatarUrl }) => {
  return (
    <div
      className="admin-card"
      style={{
        backgroundImage: avatarUrl ? `url(${avatarUrl})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "150px",
        width: "150px",
        borderRadius: "8px",
        margin: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textShadow: "0 0 5px rgba(0, 0, 0, 0.8)",
        backgroundColor: avatarUrl ? "transparent" : "#ccc",
      }}
    >
      {userName}
    </div>
  );
};
