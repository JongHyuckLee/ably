import React, { useMemo } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";

interface UserCardType {
  email: string;
  lastConnectedAt: number;
  name: string;
  profileImage: string;
}

const UserCard = ({
  email,
  lastConnectedAt,
  name,
  profileImage,
}: UserCardType) => {
  const date = useMemo(
    () => new Date(lastConnectedAt).toLocaleDateString(),
    [lastConnectedAt]
  );
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader title={name} subheader={email} />
      <CardMedia component="img" height="194" image={profileImage} alt={name} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {date}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default UserCard;
