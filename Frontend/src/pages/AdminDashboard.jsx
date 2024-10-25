// import React, { useState } from "react";
// import {
//   AppBar,
//   Box,
//   CssBaseline,
//   Drawer,
//   IconButton,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Toolbar,
//   Typography,
//   Card,
//   CardContent,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
// } from "@material-tailwind/react";

// import {
//   LayoutDashboard as DashboardIcon,
//   Users as PeopleIcon,
//   ShoppingCart as ShopIcon,
//   MessageSquare as CommentIcon,
//   Menu as MenuIcon,
// } from "lucide-react";

// const AdminDashboard = () => {
//   const [selectedSection, setSelectedSection] = useState("overview");
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [emailDialog, setEmailDialog] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [banReason, setBanReason] = useState("");

//   // Mock data - replace with actual API calls
//   const stats = {
//     totalUsers: 150,
//     totalProducts: 75,
//     pendingProducts: 12,
//     bannedUsers: 5,
//   };

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const handleBanUser = (user) => {
//     setSelectedUser(user);
//     setEmailDialog(true);
//   };

//   const handleSendBanEmail = async () => {
//     // API call to ban user and send email
//     try {
//       // Example API call structure
//       /* await axios.post('/api/users/ban', {
//         userId: selectedUser.id,
//         reason: banReason
//       }); */
//       setEmailDialog(false);
//       setBanReason("");
//       setSelectedUser(null);
//     } catch (error) {
//       console.error("Error banning user:", error);
//     }
//   };

//   const renderOverview = () => (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
//       <Card className="bg-white">
//         <CardContent>
//           <Typography className="text-gray-600" variant="h6">
//             Total Users
//           </Typography>
//           <Typography variant="h4">{stats.totalUsers}</Typography>
//         </CardContent>
//       </Card>
//       <Card className="bg-white">
//         <CardContent>
//           <Typography className="text-gray-600" variant="h6">
//             Total Products
//           </Typography>
//           <Typography variant="h4">{stats.totalProducts}</Typography>
//         </CardContent>
//       </Card>
//       <Card className="bg-white">
//         <CardContent>
//           <Typography className="text-gray-600" variant="h6">
//             Pending Products
//           </Typography>
//           <Typography variant="h4">{stats.pendingProducts}</Typography>
//         </CardContent>
//       </Card>
//       <Card className="bg-white">
//         <CardContent>
//           <Typography className="text-gray-600" variant="h6">
//             Banned Users
//           </Typography>
//           <Typography variant="h4">{stats.bannedUsers}</Typography>
//         </CardContent>
//       </Card>
//     </div>
//   );

//   const renderProducts = () => (
//     <TableContainer component={Paper} className="m-4">
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Product Name</TableCell>
//             <TableCell>Seller</TableCell>
//             <TableCell>Status</TableCell>
//             <TableCell>Actions</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {/* Replace with actual product data */}
//           <TableRow>
//             <TableCell>Sample Product</TableCell>
//             <TableCell>John Doe</TableCell>
//             <TableCell>Pending</TableCell>
//             <TableCell>
//               <Button variant="contained" color="primary" className="mr-2">
//                 Approve
//               </Button>
//               <Button variant="contained" color="error">
//                 Ban
//               </Button>
//             </TableCell>
//           </TableRow>
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );

//   const renderUsers = () => (
//     <TableContainer component={Paper} className="m-4">
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Username</TableCell>
//             <TableCell>Role</TableCell>
//             <TableCell>Status</TableCell>
//             <TableCell>Actions</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {/* Replace with actual user data */}
//           <TableRow>
//             <TableCell>John Doe</TableCell>
//             <TableCell>Trader</TableCell>
//             <TableCell>Active</TableCell>
//             <TableCell>
//               <Button
//                 variant="contained"
//                 color="error"
//                 onClick={() => handleBanUser({ id: 1, name: "John Doe" })}
//               >
//                 Ban User
//               </Button>
//             </TableCell>
//           </TableRow>
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );

//   const renderComments = () => (
//     <TableContainer component={Paper} className="m-4">
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>User</TableCell>
//             <TableCell>Comment</TableCell>
//             <TableCell>Product</TableCell>
//             <TableCell>Actions</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {/* Replace with actual comment data */}
//           <TableRow>
//             <TableCell>Jane Doe</TableCell>
//             <TableCell>This is a sample comment</TableCell>
//             <TableCell>Product X</TableCell>
//             <TableCell>
//               <Button variant="contained" color="error">
//                 Delete
//               </Button>
//             </TableCell>
//           </TableRow>
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );

//   const drawer = (
//     <div>
//       <Toolbar />
//       <List>
//         <ListItem button onClick={() => setSelectedSection("overview")}>
//           <ListItemIcon>
//             <DashboardIcon />
//           </ListItemIcon>
//           <ListItemText primary="Overview" />
//         </ListItem>
//         <ListItem button onClick={() => setSelectedSection("products")}>
//           <ListItemIcon>
//             <ShopIcon />
//           </ListItemIcon>
//           <ListItemText primary="Products" />
//         </ListItem>
//         <ListItem button onClick={() => setSelectedSection("users")}>
//           <ListItemIcon>
//             <PeopleIcon />
//           </ListItemIcon>
//           <ListItemText primary="Users" />
//         </ListItem>
//         <ListItem button onClick={() => setSelectedSection("comments")}>
//           <ListItemIcon>
//             <CommentIcon />
//           </ListItemIcon>
//           <ListItemText primary="Comments" />
//         </ListItem>
//       </List>
//     </div>
//   );

//   return (
//     <Box className="flex">
//       <CssBaseline />
//       <AppBar
//         position="fixed"
//         className="w-full md:ml-64"
//         sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
//       >
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//             className="mr-2 md:hidden"
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap>
//             Admin Dashboard
//           </Typography>
//         </Toolbar>
//       </AppBar>

//       <Box
//         component="nav"
//         className="w-64 flex-shrink-0"
//         aria-label="mailbox folders"
//       >
//         <Drawer
//           variant="temporary"
//           open={mobileOpen}
//           onClose={handleDrawerToggle}
//           className="md:hidden"
//           sx={{
//             "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
//           }}
//         >
//           {drawer}
//         </Drawer>
//         <Drawer
//           variant="permanent"
//           className="hidden md:block"
//           sx={{
//             "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
//           }}
//           open
//         >
//           {drawer}
//         </Drawer>
//       </Box>

//       <Box component="main" className="flex-grow p-6">
//         <Toolbar />
//         {selectedSection === "overview" && renderOverview()}
//         {selectedSection === "products" && renderProducts()}
//         {selectedSection === "users" && renderUsers()}
//         {selectedSection === "comments" && renderComments()}
//       </Box>

//       <Dialog open={emailDialog} onClose={() => setEmailDialog(false)}>
//         <DialogTitle>Ban User</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Reason for ban"
//             type="text"
//             fullWidth
//             multiline
//             rows={4}
//             value={banReason}
//             onChange={(e) => setBanReason(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setEmailDialog(false)}>Cancel</Button>
//           <Button onClick={handleSendBanEmail} color="error">
//             Ban User & Send Email
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default AdminDashboard;

//

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea,
  Chip,
  Avatar,
  IconButton,
  Badge,
} from "@material-tailwind/react";
import {
  Users,
  ShoppingBag,
  AlertTriangle,
  DollarSign,
  Ban,
  CheckCircle,
  XCircle,
  Star,
  MessageCircle,
} from "lucide-react";

const AdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState("overview");
  const [banDialog, setBanDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [banReason, setBanReason] = useState("");
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalTraders: 0,
    totalRevenue: 0,
  });
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, usersRes, productsRes] = await Promise.all([
        axios.get("/api/admin/stats"),
        axios.get("/api/admin/users"),
        axios.get("/api/admin/products"),
      ]);

      const statsData = statsRes.data;
      const usersData = usersRes.data;
      const productsData = productsRes.data;

      setStats(statsData);
      setUsers(usersData);
      setProducts(productsData);
      setLoading(false);
      console.log("USers", usersData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setLoading(false);
    }
  };

  const handleBanUser = async (user) => {
    setSelectedUser(user);
    setBanDialog(true);
  };

  const confirmBanUser = async () => {
    try {
      await axios.post(`/api/admin/users/${selectedUser._id}/ban`, {
        reason: banReason,
      });

      await axios.post("/api/admin/notify", {
        email: selectedUser.email,
        subject: "Account Status Update",
        message: `Your account has been banned for the following reason: ${banReason}`,
      });

      setBanDialog(false);
      setBanReason("");
      fetchDashboardData();
    } catch (error) {
      console.error("Error banning user:", error);
    }
  };

  const renderOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      <Card>
        <CardBody className="flex items-center gap-4">
          <div className="rounded-lg bg-blue-500/20 p-3">
            <Users className="h-8 w-8 text-blue-500" />
          </div>
          <div>
            <Typography variant="h6" color="blue-gray">
              Total Users
            </Typography>
            <Typography variant="h4">{stats.totalUsers}</Typography>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="flex items-center gap-4">
          <div className="rounded-lg bg-green-500/20 p-3">
            <ShoppingBag className="h-8 w-8 text-green-500" />
          </div>
          <div>
            <Typography variant="h6" color="blue-gray">
              Total Products
            </Typography>
            <Typography variant="h4">{stats.totalProducts}</Typography>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="flex items-center gap-4">
          <div className="rounded-lg bg-yellow-500/20 p-3">
            <Star className="h-8 w-8 text-yellow-500" />
          </div>
          <div>
            <Typography variant="h6" color="blue-gray">
              Total Traders
            </Typography>
            <Typography variant="h4">{stats.totalTraders}</Typography>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="flex items-center gap-4">
          <div className="rounded-lg bg-purple-500/20 p-3">
            <DollarSign className="h-8 w-8 text-purple-500" />
          </div>
          <div>
            <Typography variant="h6" color="blue-gray">
              Total Revenue
            </Typography>
            <Typography variant="h4">${stats.totalRevenue}</Typography>
          </div>
        </CardBody>
      </Card>
    </div>
  );

  const renderUsers = () => (
    <Card className="h-full w-full overflow-scroll m-4">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              User
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              Email
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              Role
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              Wallet
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              Status
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="p-4 border-b border-blue-gray-50">
                <div className="flex items-center gap-3">
                  <Avatar
                    src={`/images/${user.photo}`}
                    alt={user.name}
                    size="sm"
                  />
                  <Typography variant="small" color="blue-gray">
                    {user.name}
                  </Typography>
                </div>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <Typography variant="small" color="blue-gray">
                  {user.email}
                </Typography>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <div className="w-max">
                  <Chip
                    value={user.role}
                    color={
                      user.role === "admin"
                        ? "red"
                        : user.role === "trader"
                        ? "amber"
                        : "blue-gray"
                    }
                    size="sm"
                  />
                </div>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <Typography variant="small" color="blue-gray">
                  ${user.wallet}
                </Typography>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <div className="w-max">
                  <Chip
                    icon={
                      user.isBanned ? (
                        <Ban className="h-4 w-4" />
                      ) : (
                        <CheckCircle className="h-4 w-4" />
                      )
                    }
                    value={user.isBanned ? "Banned" : "Active"}
                    color={user.isBanned ? "red" : "green"}
                    size="sm"
                  />
                </div>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <Button
                  color={user.isBanned ? "blue" : "red"}
                  size="sm"
                  onClick={() => handleBanUser(user)}
                  disabled={user.role === "admin"}
                >
                  {user.isBanned ? "Unban" : "Ban"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );

  const renderProducts = () => (
    <Card className="h-full w-full overflow-scroll m-4">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              Product
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              Brand
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              Category
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              Price
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              Trader
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="p-4 border-b border-blue-gray-50">
                <div className="flex items-center gap-3">
                  <Avatar
                    src={product.photos[0]}
                    size="md"
                    className="rounded-lg object-cover"
                  />
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-semibold"
                    >
                      {product.title}
                    </Typography>
                    <Typography className="text-xs font-normal text-blue-gray-500">
                      {product.description.substring(0, 50)}...
                    </Typography>
                  </div>
                </div>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <Typography variant="small" color="blue-gray">
                  {product.brand}
                </Typography>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <Typography variant="small" color="blue-gray">
                  {product.category}
                </Typography>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <Typography variant="small" color="blue-gray">
                  ${product.price}
                </Typography>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <Typography variant="small" color="blue-gray">
                  {product.traderId?.name || "Unknown"}
                </Typography>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <Button
                  variant="outlined"
                  color="red"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <XCircle className="h-4 w-4" /> Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <div className="p-6">
        <Typography variant="h4" color="blue-gray" className="mb-6">
          Admin Dashboard
        </Typography>

        <div className="flex gap-4 mb-6">
          <Button
            variant={selectedSection === "overview" ? "filled" : "outlined"}
            onClick={() => setSelectedSection("overview")}
            className="flex items-center gap-2"
          >
            <Users className="h-4 w-4" /> Overview
          </Button>
          <Button
            variant={selectedSection === "users" ? "filled" : "outlined"}
            onClick={() => setSelectedSection("users")}
            className="flex items-center gap-2"
          >
            <Users className="h-4 w-4" /> Users
          </Button>
          <Button
            variant={selectedSection === "products" ? "filled" : "outlined"}
            onClick={() => setSelectedSection("products")}
            className="flex items-center gap-2"
          >
            <ShoppingBag className="h-4 w-4" /> Products
          </Button>
        </div>

        {selectedSection === "overview" && renderOverview()}
        {selectedSection === "users" && renderUsers()}
        {selectedSection === "products" && renderProducts()}

        <Dialog open={banDialog} handler={() => setBanDialog(false)}>
          <DialogHeader>
            {selectedUser?.isBanned ? "Unban User" : "Ban User"}
          </DialogHeader>
          <DialogBody>
            <Textarea
              label="Reason"
              value={banReason}
              onChange={(e) => setBanReason(e.target.value)}
            />
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="blue-gray"
              onClick={() => setBanDialog(false)}
              className="mr-1"
            >
              Cancel
            </Button>
            <Button variant="gradient" color="red" onClick={confirmBanUser}>
              Confirm
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminDashboard;
